#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile, readdir, mkdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(ROOT, "src", "data", "team.json");
const IMAGE_DIR = path.join(ROOT, "public", "team");
const PUBLIC_PREFIX = "/team";

const DRY_RUN = process.argv.includes("--dry-run");
const SHEET_URL = process.env.TEAM_SHEET_CSV_URL;

const EXT_BY_MIME = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function normalizeHeader(value) {
  return value
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

const HEADER_ALIASES = {
  name: ["nome", "name", "nomecompleto", "participante", "membro"],
  role: ["cargo", "role", "funcao", "posicao", "titulo"],
  photo: ["foto", "photo", "urldafoto", "urlfoto", "linkdafoto", "imagem", "image", "url", "link"],
  active: ["ativo", "ativa", "active", "status", "publicar"],
};

function mapColumns(headerRow) {
  const normalized = headerRow.map(normalizeHeader);
  const columns = {};

  for (const [key, aliases] of Object.entries(HEADER_ALIASES)) {
    columns[key] = normalized.findIndex((header) => aliases.includes(header));
  }

  const missing = ["name", "role", "photo"].filter((key) => columns[key] === -1);
  if (missing.length > 0) {
    throw new Error(
      `Colunas nao encontradas na planilha: ${missing.join(", ")}. ` +
        `Cabecalho lido: [${headerRow.join(" | ")}]. ` +
        `Nomes aceitos: nome, cargo, foto (ou name, role, photo).`
    );
  }

  return columns;
}

const FALSY_VALUES = new Set(["nao", "no", "false", "0", "inativo", "inativa", "off", "n"]);

function isActive(value) {
  if (value === undefined) return true;
  const normalized = normalizeHeader(value);
  if (normalized === "") return true;
  return !FALSY_VALUES.has(normalized);
}

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizePhotoUrl(url, memberName) {
  const trimmed = url.trim();

  if (!/^https?:\/\//i.test(trimmed)) {
    throw new Error(`Foto de "${memberName}": "${trimmed}" nao e uma URL http(s) valida.`);
  }

  const driveId =
    trimmed.match(/drive\.google\.com\/file\/d\/([\w-]+)/)?.[1] ??
    trimmed.match(/drive\.google\.com\/(?:open|uc)\?(?:[^#]*&)?id=([\w-]+)/)?.[1] ??
    trimmed.match(/drive\.usercontent\.google\.com\/download\?(?:[^#]*&)?id=([\w-]+)/)?.[1];
  if (driveId) {
    return `https://drive.usercontent.google.com/download?id=${driveId}&export=download`;
  }

  if (/imgur\.com\/(a|gallery)\//i.test(trimmed)) {
    throw new Error(
      `Foto de "${memberName}": esse link do Imgur e de album/galeria. ` +
        `Abra a foto e use "Copiar endereco da imagem" (fica como https://i.imgur.com/xxxx.jpg).`
    );
  }

  const imgurId = trimmed.match(/^https?:\/\/(?:www\.)?imgur\.com\/(\w+)(?:\.\w+)?(?:[?#].*)?$/i)?.[1];
  if (imgurId) {
    return `https://i.imgur.com/${imgurId}.jpeg`;
  }

  return trimmed;
}

async function fetchWithRetry(url, { attempts = 3, ...init } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, { redirect: "follow", ...init });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  throw new Error(`Falha ao buscar ${url}: ${lastError.message}`);
}

function sniffImageType(buffer) {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return "jpg";
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") {
    return "webp";
  }
  if (buffer.subarray(0, 3).toString("ascii") === "GIF") return "gif";
  if (buffer.subarray(4, 8).toString("ascii") === "ftyp" && buffer.subarray(8, 12).toString("ascii").includes("avif")) {
    return "avif";
  }
  return null;
}

async function downloadImage(url, memberName) {
  const response = await fetchWithRetry(url);
  const buffer = Buffer.from(await response.arrayBuffer());
  const mime = (response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
  const ext = sniffImageType(buffer) ?? EXT_BY_MIME[mime];

  if (!ext) {
    const hint = mime.includes("html")
      ? "o link devolveu uma pagina HTML. Confira se a foto esta compartilhada como 'qualquer pessoa com o link'."
      : `content-type inesperado: ${mime || "(vazio)"}`;
    throw new Error(`Foto de "${memberName}" nao e uma imagem valida - ${hint}`);
  }

  return { buffer, ext };
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    console.warn("[aviso] sharp nao instalado - as fotos serao commitadas no tamanho original.");
    return null;
  }
}

async function optimize(sharp, buffer) {
  if (!sharp) return null;
  const optimized = await sharp(buffer)
    .rotate()
    .resize(512, 512, { fit: "cover", position: "top" })
    .webp({ quality: 82 })
    .toBuffer();
  return { buffer: optimized, ext: "webp" };
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

async function readIfExists(filePath) {
  try {
    return await readFile(filePath);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function main() {
  if (!SHEET_URL) {
    throw new Error(
      "Variavel TEAM_SHEET_CSV_URL nao definida. " +
        "Use a URL de exportacao CSV da planilha (Arquivo > Compartilhar > Publicar na web > CSV)."
    );
  }

  console.log("Lendo planilha...");
  const csvResponse = await fetchWithRetry(SHEET_URL);
  const csvText = await csvResponse.text();

  if (csvText.trimStart().startsWith("<")) {
    throw new Error(
      "A planilha devolveu HTML em vez de CSV. Verifique se ela esta publicada na web no formato CSV."
    );
  }

  const rows = parseCsv(csvText);
  if (rows.length < 2) {
    throw new Error("Planilha vazia ou sem linhas de dados alem do cabecalho.");
  }

  const columns = mapColumns(rows[0]);
  const members = [];
  const errors = [];
  const usedSlugs = new Map();

  rows.slice(1).forEach((row, index) => {
    const lineNumber = index + 2;
    const name = (row[columns.name] ?? "").trim();
    const role = (row[columns.role] ?? "").trim();
    const photoUrl = (row[columns.photo] ?? "").trim();
    const activeCell = columns.active === -1 ? undefined : row[columns.active];

    if (name === "" && role === "" && photoUrl === "") return;
    if (!isActive(activeCell)) return;

    if (name === "" || role === "") {
      errors.push(`linha ${lineNumber}: nome e cargo sao obrigatorios (nome="${name}")`);
      return;
    }

    const baseSlug = slugify(name) || `membro-${lineNumber}`;
    const seen = (usedSlugs.get(baseSlug) ?? 0) + 1;
    usedSlugs.set(baseSlug, seen);
    const slug = seen === 1 ? baseSlug : `${baseSlug}-${seen}`;

    if (photoUrl === "" || photoUrl.startsWith(PUBLIC_PREFIX + "/")) {
      members.push({ name, role, slug, photoUrl: null, lineNumber });
      return;
    }

    try {
      members.push({ name, role, slug, photoUrl: normalizePhotoUrl(photoUrl, name), lineNumber });
    } catch (error) {
      errors.push(`linha ${lineNumber}: ${error.message}`);
    }
  });

  if (errors.length > 0) {
    throw new Error(`Planilha com linhas invalidas:\n  - ${errors.join("\n  - ")}`);
  }

  if (members.length === 0) {
    throw new Error("Nenhum membro ativo encontrado na planilha - abortando para nao apagar a equipe do site.");
  }

  console.log(`${members.length} membro(s) ativo(s) na planilha.`);

  await mkdir(IMAGE_DIR, { recursive: true });
  await mkdir(path.dirname(DATA_FILE), { recursive: true });

  const arquivosNaPasta = await readdir(IMAGE_DIR).catch(() => []);
  const semFoto = [];
  const sharp = await loadSharp();
  const prontos = [];
  let baixadas = 0;

  for (const member of members) {
    if (member.photoUrl === null) {
      const existente = arquivosNaPasta.find((file) => file.replace(/\.[^.]+$/, "") === member.slug);
      if (!existente) {
        semFoto.push(
          `${member.name} (linha ${member.lineNumber}): sem foto no repositorio, preencha a coluna Foto com a URL da imagem`
        );
        continue;
      }
      prontos.push({ member, processed: null, fileName: existente });
      continue;
    }

    const original = await downloadImage(member.photoUrl, member.name);
    const processed = (await optimize(sharp, original.buffer)) ?? original;
    baixadas++;
    prontos.push({ member, processed, fileName: `${member.slug}.${processed.ext}` });
  }

  if (semFoto.length > 0) {
    throw new Error(`Membros sem foto:\n  - ${semFoto.join("\n  - ")}`);
  }

  console.log(`${baixadas} foto(s) baixada(s), ${prontos.length - baixadas} mantida(s). Gravando...`);

  const entries = [];
  const keepFiles = new Set();
  let changed = 0;

  for (const { member, processed, fileName } of prontos) {
    keepFiles.add(fileName);

    if (processed !== null) {
      const filePath = path.join(IMAGE_DIR, fileName);
      const existing = await readIfExists(filePath);
      if (existing === null || sha256(existing) !== sha256(processed.buffer)) {
        changed++;
        console.log(`  ${existing === null ? "novo" : "atualizado"}: ${fileName}`);
        if (!DRY_RUN) await writeFile(filePath, processed.buffer);
      }
    }

    entries.push({ name: member.name, role: member.role, photo: `${PUBLIC_PREFIX}/${fileName}` });
  }

  const existingFiles = await readdir(IMAGE_DIR).catch(() => []);
  for (const file of existingFiles) {
    if (file.startsWith(".") || keepFiles.has(file)) continue;
    changed++;
    console.log(`  removido: ${file}`);
    if (!DRY_RUN) await unlink(path.join(IMAGE_DIR, file));
  }

  const json = `${JSON.stringify(entries, null, 2)}\n`;
  const previousJson = (await readIfExists(DATA_FILE))?.toString("utf8");
  if (previousJson !== json) {
    changed++;
    console.log(`  atualizado: ${path.relative(ROOT, DATA_FILE)}`);
    if (!DRY_RUN) await writeFile(DATA_FILE, json, "utf8");
  }

  console.log(
    `\nConcluido: ${changed} alteracao(oes)${DRY_RUN ? " (dry-run, nada escrito)" : ""}.`
  );
}

main().catch((error) => {
  console.error(`\nErro: ${error.message}`);
  process.exit(1);
});

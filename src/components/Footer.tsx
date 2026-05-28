import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logoBranca from "@/assets/logo-branca.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-accent text-accent-foreground pt-16 pb-8 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logoBranca} alt="Rumivet Jr" className="h-12 w-auto mb-6" />
            <p className="text-accent-foreground/70 max-w-md leading-relaxed">
              Empresa Júnior de Consultoria Veterinária formada por acadêmicos do IFFar - Campus
              Frederico Westphalen. Desenvolvendo o agronegócio com inovação.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-5">Links Rápidos</h4>
            <ul className="space-y-3">
              {[{
              href: "#inicio",
              label: "Início"
            }, {
              href: "#sobre",
              label: "Sobre Nós"
            }, {
              href: "#servicos",
              label: "Serviços"
            }, {
              href: "#equipe",
              label: "Equipe"
            }, {
              href: "#contato",
              label: "Contato"
            }].map(link => <li key={link.href}>
                  <a href={link.href} className="text-accent-foreground/70 hover:text-secondary transition-colors">
                    {link.label}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-5">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-secondary" />
                <span className="text-accent-foreground/70">Frederico Westphalen - RS</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 text-secondary" />
                <a href="mailto:contato@rumivetjr.com.br" className="text-accent-foreground/70 hover:text-secondary transition-colors">
                  contato@rumivetjr.com.br
                </a>
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a href="https://instagram.com/rumivetjr" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-accent-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-accent transition-all duration-300" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com/company/rumivetjr" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-accent-foreground/10 flex items-center justify-center hover:bg-secondary hover:text-accent transition-all duration-300" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-accent-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-accent-foreground/50">
            © {currentYear} Rumivet Jr - Todos os direitos reservados.
          </p>
          <p className="text-sm text-accent-foreground/50">
            Desenvolvido com 💚 por breskovit.dev 
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
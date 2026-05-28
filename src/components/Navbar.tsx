import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoVerde from "@/assets/logo-verde.png";
import logoBranca from "@/assets/logo-branca.png";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#servicos", label: "Serviços" },
  { href: "#equipe", label: "Equipe" },
  { href: "#contato", label: "Contato" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#inicio" className="flex items-center">
            <img
              src={scrolled ? logoVerde : logoBranca}
              alt="Rumivet Jr - Consultoria Veterinária"
              className={`transition-all duration-300 ${scrolled ? "h-10" : "h-12"} w-auto`}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 font-medium transition-colors rounded-full ${
                  scrolled
                    ? "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button 
              className={`ml-4 rounded-full px-6 transition-all duration-500 ${
                scrolled
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-white text-primary hover:bg-white/90"
              }`}
            >
              Agendar Consultoria
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              scrolled
                ? "bg-primary/10 text-primary"
                : "bg-white/10 text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 p-4 glass rounded-2xl animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 transition-colors font-medium rounded-xl"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-2 bg-primary hover:bg-accent text-primary-foreground rounded-full">
                Agendar Consultoria
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

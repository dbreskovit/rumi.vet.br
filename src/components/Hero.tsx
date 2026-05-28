import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1605164599901-57e0b7339e09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/90 via-accent/80 to-accent/90" />
      </div>


      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 text-white/80 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Empresa Júnior do IFFar - Campus Frederico Westphalen
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-white mb-6 leading-tight tracking-tight">
            Excelência em
            <br />
            <span className="text-secondary font-medium">Consultoria Veterinária</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Unindo conhecimento acadêmico e prática para desenvolver o agronegócio com inovação e compromisso.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-base px-8 py-6 rounded-full transition-all duration-500 font-medium"
              onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
            >
              Conheça Nossos Serviços
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-white/30 bg-transparent text-white hover:bg-white/10 text-base px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-500"
              onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
            >
              Fale Conosco
            </Button>
          </div>
        </motion.div>


      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
          onClick={() => document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })}
        >
          <ArrowDown className="w-4 h-4 text-white/60" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;

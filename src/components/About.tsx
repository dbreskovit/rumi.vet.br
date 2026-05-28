import { Target, Eye, Heart, Award, GraduationCap, History, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import equipe from "@/assets/team/equipe.jpg";
import image from "@/assets/team/image.png";  

const values = [
  {
    icon: Target,
    title: "Missão",
    description: "Desenvolvimento de lideranças e empreendedores no ramo do agronegócio.",
  },
  {
    icon: Eye,
    title: "Visão",
    description: "Resolução com eficiência e rapidez para com os desafios e promoção da cultura do aprendizado e inovação.",
  },
  {
    icon: Heart,
    title: "Valores",
    description: "Ética, excelência, compromisso, resiliência, formação e execução.",
  },
];

const About = () => {
  return (
    <section id="sobre" className="section-padding bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Quem Somos
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4 tracking-tight">
            Sobre a <span className="text-primary font-medium">Rumivet</span>
          </h2>
        </motion.div>

        {/* Company Description */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >

          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-tight">
                A Empresa
              </h3>
            </div>
            <div className="space-y-5 text-foreground/70 leading-relaxed text-lg font-light">
              <p>
                A <strong className="text-foreground font-medium">Rumivet</strong> é uma empresa júnior de consultoria veterinária formada por acadêmicos do
                <strong className="text-primary font-medium"> IFFar - Instituto Federal Farroupilha - Campus Frederico Westphalen</strong>.
              </p>
              <p>
                Atuamos no campus e em extensão a campo aos municípios próximos na área de ruminantes, 
                proporcionando aos membros experiência durante a graduação.
              </p>
              <p>
                Atendemos a demanda veterinária prevista, agregando às propriedades com 
                <strong className="text-primary font-medium"> melhor custo benefício</strong> e progresso para o produtor.
              </p>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-3 mt-10">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full">
                <Award className="w-4 h-4" />
                <span className="font-medium text-sm">Empresa Federada</span>
              </div>
              <div className="flex items-center gap-2 bg-secondary/40 text-secondary-foreground px-5 py-2.5 rounded-full">
                <GraduationCap className="w-4 h-4" />
                <span className="font-medium text-sm">IFFar - Campus FW</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden">
              <img
                src={equipe}
                alt="Equipe Rumivet Jr"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>


        {/* History Section */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <Card className="border-none bg-accent overflow-hidden rounded-3xl">
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="aspect-[4/3] lg:aspect-auto relative">
                  <img
                    src={image}
                    alt="Equipe Rumivet Jr trabalhando no campo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/50 lg:block hidden" />
                </div>
                
                {/* Content */}
                <div className="p-10 lg:p-14 flex flex-col justify-center text-white">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                      <History className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                      Nossa História
                    </h3>
                  </div>
                  
                  <div className="space-y-5 text-white/80 leading-relaxed text-lg font-light">
                    <p>
                      Em <span className="text-secondary font-medium">2022</span>, teve início a primeira gestão, marcada por uma equipe empreendedora 
                      liderada pelo presidente <span className="text-secondary font-medium">Marco Antonio da Silveira</span>.
                    </p>
                    <p>
                      Deram os primeiros passos rumo à concretização da empresa, compreendendo 
                      as regulamentações e exigências para sua formação.
                    </p>
                    <p>
                      O <span className="text-secondary font-medium">primeiro serviço foi andrológico em ovino</span>, 
                      representando um marco importante na nossa história.
                    </p>
                    <p>
                      Hoje somos uma empresa <span className="text-secondary font-medium">federada</span> e em constante desenvolvimento.
                    </p>
                  </div>

                  {/* Timeline */}
                  <div className="mt-10 flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                      <span className="font-medium text-base">2022</span>
                    </div>
                    <div className="flex-1 h-px bg-white/20 relative">
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-secondary/60" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-base">Hoje</span>
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
              O que nos move
            </span>
            <h3 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">
              Cultura e Valores
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <Card className="bg-background border border-border/60 shadow-none hover:border-primary/30 transition-colors duration-500 h-full group rounded-2xl">
                  <CardContent className="p-10 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 transition-colors duration-500 group-hover:bg-primary/15">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-medium text-foreground mb-3">
                      {item.title}
                    </h4>
                    <p className="text-foreground/60 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

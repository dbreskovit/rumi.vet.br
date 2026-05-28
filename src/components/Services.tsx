import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import service images
import iatfImg from "@/assets/services/iatf.jpg";
import qualidadeLeiteImg from "@/assets/services/qualidade-leite.jpg";
import ultrassonografiaBovinaImg from "@/assets/services/ultrassonografia-bovina.jpg";
import opgOvinoImg from "@/assets/services/opg-ovino.jpg";
import ultrassonografiaOvinaImg from "@/assets/services/ultrassonografia-ovina.jpg";
import casqueamentoImg from "@/assets/services/casqueamento.png";
import tosquiaImg from "@/assets/services/tosquia.jpg";
import exameAndrologicoImg from "@/assets/services/exame-andrologico.jpg";
import avaliacaoRebanhoImg from "@/assets/services/avaliacao-rebanho.png";

const bovinosServices = [
  {
    title: "IATF",
    description: "Inseminação Artificial em Tempo Fixo. Planejamento de protocolos hormonais para sincronização da ovulação.",
    image: iatfImg,
  },
  {
    title: "Qualidade do Leite",
    description: "Controle de CCS, cultura microbiológica e higiene na ordenha.",
    image: qualidadeLeiteImg,
  },
  {
    title: "Ultrassonografia",
    description: "Diagnóstico gestacional e avaliação reprodutiva por imagem.",
    image: ultrassonografiaBovinaImg,
  },
  {
    title: "OPG",
    description: "Contagem de Ovos por Grama para monitoramento parasitário.",
    image: avaliacaoRebanhoImg,
  },
];

const ovinosServices = [
  {
    title: "Manejo Sanitário",
    description: "OPG, Vermifugação estratégica e Biocarrapaticidagrama (teste de resistência).",
    image: opgOvinoImg,
  },
  {
    title: "Ultrassonografia",
    description: "Diagnóstico gestacional e avaliação reprodutiva por imagem.",
    image: ultrassonografiaOvinaImg,
  },
  {
    title: "Exame Andrológico",
    description: "Avaliação completa da capacidade reprodutiva de machos.",
    image: exameAndrologicoImg,
  },
  {
    title: "Casqueamento",
    description: "Correção de cascos para saúde e bem-estar do rebanho.",
    image: casqueamentoImg,
  },
  {
    title: "Tosquia",
    description: "Serviço profissional de tosquia para conforto térmico e manejo.",
    image: tosquiaImg,
  },
];

const ServiceCard = ({ service, index }: { service: typeof bovinosServices[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    viewport={{ once: true }}
  >
    <Card className="overflow-hidden group h-full border border-border/60 bg-card shadow-none hover:border-primary/30 transition-colors duration-500 rounded-2xl">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
        />
      </div>
      <CardContent className="p-6">
        <h4 className="text-lg font-medium text-foreground mb-2 transition-colors duration-500 group-hover:text-primary">
          {service.title}
        </h4>
        <p className="text-foreground/60 leading-relaxed font-light text-sm">{service.description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

const Services = () => {
  const [activeTab, setActiveTab] = useState("bovinos");

  return (
    <section id="servicos" className="section-padding bg-muted/40 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-primary text-sm font-medium tracking-widest uppercase mb-4">
            O que fazemos
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4 tracking-tight">
            Nossos <span className="text-primary font-medium">Serviços</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg font-light">
            Oferecemos soluções completas em consultoria veterinária para bovinos e ovinos,
            com foco em reprodução, sanidade e manejo.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-background border border-border/60 p-1 rounded-full h-auto">
            <TabsTrigger
              value="bovinos"
              className="rounded-full py-2.5 text-sm font-medium transition-all duration-500 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Bovinos
            </TabsTrigger>
            <TabsTrigger
              value="ovinos"
              className="rounded-full py-2.5 text-sm font-medium transition-all duration-500 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Ovinos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bovinos" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bovinosServices.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ovinos" className="mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ovinosServices.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Services;

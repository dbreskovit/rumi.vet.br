import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

// Import team photos
import member1 from "@/assets/team/member-1.jpg";
import member2 from "@/assets/team/member-2.jpg";
import member3 from "@/assets/team/member-3.jpg";
import member4 from "@/assets/team/member-4.jpg";
import member5 from "@/assets/team/member-5.jpg";
import member6 from "@/assets/team/member-6.jpg";
import member7 from "@/assets/team/member-7.jpg";
import member8 from "@/assets/team/member-8.jpg";

const teamMembers = [
  {
    name: "Alessandra Lapazini",
    role: "Diretora",
    photo: member1,
  },
  {
    name: "Maiara Stormoski Gattenes",
    role: "Diretora Gestão de Pessoas",
    photo: member2,
  },
  {
    name: "Micheli Miola",
    role: "Diretora de Projetos",
    photo: member3,
  },
  {
    name: "Bernardo Girotto",
    role: "Diretor Comercial",
    photo: member4,
  },
  {
    name: "Luiza Picoloto do Nascimento",
    role: "Diretora Comunicação e Marketing",
    photo: member5,
  },
  {
    name: "Andressa Favin",
    role: "Diretora Administrativo Financeiro",
    photo: member6,
  },
  {
    name: "Mateus Franco Franceschi",
    role: "Assessor Comercial",
    photo: member7,
  },
  {
    name: "Iane Pertuzatti Da Rosa ",
    role: "Assessora de Projetos",
    photo: member8,
  },
];

const Team = () => {
  return (
    <section id="equipe" className="section-padding bg-background relative overflow-hidden">
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
            Conheça nosso time
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4 tracking-tight">
            Nossa <span className="text-primary font-medium">Equipe</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg font-light">
            Acadêmicos dedicados que fazem a Rumivet Jr acontecer, unindo paixão
            pela veterinária e empreendedorismo.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="text-center border border-border/60 bg-card shadow-none group rounded-2xl overflow-hidden h-full hover:border-primary/30 transition-colors duration-500">
                <CardContent className="p-6 h-full flex flex-col items-center justify-center">
                  {/* Photo */}
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 ring-1 ring-border group-hover:ring-primary/40 transition-all duration-500 flex-shrink-0">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                    />
                  </div>
                  <h4 className="font-medium text-foreground mb-1 transition-colors duration-500 group-hover:text-primary line-clamp-2 min-h-[2.5rem] flex items-center text-sm">
                    {member.name}
                  </h4>
                  <p className="text-xs text-foreground/50 font-light line-clamp-2 min-h-[2.25rem] flex items-center">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;

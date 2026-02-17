import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useServices } from "@/hooks/use-services";
import { ServiceCard } from "@/components/ServiceCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Services() {
  const { data: services, isLoading } = useServices();

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-7xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center max-w-3xl mx-auto mb-20"
        >
          <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-gray-400">
            Comprehensive digital solutions tailored to help your business grow. We handle everything from design to deployment.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {services?.map((service: any, idx: number) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        )}

        {/* Process Section */}
        <div className="mt-32">
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-white text-center mb-16">How We Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Discovery", desc: "We dive deep into your requirements and business goals." },
              { number: "02", title: "Design", desc: "Creating intuitive and beautiful user interfaces." },
              { number: "03", title: "Development", desc: "Writing clean, scalable, and high-performance code." },
              { number: "04", title: "Launch", desc: "Deploying your product and ensuring a smooth rollout." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-display font-bold text-white/5 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-24 text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg" asChild>
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

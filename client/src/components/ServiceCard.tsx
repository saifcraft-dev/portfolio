import type { Service } from "@/types";
import { motion } from "framer-motion";
import { Check, Code, Smartphone, Palette, Cloud, Database } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const icons: Record<string, React.ElementType> = {
  "Web App": Code,
  "Mobile": Smartphone,
  "Design": Palette,
  "Cloud": Cloud,
  "default": Database
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = icons[service.category] || icons.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-card border-white/5 p-8 h-full hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2">
        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon className="w-7 h-7" />
        </div>
        
        <h3 className="text-2xl font-display font-bold text-white mb-3">
          {service.title}
        </h3>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          {service.description}
        </p>

        <div className="space-y-3 mb-8">
          {service.features?.map((feature, i) => (
            <div key={i} className="flex items-start space-x-3 text-sm text-gray-300">
              <Check className="w-5 h-5 text-primary shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="text-sm text-gray-500">Starting from</div>
          <div className="text-xl font-bold text-white">{service.pricing}</div>
        </div>
      </Card>
    </motion.div>
  );
}

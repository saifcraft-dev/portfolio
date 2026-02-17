import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight mb-6">
          Building the next generation of <span className="text-primary">digital excellence</span>.
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          We help forward-thinking companies design, build, and scale their vision with cutting-edge technology and human-centric design.
        </p>
      </motion.div>
    </div>
  );
}

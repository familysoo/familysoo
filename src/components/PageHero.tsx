'use client';

import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  description: string;
}

export default function PageHero({ title, description }: PageHeroProps) {
  return (
    <section className="mt-[80px] py-24 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="container">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="font-serif text-4xl md:text-6xl font-light mb-6 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </motion.div>
      </div>
    </section>
  );
} 
'use client';

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <section className="border-b border-gray-200 py-3">
      <div className="container py-6 flex flex-col justify-center">
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center flex-wrap gap-2"
        >
          {/* 홈 아이콘과 텍스트 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link 
              href="/" 
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/60 backdrop-blur-sm
                         text-foreground/70 hover:text-primary hover:bg-white/80 
                         transition-all duration-300 ease-out hover:scale-105 hover:shadow-md
                         border border-white/30 hover:border-primary/20"
            >
              <Home size={16} className="text-primary/80" />
              <span className="text-sm font-medium">홈</span>
            </Link>
          </motion.div>
          
          {items.map((item, index) => (
            <motion.div 
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: (index + 1) * 0.15,
                ease: "easeOut"
              }}
            >
              {/* 구분자 */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                <ChevronRight size={14} className="text-primary/60" />
              </div>
              
              {/* 브레드크럼 아이템 */}
              {item.href ? (
                <Link 
                  href={item.href}
                  className="px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm
                           text-foreground/70 hover:text-primary hover:bg-white/80
                           transition-all duration-300 ease-out hover:scale-105 hover:shadow-md
                           border border-white/20 hover:border-primary/30
                           text-sm font-medium hover:translate-x-1"
                >
                  {item.label}
                </Link>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-primary/10 backdrop-blur-sm
                               text-primary font-semibold border border-primary/20
                               text-sm shadow-sm">
                  {item.label}
                </div>
              )}
            </motion.div>
          ))}
        </motion.nav>
      </div>
    </section>
  );
} 
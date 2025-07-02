import React from "react";
import { motion } from "framer-motion";

const Bubb = () => {
  const colors = ["#80dfff", "#8e44ad", "#3498db", "#ffffff", "#1abc9c"];

  return (
    <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-sm"
          style={{
            width: 20 + Math.random() * 40,
            height: 20 + Math.random() * 40,
            left: `${Math.random() * 100}%`,
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            opacity: 0.2 + Math.random() * 0.4,
          }}
          animate={{
            y: ["100%", "-20%"],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Bubb;

"use client";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

export function RotateWords({
  text = "You can",
  words = ["watch", "binge", "enjoy endless entertainment"],
}: {
  text: string;
  words: string[];
}) {
  const [index, setIndex] = React.useState(0);

  // Update the index every 1.5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1200); // Adjusted to 1.2 seconds for smoother timing
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="flex flex-col items-center justify-center mx-auto gap-3 sm:gap-4 mb-8 title p-6 bg-cover bg-center">
      <div className="text-center mb-4">
        {/* Make "You can" text smaller */}
        <p className="text-sm font-bold text-white">
          {text}
        </p>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={words[index]}
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          exit={{
            opacity: 0,
            y: 40,
            scale: index === words.length - 1 ? 9 : 1.5, // Increase the last word size by 9 times
            // rotate: index === words.length - 1 ? 180 : 0, // Rotate only the last word
            color: "palegoldenrod", // Apply yellow color to all words
            transition: {
              duration: 0.6,
              ease: "easeInOut",
            },
          }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-palegoldenrod"
        >
          {words[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

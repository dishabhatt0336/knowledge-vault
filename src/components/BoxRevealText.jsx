import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { BoxReveal } from "@/components/magicui/box-reveal";

export function BoxRevealTextBlock({
  heading,
  paragraph,
  styleType = "gradient", // "gradient" or "glass"
  duration = 0.5
}) {
  const controls = useAnimation();
  const [inView, setInView] = useState(false);

  // Style options - updated to match sparkles background theme
  const gradientStyle = "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)";
  const glassStyle = "rgba(255, 255, 255, 0.1)";

  // Decide background color for BoxReveal
  const boxColor = styleType === "gradient" ? gradientStyle : glassStyle;

  return (
    <motion.div
      className={`text-center overflow-hidden ${
        styleType === "glass"
          ? "backdrop-blur-md rounded-xl border border-white/20 p-8 shadow-2xl"
          : ""
      }`}
      style={
        styleType === "glass"
          ? {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)"
            }
          : {}
      }
      initial="hidden"
      animate={controls}
      onViewportEnter={() => {
        setInView(true);
        controls.start("visible");
      }}
      onViewportLeave={() => {
        setInView(false);
        controls.start("hidden");
      }}
      viewport={{ amount: 0.3 }}
      transition={{ staggerChildren: 0.3 }}
    >
      {/* Heading Reveal */}
      <motion.div variants={itemVariants}>
        <BoxReveal backgroundColor={boxColor} duration={duration}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10">
            {heading}
          </h2>
        </BoxReveal>
      </motion.div>

      {/* Paragraph Reveal */}
      <motion.div variants={itemVariants}>
        <BoxReveal backgroundColor={boxColor} duration={duration}>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            {paragraph}
          </p>
        </BoxReveal>
      </motion.div>
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

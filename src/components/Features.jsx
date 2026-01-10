import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/UI/3d-card";
import { TextReveal } from "@/components/magicui/text-reveal";
import { BoxRevealTextBlock } from "@/components/BoxRevealText";
// Enhanced BentoGrid with proper layout and spacing
export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-8 md:auto-rows-[26rem] md:grid-cols-3 lg:gap-12 py-8",
        className
      )}
    >
      {children}
    </div>
  );
};

// Enhanced BentoGridItem with more dramatic 3D effects
export const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (

    <div className={cn("relative h-full", className)}>
      <CardContainer className="inter-var w-full h-full" containerClassName="py-0 ">
<CardBody
  className={cn(
    "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-6 rounded-xl",
    "border border-white/10",
    "bg-black/40 backdrop-blur-sm p-8",
    "transition-all duration-500",
    "hover:bg-black hover:shadow-[0_0_25px_rgba(0,0,0,0.7)] hover:border-purple-500/40",
    "w-full h-full min-h-[26rem] relative overflow-hidden z-30"
  )}
>

          {/* Animated background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5 opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 rounded-xl" />

          {/* Header with strong 3D effect - takes up more space */}
          <CardItem
            translateZ="200"
            rotateX={5}
            rotateY={5}
            className="w-full relative z-10 flex-1"
          >
            <div className="transform group-hover/bento:scale-105 transition-transform duration-300 h-full">
              {header}
            </div>
          </CardItem>

          {/* Content with layered 3D effects - fixed spacing */}
          <div className="transition-all duration-300 group-hover/bento:translate-x-2 relative z-10 flex-none space-y-4">
            <CardItem
              translateZ="300"
              rotateX={5}
              rotateY={5}
              className="flex items-start gap-4"
            >
              <div className="transform group-hover/bento:scale-110 group-hover/bento:rotate-12 transition-all duration-300 p-3 rounded-lg bg-white/10 backdrop-blur-sm flex-shrink-0">
                {icon}
              </div>
              <div className="font-sans font-bold text-white text-xl group-hover/bento:text-purple-100 transition-colors duration-300 leading-tight">
                {title}
              </div>
            </CardItem>

            <CardItem
              translateZ="200"
              rotateX={3}
              rotateY={3}
              className="font-sans text-base font-normal text-gray-300 group-hover/bento:text-gray-200 transition-colors duration-300 leading-relaxed pl-1"
            >
              {description}
            </CardItem>
          </div>

          {/* Enhanced hover glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 opacity-0 group-hover/bento:opacity-100 transition-all duration-500 blur-xl" />
        </CardBody>
      </CardContainer>
    </div>
  );
};

// Enhanced Skeleton Components with better visibility
const SkeletonOne = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } }
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[10rem] bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex-col space-y-4 p-6 border border-purple-300/20"
    >
      {/* AI Brain Icon */}
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-purple-300/40 p-4 items-center space-x-3 bg-white/10 backdrop-blur-sm"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0 shadow-sm" />
        <div className="w-full bg-gray-300/30 h-4 rounded-full" />
      </motion.div>

      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-purple-300/40 p-4 items-center space-x-3 w-3/4 ml-auto bg-white/10 backdrop-blur-sm"
      >
        <div className="w-full bg-gray-300/30 h-4 rounded-full" />
        <div className="h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0 shadow-sm" />
      </motion.div>

      <motion.div
        variants={variants}
        className="flex flex-row rounded-full border border-purple-300/40 p-4 items-center space-x-3 bg-white/10 backdrop-blur-sm"
      >
        <div className="h-4 w-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shrink-0 shadow-sm" />
        <div className="w-full bg-gray-300/30 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

const SkeletonTwo = () => {
  const variants = {
    initial: { width: 0 },
    animate: { width: "100%", transition: { duration: 0.2 } },
    hover: { width: ["0%", "100%"], transition: { duration: 2 } },
  };
  const arr = new Array(6).fill(0);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[8rem] bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg flex-col space-y-3 p-4 border border-green-300/20"
    >
      {/* Document Check Icon */}
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {arr.map((_, i) => (
        <motion.div
          key={`skeleton-two-${i}`}
          variants={variants}
          style={{ maxWidth: Math.random() * (100 - 40) + 40 + "%" }}
          className="flex flex-row rounded-full border border-green-300/40 p-2 bg-white/10 backdrop-blur-sm w-full h-4"
        />
      ))}
    </motion.div>
  );
};

const SkeletonThree = () => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0, 50%", "100% 50%", "0 50%"] }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
      className="flex flex-1 w-full h-full min-h-[8rem] rounded-lg flex-col items-center justify-center relative overflow-hidden border border-white/20"
      style={{
        background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        backgroundSize: "400% 400%",
      }}
    >
      {/* Lightbulb Icon */}
      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 shadow-lg">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 6.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
        </svg>
      </div>
      <div className="text-white text-sm font-semibold">Smart Suggestions</div>
    </motion.div>
  );
};

const SkeletonFour = () => {
  const first = { initial: { x: 20, rotate: -5 }, hover: { x: 0, rotate: 0 } };
  const second = { initial: { x: -20, rotate: 5 }, hover: { x: 0, rotate: 0 } };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[8rem] bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex-row space-x-3 p-4 border border-orange-300/20"
    >
      {[
        { v: first, text: "DOCX", color: "from-green-400 to-emerald-400" },
        { text: "PDF", color: "from-yellow-400 to-amber-400" },
        { v: second, text: "TXT",  color: "from-red-400 to-rose-400" }
      ].map((card, idx) => (
        <motion.div
          key={idx}
          variants={card.v}
          className="h-full w-1/3 rounded-2xl bg-white/10 backdrop-blur-sm p-4 border border-white/20 flex flex-col items-center justify-center text-center shadow-lg"
        >
          <div className="text-3xl mb-2">{card.text.split(' ')[0]}</div>
          <p className="text-xs text-white/90 mb-2 font-medium">{card.text.split(' ')[1]}</p>
          <div className={`text-sm font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
            {card.sentiment}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SkeletonFive = () => {
  const variants = {
    initial: { x: 0 },
    animate: { x: 10, rotate: 5, transition: { duration: 0.2 } }
  };
  const variantsSecond = {
    initial: { x: 0 },
    animate: { x: -10, rotate: -5, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[8rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex-col space-y-3 p-4 border border-indigo-300/20"
    >
      {/* Document Summary Icon */}
      <div className="flex justify-center mb-2">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-indigo-300/40 p-3 items-start space-x-3 bg-white/10 backdrop-blur-sm"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shrink-0 shadow-sm" />
        <p className="text-xs text-white/90 leading-relaxed">Long document with multiple paragraphs and detailed content that needs summarization...</p>
      </motion.div>

      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-indigo-300/40 p-3 items-center justify-center bg-white/15 backdrop-blur-sm ml-6 shadow-lg"
      >
        <p className="text-sm text-white font-semibold">📄 → 📝 Summary</p>
      </motion.div>
    </motion.div>
  );
};

// Features Items Array (keeping the original layout structure)
const items = [
  {
    title: "AI-Powered Question Answering",
    description: "Ask questions in natural language and get accurate, context-aware answers.",
    header: <SkeletonOne />,
    className: "md:col-span-1 ",
    icon: <svg className="h-6 w-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  },
  {
    title: "Smart Search & Retrieval (RAG)",
    description: "Retrieves the most relevant document sections before answering by ensuring high accuracy and relevance in responses",
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  },
  {
    title: "Contextual Suggestions",
    description: "Get AI-powered suggestions based on your writing context and style preferences for better content.",
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 6.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.477.859h4z" />
    </svg>
  },
  {
    title: "Documentation Upload & Management",
    header: <SkeletonFour />,
    className: "md:col-span-2 md:row-span-1 pt-20",
    description: "Upload documents in multiple formats (PDF, DOCX, TXT, Markdown) and organize documentation into projects",
    icon: <svg className="h-6 w-6 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
    </svg>
  },
  {
    title: "Intelligent Summarization",
    description: "Summarize lengthy documents instantly with AI-powered text analysis and key point extraction.",
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <svg className="h-6 w-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  },
];

// Main Features Component
export default function Features() {
  return (
    <section id="Features" className="relative w-full py-20 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-20 w-full">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm mb-6">
            <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-purple-300 text-sm font-semibold">Powerful Features</span>
          </div>
          <BoxRevealTextBlock
            heading="Everything You Need to Know"
            paragraph={
              <>
                Engineered using the latest AI technologies to transform your documentation into a 
                <span className="text-purple-300 font-semibold layout"> powerful, </span> intelligent assistant.
              </>
            }
          />
        </div>
        <BentoGrid className="max-w-6xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("", item.className)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
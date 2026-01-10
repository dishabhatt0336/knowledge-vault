import React from 'react';
import { motion } from 'framer-motion';
import SparklesBackground from '@/components/UI/SparklesBackground';
import { TypingAnimation } from '@/components/UI';
import { AnimatedGradientButton } from '@/components/UI';
import { AnimatedHoverLinkButton } from '@/components/UI';
import TechStackItem from './TechStackItem';
import ScrollIndicator from './ScrollIndicator';
import { HERO_CONFIG, ANIMATION_CONFIG } from './constants';
import { RippleButton } from '@/components/magicui/ripple-button';


const Hero = () => {
    const { container: containerVariants, item: itemVariants } = ANIMATION_CONFIG;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <SparklesBackground />

            {/* Hero Content */}
            <motion.div
                className="relative z-10 text-center px-4 max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Main Heading */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                            {HERO_CONFIG.title.main}
                        </span>
                        <br />
                        <TypingAnimation
                            text={HERO_CONFIG.title.animated}
                            speed={200}
                            repeat={true}
                            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                        />
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xm text-gray-300 max-w-3xl mx-auto leading-relaxed mt-8"
                >
                    {HERO_CONFIG.subtitle}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center items-center mt-10 w-full"
                >
                    {/* Get Started - slightly rounded */}
                    <RippleButton rippleColor="#ADD8E6">
                        <AnimatedHoverLinkButton
                            href={HERO_CONFIG.buttons.primary.href}
                            className="px-8 py-3 text-lg font-bold transform  hover:scale-105 transition-all duration-300 backdrop-blur-md rounded-full hover:text-white"
                        >
                            {HERO_CONFIG.buttons.primary.text}
                        </AnimatedHoverLinkButton>
                    </RippleButton>

                    {/* Try Now - full pill shape */}
                    <AnimatedGradientButton
                        text={HERO_CONFIG.buttons.secondary.text}
                        className="px-8 py-3 text-lg rounded-full"
                    />
                </motion.div>





                
            </motion.div>

            {/* Scroll Indicator */}
            {/* <ScrollIndicator /> */}
        </section>
    );
};

export default Hero;

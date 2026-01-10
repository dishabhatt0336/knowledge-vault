import React, { useRef, useEffect, useState } from 'react';

// Utility function for class names
function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

// Smooth VelocityScroll Component
const VelocityScroll = ({
    text,
    default_velocity = 1,
    className = "",
    reverse = false,
}) => {
    const containerRef = useRef(null);
    const [velocity, setVelocity] = useState(default_velocity);
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const lastScrollY = useRef(0);

    useEffect(() => {
        let rafId;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY.current;

            // Much gentler scroll velocity calculation
            const newScrollVelocity = Math.abs(scrollDelta) * 0.01; // Reduced sensitivity
            setScrollVelocity(newScrollVelocity);

            lastScrollY.current = currentScrollY;

            // Gradually decay the scroll velocity
            rafId = requestAnimationFrame(() => {
                setScrollVelocity(prev => prev * 0.98); // Slower decay
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    // Calculate current velocity (base speed + scroll boost)
    const currentVelocity = default_velocity + 0.5 * velocity; // Cap the boost
    const animationDuration = Math.max(20, 40 / currentVelocity); // Much slower base speed

    return (
        <div
            ref={containerRef}
            className={cn("relative w-full overflow-hidden whitespace-nowrap", className)}
            style={{ 
                height: 'auto',
                minHeight: '1.2em', // Ensure minimum height for text visibility
                paddingTop: '0.25em',
                paddingBottom: '0.25em'
            }}
        >
            <div
                className="inline-flex animate-scroll-smooth items-center"
                style={{
                    animationDuration: `${animationDuration}s`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                {/* Create enough repetitions for seamless infinite scroll */}
                {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} className="mx-8 flex-shrink-0 inline-block">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
};

// Main component with proper spacing and visibility
const ScrollBasedVelocitySection = () => {
    const technologies1 = [
        "Llamaindex", "Llamaparse", "Groq", "Huggingface", "Transformes", "FastAPI", "LangChain", "LangGraph", "LangSmith", "Optical Character Recognition", "Natural Language Processing", "Reinforcement Learning"
    ];

    const technologies2 = [
        "React", "TailwindCSS", "Firebase", "NextJs" , "TypeScript", "NodeJs" , "Vercel" , "RestAPI"
    ];

    return (
        <section className="relative w-full py-8 bg-transparent overflow-hidden">
            {/* Subtle background effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/3 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/2 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full">
                {/* Smooth scrolling text rows with compact spacing */}
                <div className="space-y-1 w-full">
                    {/* First row - slow forward */}
                    <div className="w-full py-2">
                        <VelocityScroll
                            text={technologies1.join(" • ")}
                            default_velocity={0.1}
                            reverse={false}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/8 hover:text-white/15 transition-colors duration-700 select-all"
                        />
                    </div>

                    {/* Second row - slow reverse with compact spacing */}
                    <div className="w-full py-0">
                        <VelocityScroll
                            text={technologies2.join(" • ")}
                            default_velocity={0.6}
                            reverse={true}
                            className="text-2xl md:text-3xl lg:text-3xl font-bold text-purple-900 hover:text-purple-500 transition-colors duration-700 select-none"
                        />
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll-smooth {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                
                .animate-scroll-smooth {
                    animation: scroll-smooth linear infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                    perspective: 1000px;
                    transform: translateZ(0);
                }
                
                /* Prevent text selection and improve UX */
                .select-none {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    -webkit-touch-callout: none;
                    -webkit-tap-highlight-color: transparent;
                }

                /* Ensure proper text rendering */
                .select-none * {
                    line-height: 1.2;
                }

                /* Hide scrollbars if any appear */
                .overflow-hidden {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .overflow-hidden::-webkit-scrollbar {
                    display: none;
                }

                /* Smooth hover transitions */
                .transition-colors {
                    transition-property: color;
                    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Ensure text doesn't get clipped */
                .animate-scroll-smooth span {
                    display: inline-block;
                    vertical-align: baseline;
                }
            `}</style>
        </section>
    );
};

export default ScrollBasedVelocitySection;
export { VelocityScroll };
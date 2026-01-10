export const HERO_CONFIG = {
  title: {
    main: "Knowledge",
    animated: "Vault"
  },
  subtitle: "An intelligent AI assistant designed to understand your documentation and deliver accurate, context-aware answers in seconds.",
  buttons: {
    primary: {
      text: "Get Started",
      href: "https://github.com"
    },
    secondary: {
      text: "Try now"
    }
  }
  
};

export const ANIMATION_CONFIG = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }
};

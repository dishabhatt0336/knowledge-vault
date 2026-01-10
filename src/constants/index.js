// Animation constants
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
};

export const ANIMATION_DELAYS = {
  TYPING: 150,
  STAGGER: 200,
  FADE_IN: 500,
};

// Canvas and particle constants
export const PARTICLE_CONFIG = {
  SPARKLE_COUNT: 150,
  SHOOTING_STAR_COUNT: 3,
  MIN_PARTICLE_SIZE: 0.5,
  MAX_PARTICLE_SIZE: 2.5,
  TWINKLE_SPEED_MIN: 0.01,
  TWINKLE_SPEED_MAX: 0.03,
  HUE_MIN: 220,
  HUE_MAX: 280,
  BRIGHTNESS_MIN: 60,
  BRIGHTNESS_MAX: 100,
};

// Color constants
export const COLORS = {
  PRIMARY: {
    PURPLE: 'hsl(260, 50%, 60%)',
    BLUE: 'hsl(220, 60%, 60%)',
    GRADIENT: 'linear-gradient(135deg, hsl(260, 50%, 60%), hsl(220, 60%, 60%))',
  },
  BACKGROUND: {
    DARK: 'hsl(0, 0%, 0%)',
    GRADIENT_START: 'hsla(260, 50%, 10%, 0.15)',
    GRADIENT_MID: 'hsla(240, 60%, 20%, 0.08)',
    GRADIENT_END: 'hsla(220, 40%, 15%, 0.056)',
  },
  TEXT: {
    PRIMARY: 'hsl(0, 0%, 100%)',
    SECONDARY: 'hsl(0, 0%, 80%)',
    MUTED: 'hsl(0, 0%, 60%)',
  },
};

// Responsive breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1400,
};

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  NAVBAR: 50,
  MODAL: 100,
  TOOLTIP: 200,
  SCROLL_PROGRESS: 9999,
};

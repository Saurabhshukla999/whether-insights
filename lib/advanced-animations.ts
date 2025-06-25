// Premium easing curves for sophisticated animations
export const easings = {
  // Organic, natural movements
  organic: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",

  // Smooth, professional
  smooth: "cubic-bezier(0.4, 0, 0.2, 1)",

  // Bouncy, playful
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",

  // Sharp, snappy
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)",

  // Elastic, spring-like
  elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",

  // Anticipation (slight back movement)
  anticipate: "cubic-bezier(0.175, 0.885, 0.32, 1.1)",

  // Overshoot (goes past target then settles)
  overshoot: "cubic-bezier(0.25, 0.46, 0.45, 1.2)",

  // Silk smooth
  silk: "cubic-bezier(0.23, 1, 0.32, 1)",
}

// Advanced animation configurations
export const animations = {
  // Sophisticated fade in with scale and blur
  fadeInLuxury: {
    initial: {
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      y: 30,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
    },
    transition: {
      duration: 1.2,
      ease: easings.silk,
      staggerChildren: 0.1,
    },
  },

  // Premium slide in from left
  slideInPremium: {
    initial: {
      x: -100,
      opacity: 0,
      scale: 0.9,
      rotateY: -15,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    transition: {
      duration: 1,
      ease: easings.elastic,
    },
  },

  // Sophisticated scale with rotation
  scaleRotate: {
    initial: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
    },
    transition: {
      duration: 0.8,
      ease: easings.bounce,
    },
  },

  // Morphing entrance
  morphIn: {
    initial: {
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
      opacity: 0,
    },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
      opacity: 1,
    },
    transition: {
      duration: 1.5,
      ease: easings.organic,
    },
  },

  // Floating with rotation
  floatRotate: {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      scale: [1, 1.02, 1],
    },
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: easings.organic,
    },
  },

  // Stagger container for sequential animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  },

  // Premium hover effect
  hoverLift: {
    whileHover: {
      y: -8,
      scale: 1.02,
      rotateX: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      transition: { duration: 0.3, ease: easings.smooth },
    },
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  },
}

// Sophisticated scroll animations
export const scrollAnimations = {
  parallaxSlow: (scrollY: number) => ({
    transform: `translate3d(0, ${scrollY * 0.1}px, 0) rotateX(${scrollY * 0.01}deg)`,
  }),

  parallaxMedium: (scrollY: number) => ({
    transform: `translate3d(0, ${scrollY * 0.3}px, 0) rotateY(${scrollY * 0.02}deg)`,
  }),

  parallaxFast: (scrollY: number) => ({
    transform: `translate3d(0, ${scrollY * 0.5}px, 0) scale(${1 + scrollY * 0.0001})`,
  }),
}

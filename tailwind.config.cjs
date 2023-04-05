// tailwind.config.cjs

// The following import is the path to where the component source code lives
const { ComponentsContentPath } = require("@yext/search-ui-react");

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{js,jsx}",
    // tailwind is applied to the components by adding the component path here
    ComponentsContentPath,
  ],
  theme: {
    // the default theme is extended with custom styling used by the components
    extend: {
      colors: {
        primary: "var(--primary-color, #2563eb)",
        "primary-light": "var(--primary-color-light, #dbeafe)",
        "primary-dark": "var(--primary-color-dark, #1e40af)",
        neutral: "var(--neutral-color, #4b5563)",
        "neutral-light": "var(--neutral-color-light, #9ca3af)",
        "neutral-dark": "var(--neutral-color-dark, #1f2937)",
        "brand-primary": "#579AF2",
        "brand-hover": "#3984f3",
        "brand-primary-dark": "#25559c",
        "brand-cta": "#D94A4A",
        "brand-cta-hover": "#d86c04",
      },
      borderRadius: {
        cta: "var(--cta-border-radius, 1rem)",
      },
      keyframes: {
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { transform: "rotate(0deg)", "stroke-dashoffset": 204 },
          "50%": { transform: "rotate(45deg)", "stroke-dashoffset": 52 },
          "100%": { transform: "rotate(360deg)", "stroke-dashoffset": 204 },
        },
      },
      fontFamily: {
        'sans': ["Source Sans Pro", ...defaultTheme.fontFamily.sans]
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
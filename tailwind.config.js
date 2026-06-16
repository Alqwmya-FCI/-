/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-error": "#ffffff",
        "on-surface-variant": "#475569",
        "background": "#f8fafc",
        "outline-variant": "#cbd5e1",
        "primary": "#10b981",
        "on-primary-container": "#064e3b",
        "inverse-surface": "#1e293b",
        "on-secondary-fixed": "#0f172a",
        "on-primary": "#ffffff",
        "error": "#ef4444",
        "on-secondary-fixed-variant": "#334155",
        "on-primary-fixed-variant": "#047857",
        "inverse-on-surface": "#f1f5f9",
        "surface-dim": "#e2e8f0",
        "on-tertiary": "#ffffff",
        "error-container": "#fee2e2",
        "secondary-fixed-dim": "#94a3b8",
        "primary-container": "#d1fae5",
        "secondary-container": "#e2e8f0",
        "surface-container-highest": "#cbd5e1",
        "primary-fixed": "#34d399",
        "tertiary-fixed-dim": "#cbd5e1",
        "on-primary-fixed": "#022c22",
        "on-error-container": "#7f1d1d",
        "surface-container": "#f1f5f9",
        "outline": "#94a3b8",
        "on-tertiary-fixed-variant": "#334155",
        "surface-tint": "#10b981",
        "secondary": "#64748b",
        "on-tertiary-container": "#0f172a",
        "primary-fixed-dim": "#10b981",
        "surface-container-low": "#f8fafc",
        "on-background": "#0f172a",
        "tertiary-fixed": "#e2e8f0",
        "on-secondary-container": "#0f172a",
        "tertiary-container": "#f1f5f9",
        "tertiary": "#475569",
        "secondary-fixed": "#e2e8f0",
        "inverse-primary": "#6ee7b7",
        "on-surface": "#0f172a",
        "surface-container-high": "#e2e8f0",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#f1f5f9",
        "on-tertiary-fixed": "#0f172a",
        "surface-bright": "#ffffff",
        "surface": "#ffffff",
        "on-secondary": "#ffffff",
        slate: {
          100: '#f1f5f9',
          800: '#1e293b',
          900: '#0f172a',
        },
        orange: {
          500: '#f97316',
          600: '#ea580c',
        }
      },
      borderRadius: {
          DEFAULT: "0.125rem",
          lg: "0.25rem",
          xl: "0.5rem",
          full: "0.75rem"
      },
      spacing: {
          "margin-mobile": "20px",
          "max-width": "1440px",
          "unit": "8px",
          "margin-desktop": "64px",
          "gutter": "24px"
      },
      fontFamily: {
          "headline-lg": ["Montserrat", "sans-serif"],
          "body-md": ["Inter", "sans-serif"],
          "headline-lg-mobile": ["Montserrat", "sans-serif"],
          "display-lg": ["Montserrat", "sans-serif"],
          "label-technical": ["JetBrains Mono", "monospace"],
          sans: ['Cairo', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
          "headline-lg": ["32px", { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "600" }],
          "body-md": ["16px", { lineHeight: "1.6", letterSpacing: "0em", fontWeight: "400" }],
          "headline-lg-mobile": ["24px", { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "600" }],
          "display-lg": ["64px", { lineHeight: "1.1", letterSpacing: "0.05em", fontWeight: "700" }],
          "label-technical": ["12px", { lineHeight: "1.0", letterSpacing: "0.1em", fontWeight: "500" }]
      },
      backgroundImage: {
          'grid-pattern': "linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)"
      },
      keyframes: {
          fadeInUp: {
              '0%': { opacity: '0', transform: 'translateY(20px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          breathe: {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.03)' },
          }
      },
      animation: {
          'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
          'fade-in-up-delay-1': 'fadeInUp 0.8s ease-out 0.2s forwards',
          'fade-in-up-delay-2': 'fadeInUp 0.8s ease-out 0.4s forwards',
          'breathe': 'breathe 8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}

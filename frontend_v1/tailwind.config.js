/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				custom: ["Handjet", "sans-serif"],
				customFont: ["Changa One", "sans-serif"],
				customFont2: ["Merriweather", "sans-serif"],
				customFont3: ["Rokkitt", "sans-serif"],
			},
			colors: {
				// 🎨 Custom Branding Colors
				brandPrimary: "#FBFEF9", // Bright blue for primary branding (e.g., buttons, highlights)
				brandAccent: "#7E1946", // Accent color for emphasis (e.g., call-to-action)
				brandBackground: "#0C6291", 

				// 🧱 Core Theme Tokens using CSS Variables (change via Tailwind theme or :root)
				border: "hsl(var(--border))", // Border color used for input, cards, etc.
				input: "hsl(var(--input))", // Background of input fields
				ring: "hsl(var(--ring))", // Focus ring color (on focus/hover)
				background: "hsl(var(--background))", // Default background (body/page)
				foreground: "hsl(var(--foreground))", // Default text color

				// 🟢 Primary Color (used for main actions like buttons, links, etc.)
				primary: {
					DEFAULT: "hsl(var(--primary))", // Primary color
					foreground: "hsl(var(--primary-foreground))", // Text/icon color when used on primary
				},

				// 🟡 Secondary Color (used for secondary buttons, muted elements)
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},

				// 🔴 Destructive Color (used for delete buttons, errors, etc.)
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},

				// ⚫ Muted Colors (used for disabled states, placeholders)
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},

				// 🟣 Accent Color (e.g., tags, chips, hover effects)
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},

				// 📌 Popover/Dropdown Backgrounds
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},

				// 🧾 Card Backgrounds (e.g., profile cards, job cards, etc.)
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},

			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},

				swipeIn: {
					from: { width: "0%" },
					to: { width: "100%" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				swipeIn: "swipeIn 0.5s ease-in-out forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};

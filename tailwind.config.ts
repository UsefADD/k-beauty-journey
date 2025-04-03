import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				knude: {
					50: '#FFE9EF', // Lightest blush pink
					100: '#FFE1E9', // Very light blush pink
					200: '#FFD9E3', // Light blush pink  
					300: '#FFD1DC', // Blush pink (primary)
					400: '#FFBDCD', // Medium blush pink
					500: '#FFA9BE', // Medium-dark blush pink
					600: '#FF95AF', // Dark blush pink
					700: '#FF819F', // Darker blush pink
					800: '#FF6D90', // Very dark blush pink
					900: '#FF5981', // Darkest blush pink
				},
				kblue: {
					50: '#E8F4F5', // Lightest pale blue
					100: '#DFF0F2', // Very light pale blue
					200: '#D6ECEF', // Light pale blue
					300: '#C3E4E9', // Medium-light pale blue
					400: '#B0E0E6', // Pale blue (primary)
					500: '#9DCCD3', // Medium pale blue
					600: '#8AB8C0', // Medium-dark pale blue
					700: '#77A5AD', // Dark pale blue
					800: '#64919A', // Very dark pale blue
					900: '#517E87', // Darkest pale blue
				},
				kpink: {
					50: '#FFF6E9', // Lightest peach
					100: '#FFF2DE', // Very light peach
					200: '#FFECD3', // Light peach
					300: '#FFE5B4', // Peach (primary)
					400: '#FFD89F', // Medium peach
					500: '#FFCB8A', // Medium-dark peach
					600: '#FFBE75', // Dark peach
					700: '#FFB161', // Darker peach
					800: '#FFA44C', // Very dark peach
					900: '#FF9737', // Darkest peach
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

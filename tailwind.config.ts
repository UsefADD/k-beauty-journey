
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
				// Admin interface colors
				'admin-background': 'rgb(var(--admin-background))',
				'admin-border': 'rgb(var(--admin-border))',
				'admin-primary': 'rgb(var(--admin-primary))',
				'admin-text': 'rgb(var(--admin-text))',
				'admin-muted': 'rgb(var(--admin-muted))',
				'admin-success': 'rgb(var(--admin-success))',
				'admin-warning': 'rgb(var(--admin-warning))',
				'admin-danger': 'rgb(var(--admin-danger))',
				'admin-info': 'rgb(var(--admin-info))',
				cream: {
					50: '#FBF7F3', // Lightest warm cream
					100: '#F9F3ED', // Very light warm cream
					200: '#F7EFE7', // Light warm cream  
					300: '#F4E1D2', // Warm cream (primary)
					400: '#EFD4BD', // Medium warm cream
					500: '#E9C7A8', // Medium-dark warm cream
					600: '#E3BA94', // Dark warm cream
					700: '#DEAD7F', // Darker warm cream
					800: '#D8A06A', // Very dark warm cream
					900: '#D29355', // Darkest warm cream
				},
				gray: {
					50: '#ECEBE8', // Lightest soft gray
					100: '#E5E4E0', // Very light soft gray
					200: '#DEDDDA', // Light soft gray
					300: '#D4CFC5', // Soft gray (primary)
					400: '#C5BEB2', // Medium soft gray
					500: '#B6AEA0', // Medium-dark soft gray
					600: '#A79E8D', // Dark soft gray
					700: '#988E7B', // Darker soft gray
					800: '#897E68', // Very dark soft gray
					900: '#7A6F55', // Darkest soft gray
				},
				pink: {
					50: '#F7EBEA', // Lightest muted pink
					100: '#F2E1DF', // Very light muted pink
					200: '#EED7D5', // Light muted pink
					300: '#E1AFA9', // Muted pink (primary)
					400: '#D99D96', // Medium muted pink
					500: '#D08B82', // Medium-dark muted pink
					600: '#C7796F', // Dark muted pink
					700: '#BE685C', // Darker muted pink
					800: '#B55649', // Very dark muted pink
					900: '#AC4437', // Darkest muted pink
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
			boxShadow: {
				'admin-card': 'var(--admin-card)',
			},
			fontFamily: {
				sans: ['DM Sans', 'sans-serif'],
				serif: ['Open Sans', 'serif'],
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
				},
				'slide-in-top': {
					'0%': {
						transform: 'translateY(-100%)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'slide-in-top': 'slide-in-top 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

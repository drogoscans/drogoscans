import type { Config } from "tailwindcss";

// Definisikan konfigurasi Tailwind CSS
const config: Config = {
  darkMode: ["class"], // Mengaktifkan mode gelap dengan menggunakan class "dark"
  content: [
    // Menentukan path file yang akan diproses oleh Tailwind CSS
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: { max: "639px" }, 
      tablet: { max: "1023px" }, 
      laptop: { max: "1279px" }, 
	  desktop: "1280px", 
    },
    extend: {
      // Menambah konfigurasi untuk background image dengan gradient radial dan conic
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Menambah konfigurasi untuk border radius dengan variabel kustom
      borderRadius: {
        lg: "var(--radius)", // Border radius besar menggunakan variabel CSS
        md: "calc(var(--radius) - 2px)", // Border radius sedang dengan perhitungan dari variabel
        sm: "calc(var(--radius) - 4px)", // Border radius kecil dengan perhitungan dari variabel
      },
      // Menambah konfigurasi warna kustom
      colors: {
        black: {
          100: "#0f1431", // Warna hitam level 100
          200: "#000319", // Warna hitam level 200
        },
        background: "hsl(var(--background))", // Warna latar belakang
        foreground: "hsl(var(--foreground))", // Warna teks depan
        card: {
          DEFAULT: "hsl(var(--card))", // Warna dasar untuk kartu
          foreground: "hsl(var(--card-foreground))", // Warna teks untuk kartu
        },
        popover: {
          DEFAULT: "hsl(var(--popover))", // Warna dasar untuk popover
          foreground: "hsl(var(--popover-foreground))", // Warna teks untuk popover
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // Warna utama
          foreground: "hsl(var(--primary-foreground))", // Warna teks untuk warna utama
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Warna sekunder
          foreground: "hsl(var(--secondary-foreground))", // Warna teks untuk warna sekunder
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Warna yang diredam
          foreground: "hsl(var(--muted-foreground))", // Warna teks untuk warna yang diredam
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Warna aksen
          foreground: "hsl(var(--accent-foreground))", // Warna teks untuk warna aksen
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Warna destruktif (misal: tombol hapus)
          foreground: "hsl(var(--destructive-foreground))", // Warna teks untuk warna destruktif
        },
        border: "hsl(var(--border))", // Warna untuk border
        input: "hsl(var(--input))", // Warna untuk input
        ring: "hsl(var(--ring))", // Warna untuk ring (focus ring)
        chart: {
          "1": "hsl(var(--chart-1))", // Warna untuk chart 1
          "2": "hsl(var(--chart-2))", // Warna untuk chart 2
          "3": "hsl(var(--chart-3))", // Warna untuk chart 3
          "4": "hsl(var(--chart-4))", // Warna untuk chart 4
          "5": "hsl(var(--chart-5))", // Warna untuk chart 5
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Menambahkan plugin Tailwind untuk animasi
};
export default config;

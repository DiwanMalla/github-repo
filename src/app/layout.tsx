import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diwan Malla - Full-Stack Developer",
  description:
    "Portfolio of Diwan Malla, a passionate Full-Stack Developer building modern web applications with React, Next.js, TypeScript, and more.",
  keywords: [
    "Diwan Malla",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
  ],
  authors: [{ name: "Diwan Malla" }],
  creator: "Diwan Malla",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diwanportfolio.vercel.app/",
    title: "Diwan Malla - Full-Stack Developer",
    description:
      "Portfolio of Diwan Malla showcasing projects and skills in web development.",
    siteName: "Diwan Malla Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diwan Malla - Full-Stack Developer",
    description:
      "Portfolio of Diwan Malla showcasing projects and skills in web development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-background">
            <Header />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

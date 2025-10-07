import Image from "next/image";
import { Github, Linkedin, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/20">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Profile Image */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-foreground/10 shadow-2xl">
            <Image
              src="https://avatars.githubusercontent.com/u/49804228?v=4"
              alt="Diwan Malla"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Diwan Malla
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-6">
              Full-Stack Developer
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mb-8">
              Passionate developer building innovative web applications, mobile solutions, and modern digital experiences. 
              I specialize in React, Next.js, TypeScript, React Native, and cutting-edge technologies. 
              From AI-powered applications to modern banking platforms and e-commerce solutions, 
              I love creating products that make a difference.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://github.com/DiwanMalla"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors font-medium"
              >
                <Github size={20} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/diwan-malla-b51a79226/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors font-medium"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a
                href="https://diwanportfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors font-medium"
              >
                <Globe size={20} />
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

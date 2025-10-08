import Image from "next/image";
import { Github, Linkedin, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-[70vh] sm:min-h-[60vh] flex items-center justify-center px-4 py-12 sm:py-16 bg-gradient-to-b from-background to-muted/20 dark:from-background dark:to-muted/20">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
          {/* Profile Image */}
          <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-foreground/10 shadow-2xl flex-shrink-0">
            <Image
              src="https://avatars.githubusercontent.com/u/49804228?v=4"
              alt="Diwan Malla"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, 256px"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Diwan Malla
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
              Full-Stack Developer
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Passionate developer building innovative web applications, mobile
              solutions, and modern digital experiences. I specialize in React,
              Next.js, TypeScript, React Native, and cutting-edge technologies.
              From AI-powered applications to modern banking platforms and
              e-commerce solutions, I love creating products that make a
              difference.
            </p>

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start pt-2 sm:pt-4">
              <a
                href="https://github.com/DiwanMalla"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors font-medium text-sm sm:text-base min-h-[44px]"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/diwan-malla-b51a79226/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors font-medium text-sm sm:text-base min-h-[44px]"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://diwanportfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors font-medium text-sm sm:text-base min-h-[44px]"
              >
                <Globe size={18} />
                <span>Portfolio</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

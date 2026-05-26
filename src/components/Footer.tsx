import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-white.png"
              alt="Cornell FinTech Club"
              width={120}
              height={60}
              className="h-8 w-auto opacity-70"
            />
            <span className="text-sm text-muted">
              &copy; {new Date().getFullYear()} Cornell FinTech Club. All rights
              reserved. Built with loving hands.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:cornellfintechclub@gmail.com"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Contact
            </a>
            <a
              href="https://www.linkedin.com/company/cornell-fintech-club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/cornellfintechclub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted">
            A registered student organization of Cornell University.
            <br />
            Supported by Fintech at Cornell, an Initiative of the SC Johnson
            College of Business.
          </p>
        </div>
      </div>
    </footer>
  );
}

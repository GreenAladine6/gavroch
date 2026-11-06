import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);

    if (location.hash) {
      window.requestAnimationFrame(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [location]);

  const navLinks = [
    { to: "/", label: "ACCUEIL" },
    { to: "/menu", label: "MENU" },
    { to: "/about", label: "À PROPOS" },
    { to: "/about#contact", label: "CONTACT" },
  ];

  const isActive = (path: string) => {
    const [pathname, hash] = path.split("#");
    if (hash) return location.pathname === pathname && location.hash === `#${hash}`;
    if (pathname === "/about" && location.hash) return false;
    return pathname === "/" ? location.pathname === "/" : location.pathname.startsWith(pathname);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${!scrolled ? "theme-dark" : ""} ${
          scrolled
            ? "bg-black/95 backdrop-blur-sm border-b border-[#C9A227]/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <Logo size={44} className="shrink-0 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-bold tracking-[0.18em] text-white group-hover:text-[#C9A227] transition-colors duration-300">
                  GAVROCHE
                </span>
                <span className="text-[7px] tracking-[0.3em] text-[#C9A227] font-light mt-0.5">
                  PÂTISSERIE ITALIENNE
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[11px] tracking-[0.2em] font-medium transition-colors duration-300 relative pb-1 ${
                    isActive(link.to)
                      ? "text-[#C9A227]"
                      : "text-white/80 hover:text-[#C9A227]"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C9A227]" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <ThemeToggle />
              <a
                href="https://www.instagram.com/gavroche_tunisie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#C9A227] transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <Link
                to="/menu"
                className="text-[10px] tracking-[0.2em] font-medium px-5 py-2.5 border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-black transition-all duration-300"
              >
                NOS CRÉATIONS
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Logo size={72} className="mb-2" />
          <ThemeToggle />
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-base tracking-[0.25em] font-medium transition-colors duration-300 ${
                isActive(link.to) ? "text-[#C9A227]" : "text-white/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 h-px w-12 bg-[#C9A227]" />
          <a
            href="https://www.instagram.com/gavroche_tunisie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.2em] text-[#C9A227]"
          >
            @GAVROCHE_TUNISIE
          </a>
        </div>
      </div>
    </>
  );
}

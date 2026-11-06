import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { to: "/admin/products", label: "Produits", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { to: "/admin/categories", label: "Catégories", icon: "M4 6h16M4 12h8m-8 6h16" },
  { to: "/admin/gallery", label: "Galerie", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { to: "/admin/locations", label: "Locaux", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
  { to: "/admin/content", label: "Contenu", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  { to: "/admin/settings", label: "Paramètres", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-r border-white/10">
      {/* Brand */}
      <div className="p-5 border-b border-white/10 flex items-center gap-3">
        <Logo size={40} />
        <div>
          <div className="font-serif text-base font-bold tracking-[0.15em] text-white leading-tight">GAVROCHE</div>
          <div className="text-[6px] tracking-[0.3em] text-[#C9A227] mt-0.5">ADMINISTRATION</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-xs tracking-wider font-medium transition-all duration-200 rounded-none ${
                active
                  ? "bg-[#C9A227]/10 text-[#C9A227] border-l-2 border-[#C9A227]"
                  : "text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Public site link */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 text-xs tracking-wider text-white/30 hover:text-white/60 transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
          Voir le site
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-xs tracking-wider text-white/30 hover:text-red-400 transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-56 shrink-0">
        <div className="w-full"><Sidebar /></div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="w-56 h-full"><Sidebar /></div>
          <div className="flex-1 bg-black/60" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-[#0a0a0a] border-b border-white/10 shrink-0">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-white/60 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <h1 className="text-white font-medium text-sm tracking-widest">{title.toUpperCase()}</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="w-8 h-8 bg-[#C9A227] flex items-center justify-center">
              <span className="text-black text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

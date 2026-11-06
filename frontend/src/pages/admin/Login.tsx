import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import Logo from "../../components/Logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@gavroche.tn");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const user = login(email, password);
      if (user) {
        navigate("/admin/dashboard");
      } else {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10 flex flex-col items-center">
          <Logo size={80} className="mb-3" />
          <div className="text-[8px] tracking-[0.4em] text-[#C9A227]">ADMINISTRATION</div>
          <div className="w-8 h-px bg-[#C9A227] mx-auto mt-4" />
        </div>

        <div className="bg-[#0d0d0d] border border-white/10 p-8">
          <h2 className="text-white font-medium text-sm tracking-widest mb-8 text-center">CONNEXION</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50 transition-colors duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-[8px] tracking-[0.3em] text-[#C9A227]/70 mb-2">MOT DE PASSE</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#151515] border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#C9A227]/50 transition-colors duration-300"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 py-2 px-3">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-white/50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-[#C9A227]"
                />
                Se souvenir de moi
              </label>
              <button type="button" className="text-[#C9A227]/70 hover:text-[#C9A227] transition-colors duration-300">
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#C9A227] text-black text-[10px] tracking-[0.25em] font-semibold hover:bg-[#E8C84A] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              ) : "SE CONNECTER"}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6 tracking-wider">
          Prototype — admin@gavroche.tn / gavroche2026
        </p>
      </div>
    </div>
  );
}

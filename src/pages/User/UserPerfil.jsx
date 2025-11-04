import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  const { user, loading } = useAuth();

  // 🌀 Estado inicial de carga
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#611232] font-semibold tracking-wide">
        {loading ? "Cargando perfil..." : "Verificando información..."}
      </div>
    );
  }

  // ✅ Cuando ya hay usuario
  const profile = user.User || user;
  const initials = `${profile.name?.[0] || ""}${
    profile.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <section className="min-h-screen bg-[#F9FAFB] py-16 px-4 flex justify-center items-start">
      <div
        className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-[#e8e2dc]/60 
        rounded-2xl shadow-sm p-8 transition-all hover:shadow-md"
      >
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#611232] tracking-wide">
            Perfil del Usuario
          </h1>
        </div>

        {/* Avatar + Nombre */}
        <div className="flex flex-col items-center mb-10 gap-2">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full 
            bg-linear-to-br from-[#611232]/80 to-[#d4af37]/60 
            flex items-center justify-center 
            text-white text-3xl font-bold shadow-lg border border-[#611232]/20"
          >
            {initials}
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-[#611232] mt-3">
            {`${profile.name} ${profile.lastName}`}
          </h2>
          <p className="text-sm text-gray-600 break-all mt-1">
            {profile.email}
          </p>
        </div>

        {/* Tarjeta de información */}
        <div
          className="bg-white/70 backdrop-blur-md border border-[#e8e2dc]/60 
          rounded-xl p-6 space-y-3 shadow-inner"
        >
          <ProfileRow label="Nivel" value={`Nivel ${profile.level}`} />
          <ProfileRow
            label="Créditos completados"
            value={profile.completedCredits}
          />
          <ProfileRow
            label="Solicitudes registradas"
            value={profile.applications?.length || 0}
          />
          <ProfileRow
            label="Créditos activos"
            value={profile.credits?.length || 0}
          />
        </div>

        {/* Botón Salir */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-[#C5A572] text-[#611232] px-6 py-3 rounded-full font-semibold hover:bg-[#d4af37] transition-colors"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  );
}

// 🔹 Fila adaptable
function ProfileRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#611232]/10 py-3 last:border-none">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-[#611232]/90 mt-1 sm:mt-0">
        {value}
      </span>
    </div>
  );
}

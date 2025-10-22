import { LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function UserProfile() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#611232] font-semibold tracking-wide">
        Cargando perfil...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 font-medium">
        No se pudo cargar el perfil.
      </div>
    );
  }

  const profile = user.User || user;
  const initials = `${profile.name?.[0] || ""}${
    profile.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <section className="min-h-screen w-full flex justify-center py-20  sm:px-6 bg-transparent">
      <div
        className="w-full max-w-2xl bg-white/70 backdrop-blur-xl 
        shadow-[0_0_30px_rgba(97,18,50,0.15)] border border-[#611232]/20 
        rounded-2xl p-6 sm:p-8"
      >
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-left">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#611232] tracking-wide">
            Perfil del Usuario
          </h1>
        </div>

        {/* Avatar + Nombre */}
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="w-20  h-20 sm:w-24 sm:h-24 rounded-full bg-[#611232]/20 flex items-center justify-center text-[#611232] text-2xl sm:text-3xl font-bold border border-[#611232]/40 shadow-inner mb-3">
            {initials}
          </div>
          <h2 className="text-sm sm:text-xl font-semibold text-[#611232]">
            {`${profile.name} ${profile.lastName}`}
          </h2>
          <p className="text-xs sm:text-base text-gray-600 break-all mt-1 text-center px-4">
            {profile.email}
          </p>
        </div>

        {/* Tarjeta de información */}
        <div className="bg-gradient-to-br from-[#611232]/10 to-[#d4af37]/10 rounded-xl p-5 sm:p-6 border border-white/40 shadow-inner space-y-2 sm:space-y-3">
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
      </div>
    </section>
  );
}

// 🔹 Fila adaptable a móvil
function ProfileRow({ label, value }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-[#611232]/10 py-2 sm:py-3 last:border-none">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm font-semibold text-[#611232]/90 break-all mt-1 sm:mt-0">
        {value}
      </span>
    </div>
  );
}

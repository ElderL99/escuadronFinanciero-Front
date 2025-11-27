import { Link } from "react-router-dom";
import {
  Loader2,
  User,
  Mail,
  Shield,
  FileText,
  CreditCard,
  CheckCircle,
  XCircle,
  Search,
} from "lucide-react";
import { useState, useMemo } from "react";
import useFetchUsers from "../../../hooks/admin/useFetchUsers";

export default function AdminUsersPage() {
  const { users, loading, error } = useFetchUsers();
  const [search, setSearch] = useState("");

  // 🔍 Filtro inteligente (siempre va ANTES del return)
  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users.filter((u) =>
      `${u.name} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, users]);

  // 🚨 Ahora sí puedes hacer returns condicionales sin romper hooks
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#611232]/70">
        <Loader2 className="animate-spin mr-2" size={20} />
        Cargando usuarios...
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 py-6 ">{error}</p>;
  }

  return (
    <section className="p-4 max-w-7xl mx-auto space-y-6 w-full h-full min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#611232]">
          Gestión de Usuarios
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* 🔍 Search Input */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-300 
                         focus:ring-2 focus:ring-[#611232]/40 focus:border-[#611232] 
                         transition-all shadow-sm placeholder:text-[#611232]/70 text-sm text-[#611232]"
            />
          </div>

          <p className="text-sm text-gray-600">
            Total: <span className="font-semibold">{filteredUsers.length}</span>{" "}
            usuarios
          </p>
        </div>
      </div>

      {/* Lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No hay usuarios que coincidan con tu búsqueda.
        </p>
      )}
    </section>
  );
}

/* ==========================
    CARD COMPONENT
========================== */
function UserCard({ user }) {
  return (
    <Link
      to={`/admin/users/${user._id}`}
      className="bg-white border border-[#e6e0da] rounded-2xl shadow-sm hover:shadow-md 
                 transition-all duration-300 p-5 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-[#611232]/10 p-3 rounded-full">
          <User className="text-[#611232]" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#611232] capitalize">
            {user.name} {user.lastName}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1 break-all">
            <Mail size={14} />
            {user.email}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 text-sm">
        <InfoRow icon={Shield} label="Nivel" value={user.level || "N/A"} />
        <InfoRow
          icon={FileText}
          label="Solicitudes"
          value={user.applications?.length || 0}
        />
        <InfoRow
          icon={CreditCard}
          label="Créditos"
          value={user.credits?.length || 0}
        />
        <InfoRow
          icon={CheckCircle}
          label="Créditos completados"
          value={user.completedCredits || 0}
        />
      </div>

      {/* Estado */}
      <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-sm">
        <span className="font-medium text-gray-600">Estado:</span>
        {user.emailVerified ? (
          <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
            <CheckCircle size={14} /> Verificado
          </span>
        ) : (
          <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs">
            <XCircle size={14} /> No verificado
          </span>
        )}
      </div>
    </Link>
  );
}

/* ==========================
    InfoRow
========================== */
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600 flex items-center gap-1">
        <Icon size={14} />
        {label}:
      </span>
      <span className="font-medium text-[#611232]">{value}</span>
    </div>
  );
}

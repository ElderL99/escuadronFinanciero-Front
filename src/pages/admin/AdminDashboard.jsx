import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAdmin from "../../hooks/useAdmin";
import DashboardCard from "../../components/DashBoard/DashBoardCard";
import {
  FileText,
  CheckCircle,
  XCircle,
  PenTool,
  Zap,
  Activity,
} from "lucide-react";
import PendientesTable from "../../components/DashBoard/PendientesTable";

export default function AdminDashboard() {
  const { fetchDashboard, loading, error } = useAdmin();
  const [resumen, setResumen] = useState(null);
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchDashboard();
      if (!result) return;

      setResumen(result.data.resumen);
      setPendientes(result.data.pendientes || []);
    };
    getData();
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#611232] via-[#3e0d21] to-[#1b0510] text-white">
        <motion.p
          className="font-semibold text-lg"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Cargando dashboard...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#611232] via-[#3e0d21] to-[#1b0510] text-red-400 font-semibold">
        <p>{error}</p>
      </div>
    );
  }

  if (!resumen) return null;

  const cards = [
    {
      label: "Total de Solicitudes",
      value: resumen.total,
      Icon: FileText,
      color: "bg-[#ffcedd]/10 border border-[#ffcedd]/30 text-[#ffcedd]",
    },
    {
      label: "Rechazadas",
      value: resumen.rechazadas,
      Icon: XCircle,
      color: "bg-red-600/20 border border-red-500/30 text-red-400",
    },
    {
      label: "Esperando Firma",
      value: resumen.esperandoFirma,
      Icon: PenTool,
      color: "bg-yellow-500/20 border border-yellow-400/30 text-yellow-300",
    },
    {
      label: "Esperando Activación",
      value: resumen.esperandoActivacion,
      Icon: Zap,
      color: "bg-[#611232]/30 border border-[#ffcedd]/30 text-[#ffcedd]",
    },
    {
      label: "Activas",
      value: resumen.activas,
      Icon: Activity,
      color: "bg-emerald-600/20 border border-emerald-400/30 text-emerald-300",
    },
  ];

  // Variants para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#611232] via-[#3e0d21] to-[#1b0510] flex flex-col p-6 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center md:text-left"
      >
        <h1 className="text-4xl font-bold mb-2 tracking-wide">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-300 text-sm md:text-base">
          Resumen general del sistema
        </p>
      </motion.header>

      {/* Cards */}
      <motion.section
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-6"
        initial="hidden"
        animate="visible"
      >
        {cards.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeInUp}
            custom={i}
            className={`rounded-2xl p-4 shadow-lg backdrop-blur-md hover:scale-105 transform transition-all duration-300 ${item.color}`}
          >
            <div className="flex flex-col items-center text-center">
              <item.Icon className="size-6 mb-2" />
              <p className="text-sm font-semibold uppercase tracking-wide opacity-80">
                {item.label}
              </p>
              <p className="text-3xl font-bold mt-2">{item.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Tabla de pendientes */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="bg-white/10 backdrop-blur-md border text-center p-1 border-white/10 rounded-3xl shadow-2xl sm:p-6"
      >
        <h2 className="text-2xl font-semibold text-[#ffcedd] mb-6">
          Solicitudes Pendientes
        </h2>
        <PendientesTable
          pendientes={pendientes}
          onFiltrar={() => console.log("Filtrar clic")}
          onExportar={() => console.log("Exportar clic")}
          title="Solicitudes Pendientes"
        />
      </motion.section>
    </main>
  );
}

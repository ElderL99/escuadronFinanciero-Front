import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import ContractView from "./ContractView";

export default function ContractSignedList() {
  const { id } = useParams();
  const admin = useAdmin();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContracts = async () => {
      try {
        const data = await admin.fetchAllContracts();
        setContracts(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadContracts();
  }, []);

  console.log(contracts);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#611232] via-[#3e0d21] to-[#1b0510]">
        <motion.p
          className="text-[#ffcedd] font-medium text-lg"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Cargando contratos firmados...
        </motion.p>
      </div>
    );

  if (!contracts || contracts.length === 0)
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#611232] via-[#3e0d21] to-[#1b0510] text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-bold text-[#ffcedd] mb-2"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          No hay contratos firmados
        </motion.h2>
        <p className="text-gray-300 text-sm max-w-sm">
          Aún no se han registrado contratos
        </p>
      </motion.div>
    );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#611232] via-[#3e0d21] to-[#1b0510] p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl border border-white/10 p-6"
      >
        {/* Header */}
        <motion.header
          className="mb-6 border-b border-white/10 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-[#ffcedd]">
              Contratos Firmados
            </h1>
            <p className="text-gray-300 text-sm">
              Detalle de todos los contratos firmados por los solicitantes
            </p>
          </div>

          <div className="bg-[#ffcedd]/10 text-[#ffcedd] px-5 py-2 rounded-full text-sm font-semibold border border-[#ffcedd]/30">
            Total: {contracts.length}
          </div>
        </motion.header>

        {/* Lista animada */}
        <motion.ul
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.08 },
            },
          }}
        >
          {contracts.map((contract, i) => (
            <motion.li
              key={contract.contratoId}
              variants={fadeUp}
              custom={i}
              whileHover={{
                scale: 1.02,
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-3 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <ContractView
                contractId={contract.contratoId}
                userName={contract.usuario.nombre}
                email={contract.usuario.email}
                state={contract.estadoSolicitud}
                signedBy={contract.firmadoPor}
                signedAt={contract.firmadoEn}
                solicitudId={contract.solicitudId}
                url={contract.url}
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </main>
  );
}

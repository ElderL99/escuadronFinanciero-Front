import { motion } from "framer-motion";

export default function StepContainer({ title, children }) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-[#611232] mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}

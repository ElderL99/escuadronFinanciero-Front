import { useEffect, useState } from "react";

export default function StepContainer({ title, children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div
      key={title}
      className={`transition-all duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      <h2 className="text-xl font-semibold text-[#611232] mb-6">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

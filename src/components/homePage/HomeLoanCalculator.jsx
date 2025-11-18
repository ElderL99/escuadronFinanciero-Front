import { useEffect, useState } from "react";

export default function HomeLoanCalculator() {
  const [amount, setAmount] = useState(3000);
  const [quincenas, setQuincenas] = useState(2);
  const [availableQuincenas, setAvailableQuincenas] = useState([2, 3, 4]);
  const [rate, setRate] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [biweeklyPayment, setBiweeklyPayment] = useState(0);

  // 📊 Tasas de interés basadas en monto y plazo (sin niveles)
  const INTEREST_TABLE = {
    1: { 2: 0.07, 3: 0.09, 4: 0.1 },
    2: { 2: 0.05, 3: 0.06, 4: 0.07, 5: 0.08, 6: 0.08 },
    3: { 3: 0.04, 4: 0.05, 5: 0.06, 6: 0.07, 7: 0.07, 8: 0.07 },
  };

  const QUINCENAS_PERMITIDAS = {
    1: [2, 3, 4],
    2: [2, 3, 4, 5, 6],
    3: [3, 4, 5, 6, 7, 8],
  };

  // 🔄 Actualizar quincenas disponibles según monto
  useEffect(() => {
    let grupo;
    if (amount <= 3000) grupo = 1;
    else if (amount <= 8000) grupo = 2;
    else grupo = 3;

    setAvailableQuincenas(QUINCENAS_PERMITIDAS[grupo]);

    // Si el valor actual no está permitido, ajusta al mínimo válido
    if (!QUINCENAS_PERMITIDAS[grupo].includes(quincenas)) {
      setQuincenas(QUINCENAS_PERMITIDAS[grupo][0]);
    }
  }, [amount]);

  // 💰 Calcular total, pago y tasa
  useEffect(() => {
    if (!amount || !quincenas) return;

    let grupo;
    if (amount <= 3000) grupo = 1;
    else if (amount <= 8000) grupo = 2;
    else grupo = 3;

    const tasa = INTEREST_TABLE[grupo][quincenas] || 0.1;
    setRate(tasa);

    const total = amount + amount * tasa;
    setTotalPayment(total);
    setBiweeklyPayment(total / quincenas);
  }, [amount, quincenas]);

  return (
    <section className="flex justify-center items-center py-20 bg-[#F9FAFB] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-250 w-full">
        <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-2">
          Calculadora de Préstamo
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Calcula tu préstamo y conoce tu pago quincenal estimado
        </p>

        {/* ===== Monto ===== */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monto deseado
          </label>
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-[#611232]"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>$1,000</span>
            <span className="text-[#611232] font-semibold">
              ${amount.toLocaleString()}
            </span>
            <span>$20,000</span>
          </div>
        </div>

        {/* ===== Plazo ===== */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plazo (en quincenas)
          </label>
          <select
            value={quincenas}
            onChange={(e) => setQuincenas(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#611232] focus:border-[#611232]"
          >
            {availableQuincenas.map((q) => (
              <option key={q} value={q}>
                {q} {q === 1 ? "quincena" : "quincenas"}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Disponible para montos de ${amount.toLocaleString()}
          </p>
        </div>

        {/* ===== Resultados ===== */}
        <div className="bg-[#611232]/5 rounded-xl p-4 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">Total a pagar</p>
            <p className="text-lg font-bold text-[#611232]">
              ${totalPayment.toLocaleString()}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">Pago quincenal estimado</p>
            <p className="text-lg font-bold text-[#611232]">
              $
              {biweeklyPayment.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">Tasa aplicada</p>
            <p className="text-[#C5A572] font-semibold">
              {(rate * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

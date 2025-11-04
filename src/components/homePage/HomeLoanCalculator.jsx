import { useState, useEffect } from "react";

export default function HomeLoanCalculator() {
  const [amount, setAmount] = useState(5000);
  const [months, setMonths] = useState(1);
  const [biweeklyPayment, setBiweeklyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [rate, setRate] = useState(0);

  // Tasas de interés iguales a tu backend
  const interestRates = {
    1: 0.1,
    2: 0.1,
    3: 0.1,
    4: 0.12,
    5: 0.12,
    6: 0.12,
    7: 0.14,
    8: 0.18,
    9: 0.18,
  };

  // Calcular pago total y quincenal
  useEffect(() => {
    const rate = interestRates[months] || 0.1;
    setRate(rate);

    // Total con interés
    const total = amount + amount * rate;
    setTotalPayment(total);

    // Cada mes tiene 2 pagos quincenales
    const quincenas = months * 2;
    const biweekly = total / quincenas;
    setBiweeklyPayment(biweekly.toFixed(0));
  }, [amount, months]);

  return (
    <section className="flex justify-center items-center py-20 bg-[#F9FAFB] px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-250 w-full">
        <h2 className="text-2xl font-bold text-center text-[#1F2937] mb-2">
          Calculadora de Préstamo
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Descubre cuánto puedes solicitar y cómo se divide tu pago
        </p>

        {/* ===== Monto ===== */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monto deseado
          </label>
          <input
            type="range"
            min="500"
            max="30000"
            step="500"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full accent-[#611232]"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>$500</span>
            <span className="text-[#611232] font-semibold">
              ${amount.toLocaleString()}
            </span>
            <span>$30,000</span>
          </div>
        </div>

        {/* ===== Plazo ===== */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plazo (meses)
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-[#611232] focus:border-[#611232]"
          >
            {[...Array(9)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i + 1 === 1 ? "mes" : "meses"}
              </option>
            ))}
          </select>
        </div>

        {/* ===== Resultados ===== */}
        <div className="bg-[#611232]/5 rounded-xl p-4 mb-6 space-y-3">
          {/* Pago total */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">Total a pagar</p>
            <p className="text-lg font-bold text-[#611232]">
              ${Number(totalPayment).toLocaleString()}
            </p>
          </div>

          {/* Pago quincenal */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">Pago quincenal estimado</p>
            <p className="text-lg font-bold text-[#611232]">
              ${Number(biweeklyPayment).toLocaleString()}
            </p>
          </div>

          {/* Tasa */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-sm">Tasa de interés</p>
            <p className="text-[#C5A572] font-semibold">
              {(rate * 100).toFixed(0)}% anual
            </p>
          </div>
        </div>

        {/* ===== Botón ===== */}
        <button className="w-full bg-[#611232] text-white py-3 rounded-md font-semibold hover:bg-[#4b0f28] transition-colors">
          Solicitar Este Préstamo
        </button>
      </div>
    </section>
  );
}

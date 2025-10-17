import { Link, useParams } from "react-router-dom";

export default function ApplicationsActiveCredit({ contract }) {
  if (!contract) return null;

  const { creditoId, usuario, monto, interes, modalidad } = contract;

  const idcreditp = creditoId;

  return (
    <li className="bg-[#faf7f2] rounded-lg shadow-md p-6 border border-[#e0d2c2] hover:shadow-lg transition">
      {/* Encabezado */}
      <div className="mb-4">
        <h2 className="text-md font-bold text-[#611232]">
          Crédito #{creditoId}
        </h2>
        <p className="text-sm text-gray-600">
          Modalidad: <span className="font-medium">{modalidad}</span>
        </p>
      </div>

      {/* Usuario */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#611232] mb-1">Usuario</h3>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Nombre:</span> {usuario?.nombre}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Email:</span> {usuario?.email}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Nivel:</span> {usuario?.nivel}
        </p>
      </div>

      {/* Detalles del crédito */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#611232] mb-1">Detalles</h3>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Monto:</span> ${monto}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Interés:</span> ${interes}
        </p>
      </div>

      <Link to={`credit-detail/${creditoId}`}>Ver detalles</Link>
    </li>
  );
}

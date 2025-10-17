import { Link } from "react-router-dom";
import UserPicture from "../../../svg/userpicture.png";

export default function ContractView({
  contractId,
  userName,
  email,
  state,
  solicitudId,
}) {
  return (
    <section>
      <li className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Sección izquierda: usuario e info principal */}
        <div className="">
          <img
            src={UserPicture}
            alt={userName}
            className="size-10 rounded-full border border-gray-200"
          />
          <div>
            <h2 className="text-sm font-semibold text-[#611232] md:text-lg">
              Contrato #{contractId}
            </h2>
            <p className="text-sm text-gray-600">{userName}</p>
            <p className="text-xs text-gray-400 truncate max-w-[200px]">
              {email}
            </p>
          </div>
        </div>

        {/* Sección central: detalles */}
        <div className="grid grid-cols-1 gap-4   sm:grid-cols-1  md:grid-cols-3  lg:gap-10 text-sm text-gray-700 flex-1 ">
          <p>
            <strong className="block text-gray-500 text-xs uppercase">
              Solicitud
            </strong>
            <Link
              to={`/admin/solicitudes/${solicitudId}`}
              className="text-[#611232] font-medium underline hover:text-[#501025] break-all"
            >
              {solicitudId}
            </Link>
          </p>

          <p>
            <strong className="block text-gray-500 text-xs uppercase">
              Estado
            </strong>
            <span
              className={`inline-block mt-1 px-3 py-1 text-xs font-semibold rounded-full ${
                state === "signed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {state === "signed" ? "Firmado" : "Pendiente"}
            </span>
          </p>
        </div>

        {/* Acción */}
        <div className="flex justify-end sm:justify-center">
          <Link
            to={`/admin/contracts/${contractId}`}
            target="_blank"
            className="inline-block bg-[#611232] hover:bg-[#501025] text-white text-sm px-5 py-2 rounded-lg font-semibold shadow-sm transition-colors"
          >
            Ver Detalle
          </Link>
        </div>
      </li>
    </section>
  );
}

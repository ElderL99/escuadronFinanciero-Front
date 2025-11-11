import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "../../public/logo.jpeg";

export default function HomeFooter() {
  return (
    <footer className="bg-[#111827] text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* Logo + descripción */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={Logo}
              alt="Escuadrón Financiero"
              className="w-10 h-10 rounded-md"
            />
            <h3 className="text-white font-semibold text-lg">
              Escuadrón Financiero
            </h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Comprometidos con el bienestar financiero del sector militar
            mexicano desde 2008.
          </p>
        </div>

        {/* Servicios */}
        <div>
          <h4 className="text-white font-semibold mb-4">Servicios</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Préstamos Personales</li>
            <li>Prestamos para Emergencias</li>
          </ul>
        </div>

        {/* Soporte */}
        <div>
          <h4 className="text-white font-semibold mb-4">Soporte</h4>
          <ul className="space-y-2 flex flex-col text-sm text-gray-400 ">
            <a href="/contacto">
              <li>Centro de Ayuda</li>
            </a>
            <a href="/terms-conditions">
              <li>Términos y Condiciones</li>
            </a>
            <a href="/privacy-policy">
              <li>Privacidad</li>
            </a>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contacto</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <Phone size={16} color="#C5A572" /> +52 3351913247
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} color="#C5A572" />{" "}
              contacto@escuadronfinanciero.com
            </li>
          </ul>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © 2025 Escuadrón Financiero. Todos los derechos reservados.
      </div>
    </footer>
  );
}

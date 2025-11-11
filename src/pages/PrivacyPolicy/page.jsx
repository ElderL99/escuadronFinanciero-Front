import Logo from "../../public/logo.jpeg";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center py-16 px-6">
      {/* === Header === */}
      <div className="max-w-3xl w-full text-center mb-10">
        <a href="/">
          <img
            src={Logo}
            alt="Escuadrón Financiero"
            className="mx-auto w-20 h-20 mb-4 drop-shadow-lg"
          />
        </a>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#C5A572] tracking-tight">
          Política de Privacidad
        </h1>
        <p className="text-white/70 mt-3 max-w-xl mx-auto leading-relaxed">
          En Escuadrón Financiero protegemos tu información conforme a la Ley
          Federal de Protección de Datos Personales en Posesión de los
          Particulares.
        </p>
      </div>

      {/* === Content === */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-4xl text-left space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            1. Responsable del tratamiento de datos
          </h2>
          <p className="text-white/80">
            Escuadrón Financiero (en adelante, “la Empresa”) es responsable del
            tratamiento de los datos personales que nos proporciones, ya sea de
            manera directa, indirecta o por medios electrónicos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            2. Datos personales que recopilamos
          </h2>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li>Nombre completo, edad y datos de contacto.</li>
            <li>Identificación oficial e información laboral.</li>
            <li>
              Datos financieros y bancarios necesarios para procesar créditos.
            </li>
            <li>Documentos y comprobantes enviados por el usuario.</li>
          </ul>
          <p className="text-white/70 mt-2">
            Estos datos se recopilan exclusivamente con fines de evaluación y
            formalización de préstamos personales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            3. Finalidades del tratamiento
          </h2>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li>
              Verificar la identidad y capacidad crediticia del solicitante.
            </li>
            <li>Formalizar contratos de préstamo con interés.</li>
            <li>Procesar pagos y depósitos.</li>
            <li>Cumplir con obligaciones legales y fiscales.</li>
            <li>
              Contactar al usuario respecto al estatus de su solicitud o crédito
              activo.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            4. Protección y seguridad
          </h2>
          <p className="text-white/80">
            Implementamos medidas de seguridad administrativas, técnicas y
            físicas para proteger tu información contra pérdida, alteración o
            acceso no autorizado. Todos los documentos se almacenan en
            servidores con cifrado y acceso controlado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            5. Transferencia de datos
          </h2>
          <p className="text-white/80">
            Tus datos no serán compartidos con terceros, salvo:
          </p>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li>Por requerimiento de autoridad competente.</li>
            <li>
              Para el cumplimiento de obligaciones legales o contractuales.
            </li>
            <li>
              Con proveedores de servicios que cumplan con medidas de seguridad
              equivalentes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            6. Derechos ARCO
          </h2>
          <p className="text-white/80">
            Tienes derecho a acceder, rectificar, cancelar u oponerte al uso de
            tus datos personales enviando una solicitud a:
          </p>
          <p className="text-[#C5A572] font-medium mt-1">
            contacto@escuadronfinanciero.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            7. Conservación de datos
          </h2>
          <p className="text-white/80">
            Los datos se conservarán únicamente durante el tiempo necesario para
            cumplir con las finalidades descritas y conforme a la legislación
            aplicable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            8. Modificaciones a esta política
          </h2>
          <p className="text-white/80">
            Nos reservamos el derecho de modificar o actualizar esta Política de
            Privacidad. Cualquier cambio será publicado en este mismo apartado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            9. Aceptación
          </h2>
          <p className="text-white/80">
            Al usar nuestros servicios o firmar un contrato digital, el usuario
            manifiesta su conformidad con los términos de esta Política de
            Privacidad.
          </p>
        </section>
      </div>

      {/* === Footer link === */}
      <p className="text-white/50 text-xs mt-10">
        © {new Date().getFullYear()} Escuadrón Financiero. Todos los derechos
        reservados.
      </p>
    </section>
  );
}

import Logo from "../../public/logo.jpeg";

export default function TermsConditions() {
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
          Términos y Condiciones
        </h1>
        <p className="text-white/70 mt-3 max-w-xl mx-auto leading-relaxed">
          Estos Términos y Condiciones regulan el uso de los servicios ofrecidos
          por Escuadrón Financiero a través de su plataforma digital.
        </p>
      </div>

      {/* === Content === */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-4xl text-left space-y-6 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            1. Aceptación de los términos
          </h2>
          <p className="text-white/80">
            Al acceder, registrarte o utilizar nuestros servicios, aceptas haber
            leído, comprendido y estar de acuerdo con estos Términos y
            Condiciones, así como con nuestra Política de Privacidad.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            2. Objeto del servicio
          </h2>
          <p className="text-white/80">
            Escuadrón Financiero ofrece préstamos personales con interés,
            gestionados de manera transparente y segura a través de su
            plataforma digital. El usuario (Mutuario) podrá solicitar un crédito
            conforme a las políticas internas y niveles de acceso establecidos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            3. Registro y veracidad de la información
          </h2>
          <p className="text-white/80">
            El usuario deberá proporcionar información veraz, actual y
            comprobable durante su registro y en todo el proceso de solicitud de
            crédito. Cualquier falsedad podrá derivar en la cancelación
            inmediata del servicio y en acciones legales correspondientes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            4. Contratación y firma digital
          </h2>
          <p className="text-white/80">
            Una vez aprobada la solicitud, el usuario formalizará su crédito
            mediante un **Contrato de Mutuo con Interés**, que será firmado
            electrónicamente. Dicha firma digital tendrá plena validez legal y
            producirá los mismos efectos que la firma autógrafa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            5. Condiciones del préstamo
          </h2>
          <ul className="list-disc list-inside text-white/80 space-y-1">
            <li>
              El monto, tasa de interés y plazo serán establecidos en el
              contrato individual.
            </li>
            <li>
              Los pagos se realizarán de manera quincenal o mensual, según lo
              acordado.
            </li>
            <li>
              El usuario se compromete a cumplir puntualmente con sus
              obligaciones de pago.
            </li>
            <li>
              El incumplimiento podrá generar intereses moratorios o sanciones
              establecidas en el contrato.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            6. Uso de la plataforma
          </h2>
          <p className="text-white/80">
            El usuario se compromete a utilizar la plataforma únicamente para
            los fines permitidos y a no realizar actos que puedan dañar,
            deshabilitar o afectar la operatividad del sistema. Escuadrón
            Financiero se reserva el derecho de suspender cuentas por uso
            indebido.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            7. Propiedad intelectual
          </h2>
          <p className="text-white/80">
            Todo el contenido del sitio, incluyendo logotipos, textos, diseños,
            software y material gráfico, pertenece a Escuadrón Financiero y está
            protegido por las leyes de propiedad intelectual. Queda prohibida su
            reproducción total o parcial sin autorización expresa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            8. Protección de datos personales
          </h2>
          <p className="text-white/80">
            El tratamiento de los datos personales se realiza conforme a nuestra{" "}
            <a
              href="/privacy-policy"
              className="text-[#C5A572] hover:underline font-medium"
            >
              Política de Privacidad
            </a>
            , y en cumplimiento de la Ley Federal de Protección de Datos
            Personales en Posesión de los Particulares.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            9. Jurisdicción
          </h2>
          <p className="text-white/80">
            Para la interpretación y cumplimiento de estos Términos y del
            Contrato de Mutuo, las partes se someten expresamente a las leyes y
            tribunales competentes del Estado de Jalisco, México, renunciando a
            cualquier otro fuero que pudiera corresponderles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            10. Modificaciones
          </h2>
          <p className="text-white/80">
            Escuadrón Financiero podrá modificar los presentes Términos y
            Condiciones en cualquier momento. Las modificaciones serán
            notificadas y publicadas en esta misma página con la fecha de
            actualización correspondiente.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#C5A572] mb-2">
            11. Contacto
          </h2>
          <p className="text-white/80">
            Para cualquier duda o aclaración respecto a estos Términos y
            Condiciones, puedes comunicarte al correo:
          </p>
          <p className="text-[#C5A572] font-medium mt-1">
            contacto@escuadronfinanciero.com
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

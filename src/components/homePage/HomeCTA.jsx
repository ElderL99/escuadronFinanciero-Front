export default function HomeCTA() {
  return (
    <section className="bg-linear-to-r from-[#611232] to-[#7a1b3a] text-white py-20 px-6 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        {/* Título */}
        <h2 className="text-3xl font-bold">¿Listo para Tu Préstamo?</h2>

        {/* Subtítulo */}
        <p className="text-white/90 leading-relaxed max-w-lg">
          Únete a miles de militares que ya confían en nosotros. Proceso 100%
          digital y respuesta en menos de 24 horas.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="bg-[#C5A572] text-[#611232] font-semibold px-6 py-3 rounded-md hover:bg-[#d4af37] transition-colors">
            Solicitar Ahora
          </button>
          <button className="border border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-colors">
            Hablar con Asesor
          </button>
        </div>
      </div>
    </section>
  );
}

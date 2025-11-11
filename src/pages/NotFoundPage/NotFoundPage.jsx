export default function NotFoundPage() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center text-center 
      bg-linear-to-br from-[#611232] via-[#3b0d1f] to-[#0f0609] text-white 
      px-6 py-12 relative overflow-hidden"
    >
      {/* Efecto decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_70%)]" />

      {/* Contenido */}
      <div className="z-10 flex flex-col items-center space-y-6">
        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight text-[#d4af37] drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white/90">
          Página no encontrada
        </h2>
        <p className="max-w-md text-white/70 text-base sm:text-lg">
          La ruta que ingresaste no existe o fue movida. Regresa al inicio y
          continúa con tu sesión.
        </p>

        <a
          href="/"
          className="mt-6 px-6 py-3 rounded-full font-medium text-white 
          bg-linear-to-r from-[#d4af37] to-[#b9942d] hover:opacity-90 
          transition-all shadow-lg hover:shadow-xl"
        >
          Volver al inicio
        </a>
      </div>

      {/* Sello visual */}
      <p className="absolute bottom-6 text-xs text-white/40 tracking-wide">
        Escuadrón Financiero © {new Date().getFullYear()}
      </p>
    </section>
  );
}

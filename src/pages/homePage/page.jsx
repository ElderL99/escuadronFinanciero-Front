import Logo from "../../public/logo.jpeg";
import Army from "../../public/army.png";
import { ChartNoAxesGantt, BadgeDollarSign, Home, Menu, X } from "lucide-react";
import { HomeWhyUs } from "../../components/homePage/HomeWhyUs";
import HomeOurProduct from "@/components/homePage/HomeOurProduct";
import HomeLoanCalculator from "@/components/homePage/HomeLoanCalculator";
import HomeTestimonials from "@/components/homePage/HomeTestimonials";
import HomeCTA from "@/components/homePage/HomeCTA";
import HomeFooter from "@/components/homePage/HomeFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Importar navegación

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // 👈 Hook de navegación

  // 🔹 Servicios dinámicos
  const services = [
    {
      title: "Préstamos Personales",
      description:
        "Desde $10,000 hasta $500,000 pesos con tasas preferenciales para personal militar activo y retirado.",
      Icon: BadgeDollarSign,
      bgColor: "#611232",
      textColor: "white",
      items: [
        "Tasa fija desde 12% anual",
        "Plazos hasta 60 meses",
        "Sin comisiones ocultas",
      ],
    },
    {
      title: "Créditos Hipotecarios",
      description:
        "Financiamiento para la compra de vivienda con condiciones especiales para militares.",
      Icon: Home,
      bgColor: "#C5A572",
      textColor: "#611232",
      items: [
        "Hasta 95% de financiamiento",
        "Plazos hasta 25 años",
        "Tasas competitivas",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* 🔹 Navbar fija */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/30 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
          {/* Logo */}
          <section
            className="flex justify-center items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} className="w-10 h-10 rounded-md" alt="logo" />
            <h1 className="text-lg text-[#611232] font-bold">
              Escuadrón Financiero
            </h1>
          </section>

          {/* Botones Desktop */}
          <section className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-semibold text-[#611232] border border-[#611232] px-4 py-2 rounded-lg hover:bg-[#611232] hover:text-white transition-colors"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/register")}
              className="text-sm font-semibold text-white bg-[#611232] px-4 py-2 rounded-lg hover:bg-[#7a1b3a] transition-colors"
            >
              Crear una cuenta
            </button>
            <button
              onClick={() => navigate("/user/create-solicitud")}
              className="bg-[#C5A572] text-[#611232] px-4 py-2 rounded-lg font-semibold hover:bg-[#d4af37] transition-colors"
            >
              Solicita tu Crédito
            </button>
          </section>

          {/* Botón Hamburguesa Móvil */}
          <button
            className="lg:hidden p-2 rounded-md bg-[#611232]/20 backdrop-blur-sm border border-[#611232]/30 hover:bg-[#611232]/40 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={26} color="#611232" />
            ) : (
              <Menu size={26} color="#611232" />
            )}
          </button>
        </div>

        {/* Menú desplegable Móvil */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/60 backdrop-blur-md shadow-lg flex flex-col items-center gap-4 py-6 z-20 transition-all duration-300">
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="text-sm font-semibold text-[#611232] border border-[#611232] px-5 py-2 rounded-lg hover:bg-[#611232] hover:text-white transition-colors"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => {
                navigate("/register");
                setMenuOpen(false);
              }}
              className="text-sm font-semibold text-white bg-[#611232] px-5 py-2 rounded-lg hover:bg-[#7a1b3a] transition-colors"
            >
              Crear una cuenta
            </button>
            <button
              onClick={() => {
                navigate("/user/create-solicitud");
                setMenuOpen(false);
              }}
              className="bg-[#C5A572] text-[#611232] px-5 py-2 rounded-lg font-semibold hover:bg-[#d4af37] transition-colors"
            >
              Solicita tu Crédito
            </button>
          </div>
        )}
      </nav>

      {/* 🔹 Sección principal con fondo */}
      <main>
        <section
          className="relative h-screen lg:h-290 bg-[#611232] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
          style={{ backgroundImage: `url(${Army})` }}
        >
          {/* Degradado */}
          <div className="absolute inset-0 bg-linear-to-t from-[#611232]/90 via-[#611232]/50 to-transparent"></div>

          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
              Créditos Especializados para
              <br />
              <span className="text-[#C5A572]">Militares Mexicanos</span>
            </h2>

            <p className="text-base sm:text-lg mt-4 max-w-md text-center text-white/90">
              Soluciones financieras diseñadas con honor, respeto y compromiso
              para quienes sirven a la patria.
            </p>

            <button
              onClick={() => navigate("/user/create-solicitud")}
              className="mt-8 bg-[#C5A572] px-6 py-3 rounded-full font-semibold text-[#611232] hover:bg-[#d4af37] transition-colors"
            >
              Solicitar Crédito
            </button>
          </div>
        </section>

        {/* 🔹 Sección “Por qué elegirnos” */}
        <section className="py-20 bg-white text-center px-6">
          <h3 className="text-[#611232] text-2xl font-bold mb-2">
            ¿Por qué elegirnos?
          </h3>
          <p className="text-[#4B5563] mb-10">
            Beneficios exclusivos para el sector militar
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <HomeWhyUs
              icon="percent"
              title="Tasas Preferenciales"
              description="Tasas de interés competitivas exclusivas para personal militar activo y retirado."
            />
            <HomeWhyUs
              icon="clock"
              title="Aprobación Rápida"
              description="Proceso de aprobación en menos de 24 horas con documentación mínima."
            />
            <HomeWhyUs
              icon="handshake"
              title="Confianza Total"
              description="Más de 15 años respaldando a la comunidad militar mexicana."
            />
          </div>
        </section>

        {/* 🔹 Sección “Nuestros Servicios” */}
        <section className="py-20 bg-[#F9FAFB] text-center px-6">
          <h3 className="text-[#611232] text-2xl font-bold mb-2">
            Nuestros Servicios
          </h3>
          <p className="text-[#4B5563] mb-10">
            Soluciones financieras adaptadas a cada rango y necesidad
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <HomeOurProduct key={index} {...service} />
            ))}
          </div>
        </section>

        <HomeLoanCalculator />
        <HomeTestimonials />
        <HomeCTA />
      </main>

      <footer>
        <HomeFooter />
      </footer>
    </div>
  );
}

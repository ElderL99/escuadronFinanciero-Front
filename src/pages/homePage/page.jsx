import Logo from "../../public/logo.jpeg";
import Army from "../../public/army.png";
import Bandera from "../../public/bandera.jpg";
import { BadgeDollarSign, Home, Menu, X } from "lucide-react";
import { HomeWhyUs } from "../../components/homePage/HomeWhyUs";
import HomeOurProduct from "@/components/homePage/HomeOurProduct";
import HomeLoanCalculator from "@/components/homePage/HomeLoanCalculator";
import HomeCTA from "@/components/homePage/HomeCTA";
import HomeFooter from "@/components/homePage/HomeFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppButton from "@/components/WhatsAppButton";
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const services = [
    {
      title: "Préstamos Personales",
      description:
        "Desde $1,000 hasta $20,000 pesos con tasas preferenciales para personal militar activo y retirado.",
      Icon: BadgeDollarSign,
      bgColor: "#611232",
      textColor: "white",
      items: [
        "Tasa fija desde 5% por credito",
        "Plazos cortos y flexibles",
        "Plazos quincenales",
        "Sin comisiones ocultas",
        "sin verificación de buró",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen">
      <WhatsAppButton />
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/80 shadow-[0_2px_6px_rgba(0,0,0,0.08)] backdrop-saturate-150 transition-all duration-300">
        <div className="flex justify-between items-center p-4 max-w-6xl mx-auto">
          {/* Logo */}
          <section
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => navigate("/")}
          >
            <a href="/">
              {" "}
              <img src={Logo} className="w-10 h-10 rounded-md" alt="logo" />
            </a>
            <a href="/">
              <h1 className="text-lg text-[#611232] font-bold tracking-tight">
                Escuadrón Financiero
              </h1>
            </a>
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
              Crear cuenta
            </button>
            <button
              onClick={() => navigate("/user/dashboard")}
              className="bg-[#C5A572] text-[#611232] px-4 py-2 rounded-lg font-semibold hover:bg-[#d4af37] transition-colors"
            >
              Solicita tu Crédito
            </button>
          </section>

          {/* Botón hamburguesa móvil */}
          <button
            className="lg:hidden p-2 rounded-md bg-[#611232]/10 border border-[#611232]/20 hover:bg-[#611232]/20 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X size={26} color="#611232" />
            ) : (
              <Menu size={26} color="#611232" />
            )}
          </button>
        </div>

        {/* Menú móvil */}
        <div
          className={`absolute top-full left-0 right-0 origin-top transform transition-all duration-300 ease-out ${
            menuOpen
              ? "scale-y-100 opacity-100 visible"
              : "scale-y-0 opacity-0 invisible"
          } bg-white/95 shadow-md backdrop-saturate-150 flex flex-col items-center gap-4 py-6 z-20`}
        >
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
            Crear cuenta
          </button>
          <button
            onClick={() => {
              navigate("/user/dashboard");
              setMenuOpen(false);
            }}
            className="bg-[#C5A572] text-[#611232] px-5 py-2 rounded-lg font-semibold hover:bg-[#d4af37] transition-colors"
          >
            Solicita tu Crédito
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className="relative h-150 lg:h-200 flex items-center justify-center text-center text-white">
        <img
          src={Bandera}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#611232]/95 via-[#611232]/70 to-transparent"></div>

        <div className="relative z-10 px-6">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight drop-shadow-lg">
            Créditos Especializados para <br />
            <span className="text-[#C5A572]">Militares Mexicanos</span>
          </h2>
          <p className="text-base sm:text-lg mt-4 max-w-md mx-auto text-white/90">
            Soluciones financieras diseñadas con honor, respeto y compromiso
            para quienes sirven a la patria.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <button
              onClick={() => navigate("/user/dashboard")}
              className="bg-[#C5A572] px-6 py-3 rounded-full font-semibold text-[#611232] hover:bg-[#d4af37] transition-colors"
            >
              Solicitar Crédito
            </button>

            <button
              onClick={() => navigate("/contacto")}
              className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#611232] transition-colors"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </header>

      {/* ===== SECCIONES ===== */}
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

      <section className="py-20 bg-[#F9FAFB] text-center px-6">
        <h3 className="text-[#611232] text-2xl font-bold mb-2">
          Nuestros Servicios
        </h3>
        <p className="text-[#4B5563] mb-10">
          Soluciones financieras adaptadas a cada rango y necesidad
        </p>
        <div className="grid grid-cols-1  gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <HomeOurProduct key={i} {...service} />
          ))}
        </div>
      </section>

      <HomeLoanCalculator />

      <HomeCTA />
      <HomeFooter />
    </div>
  );
}

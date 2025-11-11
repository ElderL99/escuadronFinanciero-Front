import { Mail, Phone, MapPin, Send } from "lucide-react";
import Logo from "../../public/logo.jpeg";
import { useState } from "react";
import useSendContact from "@/hooks/useSendContact";

export default function ContactPage() {
  const { sendContact, loading, success } = useSendContact();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendContact(form);
    setForm({ name: "", email: "", message: "" });
  };

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
          Contáctanos
        </h1>
        <p className="text-white/70 mt-3 max-w-xl mx-auto leading-relaxed">
          Estamos aquí para ayudarte a encontrar la mejor solución financiera.
          Envíanos un mensaje y nuestro equipo te responderá en menos de 24
          horas.
        </p>
      </div>

      {/* === Contact Section === */}
      <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 w-full max-w-4xl grid md:grid-cols-2 gap-8 transition-all duration-500">
        {/* --- Info Column --- */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-3">
            <Mail className="text-[#C5A572]" size={22} />
            <p className="text-white/80">contacto@escuadronfinanciero.com</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-[#C5A572]" size={22} />
            <p className="text-white/80">+52 33 51 91 32 47</p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-white/60">
              Horario de atención: <br />
              <span className="text-white/80 font-medium">
                Lunes a Viernes, 9:00 a 18:00 hrs
              </span>
            </p>
          </div>
        </div>

        {/* --- Form Column --- */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white/5 rounded-xl p-6 shadow-inner border border-white/10"
        >
          <label className="flex flex-col text-sm text-white/80">
            Nombre completo
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej. Juan Pérez"
              className="mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C5A572]"
            />
          </label>

          <label className="flex flex-col text-sm text-white/80">
            Correo electrónico
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ej. juanperez@gmail.com"
              className="mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C5A572]"
            />
          </label>

          <label className="flex flex-col text-sm text-white/80">
            Mensaje
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              rows="4"
              className="mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#C5A572] resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 flex items-center justify-center gap-2 font-semibold py-2 rounded-lg transition-all ${
              loading
                ? "bg-[#C5A572]/60 cursor-not-allowed"
                : "bg-[#C5A572] hover:bg-[#d4af37] text-[#611232]"
            }`}
          >
            <Send size={18} />
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>

          {success && (
            <p className="text-green-400 text-sm mt-2 text-center animate-fade-in">
              ✅ Tu mensaje ha sido enviado correctamente.
            </p>
          )}
        </form>
      </div>

      {/* === Footer link === */}
      <p className="text-white/50 text-xs mt-10">
        © {new Date().getFullYear()} Escuadrón Financiero. Todos los derechos
        reservados.
      </p>
    </section>
  );
}

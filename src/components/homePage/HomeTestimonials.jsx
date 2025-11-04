import { Star } from "lucide-react";

export default function HomeTestimonials() {
  const testimonials = [
    {
      name: "Capitán José Hernández",
      branch: "Ejército Mexicano",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "El proceso fue transparente desde el inicio. Sin sorpresas ni letra pequeña. Exactamente lo que necesitaba para mi familia.",
      rating: 5,
    },
    {
      name: "Mayor Ana Rodríguez",
      branch: "Fuerza Aérea",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "Comprenden las necesidades del personal militar. El trato fue profesional y los términos justos. Totalmente recomendable.",
      rating: 5,
    },
    {
      name: "Sargento Carlos Méndez",
      branch: "Marina Armada",
      photo: "https://randomuser.me/api/portraits/men/48.jpg",
      review:
        "Rápido, eficiente y honesto. Obtuve mi préstamo en menos de una semana con una tasa excelente. Gracias por el apoyo.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-[#F9FAFB] text-center px-6">
      <h3 className="text-[#1F2937] text-2xl font-bold mb-2">Testimonios</h3>
      <p className="text-gray-500 mb-10">
        La confianza de nuestros clientes nos respalda
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left flex flex-col items-start hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.photo}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-[#1F2937]">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.branch}</p>
              </div>
            </div>

            <p className="text-gray-600 italic mb-4">"{t.review}"</p>

            <div className="flex gap-1 mt-auto">
              {[...Array(t.rating)].map((_, idx) => (
                <Star key={idx} size={18} fill="#C5A572" stroke="#C5A572" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

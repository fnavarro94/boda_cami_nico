import React, { useEffect, useState } from "react";
import img1 from "../img1.jpeg";
import img2 from "../img2.jpeg";

// Camila & Nicolas — Wedding One‑Pager (romantic look)
// - TailwindCSS expected
// - No app-like header/nav; soft, centered sections with pastel backgrounds
// - RSVP opens an inline modal with your Google Form (and has a fallback link)

// Palette (sage + blush + cream)
const COLORS = {
  sage: "#9FB690",
  blush: "#F6E7EA",
  cream: "#FAF8F5",
  ink: "#2F2A2A",
};

const DATA = {
  couple: "Camila & Nicolas",
  dateLong: "21 de Febrero del 2026",
  cityCountry: "Quito, Ecuador",
  rsvpUrl:
    "https://docs.google.com/forms/d/e/FORM_ID_HERE/viewform?embedded=true", // ← replace FORM_ID_HERE with your own Google Form ID
  countdownTarget: new Date("2026-02-21T15:30:00-05:00"), // 3:30 PM
  events: [
    {
      title: "Cóctel de Bienvenida",
      datetime: "Jueves, 19 de febrero, 6:00 PM",
      venue: "Carlota Sustainable Design Hotel — Centro de Quito",
      dress: "Semi formal",
      mapUrl: "https://maps.app.goo.gl/ACnnesyAmbugREqT7",
    },
    {
      title: "Ceremonia Religiosa",
      datetime: "Sábado, 21 de febrero",
      venue: "Hacienda Napoles, Quito, Ecuador",
      mapUrl: "https://maps.app.goo.gl/ZeeWC5WmCbdqBkPR7",
      schedule: [
        { t: "3:30 PM", label: "Ceremonia" },
        { t: "5:00 PM", label: "Cóctel" },
        { t: "6:30 PM", label: "Cena" },
        { t: "9:00 PM", label: "Fiesta" },
      ],
    },
  ],
  stay: {
    hotels: [
      {
        name: "Carlota Sustainable Design Hotel",
        area: "Centro Histórico",
        url: "https://hotelcarlota.com/",
        map: "https://maps.app.goo.gl/ACnnesyAmbugREqT7",
      },
      {
        name: "Casa Gangotena",
        area: "Plaza San Francisco",
        url: "https://www.casagangotena.com/",
        map: "https://maps.app.goo.gl/6vZtjh5dYv4wCk8Y6",
      },
      {
        name: "JW Marriott Quito",
        area: "La Carolina",
        url: "https://www.marriott.com/en-us/hotels/uiojw-jw-marriott-hotel-quito/overview/",
        map: "https://maps.app.goo.gl/6K7jKfUuQd8s7uF28",
      },
    ],
    groups: {
      label: "Airbnb / Casas para grupos",
      url: "https://www.airbnb.com/s/Quito--Ecuador/homes?adults=2&place_id=ChIJvQz5Tj1h1ZERnG5q4KQxZxY",
    },
  },
  guide: {
    sections: [
      {
        title: "Gastronomía",
        items: [
          { name: "Zazu", desc: "Alta cocina quiteña contemporánea.", url: "https://maps.app.goo.gl/9g2d7AqW6Sopq9r47" },
          { name: "Casa Gangotena Rooftop", desc: "Vista histórica de la Plaza San Francisco.", url: "https://maps.app.goo.gl/FZgZkA2L2wV4o9tw7" },
          { name: "Nuema", desc: "Propuesta de autor con ingredientes andinos.", url: "https://maps.app.goo.gl/W6q9V7pKk4iD3oYh9" },
        ],
      },
      {
        title: "Cafés/Brunch",
        items: [
          { name: "Isveglio / Botanica", desc: "Café de especialidad y brunch.", url: "https://maps.app.goo.gl/LxVwSxq2iJk7bR9c6" },
          { name: "Galletti", desc: "Tostadores locales.", url: "https://maps.app.goo.gl/i1h7b6m7pXyG1o7G9" },
        ],
      },
      {
        title: "Bares & Rooftops",
        items: [
          { name: "Bandido Brewing", desc: "Cervecería artesanal en el Centro.", url: "https://maps.app.goo.gl/5Xkqkqk7uK8pL1Ya8" },
          { name: "Sirka", desc: "Bar y música en vivo.", url: "https://maps.app.goo.gl/3f5fSy5W4c2xQ9kC9" },
        ],
      },
      {
        title: "Turismo",
        items: [
          { name: "Mitad del Mundo", desc: "El famoso paralelo 0°.", url: "https://maps.app.goo.gl/3T1QNRj8r6pTwNtk9" },
          { name: "Centro Histórico", desc: "Patrimonio de la Humanidad — iglesias, plazas, museos.", url: "https://maps.app.goo.gl/f8eB4SxWf8rQ8hwg7" },
          { name: "Cotopaxi / Quilotoa (full day)", desc: "Excursiones andinas imperdibles.", url: "https://maps.app.goo.gl/5eQn9mY3tCk9bmsS6" },
        ],
      },
    ],
  },
  faq: [
    { q: "¿Cómo es el clima en febrero?", a: "Templado durante el día (18–22°C) y fresco en la noche. Recomendamos abrigo ligero para la noche." },
    { q: "¿Cómo llego desde el aeropuerto?", a: "Uber y taxis autorizados están disponibles. Podemos coordinar un transfer — escríbenos por WhatsApp para contacto." },
    { q: "Código de vestimenta", a: "Semi formal para el cóctel de bienvenida. Para la ceremonia y cena, elegante cóctel." },
  ],
  gifts: {
    text: "El mejor regalo es su presencia. Si desean contribuir, estos son nuestros datos:",
    accounts: [
      { bank: "Banco Pichincha", holder: "Camila Apellido", number: "XXXX-XXXX-XXXX" },
      { bank: "Banco Guayaquil", holder: "Nicolas Apellido", number: "YYYY-YYYY-YYYY" },
    ],
    funds: [{ label: "Fondo Luna de Miel", url: "#" }],
  },
  noteLater:
    "Habrá otra ronda de confirmaciones cerca de la fecha para coordinar transporte desde los hoteles y restricciones alimenticias.",
};

function useCountdown(targetDate) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds };
}

function SectionTitle({ over, main }) {
  return (
    <div className="text-center">
      {over && (
        <div className="uppercase tracking-[0.3em] text-stone-500 text-xs">{over}</div>
      )}
      <h2 className="font-antiga text-4xl md:text-5xl tracking-wide mt-2 text-stone-800">
        {main}
      </h2>
    </div>
  );
}

function FloralDivider() {
  return (
    <div className="relative my-10">
      <div className="h-px bg-stone-200" />
      <div className="absolute inset-0 -top-3 flex justify-center">
        <span className="px-3 rounded-full bg-white border border-stone-200" style={{ color: COLORS.sage }}>✿</span>
      </div>
    </div>
  );
}

function RSVPModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-medium">Confirmar asistencia</div>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-800">✕</button>
        </div>
        <div className="h-[75vh]">
          <iframe
            title="RSVP"
            src={DATA.rsvpUrl}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
        <div className="px-4 py-3 text-sm text-stone-500">
          Si el formulario no carga, <a href={DATA.rsvpUrl} target="_blank" rel="noreferrer" className={`underline`} style={{color: COLORS.sage}}>ábrelo en una pestaña</a>.
        </div>
      </div>
    </div>
  );
}

function Header({ onOpenRSVP }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Inicio", href: "#home" },
    { label: "Itinerario", href: "#itinerario" },
    { label: "Hospedaje", href: "#hospedaje" },
    { label: "Guía", href: "#guia" },
    { label: "FAQ", href: "#faq" },
    { label: "Regalos", href: "#regalos" },
  ];
  return (
    <header className="sticky top-0 z-40 transition-colors">
      <div
        className={
          scrolled
            ? "backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-stone-200"
            : "backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/30 border-b border-white/50"
        }
      >
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex items-center justify-center gap-1 py-3 overflow-x-auto">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={
                  scrolled
                    ? "px-3 py-1.5 text-sm rounded-full hover:bg-stone-100 text-stone-700"
                    : "px-3 py-1.5 text-sm rounded-full hover:bg-white/40 text-stone-800"
                }
              >
                {l.label}
              </a>
            ))}
            <span className={scrolled ? "mx-2 text-stone-300" : "mx-2 text-stone-400"}>|</span>
            <button
              onClick={onOpenRSVP}
              className={
                scrolled
                  ? "px-3 py-1.5 text-sm rounded-full border border-stone-300 hover:bg-stone-50 text-stone-800"
                  : "px-3 py-1.5 text-sm rounded-full border border-stone-300 hover:bg-white/40 text-stone-800"
              }
            >
              RSVP
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function WeddingSite() {
  const { days, hours, minutes, seconds } = useCountdown(DATA.countdownTarget);
  const [openRSVP, setOpenRSVP] = useState(false);

  return (
    <div className="min-h-screen bg-white text-stone-800">
      <Header onOpenRSVP={() => setOpenRSVP(true)} />
      {/* HERO */}
      <section id="home" className="relative scroll-mt-24">
        <div className="h-[78vh] md:h-[82vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(${img1})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-white/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-6 pb-12 text-center">
            <h1 className="font-antiga text-5xl md:text-7xl tracking-wide">{DATA.couple}</h1>
            <p className="mt-2 md:mt-3 text-lg md:text-xl text-stone-700">
              {DATA.dateLong} · {DATA.cityCountry}
            </p>

            {/* Countdown (soft) */}
            <div className="mt-6 flex items-center justify-center gap-4 text-stone-700">
              {[
                { l: "Días", v: days },
                { l: "Horas", v: hours },
                { l: "Min", v: minutes },
                { l: "Seg", v: seconds },
              ].map((b) => (
                <div key={b.l} className="text-center">
                  <div className="text-3xl font-semibold tabular-nums">{String(b.v).padStart(2, "0")}</div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-500">{b.l}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button onClick={() => setOpenRSVP(true)} className="px-8 py-3 rounded-full shadow-md hover:opacity-95 transition-all" style={{ backgroundColor: COLORS.sage, color: "white" }}>
                RSVP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ITINERARIO (blush) */}
      <section id="itinerario" className="relative py-16 md:py-24 scroll-mt-24 bg-center bg-cover" style={{ backgroundImage: `url(${img2})` }}>
        <div className="absolute inset-0 bg-white/70" />
        <div className="relative max-w-4xl mx-auto px-6">
          <SectionTitle over="ITINERARIO" main="Let the party begin" />
          <div className="mt-10 space-y-10 text-center">
            {DATA.events.map((ev) => (
              <div key={ev.title}>
                <h3 className="font-antiga text-2xl md:text-3xl">{ev.title}</h3>
                <p className="mt-1 text-stone-600">{ev.datetime}</p>
                <p className="mt-1">{ev.venue}</p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  {ev.mapUrl && (
                    <a href={ev.mapUrl} target="_blank" rel="noreferrer" className="px-5 py-2 rounded-full border border-stone-300 hover:bg-white">Cómo llegar</a>
                  )}
                  {ev.dress && <span className="text-sm text-stone-600">Dress code: {ev.dress}</span>}
                </div>
                {ev.schedule && (
                  <div className="mt-6">
                    <div className="mx-auto max-w-xl">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                        {ev.schedule.map((s) => (
                          <div key={s.t} className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.sage }} />
                            <div className="mt-2 font-medium">{s.t}</div>
                            <div className="text-xs uppercase tracking-widest text-stone-500">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <FloralDivider />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOSPEDAJE (cream) */}
      <section id="hospedaje" className="py-16 md:py-24 scroll-mt-24" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionTitle over="HOSPEDAJE" main="Hoteles sugeridos" />
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {DATA.stay.hotels.map((h) => (
              <div key={h.name} className="py-5 px-4 rounded-full border border-stone-300 bg-white/90">
                <div className="font-medium">{h.name}</div>
                <div className="text-xs text-stone-500">{h.area}</div>
                <div className="mt-3 flex justify-center gap-2 text-sm">
                  <a href={h.url} target="_blank" rel="noreferrer" className="underline">Book</a>
                  <span>·</span>
                  <a href={h.map} target="_blank" rel="noreferrer" className="underline">Mapa</a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <a href={DATA.stay.groups.url} target="_blank" rel="noreferrer" className="px-6 py-2 rounded-full border border-stone-300 bg-white/90">{DATA.stay.groups.label}</a>
          </div>
        </div>
      </section>

      {/* GUÍA (white) */}
      <section id="guia" className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionTitle over="RECOMMENDATIONS" main="Guía de Quito" />
          <div className="mt-10 space-y-10 text-left">
            {DATA.guide.sections.map((sec) => (
              <div key={sec.title}>
                <h3 className="font-antiga text-2xl text-stone-800 text-center">{sec.title}</h3>
                <ul className="mt-4 space-y-3 max-w-2xl mx-auto">
                  {sec.items.map((it) => (
                    <li key={it.name} className="leading-relaxed">
                      <span className="font-medium">{it.name}</span> — {it.desc} {" "}
                      <a href={it.url} className="underline" target="_blank" rel="noreferrer">Ver</a>
                    </li>
                  ))}
                </ul>
                <FloralDivider />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (white) */}
      <section id="faq" className="py-16 md:py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionTitle over="FAQ" main="Preguntas Frecuentes" />
          <div className="mt-8 text-left space-y-6">
            {DATA.faq.map((f, i) => (
              <div key={i}>
                <div className="font-medium">{f.q}</div>
                <p className="text-stone-700 mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGALOS (sage tint) */}
      <section id="regalos" className="py-16 md:py-24 scroll-mt-24" style={{ backgroundColor: "#EFF5EF" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <SectionTitle over="REGALOS" main="Su presencia es el mejor regalo" />
          <p className="mt-4 text-stone-700">{DATA.gifts.text}</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/90 rounded-2xl p-6 border border-stone-200 text-left">
              <h4 className="font-antiga text-lg mb-2">Cuentas bancarias</h4>
              <ul className="space-y-1 text-sm">
                {DATA.gifts.accounts.map((a) => (
                  <li key={a.bank}><span className="font-semibold">{a.bank}</span>: {a.holder} — {a.number}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/90 rounded-2xl p-6 border border-stone-200 text-left">
              <h4 className="font-antiga text-lg mb-2">Fondos</h4>
              <ul className="space-y-1 text-sm">
                {DATA.gifts.funds.map((f) => (
                  <li key={f.label}><a href={f.url} target="_blank" rel="noreferrer" className="underline">{f.label}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NOTE + FOOTER */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-stone-700">{DATA.noteLater}</p>
          <div className="mt-6 text-xs text-stone-500">Hecho con ♥ para invitados internacionales — {DATA.couple}</div>
        </div>
      </section>

      <RSVPModal open={openRSVP} onClose={() => setOpenRSVP(false)} />
    </div>
  );
}

import { useState, useEffect } from "react";
import Hero from "../home/Hero";
import Projects from "../home/Projects";
import Tech from "../home/Tech";
import ScrollZoomHero from "../components/ScrollZoomHero";
import ScrollHorizontal from "../components/ScrollHorizontal";
import CommandK from "../components/CommandK";
import GithubActivity from "../components/GithubActivity";
import ApiDocsEmbed from "../components/ApiDocsEmbed";
import Copy from "../assets/copy.svg";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function Homepage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden">
      <CommandK />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-5 md:py-4">
          <a href="#top" className="text-sm md:text-base font-semibold tracking-tight">
            Juna<span className="hidden sm:inline opacity-60"> ● Full-Stack Developer</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 text-sm">
            <a className="opacity-70 hover:opacity-100" href="#work">Work</a>
            <a className="opacity-70 hover:opacity-100" href="#projects">Projects</a>
            <a className="opacity-70 hover:opacity-100" href="#stack">Stack</a>
            <a className="opacity-70 hover:opacity-100" href="#playground">API</a>
            <a className="opacity-70 hover:opacity-100" href="#contact">Contact</a>
          </nav>

          {/* Mobile hint */}
          <div className="text-[10px] md:text-xs opacity-60">
            Ctrl / ⌘ K
          </div>
        </div>
      </header>

      <div id="top" />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 md:px-5 pt-6 md:pt-10">
        <Hero />

        <div className="mt-6 md:mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {[
            { k: "Focus", v: "React • APIs • UX polish" },
            { k: "Strength", v: "Shipping fast, clean architecture" },
            { k: "Style", v: "Animations that serve the story" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-[10px] md:text-xs uppercase tracking-wide opacity-60">
                {s.k}
              </div>
              <div className="mt-1 text-sm md:text-base">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scroll hero */}
      <section className="mt-6 md:mt-8">
        <ScrollZoomHero />
      </section>

      {/* Featured Work */}
      <section id="work" className="mx-auto max-w-6xl px-4 md:px-5 py-10 md:py-16">
        <ScrollHorizontal />
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 md:px-5 pb-6">
        <Projects />
      </section>

      {/* GitHub */}
      <section className="mx-auto max-w-6xl px-4 md:px-5 pb-10 md:pb-16">
        <GithubActivity username="Ms-Njuguna" limit={10} />
      </section>

      {/* API Docs */}
      <section className="mx-auto max-w-6xl px-4 md:px-5 pb-10 md:pb-16">
        <ApiDocsEmbed />
      </section>

      {/* Tech */}
      <section id="stack" className="mx-auto max-w-6xl px-4 md:px-5 py-10 md:py-16">
        <Tech />
      </section>

      {/* Playground */}
      <section id="playground" className="mx-auto max-w-6xl px-4 md:px-5 pb-10 md:pb-16">
        <ApiPlayground />
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 bg-neutral-950">
        <div className="mx-auto max-w-6xl px-4 md:px-5 py-10 md:py-14">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            Let’s build something loud (in a good way).
          </h3>

          <p className="mt-2 text-sm opacity-70 max-w-xl">
            UI, APIs, and that last 10% polish that makes products feel expensive.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-3">
            <CopyChip label="Email" value="byjuna.ke@gmail.com" />
            <CopyChip label="GitHub" value="https://github.com/Ms-Njuguna" />
            <a
              href="#top"
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-center hover:bg-white/5"
            >
              Back to top ↑
            </a>
          </div>

          <div className="mt-8 md:mt-10 text-[10px] md:text-xs opacity-50">
            Built with React + Motion + GSAP + Matter.js.
          </div>
        </div>
      </footer>
      <WhatsAppFloat />
    </main>
  );
}

function CopyChip({ label, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="relative group flex items-center gap-2 max-w-full rounded-full border border-white/15 px-3 py-2 text-xs md:text-sm hover:bg-white/5"
      type="button"
    >
      <span className="truncate max-w-40 sm:max-w-none">
        <span className="opacity-60">{label}:</span> {value}
      </span>

      <img
        alt="copy"
        src={Copy}
        className="h-4 w-4 shrink-0 opacity-60 group-hover:opacity-100"
      />

      <span
        className={`absolute -top-7 right-2 text-[10px] px-2 py-1 rounded bg-white text-black transition ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        Copied
      </span>
    </button>
  );
}

function ApiPlayground() {
  const [bookings, setBookings] = useState(null);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState({ bookings: true, products: true });
  const [error, setError] = useState({ bookings: null, products: null });

  // Reusable fetch functions
  const fetchBookings = () => {
    setLoading((prev) => ({ ...prev, bookings: true }));
    fetch("https://little-lemon-api-bdsl.onrender.com/api/bookings?date=2026-02-26")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading((prev) => ({ ...prev, bookings: false }));
      })
      .catch((err) => {
        setError((prev) => ({ ...prev, bookings: err.message }));
        setLoading((prev) => ({ ...prev, bookings: false }));
      });
  };

  const fetchProducts = () => {
    setLoading((prev) => ({ ...prev, products: true }));
    fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline&limit=3")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading((prev) => ({ ...prev, products: false }));
      })
      .catch((err) => {
        setError((prev) => ({ ...prev, products: err.message }));
        setLoading((prev) => ({ ...prev, products: false }));
      });
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchBookings();
    fetchProducts();
  }, []);

  const examples = [
    {
      title: "Bookings API (Django)",
      req: `GET /api/bookings?date=2026-02-26`,
      res: loading.bookings
        ? "Loading..."
        : error.bookings
        ? `Error: ${error.bookings}`
        : JSON.stringify(bookings, null, 2),
      note: "Swagger-first mindset: design → validate → build.",
      onRefresh: fetchBookings,
    },
    {
      title: "Products API (Public API integration)",
      req: `GET /products?brand=maybelline&limit=3`,
      res: loading.products
        ? "Loading..."
        : error.products
        ? `Error: ${error.products}`
        : JSON.stringify(
          {
            brand: "maybelline",
            items: products
              ?.slice(0, 6)
              .map((p) => ({
                name: p.name,
                price: p.price,
                image_link: p.image_link,
                product_link: p.product_link,
              })),
          },
          null,
          2
        ),
      note: "Fast UI + caching patterns + defensive error handling.",
      onRefresh: fetchProducts,
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">API playground</h2>
          <p className="mt-1 text-sm opacity-70">
            I build backends like products: predictable, documented, testable.
          </p>
        </div>
        <div className="text-xs opacity-60">
          (This is a portfolio demo wired it to my live endpoints.)
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {examples.map((e) => (
          <div key={e.title} className="min-w-0 rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">{e.title}</div>
              <button
                onClick={e.onRefresh}
                className="text-xs px-2 py-1 rounded bg-yellow-400 text-black hover:bg-yellow-300"
              >
                Refresh
              </button>
            </div>

            <div className="mt-2 text-xs opacity-60">Request</div>
            <pre className="mt-1 max-h-60 overflow-auto whitespace-pre-wrap wrap-break-word rounded-xl bg-black/40 p-3 text-[10px] md:text-xs text-neutral-100">
              {e.req}
            </pre>

            <div className="mt-2 text-xs opacity-60">Response</div>
            <pre className="mt-1 max-h-60 overflow-auto whitespace-pre-wrap wrap-break-word rounded-xl bg-black/40 p-3 text-[10px] md:text-xs text-neutral-100">
              {e.res}
            </pre>

            <div className="mt-2 text-xs opacity-70">{e.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
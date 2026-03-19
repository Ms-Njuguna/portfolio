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

export default function Homepage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <CommandK />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-neutral-950/75 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="font-semibold tracking-tight">
            Juna<span className="opacity-60"> ● Full-Stack Developer</span>
          </a>

          <nav className="hidden gap-6 text-sm md:flex">
            <a className="opacity-70 hover:opacity-100" href="#work">Work</a>
            <a className="opacity-70 hover:opacity-100" href="#projects">Projects</a>
            <a className="opacity-70 hover:opacity-100" href="#stack">Stack</a>
            <a className="opacity-70 hover:opacity-100" href="#playground">API</a>
            <a className="opacity-70 hover:opacity-100" href="#contact">Contact</a>
          </nav>

          <div className="text-xs opacity-70">
            <span className="rounded-full border border-white/15 px-2 py-1">
              Ctrl / ⌘ K
            </span>
          </div>
        </div>
      </header>

      <div id="top" />

      {/* Falling text hero (your animation) */}
      <section className="mx-auto max-w-6xl px-5 pt-10">
        <Hero />
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            { k: "Focus", v: "React • APIs • UX polish" },
            { k: "Strength", v: "Shipping fast, clean architecture" },
            { k: "Style", v: "Animations that serve the story" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="text-xs uppercase tracking-wide opacity-60">{s.k}</div>
              <div className="mt-1 text-sm">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Scroll zoom hero (your animation) */}
      <section className="mt-10">
        <ScrollZoomHero />
      </section>

      {/* New: ScrollHorizontal “Featured Work” gallery (your requested integration) */}
      <section id="work" className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured work</h2>
            <p className="mt-1 text-sm opacity-70">
              Scroll-driven gallery. Each card is a case study story ● problem → build → impact.
            </p>
          </div>
          <div className="text-xs opacity-60">Scroll ↓</div>
        </div>

        <ScrollHorizontal />
      </section>

      {/* Projects section (keeps ScrollFloat, upgraded content + modals) */}
      <section id="projects" className="mx-auto max-w-6xl px-5 pb-6">
        <Projects />
      </section>

      {/* GitHub Activity */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <GithubActivity username="Ms-Njuguna" limit={10} />
      </section>

      {/* API Docs Embed */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <ApiDocsEmbed />
      </section>

      {/* Tech orbit (fixed) */}
      <section id="stack" className="mx-auto max-w-6xl px-5 py-16">
        <Tech />
      </section>

      {/* “API Playground” wow-factor */}
      <section
        id="playground"
        className="mx-auto max-w-6xl px-5 pb-16"
      >
        <ApiPlayground />
      </section>

      {/* Contact */}
      <footer
        id="contact"
        className="border-t border-white/10 bg-neutral-950"
      >
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h3 className="text-xl font-semibold tracking-tight">Let’s build something loud (in a good way).</h3>
          <p className="mt-2 max-w-2xl text-sm opacity-70">
            If you want a developer who can handle UI, APIs, and the “last 10% polish” that makes projects feel expensive,
            I’m your person.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <CopyChip label="Email" value="byjuna.ke@gmail.com" />
            <CopyChip label="GitHub" value="https://github.com/Ms-Njuguna" />
            <a
              className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
              href="#top"
            >
              Back to top ↑
            </a>
          </div>

          <div className="mt-10 text-xs opacity-50">
            Built with React + Motion + GSAP + Matter.js. Reduced motion supported.
          </div>
        </div>
      </footer>
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
      className="relative group flex items-center justify-between gap-2 rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/5"
      title="Click to copy"
      type="button"
    >
      {/* TEXT */}
      <span className="truncate">
        <span className="opacity-60">{label}:</span> {value}
      </span>

      {/* ICON */}
      <img
        alt="copy icon"
        src={Copy}
        className="h-5 w-5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
      />

      {/* TOOLTIP */}
      <span
        className={`absolute -top-8 right-2 text-xs px-2 py-1 rounded-md bg-white text-black transition-all duration-300 ${
          copied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        Copied!
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
          <div key={e.title} className="rounded-2xl border border-white/10 bg-neutral-950/40 p-4">
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
            <pre className="mt-1 overflow-auto rounded-xl bg-black/40 p-3 text-xs text-neutral-100">
              {e.req}
            </pre>

            <div className="mt-2 text-xs opacity-60">Response</div>
            <pre className="mt-1 overflow-auto rounded-xl bg-black/40 p-3 text-xs text-neutral-100">
              {e.res}
            </pre>

            <div className="mt-2 text-xs opacity-70">{e.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
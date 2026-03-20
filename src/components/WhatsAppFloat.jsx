export default function WhatsAppFloat() {
  const phone = "254757098328";
  const message = encodeURIComponent(
    "Hey Juna 👋 I saw your portfolio and I'd love to work with you."
  );

  const link = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-neutral-900/80 backdrop-blur px-4 py-3 shadow-lg hover:bg-neutral-800 transition animate-[pulse_3s_infinite]"
    >
      {/* Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-5 h-5"
        fill="currentColor"
      >
        <path d="M16.001 2.667c-7.363 0-13.334 5.97-13.334 13.334 0 2.353.616 4.65 1.79 6.676L2.667 29.333l6.82-1.77a13.28 13.28 0 006.514 1.7h.001c7.363 0 13.334-5.97 13.334-13.334S23.364 2.667 16.001 2.667zm0 24.001a10.6 10.6 0 01-5.398-1.478l-.386-.23-4.047 1.05 1.08-3.945-.25-.405a10.6 10.6 0 01-1.6-5.66c0-5.88 4.786-10.667 10.667-10.667 5.88 0 10.667 4.786 10.667 10.667S21.881 26.668 16.001 26.668zm5.853-7.996c-.32-.16-1.893-.933-2.187-1.04-.293-.106-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.186.213-.373.24-.693.08-.32-.16-1.353-.498-2.577-1.586-.952-.85-1.594-1.9-1.78-2.22-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.106-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.526-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.146 3.093 1.306 3.306.16.213 2.256 3.44 5.466 4.823.764.33 1.36.527 1.826.675.767.244 1.466.21 2.018.127.616-.092 1.893-.773 2.16-1.52.266-.746.266-1.386.186-1.52-.08-.133-.293-.213-.613-.373z" />
      </svg>

      {/* Text (hidden on small, shows on hover desktop) */}
      <span className="hidden sm:inline text-sm opacity-80 group-hover:opacity-100 transition">
        Chat on WhatsApp
      </span>
    </a>
  );
}
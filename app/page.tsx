import Link from "next/link";

const navItems = [
  {
    href: "/kurse",
    label: "Kurse",
    description: "Alle verfügbaren Kurse verwalten",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    href: "/dozenten",
    label: "Dozenten",
    description: "Lehrpersonal und Dozenten",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    href: "/lernende",
    label: "Lernende",
    description: "Alle Lernenden im Überblick",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    href: "/lehrbetriebe",
    label: "Lehrbetriebe",
    description: "Ausbildungsbetriebe verwalten",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
  },
  {
    href: "/countries",
    label: "Länder",
    description: "Länderverwaltung",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F7F6F3] font-[family-name:var(--font-geist-sans)]">
      {/* Top bar */}
      <header className="border-b border-[#E5E2D9] bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[13px] font-semibold tracking-widest uppercase text-[#1a1a1a]">
            Kursverwaltung
          </span>
          <span className="text-[12px] text-[#999] tracking-wide">
            Administration
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#999] mb-4">
            Willkommen zurück
          </p>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1] text-[#1a1a1a] tracking-tight">
            Was möchten Sie
            <br />
            <em className="not-italic font-semibold">heute verwalten?</em>
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative bg-white border border-[#E5E2D9] rounded-xl p-6 flex flex-col gap-4 hover:border-[#1a1a1a] hover:shadow-[0_4px_24px_rgba(0,0,0,0.07)] transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F7F6F3] group-hover:bg-[#1a1a1a] text-[#666] group-hover:text-white flex items-center justify-center transition-all duration-200">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-[#1a1a1a] text-[15px] mb-1">
                  {item.label}
                </p>
                <p className="text-[13px] text-[#888] leading-snug">
                  {item.description}
                </p>
              </div>
              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[#1a1a1a]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer hint */}
        <div className="mt-16 pt-8 border-t border-[#E5E2D9] flex items-center justify-between">
          <p className="text-[12px] text-[#bbb] tracking-wide">
            {navItems.length} Bereiche verfügbar
          </p>
          <p className="text-[12px] text-[#bbb]">
            Kursverwaltungssystem
          </p>
        </div>
      </main>
    </div>
  );
}
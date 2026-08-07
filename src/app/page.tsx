import Link from "next/link";
import NavBar from "@/components/NavBar";

const footerLinks = [
  { label: "Twitter", href: "https://x.com/rishavvrajj", external: true },
  { label: "Portfolio", href: "https://rishavvraj.vercel.app/" },
  { label: "GitHub", href: "https://github.com/rishavvrajj", external: true },
];

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-black text-white">
      {/* Background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/image.png')] bg-cover bg-center bg-no-repeat"
      />

      {/* Background overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/60"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80"
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-dvh flex-col">
        <NavBar />

        <section className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <span className="patrick-hand-regular mb-6 inline-block cursor-default rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm tracking-wider text-white/90 backdrop-blur-sm transition hover:border-white/50 hover:bg-white/20">
              Everything you need to host better events
            </span>

            <h1 className="nunito text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Plan, organize, and manage events without the chaos.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 tracking-wide text-white/80 sm:text-lg">
              Bring your ideas to life with one simple platform for planning
              events, managing guests, coordinating tasks, and creating
              unforgettable experiences.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/auth"
                className="inline-flex min-w-36 items-center justify-center rounded-full border-2 border-white bg-white px-7 py-3 text-base font-semibold tracking-wide text-gray-900 shadow-lg transition duration-300 hover:scale-105 hover:bg-transparent hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                Get Started
              </Link>

              <Link
                href="https://github.com/rishavvrajj/nexora"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-36 items-center justify-center rounded-full border-2 border-white/70 bg-white/10 px-7 py-3 text-base font-semibold tracking-wide text-white backdrop-blur-sm transition duration-300 hover:scale-105 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              >
                View GitHub
              </Link>
            </div>
            
            <p className="mt-6 text-sm tracking-wide text-white/60">
              23,423+ events planned&nbsp;&nbsp;•&nbsp;&nbsp;98% customer satisfaction&nbsp;&nbsp;•&nbsp;&nbsp;4.9/5 average rating
            </p>
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-white/70 sm:flex-row sm:px-10 lg:px-20">
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-center sm:text-right">
            Designed and built by{" "}
            <Link href={'https://rishavvraj.vercel.app/'} target="_blank" className="text-white">Rishav Raj</Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
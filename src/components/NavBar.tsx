import Link from "next/link";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/" },
  { label: "About", href: "/" },
  { label: "Blog", href: "/" },
  { label: "Contact", href: "/" },
];

export default function NavBar() {
  return (
    <nav
      aria-label="Main navigation"
      className="patrick-hand-regular flex w-full items-center justify-between px-20 py-5 lg:px-10"
    >
      {/* Logo */}
      <Link
        href="/"
        aria-label="Nexora home"
        className="group flex items-center"
      >
        <span className="text-3xl font-semibold tracking-wide text-white transition duration-300 group-hover:scale-105 group-hover:text-white/80">
          nexora
        </span>
      </Link>

      {/* External navigation links */}
      <ul className="hidden items-center gap-8 md:flex lg:gap-12">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-lg text-white/80 transition duration-300 hover:-translate-y-1 hover:text-white"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/auth"
        className="rounded-full text-md border border-white/70 bg-white/10 px-5 py-1 font-medium text-white backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/40"
      >
        Get started
      </Link>
    </nav>
  );
}
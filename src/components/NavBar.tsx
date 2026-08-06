'use client'

import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function NavBar() {

  const handleSignup = () => {
    console.log('signup')
    redirect('/auth');
    // TODO: add real signup logic / route push
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ]

  return (
    <nav className="flex items-center patrick-hand-regular justify-between px-4 lg:px-10 py-4">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
        {/* <Image
          src="/logo.png"
          alt="Nexora logo"
          width={32}
          height={32}
          className="h-6 w-6"
        /> */}
        <span className="text-3xl font-semibold text-zinc-200">nexora</span>
      </Link>

      {/* Nav links */}
      <ul className="hidden md:flex items-center gap-12">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={'/'}
              className="inline-block text-lg text-zinc-200 hover:text-black hover:-translate-y-1 transition-all duration-300"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleSignup}
        className="
          inline-block cursor-pointer rounded-md
          text-xl font-medium text-white
          transition-all duration-300
          hover:-translate-y-1
          hover:scale-[1.05]
          hover:font-bold
          hover:text-black
        "
      >
        Sign up
      </button>
    </nav>
  )
}
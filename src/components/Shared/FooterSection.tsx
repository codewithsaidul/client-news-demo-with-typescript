"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import type { FooterSection as FooterSectionType } from "@/types/client/index"

interface FooterSectionProps {
  section: FooterSectionType
}

export function FooterSection({ section }: FooterSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col text-white lg:border-t-0 border-b border-white/20 lg:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-4 lg:py-0 lg:pointer-events-none w-full text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-2xl font-news-title font-semibold uppercase tracking-wider">{section.title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-forbes-white transition-transform duration-300 lg:hidden ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 lg:block ${
          isOpen ? "max-h-96 pb-4" : "max-h-0 lg:max-h-none"
        }`}
      >
        <ul className="flex flex-col gap-3 lg:gap-4 lg:mt-4">
          {section.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="duration-500 text-lg capitalize hover:text-news-cta hover:underline hover:duration-500 transition-colors block py-1"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

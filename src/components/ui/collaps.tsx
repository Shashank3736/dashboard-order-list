"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type CollapsItem = {
  text: string;
  href: string;
}

export interface CollapsibleItemProps {
  icon: React.ReactNode
  title: string
  childs?: CollapsItem[]
}

export function CollapsibleItem({ icon, title, childs=[] }: CollapsibleItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden relative">
      <span className={cn("absolute bg-foreground top-1 py-2 rounded-4xl px-[2px] opacity-0", isOpen && 'opacity-100')} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("ml-0.5 w-full flex items-center rounded gap-1 mb-2 hover:bg-foreground/2 transition-colors", isOpen && 'bg-foreground/5')}
      >
        <ChevronRight
          className={cn("size-4 text-foreground/20 stroke-2 transition-transform duration-200", isOpen && "rotate-90", childs.length === 0 && "opacity-0")}
        />
        <div className="flex-shrink-0 text-muted-foreground">{icon}</div>
        <span className="flex-1 text-left text-foreground">{title}</span>
      </button>

      {isOpen && (
        <div className="pl-8 space-y-2 flex flex-col">
        {childs.map((child) => (
          <Link key={child.href + child.text} href={child.href}>
            {child.text}
          </Link>
        ))}
        </div>
      )}
    </div>
  )
}

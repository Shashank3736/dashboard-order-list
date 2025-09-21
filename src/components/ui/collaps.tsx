"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
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
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      {/* Active indicator */}
      <span 
        className={cn(
          "absolute left-0 top-1 w-1 bg-foreground rounded-r-full transition-all duration-300 ease-out",
          isOpen ? "h-8 opacity-100" : "h-0 opacity-0"
        )} 
      />
      
      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "ml-0.5 w-full flex items-center rounded-lg gap-2 p-2 transition-all duration-200 ease-out",
          "hover:bg-foreground/5 active:scale-[0.98]",
          isOpen && "bg-foreground/8"
        )}
      >
        <ChevronRight
          className={cn(
            "size-4 text-foreground/40 stroke-2 transition-all duration-300 ease-out",
            isOpen && "rotate-90 text-foreground/60",
            childs.length === 0 && "opacity-0"
          )}
        />
        <div className="flex-shrink-0 text-muted-foreground">
          {icon}
        </div>
        <span className={cn(
          "flex-1 text-left text-sm text-foreground",
          isOpen && "text-foreground/90"
        )}>
          {title}
        </span>
      </button>

      {/* Collapsible content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div 
          ref={contentRef}
          className={cn(
            "pl-8 pt-1 pb-2 space-y-1 transform transition-all duration-300 ease-out",
            isOpen ? "translate-y-0" : "-translate-y-2"
          )}
        >
          {childs.map((child, index) => (
            <Link 
              key={child.href + child.text} 
              href={child.href}
              className={cn(
                "block py-1.5 px-2 rounded-md text-sm text-muted-foreground",
                "hover:text-foreground hover:bg-foreground/5 transition-all duration-200",
                "transform hover:translate-x-1"
              )}
              style={{
                animationDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {child.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

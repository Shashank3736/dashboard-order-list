"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"


export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    if(theme === "light") {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  return (
    <Button variant={"ghost"} onClick={() => toggleTheme()}>
      {theme === 'light' ? (
        <MoonIcon className="size-5" strokeWidth={1} />
      ):(
        <SunIcon className="size-5" strokeWidth={1} />
      )}
    </Button>
  )
}

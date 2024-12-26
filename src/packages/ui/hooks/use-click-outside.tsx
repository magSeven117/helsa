import { RefObject, useEffect } from "react"

export const useClickOutside = (ref: RefObject<HTMLElement | undefined>, callback: () => void) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    } 
  })
}
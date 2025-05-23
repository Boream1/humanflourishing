
import * as React from "react"

const MOBILE_BREAKPOINT = 320
const TABLET_BREAKPOINT = 860
const DESKTOP_BREAKPOINT = 1440

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < TABLET_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < TABLET_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsTablet(window.innerWidth >= TABLET_BREAKPOINT && window.innerWidth < DESKTOP_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsTablet(window.innerWidth >= TABLET_BREAKPOINT && window.innerWidth < DESKTOP_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
    const onChange = () => {
      setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isDesktop
}

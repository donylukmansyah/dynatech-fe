import { useEffect, useRef } from 'react'

const EVENT = 'dynatech:section-tab'

type SectionTabDetail = { section: string; tab: string }

// header memilih tab di section homepage tanpa import ke features/
export function selectSectionTab(section: string, tab: string) {
  window.dispatchEvent(
    new CustomEvent<SectionTabDetail>(EVENT, { detail: { section, tab } }),
  )
}

export function useSectionTab(
  section: string,
  onSelect: (tab: string) => void,
) {
  const handler = useRef(onSelect)
  handler.current = onSelect

  useEffect(() => {
    const listener = (e: Event) => {
      const { detail } = e as CustomEvent<SectionTabDetail>
      if (detail.section === section) handler.current(detail.tab)
    }
    window.addEventListener(EVENT, listener)
    return () => window.removeEventListener(EVENT, listener)
  }, [section])
}

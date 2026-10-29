import { useState } from 'react'

import { useSectionTab } from '#/hooks/use-section-tab'

import { catalogBranches, catalogItems } from '../constants/catalog'
import type { CatalogBranch } from '../constants/catalog'

const PAGE_SIZE = 4
const SEARCH_LIMIT = 8

const isBranch = (tab: string): tab is CatalogBranch =>
  catalogBranches.some((b) => b.key === tab)

// cari lintas cabang; tanpa kata kunci, tampil per cabang + geser
export function useCatalogBrowser() {
  const [branch, setBranch] = useState<CatalogBranch>('by-product')
  const [query, setQuery] = useState('')
  const [start, setStart] = useState(0)

  const selectBranch = (next: CatalogBranch) => {
    setQuery('')
    setBranch(next)
    setStart(0)
  }

  useSectionTab('products', (tab) => {
    if (isBranch(tab)) selectBranch(tab)
  })

  const q = query.trim().toLowerCase()
  const matches = q
    ? catalogItems.filter((item) =>
        [item.category, item.subBadge, item.title].some((text) =>
          text.toLowerCase().includes(q),
        ),
      )
    : catalogItems.filter((item) => item.branch === branch)

  const maxStart = Math.max(0, matches.length - PAGE_SIZE)
  const safeStart = Math.min(start, maxStart)
  const items = q
    ? matches.slice(0, SEARCH_LIMIT)
    : matches.slice(safeStart, safeStart + PAGE_SIZE)

  return {
    items,
    query,
    activeBranch: q ? null : branch,
    selectBranch,
    search: (value: string) => {
      setQuery(value)
      setStart(0)
    },
    prev: () => setStart((s) => (s <= 0 ? maxStart : s - 1)),
    next: () => setStart((s) => (s >= maxStart ? 0 : s + 1)),
  }
}

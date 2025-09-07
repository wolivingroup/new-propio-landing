'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import * as React from 'react'

type TabItemType = {
  id: string
  label: string
}

type PillTabsProps = {
  tabs?: TabItemType[]
  defaultActiveId?: string
  onTabChange?: (id: string) => void
  className?: string
}

const MOCK_TABS: TabItemType[] = [
  { id: 'all', label: 'Todos' },
  { id: 'shirt', label: 'Camisas' },
  { id: 'goggles', label: 'Gorras' },
  { id: 'shoes', label: 'Zapatos' },
]

const PillTabs = React.forwardRef<HTMLDivElement, PillTabsProps>(
  (props, ref) => {
    const {
      tabs = MOCK_TABS,
      defaultActiveId = tabs[0]?.id,
      onTabChange,
      className,
    } = props

    const [activeTab, setActiveTab] = React.useState(defaultActiveId)

    const handleClick = React.useCallback(
      (id: string) => {
        setActiveTab(id)
        onTabChange?.(id)
      },
      [onTabChange],
    )

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-1 p-1 bg-muted rounded-full border',
          className,
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleClick(tab.id)}
            className={cn(
              'relative px-4 py-2 rounded-full transition touch-none',
              'text-sm font-medium',
              activeTab === tab.id
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="pill-tabs-active-pill"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    )
  },
)

PillTabs.displayName = 'PillTabs'

export { PillTabs }

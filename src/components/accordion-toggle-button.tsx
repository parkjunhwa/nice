"use client"

import { ChevronUp, Search } from 'lucide-react'

interface AccordionToggleButtonProps {
  expanded: boolean
  onClick: () => void
  className?: string
}

export function AccordionToggleButton({ 
  expanded, 
  onClick, 
  className = "" 
}: AccordionToggleButtonProps) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 'calc(50% - 16px)',
        bottom: 0,
        zIndex: 10,
      }}
      className={`flex justify-center items-center ${className}`}
    >
      <button
        type="button"
        className="accordion-menu-button"
        onClick={onClick}
      >
        {expanded ? (
          <ChevronUp
            size={16}
            className="accordion-menu-button__icon"
          />
        ) : (
          <Search
            size={16}
            className="accordion-menu-button__icon"
          />
        )}
      </button>
    </div>
  )
}

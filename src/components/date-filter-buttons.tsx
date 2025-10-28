"use client"

import { useState } from 'react'
import { Button, ButtonGroup } from '@/components'

export function DateFilterButtons() {
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('전일')
  const dateFilterOptions = ['전일', '최근 일주일', '이번달']

  return (
    <div className="flex items-center">
      <ButtonGroup variant="outlined" color="secondary" size="small" className="bg-white">
        {dateFilterOptions.map(option => (
          <Button
            key={option}
            onClick={() => setSelectedDateFilter(option)}
            variant={selectedDateFilter === option ? 'contained' : 'outlined'}
            color="secondary"
            style={
              selectedDateFilter === option
                ? { fontWeight: 700 }
                : undefined
            }
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}


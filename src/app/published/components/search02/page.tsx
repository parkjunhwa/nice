"use client"

import { useState } from 'react'
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Collapse,
  Icons,
  Typography,
  Breadcrumb
} from '@/components'

export default function Search01Page() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  return (
    <div
      className="flex flex-col h-full min-h-0 layout-top-bottom"
      style={{
        height: 'calc(100vh - 64px - 3rem)', // 64px topbar + 1.5rem top + 1.5rem bottom (space-y-6 = 1.5rem*2)
      }}
    >

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: '대메뉴', href: '/' },
          { label: '중메뉴', href: '/' },
          { label: '현재페이지', active: true }
        ]}
      />

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900">Search02 검색 페이지</h1>
      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={12}>
          <div className="py-4 px-6">
            <div className="flex flex-row items-center w-full gap-4 flex-1">
              {/* 좌측: 키워드 검색 (flex:1) */}
              <div className="flex items-center flex-1 min-w-0  gap-4">
                <div className="flex items-center">
                  <label className="form-side-label">
                    키워드 검색
                  </label>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="검색어를 입력하세요"
                    InputProps={{
                      startAdornment: (
                        <Icons.SearchIcon
                          size={18}
                          className="text-gray-400"
                          style={{
                            width: '18px',
                            height: '18px',
                            minWidth: '18px',
                            minHeight: '18px',
                            flexShrink: 0
                          }}
                        />
                      )
                    }}
                  />
                </div>
                <div className="flex items-center">
                  <label className="form-side-label">
                    카테고리
                  </label>
                  <FormControl>
                    <Select
                      defaultValue=""
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="">전체 카테고리</MenuItem>
                      <MenuItem value="tech">기술</MenuItem>
                      <MenuItem value="design">디자인</MenuItem>
                      <MenuItem value="business">비즈니스</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="flex items-center">
                  <label className="block text-sm font-medium text-gray-700 mr-3 mb-0 whitespace-nowrap">
                    상태
                  </label>
                  <FormControl>
                    <Select
                      defaultValue=""
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="">전체 상태</MenuItem>
                      <MenuItem value="active">활성</MenuItem>
                      <MenuItem value="inactive">비활성</MenuItem>
                      <MenuItem value="pending">대기중</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* 우측: 카테고리/상태/버튼 (width auto) */}
              <div className="flex flex-row items-center gap-2 flex-shrink-0">

                <Button variant="outlined" size="small" startIcon={<Icons.RefreshCwIcon size={16} />}>
                  새로고침
                </Button>
                <Button variant="contained" size="small" startIcon={<Icons.SearchIcon size={16} />}>
                  검색
                </Button>
                <Button variant="contained" size="small" color="primary">Primary</Button>
                <Button variant="contained" size="small" color="secondary">Secondary</Button>
                <Button variant="outlined" size="small">Outlined</Button>
                <Button variant="text" size="small">Text</Button>
              </div>
            </div>
          </div>
        </Collapse>

        {/* 아코디언 토글 버튼 */}
        <div className="flex justify-center items-center">
          <button
            type="button"
            className="accordion-menu-button"
            onClick={() => setSearchPanelExpanded(!searchPanelExpanded)}
          >
            {searchPanelExpanded ? (
              <Icons.ChevronUpIcon
                size={16}
                className="accordion-menu-button__icon"
              />
            ) : (
              <Icons.SearchIcon
                size={16}
                className="accordion-menu-button__icon"
              />
            )}
          </button>
        </div>
      </div>

      {/* bottom-contents-pannel */}
      <div className="c-panel bottom-contents-pannel">
        <div className="bottom-contents-pannel__content">
          {/* 컨텐츠 입력 */}
        </div>
      </div>
    </div>
  )
}

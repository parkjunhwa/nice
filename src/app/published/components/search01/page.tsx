"use client"

import { useState } from 'react'
import {
  RefreshCw,
  Search,
  ChevronUp
} from 'lucide-react'
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  Collapse,
  Typography,
  TabulatorTable,
  Breadcrumb,
  Snackbar,
  Alert
} from '@/components'

export default function Search01Page() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info')

  const handleTableAction = (action: string, data: Record<string, unknown>) => {
    if (action === 'edit') {
      setAlertMessage(`Editing item: ${data.name}`)
      setAlertSeverity('info')
      setAlertOpen(true)
    } else if (action === 'delete') {
      setAlertMessage(`Deleting item: ${data.name}`)
      setAlertSeverity('warning')
      setAlertOpen(true)
    }
  }

  return (
    <div
      className="flex flex-col h-full min-h-0 layout-top-bottom"
      style={{
        height: 'calc(100vh - 3rem)', // 1.5rem top + 1.5rem bottom (space-y-6 = 1.5rem*2)
      }}
    >
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Search01 검색 페이지</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: '대메뉴', href: '/' },
              { label: '중메뉴', href: '/' },
              { label: '현재페이지', active: true }
            ]}
          />
        </div>
      </div>
      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={12}>
          <div className="pt-4 pb-2 px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <label className="form-top-label">
                  키워드 검색
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="검색어를 입력하세요"
                  fullWidth
                />
              </div>
              <div>
                <label className="form-top-label">
                  카테고리
                </label>
                <FormControl fullWidth size='small'>
                  <Select
                    defaultValue=""
                    displayEmpty
                  >
                    <MenuItem value="">전체 카테고리</MenuItem>
                    <MenuItem value="tech">기술</MenuItem>
                    <MenuItem value="design">디자인</MenuItem>
                    <MenuItem value="business">비즈니스</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="form-top-label">
                  상태
                </label>
                <FormControl fullWidth>
                  <Select
                    defaultValue=""
                    displayEmpty
                    size='small'
                  >
                    <MenuItem value="">전체 상태</MenuItem>
                    <MenuItem value="active">활성</MenuItem>
                    <MenuItem value="inactive">비활성</MenuItem>
                    <MenuItem value="pending">대기중</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="flex justify-center items-center pt-2">
              <div className="flex justify-center items-center gap-2">
                <Button variant="outlined" size="small" startIcon={<RefreshCw size={16} />}>
                  새로고침
                </Button>
                <Button variant="contained" size="small" startIcon={<Search size={16} />}>
                  검색
                </Button>
                
                <Button variant="contained" size="small" color="primary">Primary</Button>
                <Button variant="contained" size="small" color="secondary">Secondary</Button>
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
      </div>

      {/* bottom-contents-pannel */}
      <div className="c-panel bottom-contents-pannel">
        <div className="bottom-contents-pannel__content">
          <div className="pb-4 flex-shrink-0">
            <Typography variant="h6" className="text-gray-800 font-semibold">
              사용자 목록
            </Typography>
            <Typography variant="body2" className="text-gray-600 mt-1">
              등록된 사용자 정보를 확인하고 관리할 수 있습니다.
            </Typography>
          </div>
          <div
            className="flex-1 min-h-0"
            style={{
              margin: "0 -24px -24px -24px",
            }}
          >
            <div className="h-full w-full overflow-hidden">
              <div className="h-full w-full">
                <TabulatorTable 
                  className="h-full" 
                  height="100%"
                  onAction={handleTableAction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MUI Alert Snackbar */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={4000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          top: '20px !important',
          '& .MuiAlert-root': {
            minWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px'
          }
        }}
      >
        <Alert 
          onClose={() => setAlertOpen(false)} 
          severity={alertSeverity}
          sx={{ 
            width: '100%',
            '& .MuiAlert-message': {
              fontWeight: 500
            }
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  )
} 

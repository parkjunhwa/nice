'use client'

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, FormControl, Select, MenuItem } from '@mui/material'
import { Icons } from '@/components'
import { useState } from 'react'
import SampleTable from '@/components/table/sample-table'

interface Cmn009Props {
  open: boolean
  onClose: () => void
}

export default function Cmn009({ open, onClose }: Cmn009Props) {
  const [departmentName, setDepartmentName] = useState('')
  const [userName, setUserName] = useState('')
  const [employeeId, setEmployeeId] = useState('')

  // 부서명 샘플 데이터
  const departmentOptions = [
    { value: 'dept1', label: '개발팀' },
    { value: 'dept2', label: '디자인팀' },
    { value: 'dept3', label: '기획팀' },
    { value: 'dept4', label: '마케팅팀' },
    { value: 'dept5', label: '인사팀' }
  ]

  // 사용자명 샘플 데이터
  const userOptions = [
    { value: 'user1', label: '김철수' },
    { value: 'user2', label: '이영희' },
    { value: 'user3', label: '박민수' },
    { value: 'user4', label: '정수진' },
    { value: 'user5', label: '최지원' }
  ]

  // 사번 샘플 데이터
  const employeeOptions = [
    { value: 'emp1', label: 'EMP001' },
    { value: 'emp2', label: 'EMP002' },
    { value: 'emp3', label: 'EMP003' },
    { value: 'emp4', label: 'EMP004' },
    { value: 'emp5', label: 'EMP005' }
  ]
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '800px'
        }
      }}
    >
      <DialogTitle sx={{ padding: '16px 16px' }}>
        <div className="flex items-center justify-between">
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            사용자 검색
          </Typography>
          <IconButton
            aria-label="닫기"
            onClick={onClose}
            size="small"
            edge="end"
          >
            <Icons.XIcon size={20} />
          </IconButton>
        </div>
      </DialogTitle>

      <div className="flex flex-row items-center w-full justify-between flex-1 bg-gray-50 py-2 px-4 border-t border-b border-blue-100">
        {/* 좌측: 키워드 검색 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <label className="form-side-label">
              부서명
            </label>
            <FormControl fullWidth>
              <Select
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                displayEmpty
                className="bg-white"
                size="small"
                sx={{ width: '150px' }}
              >
                <MenuItem value="">
                  <span>선택</span>
                </MenuItem>
                {departmentOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center">
            <label className="form-side-label">
              사용자명
            </label>
            <FormControl fullWidth>
              <Select
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                displayEmpty
                className="bg-white"
                size="small"
                sx={{ width: '150px' }}
              >
                <MenuItem value="">
                  <span>선택</span>
                </MenuItem>
                {userOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="flex items-center">
            <label className="form-side-label">
              사번
            </label>
            <FormControl fullWidth>
              <Select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                displayEmpty
                className="bg-white"
                size="small"
                sx={{ width: '150px' }}
              >
                <MenuItem value="">
                  <span>선택</span>
                </MenuItem>
                {employeeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        {/* 우측: 카테고리/상태/버튼 (width auto) */}
        <div className="flex flex-row items-center gap-2 flex-shrink-0">
          <Button variant="outlined" size="small" color="secondary">
            조회
          </Button>
        </div>
      </div>
      
      <DialogContent>
        {/* 세로 꽉차는 테이블 샘플 */}
        <div style={{ height: 'calc(100% - 0px)' }}>
          {/* 상단에 뭔가 들어가면 높이만끔 빼줘야 */}
          {/* 기본 설정: 좌우 스크롤 활성화 */}
          <div className="grid grid-cols-1 h-full overflow-hidden">
            <SampleTable
              showPagination={false}
              pageSize={20}
            />
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ padding: '16px' }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" onClick={onClose}>
          선택
        </Button>
      </DialogActions>
    </Dialog>
  )
}

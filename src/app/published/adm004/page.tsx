"use client"

import {
  ArrowLeft
} from 'lucide-react'
import {
  Button,
  Typography,
  Breadcrumb,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@/components'

export default function InterfaceLogDetailPage() {
  return (
    <div
      className="flex flex-col h-full min-h-0 layout-top-bottom"
      style={{
        height: 'calc(100vh - 2rem)', // 1rem top + 1rem bottom
      }}
    >
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mt-1 mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">I/F로그 상세</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'ADMIN', href: '/' },
              { label: 'I/F로그 상세', active: true }
            ]}
          />
        </div>
      </div>
      {/* bottom-contents-pannel */}
      <div className="c-panel bottom-contents-pannel relative">
        <div className="bottom-contents-pannel__content mb-14" style={{ overflowY: 'auto', maxHeight: '100%' }}>
          <div className="flex items-center justify-between mb-2">
            <Typography variant="subtitle1" className="font-semibold text-gray-900">
              기본 정보
            </Typography>
          </div>
          <div className="flex items-center mb-2">
            <TableContainer component={Paper} className="table-header-left">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label">job ID</label></TableCell>
                    <TableCell>
                      IF_XXX_XXX
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label">일자</label></TableCell>
                    <TableCell>
                      2025-03-27 09:18
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}><label className="form-side-label">게시 여부</label></TableCell>
                    <TableCell>
                      INTERFACE
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}>
                      <label className="form-side-label">상태</label>
                    </TableCell>
                    <TableCell>
                      성공
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}>
                      <label className="form-side-label">설명</label>
                    </TableCell>
                    <TableCell>
                      .
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}>
                      <label className="form-side-label">Endpoint</label>
                    </TableCell>
                    <TableCell>
                      .
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}>
                      <label className="form-side-label">Method</label>
                    </TableCell>
                    <TableCell>
                      .
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row" sx={{ width: 120, minWidth: 120, maxWidth: 120 }}>
                      <label className="form-side-label">Error</label>
                    </TableCell>
                    <TableCell>
                      .
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        {/* 카드 하단 고정 버튼 영역 */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-b-lg">
          <div className="flex justify-end items-center">
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                startIcon={<ArrowLeft size={16} />}
              >
                목록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 

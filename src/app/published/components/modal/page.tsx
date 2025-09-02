"use client"

import { useState } from 'react'
import {
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  BasicModal,
  ConfirmModal,
  MuiBasicModal,
  MuiFormModal,
  MuiConfirmModal,
  MuiFullscreenModal,
  Cmn001,
  Cmn002,
  Cmn003,
  Cmn004,
  Cmn005,
  Cmn006,
  Cmn007,
  Cmn008,
  Cmn009,
  Cmn010,
  Cmn011,
  Cmn012,
  Icons
} from '@/components'
import { Grid, Alert, Snackbar } from '@mui/material'

export default function ModalPage() {
  // 모달 상태 관리
  const [basicModalOpen, setBasicModalOpen] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // MUI 모달 상태 관리
  const [muiBasicModalOpen, setMuiBasicModalOpen] = useState(false)
  const [muiFormModalOpen, setMuiFormModalOpen] = useState(false)
  const [muiConfirmModalOpen, setMuiConfirmModalOpen] = useState(false)
  const [muiFullscreenModalOpen, setMuiFullscreenModalOpen] = useState(false)

  // Modal001-010 상태 관리
  const [modal001Open, setModal001Open] = useState(false)
  const [modal002Open, setModal002Open] = useState(false)
  const [modal003Open, setModal003Open] = useState(false)
  const [modal004Open, setModal004Open] = useState(false)
  const [modal005Open, setModal005Open] = useState(false)
  const [modal006Open, setModal006Open] = useState(false)
  const [modal007Open, setModal007Open] = useState(false)
  const [modal008Open, setModal008Open] = useState(false)
  const [modal009Open, setModal009Open] = useState(false)
  const [modal010Open, setModal010Open] = useState(false)
  const [modal011Open, setModal011Open] = useState(false)
  const [modal012Open, setModal012Open] = useState(false)

  // Alert 상태 관리
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success')



  // 확인 모달 핸들러
  const handleConfirm = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setConfirmModalOpen(false)
      showAlert('삭제가 완료되었습니다!', 'success')
    }, 2000)
  }

  // Alert 표시 함수
  const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setAlertMessage(message)
    setAlertSeverity(severity)
    setAlertOpen(true)
  }

  return (
    <div className="c-panel flex-1 min-h-0 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="pb-4 flex-shrink-0">
          <Typography variant="h6" className="text-gray-800 font-semibold">
            모달 팝업
          </Typography>
          <Typography variant="body2" className="text-gray-600 mt-1">
            예시입니다.
          </Typography>
        </div>

        <div className="flex-1 min-h-0">
          {/* 기본 모달 */}
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setBasicModalOpen(true)}
            >
              기본 모달 열기
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setConfirmModalOpen(true)}
            >
              삭제 확인 모달
            </Button>

          </div>

          <div className="h-6" />

          {/* MUI 모달들 */}
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setMuiBasicModalOpen(true)}
            >
              MUI 기본 다이얼로그
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setMuiFormModalOpen(true)}
            >
              MUI 폼 다이얼로그
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setMuiConfirmModalOpen(true)}
            >
              MUI 확인 다이얼로그
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setMuiFullscreenModalOpen(true)}
            >
              MUI 전체화면 다이얼로그
            </Button>
          </div>

        </div>
        <div className="mt-4 pb-4">
          <Typography variant="h6" className="text-gray-800 font-semibold">
            프로젝트 모달 컴포넌트 호출
          </Typography>
          <Typography variant="body2" className="text-gray-600 mt-1">
            기획안 참조
          </Typography>
        </div>
        <div className="flex-1 min-h-0">
          {/* 퍼블된 프로젝트 모달 */}
          <div className="flex flex-row items-center gap-2 flex-wrap">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal001Open(true)}
              startIcon={<Icons.SettingsIcon size={16} />}
            >
              엑셀 업로드 결과
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal002Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              거래처 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal003Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              사이트 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal004Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              주차장 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal005Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              EV충전소 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal006Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              ATM 기기 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal007Open(true)}
            >
              키오스크 기기 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal008Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              상품 코드 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal009Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              사용자 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal010Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              비밀번호 변경
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal011Open(true)}
            >
              충전소 검색
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setModal012Open(true)}
              startIcon={<Icons.CheckIcon size={16} />}
            >
              계약마스터 검색
            </Button>
          </div>

          {/* Cmn001-Cmn012 컴포넌트들 */}
          <Cmn001
            open={modal001Open}
            onClose={() => setModal001Open(false)}
          />

          <Cmn002
            open={modal002Open}
            onClose={() => setModal002Open(false)}
          />

          <Cmn003
            open={modal003Open}
            onClose={() => setModal003Open(false)}
          />

          <Cmn004
            open={modal004Open}
            onClose={() => setModal004Open(false)}
          />

          <Cmn005
            open={modal005Open}
            onClose={() => setModal005Open(false)}
          />

          <Cmn006
            open={modal006Open}
            onClose={() => setModal006Open(false)}
          />

          <Cmn007
            open={modal007Open}
            onClose={() => setModal007Open(false)}
          />

          <Cmn008
            open={modal008Open}
            onClose={() => setModal008Open(false)}
          />

          <Cmn009
            open={modal009Open}
            onClose={() => setModal009Open(false)}
          />

          <Cmn010
            open={modal010Open}
            onClose={() => setModal010Open(false)}
            onSuccess={(message) => {
              showAlert(message, 'success')
            }}
          />

          <Cmn011
            open={modal011Open}
            onClose={() => setModal011Open(false)}
          />

          <Cmn012
            open={modal012Open}
            onClose={() => setModal012Open(false)}
          />
        </div>
      </div>

      {/* 기본 모달 */}
      <BasicModal
        open={basicModalOpen}
        onClose={() => setBasicModalOpen(false)}
        title="기본 모달"
        maxWidth="sm"
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          이것은 기본 모달입니다. 간단한 정보나 메시지를 표시할 때 사용합니다.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          모달의 크기, 위치, 애니메이션 등을 자유롭게 커스터마이징할 수 있습니다.
        </Typography>
      </BasicModal>

      {/* 확인 모달 */}
      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        title="삭제 확인"
        message="정말로 이 항목을 삭제하시겠습니까? 삭제된 데이터는 복구할 수 없습니다."
        type="error"
        confirmText="삭제"
        cancelText="취소"
        loading={loading}
      />

      {/* MUI 모달들 */}
      <MuiBasicModal
        open={muiBasicModalOpen}
        onClose={() => setMuiBasicModalOpen(false)}
        title="MUI 기본 다이얼로그"
        message="이것은 MUI 기본 다이얼로그입니다. 간단한 메시지나 알림을 표시할 때 사용합니다."
      />

      <MuiFormModal
        open={muiFormModalOpen}
        onClose={() => setMuiFormModalOpen(false)}
        title="MUI 폼 다이얼로그"
        onSubmit={(data) => {
          console.log('MUI 폼 데이터:', data)
          showAlert('MUI 폼이 제출되었습니다!', 'success')
        }}
      />

      <MuiConfirmModal
        open={muiConfirmModalOpen}
        onClose={() => setMuiConfirmModalOpen(false)}
        title="MUI 확인 다이얼로그"
        message="정말로 이 작업을 수행하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        severity="warning"
        onConfirm={() => {
          showAlert('MUI 확인 모달에서 삭제가 확인되었습니다!', 'success')
        }}
      />

      <MuiFullscreenModal
        open={muiFullscreenModalOpen}
        onClose={() => setMuiFullscreenModalOpen(false)}
        title="MUI 전체화면 다이얼로그"
        onSubmit={() => {
          showAlert('MUI 전체화면 모달에서 저장되었습니다!', 'success')
        }}
        onDelete={() => {
          showAlert('항목이 삭제되었습니다!', 'success')
        }}
      />



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

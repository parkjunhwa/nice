"use client"

import React, { useState } from 'react'
import {
  Plus,
  Minus
} from 'lucide-react'
import {
  Button,
  Typography,
  Breadcrumb,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  IconButton,
  Icons
} from '@/components'
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'

export default function Rul002Page() {
  // TextField 상태
  const [normalInput1, setNormalInput1] = useState<string>('')
  const [normalInput2, setNormalInput2] = useState<string>('')

  // 패널 크기 조절 상태
  const leftPanelWidth = 500 // 고정 500px

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
          <h1 className="text-2xl font-bold text-gray-900">정산규칙 (준비중)</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '정산규칙', href: '/' },
              { label: '정산규칙', active: true }
            ]}
          />
        </div>
      </div>

      {/* bottom-contents-pannel */}
      <div
        className="bottom-contents-pannel__content flex gap-2"
        style={{ height: 'calc(100vh - 166px)', flex: 1 }}
      >
        {/* 왼쪽 카드 1 (폭 고정) */}
        <div style={{ width: leftPanelWidth, maxWidth: leftPanelWidth }} className="flex-shrink-0">
          <Card className="h-full">
            <CardContent className="h-full flex flex-col" style={{ padding: 16 }}>
              <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0 }}>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
                  기본정보
                </Typography>
                <div className="flex gap-1">
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                  >
                    취소
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    className="xsmallbtn2"
                    startIcon={<Plus size={16} />}
                  >
                    <span style={{ display: "none" }}>+</span>
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    className="xsmallbtn2"
                    startIcon={<Minus size={16} />}
                  >
                    <span style={{ display: "none" }}>-</span>
                  </Button>
                </div>
              </div>
              {/* 세로 꽉차는 영역 */}
              <div style={{ height: 'calc(100% - 40px)' }}>
                {/* 상단에 뭔가 들어가면 높이만큼 빼줘야 */}
                {/* 기본 설정: 좌우 스크롤 활성화 */}
                <div className="h-full overflow-y-auto">
                  스크롤영역
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 카드 (폭 가변 flex:1) */}
        <div className="flex-1">
          <Card className="h-full">
            <CardContent className="h-full flex flex-col" style={{ padding: 16 }}>
              <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0 }}>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
                  가상계좌
                </Typography>
                <div className="flex gap-1">
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                  >
                    취소
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    className="xsmallbtn2"
                    startIcon={<Plus size={16} />}
                  >
                    <span style={{ display: "none" }}>+</span>
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    className="xsmallbtn2"
                    startIcon={<Minus size={16} />}
                  >
                    <span style={{ display: "none" }}>-</span>
                  </Button>
                </div>
              </div>
              {/* 세로 꽉차는 영역 */}
              <div style={{ height: 'calc(100% - 40px)' }}>
                {/* 상단에 뭔가 들어가면 높이만큼 빼줘야 */}
                {/* 기본 설정: 좌우 스크롤 활성화 */}
                <div className="h-full overflow-y-auto">
                  {/* 아코디언 예시 */}
                  <div className="mb-0">
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography>
                          기본 아코디언
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography sx={{ fontSize: '13px', fontWeight: 250 }}>
                          이것은 기본 아코디언입니다. 클릭하면 내용이 펼쳐지고 접힙니다.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                      >
                        <Typography>
                          폼이 포함된 아코디언
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="flex flex-col gap-1">
                          <TextField
                            variant="outlined"
                            size="small"
                            placeholder="검색어를 입력하세요"
                            fullWidth
                            value={normalInput1}
                            onChange={(e) => setNormalInput1(e.target.value)}
                            InputProps={{
                              endAdornment: normalInput1 ? (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="입력값 지우기"
                                    size="small"
                                    onClick={() => setNormalInput1('')}
                                    edge="end"
                                  >
                                    <Icons.XIcon size={16} />
                                  </IconButton>
                                </InputAdornment>
                              ) : undefined
                            }}
                          />
                          <TextField
                            variant="outlined"
                            size="small"
                            placeholder="검색어를 입력하세요"
                            fullWidth
                            value={normalInput2}
                            onChange={(e) => setNormalInput2(e.target.value)}
                            InputProps={{
                              endAdornment: normalInput2 ? (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="입력값 지우기"
                                    size="small"
                                    onClick={() => setNormalInput2('')}
                                    edge="end"
                                  >
                                    <Icons.XIcon size={16} />
                                  </IconButton>
                                </InputAdornment>
                              ) : undefined
                            }}
                          />
                          <Button variant="contained" size="small">
                            저장
                          </Button>
                        </div>
                      </AccordionDetails>
                    </Accordion>

                  </div>
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />
                  스크롤영역<br />

                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* bottom-button-pannel */}
      <Card className="mt-2">
        <CardContent style={{ padding: 16 }}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">

            </div>
            <div className="flex gap-2">
              <Button variant="outlined" color="secondary">
                취소
              </Button>
              <Button variant="contained">
                저장
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>


    </div>
  )
}

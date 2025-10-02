"use client"

import React, { useState } from 'react'
import {
  Plus,
  Minus,
  Search
} from 'lucide-react'
import {
  Button,
  Typography,
  Breadcrumb,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Icons,
  FormControl,
  Select,
  MenuItem,
  DatePicker,
  DateRangePicker,
  SampleTable
} from '@/components'

export default function Con002Page() {

  // 폼 상태 변수들
  const [businessType, setBusinessType] = useState('')
  const [status, setStatus] = useState('')
  const [businessDivision, setBusinessDivision] = useState('')
  const [branch, setBranch] = useState('')
  const [contractName, setContractName] = useState('')
  const [contractNumber, setContractNumber] = useState('')
  const [contractDate, setContractDate] = useState<Date | null>(null)
  const [contractPeriod, setContractPeriod] = useState<[Date | null, Date | null]>([null, null])
  const [niceBuilderMemberId, setNiceBuilderMemberId] = useState('')
  const [aggregationStandardDate, setAggregationStandardDate] = useState('')
  const [customerCode, setCustomerCode] = useState('')
  const [deviceNumber, setDeviceNumber] = useState('')
  
  // 탭 상태
  const [activeTab, setActiveTab] = useState('품목')
  
  // 품목 탭 상태 변수
  const [itemType, setItemType] = useState('')
  
  // 품목 선택 옵션들
  const itemTypeOptions = [
    { value: 'option1', label: '옵션1' },
    { value: 'option2', label: '옵션2' },
    { value: 'option3', label: '옵션3' }
  ]

  // 탭별 헤더와 버튼 렌더링
  const renderTabHeader = () => {
    switch (activeTab) {
      case '품목':
        return (
          <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0, minHeight: '32px' }}>
            <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
              {/* 품목 탭 제목 */}
              품목
            </Typography>
            <div className="flex gap-1">
              {/* 품목 탭 버튼들을 여기에 추가하세요 */}
              <FormControl sx={{ width: '120px' }}>
                <Select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  displayEmpty
                  className="bg-white"
                  size="small"
                >
                  <MenuItem value="">
                    <span>품목 선택</span>
                  </MenuItem>
                  {itemTypeOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button variant="outlined" size="small" color="secondary">
                추가
              </Button>
              <Button variant="outlined" size="small" color="secondary">
                삭제
              </Button>
            </div>
          </div>
        )
      case '가상계좌':
        return (
          <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0, minHeight: '32px' }}>
            <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
              {/* 가상계좌 탭 제목 */}
              가상계좌
            </Typography>
            <div className="flex gap-1">
              {/* 가상계좌 탭 버튼들을 여기에 추가하세요 */}
              <Button variant="outlined" size="small" color="secondary">
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
        )
      case '정산규칙':
        return (
          <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0, minHeight: '32px' }}>
            <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
              {/* 정산규칙 탭 제목 */}
              정산규칙
            </Typography>
            <div className="flex gap-1">
              {/* 정산규칙 탭 버튼들을 여기에 추가하세요 */}
            </div>
          </div>
        )
      case '변경이력':
        return (
          <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0, minHeight: '32px' }}>
            <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
              {/* 변경이력 탭 제목 */}
              변경이력
            </Typography>
            <div className="flex gap-1">
              {/* 변경이력 탭 버튼들을 여기에 추가하세요 */}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // 탭 내용 렌더링
  const renderTabContent = () => {
    switch (activeTab) {
      case '품목':
        return (
          <div className="h-full">
            <div className="grid grid-cols-1 h-full overflow-hidden">
              <SampleTable
                showPagination={true}
                pageSize={20}
              />
            </div>
          </div>
        )
      case '가상계좌':
        return (
          <div className="h-full">
            <div className="grid grid-cols-1 h-full overflow-hidden">
              <SampleTable
                showPagination={true}
                pageSize={20}
              />
            </div>
          </div>
        )
      case '정산규칙':
        return (
          <div className="h-full">
            <div className="grid grid-cols-1 h-full overflow-hidden">
              <SampleTable
                showPagination={true}
                pageSize={20}
              />
            </div>
          </div>
        )
      case '변경이력':
        return (
          <div className="h-full">
            <div className="grid grid-cols-1 h-full overflow-hidden">
              <SampleTable
                showPagination={true}
                pageSize={20}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }


  // Select 옵션들
  const departmentOptions = [
    { value: 'option1', label: '옵션1' },
    { value: 'option2', label: '옵션2' },
    { value: 'option3', label: '옵션3' }
  ]

  // 패널 크기 조절 상태
  const leftPanelWidth = 600 // 고정 


  return (
    <div
      className="flex flex-col h-full min-h-0 layout-top-bottom"
      style={{
        height: 'calc(100vh - 2rem)', // 1rem top + 1rem bottom
      }}
    >

      <div className="flex flex-row items-center justify-between mt-1 mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">정산기준정보</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: '정산기준정보', href: '/' },
              { label: '정산기준정보', active: true }
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

                </div>
              </div>
              {/* 세로 꽉차는 영역 */}
              <div style={{ height: 'calc(100% - 40px)' }}>
                {/* 상단에 뭔가 들어가면 높이만큼 빼줘야 */}
                {/* 기본 설정: 좌우 스크롤 활성화 */}
                <div className="h-full overflow-y-auto">
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <div>
                      <label className="form-top-label required">
                        사업
                      </label>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          displayEmpty
                          className="bg-white"
                          size="small"
                        >
                          <MenuItem value="">
                            <span>선택</span>
                          </MenuItem>
                          {departmentOptions.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <label className="form-top-label">
                        상태
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ width: '100%' }}
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-top-label required">
                        사업부
                      </label>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          value={businessDivision}
                          onChange={(e) => setBusinessDivision(e.target.value)}
                          displayEmpty
                          className="bg-white"
                          size="small"
                        >
                          <MenuItem value="">
                            <span>선택</span>
                          </MenuItem>
                          {departmentOptions.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <label className="form-top-label required">
                        지사
                      </label>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          value={branch}
                          onChange={(e) => setBranch(e.target.value)}
                          displayEmpty
                          className="bg-white"
                          size="small"
                        >
                          <MenuItem value="">
                            <span>선택</span>
                          </MenuItem>
                          {departmentOptions.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약명
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={contractName}
                        onChange={(e) => setContractName(e.target.value)}
                        sx={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약번호
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={contractNumber}
                        onChange={(e) => setContractNumber(e.target.value)}
                        sx={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label className="form-top-label required">
                        거래처
                      </label>
                      <div className="flex items-center gap-1">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={customerCode}
                          onChange={(e) => setCustomerCode(e.target.value)}
                          sx={{ flex: 1 }}
                          InputProps={{
                            endAdornment: customerCode && (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() => setCustomerCode('')}
                                  sx={{
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                  }}
                                >
                                  <Icons.XIcon size={14} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        <Button
                          variant="outlined"
                          size="small"
                          color="secondary"
                          className="xsmallbtn3"
                          startIcon={<Search size={16} />}
                        >
                          <span style={{ display: "none" }}>+</span>
                        </Button>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={deviceNumber}
                          onChange={(e) => setDeviceNumber(e.target.value)}
                          sx={{ width: '110px' }}
                        disabled
                          InputProps={{

                            endAdornment: deviceNumber && (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() => setDeviceNumber('')}
                                  sx={{
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                  }}
                                >
                                  <Icons.XIcon size={14} />
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약금액
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        value={
                          contractNumber
                            ? Number(contractNumber.replace(/,/g, '')).toLocaleString()
                            : ''
                        }
                        onChange={(e) => {
                          // 숫자만 추출
                          const raw = e.target.value.replace(/[^0-9]/g, '');
                          setContractNumber(raw);
                        }}
                        sx={{
                          width: '100%',
                          '& input': {
                            textAlign: 'right'
                          }
                        }}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9,]*'
                        }}
                        placeholder="숫자만 입력"
                      />
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약일자
                      </label>
                      <DatePicker
                        value={contractDate}
                        onChange={(newValue: Date | null) => setContractDate(newValue)}
                        placeholder="날짜를 선택하세요"
                        width="100%"
                      />
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약기간
                      </label>
                      <DateRangePicker
                        value={contractPeriod}
                        onChange={(newValue: [Date | null, Date | null]) => setContractPeriod(newValue)}
                        placeholder="날짜 범위를 선택하세요"
                        size="small"
                        datePickerWidth={130}
                      />
                    </div>
                    <div>
                      <label className="form-top-label required">
                        나이스빌더회원아이디
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={niceBuilderMemberId}
                        onChange={(e) => setNiceBuilderMemberId(e.target.value)}
                        sx={{ width: '100%' }}
                      />
                    </div>
                    <div>
                      <label className="form-top-label required">
                        집계기준일
                      </label>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          value={aggregationStandardDate}
                          onChange={(e) => setAggregationStandardDate(e.target.value)}
                          displayEmpty
                          className="bg-white"
                          size="small"
                        >
                          <MenuItem value="">
                            <span>선택</span>
                          </MenuItem>
                          {departmentOptions.map((option) => (
                            <MenuItem
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 카드 (폭 가변 flex:1) */}
        <div className="flex-1">
          <Card className="h-full">
            <CardContent className="h-full flex flex-col" style={{ padding: 16 }}>

              {/* 탭 영역 */}
              <div className="mb-4">
                <div className="flex border-b border-gray-200">
                  {['품목', '가상계좌', '정산규칙', '변경이력'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-400'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* 탭별 헤더와 버튼 영역 */}
              {renderTabHeader()}
              {/* 세로 꽉차는 영역 */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                {/* 상단에 뭔가 들어가면 높이만큼 빼줘야 */}
                {/* 기본 설정: 좌우 스크롤 활성화 */}
                <div className="h-full overflow-y-auto">
                  {/* 탭 콘텐츠 영역 */}
                  {renderTabContent()}
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

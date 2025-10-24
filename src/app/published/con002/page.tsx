"use client"

import React, { useState } from 'react'
import {
  Plus,
  Minus,
  Search,
  HelpCircle,
  ChevronDown,
  ChevronUp
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
  SampleTable,
  Tooltip
} from '@/components'

export default function Con002Page() {

  // 폼 상태 변수들
  const [businessType, setBusinessType] = useState('')
  const [status, setStatus] = useState('')
  const [businessDivision, setBusinessDivision] = useState('')
  const [branch, setBranch] = useState('')
  const [contractName, setContractName] = useState('')
  const [contractNumber, setContractNumber] = useState('')
  const [contractAmount, setContractAmount] = useState('')
  const [contractDate, setContractDate] = useState<Date | null>(null)
  const [contractPeriod, setContractPeriod] = useState<[Date | null, Date | null]>([null, null])
  const [niceBuilderMemberId, setNiceBuilderMemberId] = useState('')
  const [aggregationStandardDate, setAggregationStandardDate] = useState('')
  const [customerCode, setCustomerCode] = useState('')
  const [deviceNumber, setDeviceNumber] = useState('')

  // 접힘/펼침 상태
  const [isExpanded, setIsExpanded] = useState(true)

  // 검증 상태 관리
  const [validationMessages, setValidationMessages] = useState<{ [key: string]: string }>({})

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
              <Button variant="outlined" size="small">
                추가
              </Button>
              <Button variant="outlined" size="small" color="error">
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

  // 필수 항목 검증 함수
  const validateRequiredFields = () => {
    const errors: { [key: string]: string } = {}

    if (!businessType.trim()) {
      errors.businessType = '상을 선택해주세요.'
    }
    if (!businessDivision.trim()) {
      errors.businessDivision = '사업부를 선택해주세요.'
    }
    if (!branch.trim()) {
      errors.branch = '지사를 선택해주세요.'
    }
    if (!contractName.trim()) {
      errors.contractName = '계약명을 입력해주세요.'
    }
    if (!contractNumber.trim()) {
      errors.contractNumber = '계약번호를 입력해주세요.'
    }
    if (!contractAmount.trim()) {
      errors.contractAmount = '계약금액을 입력해주세요.'
    }
    if (!customerCode.trim()) {
      errors.customerCode = '거래처를 입력해주세요.'
    }
    if (!contractDate) {
      errors.contractDate = '계약일자를 선택해주세요.'
    }
    if (!contractPeriod[0] || !contractPeriod[1]) {
      errors.contractPeriod = '계약기간을 선택해주세요.'
    }
    if (!aggregationStandardDate.trim()) {
      errors.aggregationStandardDate = '집계기준일을 선택해주세요.'
    }

    setValidationMessages(errors)
    return Object.keys(errors).length === 0
  }

  // 검증 메시지 제거 함수
  const clearValidationMessage = (fieldName: string) => {
    if (validationMessages[fieldName]) {
      setValidationMessages(prev => {
        const newMessages = { ...prev }
        delete newMessages[fieldName]
        return newMessages
      })
    }
  }

  // 저장 핸들러
  const handleSave = () => {
    if (validateRequiredFields()) {
      // 검증 통과 시 실제 저장 로직 실행
      alert('저장되었습니다.')
    }
  }


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
              <div className="flex items-center justify-between mb-4 gap-2" style={{ flex: 0 }}>
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
                          onChange={(e) => {
                            setBusinessType(e.target.value)
                            clearValidationMessage('businessType')
                          }}
                          displayEmpty
                          className="bg-white"
                          size="small"
                          error={!!validationMessages.businessType}
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
                      {validationMessages.businessType && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.businessType}
                        </div>
                      )}
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
                        InputProps={{
                          endAdornment: status && (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={() => setStatus('')}
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
                    <div>
                      <label className="form-top-label required">
                        사업부
                      </label>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          value={businessDivision}
                          onChange={(e) => {
                            setBusinessDivision(e.target.value)
                            clearValidationMessage('businessDivision')
                          }}
                          displayEmpty
                          className="bg-white"
                          size="small"
                          error={!!validationMessages.businessDivision}
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
                      {validationMessages.businessDivision && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.businessDivision}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="form-top-label required">
                        지사
                      </label>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          value={branch}
                          onChange={(e) => {
                            setBranch(e.target.value)
                            clearValidationMessage('branch')
                          }}
                          displayEmpty
                          className="bg-white"
                          size="small"
                          error={!!validationMessages.branch}
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
                      {validationMessages.branch && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.branch}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약명
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={contractName}
                        onChange={(e) => {
                          setContractName(e.target.value)
                          clearValidationMessage('contractName')
                        }}
                        sx={{ width: '100%' }}
                        error={!!validationMessages.contractName}
                        InputProps={{
                          endAdornment: contractName && (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={() => setContractName('')}
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
                      {validationMessages.contractName && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.contractName}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약번호
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={contractNumber}
                        onChange={(e) => {
                          // 숫자만 추출
                          const numericValue = e.target.value.replace(/[^0-9]/g, '')
                          setContractNumber(numericValue)
                          clearValidationMessage('contractNumber')
                        }}
                        sx={{ width: '100%' }}
                        error={!!validationMessages.contractNumber}
                        inputProps={{
                          inputMode: 'numeric',
                          pattern: '[0-9]*'
                        }}
                        InputProps={{
                          endAdornment: contractNumber && (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={() => setContractNumber('')}
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
                      {validationMessages.contractNumber && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.contractNumber}
                        </div>
                      )}
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
                          onChange={(e) => {
                            setCustomerCode(e.target.value)
                            clearValidationMessage('customerCode')
                          }}
                          sx={{ flex: 1 }}
                          error={!!validationMessages.customerCode}
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
                      {validationMessages.customerCode && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.customerCode}
                        </div>
                      )}
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
                          contractAmount
                            ? Number(contractAmount.replace(/,/g, '')).toLocaleString()
                            : ''
                        }
                        onChange={(e) => {
                          // 숫자만 추출
                          const raw = e.target.value.replace(/[^0-9]/g, '');
                          setContractAmount(raw);
                          clearValidationMessage('contractAmount');
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
                        placeholder="금액 입력"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                            </InputAdornment>
                          )
                        }}
                        error={!!validationMessages.contractAmount}
                      />
                      {validationMessages.contractAmount && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.contractAmount}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약일자
                      </label>
                      <DatePicker
                        value={contractDate}
                        onChange={(newValue: Date | null) => {
                          setContractDate(newValue)
                          clearValidationMessage('contractDate')
                        }}
                        placeholder="날짜를 선택하세요"
                        width="100%"
                        error={!!validationMessages.contractDate}
                      />
                      {validationMessages.contractDate && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.contractDate}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="form-top-label required">
                        계약기간
                      </label>
                      <DateRangePicker
                        value={contractPeriod}
                        onChange={(newValue: [Date | null, Date | null]) => {
                          setContractPeriod(newValue)
                          clearValidationMessage('contractPeriod')
                        }}
                        placeholder="날짜 범위를 선택하세요"
                        size="small"
                        datePickerWidth={130}
                        error={!!validationMessages.contractPeriod}
                      />
                      {validationMessages.contractPeriod && (
                        <div className="text-red-500 text-xs mt-1">
                          {validationMessages.contractPeriod}
                        </div>
                      )}
                    </div>

                    {/* 접힘/펼침 영역 헤더 */}
                    <div className="col-span-2 flex items-center justify-center my-2">
                      <div className="flex-1 h-px bg-gray-200" />
                      <div
                        className="flex items-center cursor-pointer text-sm font-small text-gray-500 gap-1 px-3 select-none"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? (
                          <ChevronUp size={16} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-500" />
                        )}
                        <span>추가 정보</span>
                      </div>
                      <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {isExpanded && (
                      <>
                        <div>
                          <div className="flex items-center gap-1">
                            <label className="form-top-label">
                              나이스빌더회원아이디
                            </label>
                            <Tooltip
                              title="NICE페이먼트 더빌 CMS 거래처 회원아이디를 입력하세요. 입력하신 회원아이디 기준으로 더빌 정산내역이 집계됩니다."
                              arrow
                            >
                              <HelpCircle
                                size={16}
                                style={{ color: '#6b7280', marginBottom: '4px' }} // gray-500
                                className="flex items-center justify-center"
                              />
                            </Tooltip>
                          </div>
                          <TextField
                            variant="outlined"
                            size="small"
                            value={niceBuilderMemberId}
                            onChange={(e) => setNiceBuilderMemberId(e.target.value)}
                            sx={{ width: '100%' }}
                            InputProps={{
                              endAdornment: niceBuilderMemberId && (
                                <InputAdornment position="end">
                                  <IconButton
                                    size="small"
                                    onClick={() => setNiceBuilderMemberId('')}
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
                        <div>
                          <label className="form-top-label required">
                            집계기준일
                          </label>
                          <FormControl sx={{ width: '100%' }}>
                            <Select
                              value={aggregationStandardDate}
                              onChange={(e) => {
                                setAggregationStandardDate(e.target.value)
                                clearValidationMessage('aggregationStandardDate')
                              }}
                              displayEmpty
                              className="bg-white"
                              size="small"
                              error={!!validationMessages.aggregationStandardDate}
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
                          {validationMessages.aggregationStandardDate && (
                            <div className="text-red-500 text-xs mt-1">
                              {validationMessages.aggregationStandardDate}
                            </div>
                          )}
                        </div>
                      </>
                    )}
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
              <Button variant="contained" color="error">
                삭제
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outlined" color="secondary">
                목록
              </Button>
              <Button variant="outlined" color="secondary">
                결재요청
              </Button>
              <Button variant="contained">
                확정
              </Button>
              <Button variant="outlined" color="secondary">
                취소
              </Button>
              <Button variant="contained" onClick={handleSave}>
                저장
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 

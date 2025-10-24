"use client"
import React, { useState, useCallback, memo, useMemo, useReducer } from 'react'
import {
  Button, Typography, Breadcrumb, Card, CardContent, Accordion, AccordionSummary, AccordionDetails,
  TextField, InputAdornment, IconButton, Icons, FormControl, Select, MenuItem, DateRangePicker,
  Checkbox, FormControlLabel, RadioGroup, Radio,
} from '@/components'
import { Search, Minus, GripVertical } from 'lucide-react'
import { Alert, Snackbar } from '@mui/material'
// @ts-expect-error - DndProvider type definitions issue
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
// @ts-expect-error - useDrag and useDrop type definitions issue
import { useDrag, useDrop } from 'react-dnd'
import FixedRegularAccordion from './components/FixedRegularAccordion'
import FixedIrregularAccordion from './components/FixedIrregularAccordion'

// 상태 관리 최적화를 위한 reducer
type FormState = {
  ruleName: string; status: string; customerCode: string; deviceNumber: string; itemCode: string;
  itemDeviceNumber: string; contractAmount: string; salesReflectionTiming: string; salesReflectionTiming2: string;
  salesPurchaseType: string; salesPurchaseType2: string; taxType: string; description: string; itemType: string;
}

type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof FormState; value: string }
  | { type: 'RESET_FORM' }
  | { type: 'SET_FORM'; form: Partial<FormState> }

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value }
    case 'RESET_FORM':
      return {
        ruleName: '', status: '', customerCode: '', deviceNumber: '', itemCode: '', itemDeviceNumber: '',
        contractAmount: '', salesReflectionTiming: '', salesReflectionTiming2: '', salesPurchaseType: '',
        salesPurchaseType2: '', taxType: '', description: '', itemType: ''
      }
    case 'SET_FORM':
      return { ...state, ...action.form }
    default:
      return state
  }
}

type PageMode = 'view' | 'edit'
type FormulaType = string

const initialFormState: FormState = {
  ruleName: '', status: '', customerCode: '', deviceNumber: '', itemCode: '', itemDeviceNumber: '',
  contractAmount: '', salesReflectionTiming: '', salesReflectionTiming2: '', salesPurchaseType: '',
  salesPurchaseType2: '', taxType: '', description: '', itemType: ''
}

const ITEM_TYPE = 'RCARD'
interface DragItem { id: string; index: number }

interface DropTargetMonitor { isOver(): boolean; getClientOffset(): { x: number; y: number } | null }
interface DragSourceMonitor { isDragging(): boolean }
interface AccordionItem { id: string; type: 'fixed_regular' | 'fixed_irregular' | 'settlement'; title: string; data: Record<string, unknown>; formulaType: string }

// 드래그 가능한 R 카드 컴포넌트
const DraggableRCard = ({
  rType,
  index,
  getRCardTitle,
  getRCardContent,
  handleRemoveRCard,
  pageMode,
  moveCard
}: {
  rType: string
  index: number
  getRCardTitle: (rType: string) => string
  getRCardContent: (rType: string) => React.ReactNode
  handleRemoveRCard: (index: number) => void
  pageMode: PageMode
  moveCard: (dragIndex: number, hoverIndex: number) => void
}) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useDrop({
    accept: ITEM_TYPE,
    collect(monitor: DropTargetMonitor) {
      return {
        isOver: monitor.isOver(),
      }
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      // 드래그 중인 카드가 호버 중인 카드의 위쪽에 있는지 확인
      const isAbove = hoverClientY < hoverMiddleY

      // 카드 위에 떨어뜨리면 해당 위치로 이동
      if (isAbove) {
        // 위쪽으로 이동: dragIndex < hoverIndex이면 이미 정렬됨
        if (dragIndex < hoverIndex) {
          moveCard(dragIndex, hoverIndex)
          item.index = hoverIndex
        }
      } else {
        // 아래쪽으로 이동: dragIndex > hoverIndex이면 이미 정렬됨
        if (dragIndex > hoverIndex) {
          moveCard(dragIndex, hoverIndex)
          item.index = hoverIndex
        }
      }
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: rType, index }
    },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0.4 : 1
  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{
        opacity,
        border: isOver ? '2px dashed #3b82f6' : '1px solid #e5e7eb',
        backgroundColor: isOver ? '#f0f9ff' : 'white'
      }}
      className="rounded-lg p-4 relative transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {pageMode === 'edit' && (
            <div className="cursor-grab active:cursor-grabbing">
              <GripVertical size={16} className="text-gray-400" />
            </div>
          )}
          <Typography component="div" className="font-semibold text-gray-900">
            {rType} {getRCardTitle(rType)}
          </Typography>
        </div>
        {pageMode === 'edit' && (
          <div className="flex items-center" style={{ gap: '8px' }}>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleRemoveRCard(index)}
            >
              삭제
            </Button>
          </div>
        )}
      </div>
      {getRCardContent(rType)}
    </div>
  )
}

// 정산 아코디언 컴포넌트
const SettlementAccordion = memo(({ item, onRemove, pageMode }: {
  item: AccordionItem,
  onRemove: (id: string) => void,
  pageMode: PageMode
}) => {
  const [monthlySettlement] = useState((item.data.monthlySettlement as string) || '')
  const [salesPurchaseType, setSalesPurchaseType] = useState((item.data.salesPurchaseType as string) || '')
  const [salesPurchaseType2, setSalesPurchaseType2] = useState((item.data.salesPurchaseType2 as string) || '')
  const [selectedRType, setSelectedRType] = useState<string>('')
  const [rCards, setRCards] = useState<string[]>((item.data.rCards as string[]) || [])
  const [includeStartDate, setIncludeStartDate] = useState((item.data.includeStartDate as boolean) || false)
  const [includeEndDate, setIncludeEndDate] = useState((item.data.includeEndDate as boolean) || false)

  // 추가수익 매출정보 데이터
  const [salesData, setSalesData] = useState([
    { id: 'regular_card', usage: false, ratio: '', amountType: '' },
    { id: 'regular_cash', usage: false, ratio: '', amountType: '' },
    { id: 'discount_card', usage: false, ratio: '', amountType: '' },
    { id: 'discount_cash', usage: false, ratio: '', amountType: '' },
    { id: 'socar', usage: false, ratio: '', amountType: '' },
    { id: 'greencar', usage: false, ratio: '', amountType: '' },
    { id: 'peoplecar', usage: false, ratio: '', amountType: '' },
    { id: 'returnfree', usage: false, ratio: '', amountType: '' },
    { id: 'modu_discount', usage: false, ratio: '', amountType: '' },
    { id: 'modu_regular', usage: false, ratio: '', amountType: '' },
    { id: 'kakao_discount', usage: false, ratio: '', amountType: '' },
    { id: 'kakao_regular', usage: false, ratio: '', amountType: '' },
    { id: 'tmap_discount', usage: false, ratio: '', amountType: '' },
    { id: 'tmap_regular', usage: false, ratio: '', amountType: '' },
    { id: 'parking_friends_discount', usage: false, ratio: '', amountType: '' },
    { id: 'parking_box_discount', usage: false, ratio: '', amountType: '' },
    { id: 'parking_box_regular', usage: false, ratio: '', amountType: '' },
    { id: 'jumansa', usage: false, ratio: '', amountType: '' },
    { id: 'post_settlement_card', usage: false, ratio: '', amountType: '' },
    { id: 'post_settlement_cash', usage: false, ratio: '', amountType: '' },
    { id: 'refund', usage: false, ratio: '', amountType: '' },
    { id: 'garage_regular', usage: false, ratio: '', amountType: '' },
    { id: 'garage_discount', usage: false, ratio: '', amountType: '' },
    { id: 'pcmk_regular', usage: false, ratio: '', amountType: '' },
    { id: 'pcmk_discount', usage: false, ratio: '', amountType: '' }
  ])

  // 테이블 형태 정산 데이터 상태
  const [tableSettlementData, setTableSettlementData] = useState<Array<{
    id: number;
    criteria: string;
    criteriaMin: string;
    criteriaMax: string;
    amountType: string;
    amount: string;
  }>>([
    {
      id: 1,
      criteria: "",
      criteriaMin: "",
      criteriaMax: "",
      amountType: "",
      amount: ""
    }
  ]);

  // 테이블 행 추가
  const handleAddTableRow = useCallback(() => {
    setTableSettlementData(prev => {
      const newId = prev.length > 0
        ? Math.max(...prev.map(item => item.id)) + 1
        : 1;
      return [
        ...prev,
        {
          id: newId,
          criteria: "",
          criteriaMin: "",
          criteriaMax: "",
          amountType: "",
          amount: ""
        }
      ];
    });
  }, []);

  // 테이블 행 삭제
  const handleDeleteTableRow = useCallback((id: number) => {
    setTableSettlementData(prev => {
      if (prev.length > 1) {
        return prev.filter(item => item.id !== id);
      }
      return prev;
    });
  }, []);

  // 테이블 필드 변경
  const handleTableRowChange = useCallback((id: number, field: string, value: string) => {
    setTableSettlementData(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  }, []);

  // 추가 임차료, 수익 데이터
  const [additionalRentData, setAdditionalRentData] = useState<Array<{
    id: number
    case: string
    amount: string
    reason: string
    period: string[]
  }>>([
    { id: 1, case: '', amount: '', reason: '', period: ['', ''] },
    { id: 2, case: '', amount: '', reason: '', period: ['', ''] }
  ]);

  // 추가 임차료 행 삭제
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteAdditionalRentRow = (id: number) => {
    if (additionalRentData.length > 1) {
      setAdditionalRentData(prev => prev.filter(item => item.id !== id));
    }
  };

  // 추가 임차료 필드 변경
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAdditionalRentChange = (id: number, field: string, value: string | string[]) => {
    setAdditionalRentData(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // R 카드 관련 함수들
  const handleAddRCard = () => {
    if (selectedRType) {
      setRCards(prev => [...prev, selectedRType])
      setSelectedRType('') // 선택 초기화
    }
  }

  const handleRemoveRCard = (index: number) => {
    setRCards(prev => prev.filter((_, i) => i !== index))
  }

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    setRCards(prev => {
      const newCards = [...prev]
      const draggedCard = newCards[dragIndex]
      newCards.splice(dragIndex, 1)
      newCards.splice(hoverIndex, 0, draggedCard)
      return newCards
    })
  }

  const getRCardTitle = (rType: string): string => {
    const titles: Record<string, string> = {
      'R01': '정액정률계산',
      'R02': '차액보전',
      'R03': '조건별구간요율',
      'R04': '초과분비율배분',
      'R05': '일할계산',
      'R06': '상한/하한보정',
      'R07': '세금계산서발행일 자동변경',
      'R08': '품목그룹계산',
      'R09': '부가세계산',
      'R10': '절사',
      'R11': '점주(대리점)',
      'R12': '브랜드제휴 변동보전료',
      'R13': '현금/일괄 용역료',
      'R14': '전기료'
    }
    return titles[rType] || ''
  }

  const getFormulaTypeLabel = (type: string): string => {
    const typeLabels: Record<string, string> = {
      'normal': '일반',
      'park_a': '주차(직영)',
      'park_b': '주차(위탁)'
    }
    return typeLabels[type] || `${type.toUpperCase()}타입`
  }

  const getRCardContent = (rType: string) => {
    switch (rType) {
      case 'R01': // 정액정률계산
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%', alignItems: 'flex-end' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">정산기준</label>
                <Select
                  size="small"
                  disabled={pageMode === 'view'}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value=""><span>선택</span></MenuItem>
                  <MenuItem value="옵션1">옵션1</MenuItem>
                  <MenuItem value="옵션2">옵션2</MenuItem>
                  <MenuItem value="옵션3">옵션3</MenuItem>
                </Select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">연산자</label>
                <Select
                  size="small"
                  disabled={pageMode === 'view'}
                  sx={{ width: '100%' }}
                >
                  <MenuItem value=""><span>선택</span></MenuItem>
                  <MenuItem value="옵션1">옵션1</MenuItem>
                  <MenuItem value="옵션2">옵션2</MenuItem>
                  <MenuItem value="옵션3">옵션3</MenuItem>
                </Select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">값</label>
                <div style={{ display: 'flex', gap: 4, width: '100%' }}>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={(e) => {
                      // 숫자만 입력받기 (숫자 이외 제거)
                      const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                      setSalesPurchaseType(onlyNumbers);
                    }}
                    sx={{
                      width: '100%'
                    }}
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 정산기준 × 연산자(+ − × ÷) × 값
              </Typography>
            </div>
          </>
        );

      case 'R02': // 차액보전
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  보전금액
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 입력받기 (숫자 이외 제거)
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(onlyNumbers);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * (보전금액-계산금액)
              </Typography>
            </div>
          </>
        );

      case 'R03': // 조건별구간요율
        return (
          <>
            <div className="mt-2">
              <table className="rul-table">
                <thead>
                  <tr>
                    <th className="text-center" style={{ minWidth: '100px' }}>
                      <label className="form-top-label required mb-0">
                        정산기준
                      </label>
                    </th>
                    <th className="text-center" style={{ minWidth: '80px' }}>
                      <label className="form-top-label mb-0">
                        기준&gt;
                      </label>
                    </th>
                    <th className="text-center" style={{ minWidth: '80px' }}>
                      <label className="form-top-label mb-0">
                        기준≤
                      </label>
                    </th>
                    <th className="text-center" style={{ minWidth: '100px' }}>
                      <label className="form-top-label required mb-0">
                        정산금액
                      </label>
                    </th>
                    <th className="text-center">
                      <label className="form-top-label mb-0">
                        <span style={{ visibility: 'hidden' }}></span>
                      </label>
                    </th>
                    <th className="text-center" style={{ width: '35px' }}>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {tableSettlementData.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <Select
                          value={row.criteria}
                          onChange={(e) => handleTableRowChange(row.id, 'criteria', e.target.value)}
                          size="small"
                          disabled={pageMode === 'view'}
                          sx={{ width: '100%' }}
                        >
                          <MenuItem value=""><span>선택</span></MenuItem>
                          <MenuItem value="옵션1">옵션1</MenuItem>
                          <MenuItem value="옵션2">옵션2</MenuItem>
                          <MenuItem value="옵션3">옵션3</MenuItem>
                        </Select>
                      </td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          disabled={pageMode === 'view'}
                          value={row.criteriaMin}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            handleTableRowChange(row.id, 'criteriaMin', value);
                          }}
                          sx={{
                            width: '100%',
                            '& input': { textAlign: 'right' }
                          }}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          disabled={pageMode === 'view'}
                          value={row.criteriaMax}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            handleTableRowChange(row.id, 'criteriaMax', value);
                          }}
                          sx={{
                            width: '100%',
                            '& input': { textAlign: 'right' }
                          }}
                        />
                      </td>
                      <td>
                        <Select
                          value={row.amountType}
                          onChange={(e) => handleTableRowChange(row.id, 'amountType', e.target.value)}
                          size="small"
                          disabled={pageMode === 'view'}
                          sx={{ width: '100%' }}
                        >
                          <MenuItem value=""><span>선택</span></MenuItem>
                          <MenuItem value="옵션1">옵션1</MenuItem>
                          <MenuItem value="옵션2">옵션2</MenuItem>
                          <MenuItem value="옵션3">옵션3</MenuItem>
                        </Select>
                      </td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          disabled={pageMode === 'view'}
                          value={row.amount}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            handleTableRowChange(row.id, 'amount', value);
                          }}
                          sx={{
                            width: '100%',
                            '& input': { textAlign: 'right' }
                          }}
                        />
                      </td>
                      <td className="text-center">
                        {pageMode === 'edit' && (
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            className="xsmallbtn2"
                            startIcon={<Minus size={16} />}
                            onClick={() => handleDeleteTableRow(row.id)}
                          >
                            <span style={{ display: "none" }}>삭제</span>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pageMode === 'edit' && (
                <div className="flex items-center mt-2" style={{ gap: '8px' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleAddTableRow}
                  >
                    추가
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-2">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 기준구간별 금액
              </Typography>
            </div>
          </>
        );

      case 'R04': // 초과분비율배분
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">기준금액</label>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={e => {
                    // 숫자만 입력 가능하도록 처리
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    setSalesPurchaseType(value);
                  }}
                  sx={{
                    width: '100%',
                    '& input': { textAlign: 'right' }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  비율
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 추출
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(raw);
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span className="text-secondary" style={{ fontSize: 12 }}>%</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * (매출금액&gt;기준금액)?(매출금액-기준금액)&times;비율:0
              </Typography>
            </div>
          </>
        );

      case 'R05': // 일할계산
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-0">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label">
                  일할계산
                </label>
                <div className="flex gap-0 mt-0">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={includeStartDate}
                        onChange={(e) => setIncludeStartDate(e.target.checked)}
                        size="small"
                        disabled={pageMode === 'view'}
                      />
                    }
                    label="시작일 포함"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={includeEndDate}
                        onChange={(e) => setIncludeEndDate(e.target.checked)}
                        size="small"
                        disabled={pageMode === 'view'}
                      />
                    }
                    label="종료일 포함"
                  />
                </div>
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 금액&times;(사용일수&#47;기준일수)
              </Typography>
            </div>
          </>
        );

      case 'R06': // 상한/하한보정
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  상한액
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 입력받기 (숫자 이외 제거)
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(onlyNumbers);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  하한액
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 입력받기 (숫자 이외 제거)
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(onlyNumbers);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * min/max 보정
              </Typography>
            </div>
          </>
        );

      case 'R07': // 세금계산서발행일 자동변경
        return (
          <>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 휴일인 경우 +일수로 세금계산서발행일 변경
              </Typography>
            </div>
          </>
        );

      case 'R08': // 품목그룹계산
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <table className="rul-table">
                  <thead>
                    <tr>
                      <th className="w-auto">대표</th>
                      <th className="w-24">주차장코드</th>
                      <th className="w-auto">주차장명</th>
                      <th className="w-6 p-1" style={{ minWidth: '35px' }}>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parkingLotData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.representative}</td>
                        <td className="w-24">
                          {item.id !== 1 ? (
                            <div className="flex items-center gap-1">
                              <TextField
                                variant="outlined"
                                size="small"
                                value={item.code}
                                onChange={(e) => {
                                  setParkingLotData(prev => prev.map(p =>
                                    p.id === item.id ? { ...p, code: e.target.value } : p
                                  ))
                                }}
                                sx={{ width: '120px' }}
                                disabled={pageMode === 'view'}
                              />
                              <Button
                                variant="outlined"
                                size="small"
                                color="secondary"
                                className="xsmallbtn3"
                                startIcon={<Search size={16} />}
                                disabled={pageMode === 'view'}
                              >
                                <span style={{ display: "none" }}>검색</span>
                              </Button>
                            </div>
                          ) : (
                            item.code
                          )}
                        </td>
                        <td>{item.name}</td>
                        <td className="w-6 p-1">
                          {pageMode === 'edit' && item.id !== 1 && (
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              className="xsmallbtn2"
                              startIcon={<Minus size={16} />}
                              onClick={() => {
                                setParkingLotData(prev => prev.filter(p => p.id !== item.id))
                              }}
                            >
                              <span style={{ display: "none" }}>삭제</span>
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {pageMode === 'edit' && (
                  <div className="flex items-center mt-2" style={{ gap: '8px' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={handleAddParkingLotRow}
                    >
                      추가
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 품목 합산하여 계산 후 안분
              </Typography>
            </div>
          </>
        );

      case 'R09': // 부가세계산
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  계산금액인식
                </label>
                <Select
                  variant="outlined"
                  size="small"
                  disabled={pageMode === 'view'}
                  sx={{
                    width: '100%',
                    '& .MuiSelect-select': {
                      textAlign: 'left'
                    }
                  }}
                  defaultValue="합계금액"
                >
                  <MenuItem value="합계금액">합계금액</MenuItem>
                </Select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  부가세율
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 추출
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(raw);
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span className="text-secondary" style={{ fontSize: 12 }}>%</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 부가세=공급가액*부가세율
              </Typography>
            </div>
          </>
        );

      case 'R10': // 절사
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-0">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  소수점자리
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 추출
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(raw);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required mb-0">
                  개선방식
                </label>
                <div style={{ paddingTop: '-16px !important', paddingBottom: '-16px !important' }}>
                  <RadioGroup
                    row
                    name="paymentAgencyType"
                    defaultValue="반올림"
                  >
                    <FormControlLabel
                      value="반올림"
                      control={<Radio disabled={pageMode === 'view'} />}
                      label="반올림"
                    />
                    <FormControlLabel
                      value="올림"
                      control={<Radio disabled={pageMode === 'view'} />}
                      label="올림"
                    />
                    <FormControlLabel
                      value="내림"
                      control={<Radio disabled={pageMode === 'view'} />}
                      label="내림"
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 소수점자리에서 절사
              </Typography>
            </div>
          </>
        );

      case 'R11': // 점주(대리점)
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  점주유형
                </label>
                <Select
                  variant="outlined"
                  size="small"
                  disabled={pageMode === 'view'}
                  sx={{
                    width: '100%',
                    '& .MuiSelect-select': {
                      textAlign: 'left'
                    }
                  }}
                  defaultValue="선택"
                >
                  <MenuItem value="선택">선택1</MenuItem>
                </Select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  기준금액
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 입력받기 (숫자 이외 제거)
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(onlyNumbers);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label">
                  대리점 배분율
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 추출
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(raw);
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span className="text-secondary" style={{ fontSize: 12 }}>%</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 소수점자리에서 절사
              </Typography>
            </div>
          </>
        );

      case 'R12': // 브랜드제휴 변동보전료
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  월외주관리비용
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 입력받기 (숫자 이외 제거)
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(onlyNumbers);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  인접장소
                </label>
                <Select
                  variant="outlined"
                  size="small"
                  disabled={pageMode === 'view'}
                  sx={{
                    width: '100%',
                    '& .MuiSelect-select': {
                      textAlign: 'left'
                    }
                  }}
                  defaultValue="선택"
                >
                  <MenuItem value="선택">선택1</MenuItem>
                </Select>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  기준금액
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 입력받기 (숫자 이외 제거)
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(onlyNumbers);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label">
                  단독부스비용
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 입력받기 (숫자 이외 제거)
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(onlyNumbers);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label">
                  임차료
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 입력받기 (숫자 이외 제거)
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(onlyNumbers);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <span className="text-secondary" style={{ fontSize: 12 }}>₩</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label">
                  초과배분율
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 추출
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(raw);
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <span className="text-secondary" style={{ fontSize: 12 }}>%</span>
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 브랜드제휴 변동보전료
              </Typography>
            </div>
          </>
        );

      case 'R13': // 현금/일괄 용역료
        return (
          <>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 현금/일괄 용역료 기준표 계약단가 계산
              </Typography>
            </div>
          </>
        );

      case 'R14': // 전기료
        return (
          <>
            <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mt-2 mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">
                  소수점자리
                </label>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType}
                  onChange={(e) => {
                    // 숫자만 추출
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    setSalesPurchaseType(raw);
                  }}
                  sx={{
                    width: '100%',
                    '& input': {
                      textAlign: 'right'
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />
              </div>
            </div>
            <div className="mb-0">
              <Typography
                component="div"
                className="text-sm"
                style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
              >
                * 전기료 I/F
              </Typography>
            </div>
          </>
        );



      default:
        return (
          <div style={{ display: 'flex', gap: 4, width: '100%' }} className="mb-2">
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label className="form-top-label required">금액</label>
              <TextField
                variant="outlined"
                size="small"
                disabled={pageMode === 'view'}
                value={salesPurchaseType}
                onChange={e => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setSalesPurchaseType(value);
                }}
                sx={{
                  width: '100%',
                  '& input': { textAlign: 'right' }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="text-secondary" style={{ fontSize: 12 }}>원</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label className="form-top-label required">비율</label>
              <TextField
                variant="outlined"
                size="small"
                disabled={pageMode === 'view'}
                value={salesPurchaseType2}
                onChange={e => {
                  const value = e.target.value.replace(/[^0-9.]/g, '');
                  setSalesPurchaseType2(value);
                }}
                sx={{
                  width: '100%',
                  '& input': { textAlign: 'right' }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <span className="text-secondary" style={{ fontSize: 12 }}>%</span>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        );
    }
  }

  // 임차료 산정카드 수수료 항목 상태
  const [timeDiffCard, setTimeDiffCard] = useState(false)
  const [timeDiffCash, setTimeDiffCash] = useState(false)
  const [regularCard, setRegularCard] = useState(false)
  const [regularCash, setRegularCash] = useState(false)
  const [discountCard, setDiscountCard] = useState(false)
  const [discountCash, setDiscountCash] = useState(false)
  const [refundCard, setRefundCard] = useState(false)
  const [refundCash, setRefundCash] = useState(false)
  const [postSettlementCard, setPostSettlementCard] = useState(false)
  const [postSettlementCash, setPostSettlementCash] = useState(false)
  const [platformCash, setPlatformCash] = useState(false)

  // 대표 주차장 데이터
  const [parkingLotData, setParkingLotData] = useState<Array<{ id: number; representative: string; code: string; name: string }>>([
    { id: 1, representative: '대표', code: 'NP0510', name: '동탄 센타타워' }
  ])

  // 주차장 행 추가
  const handleAddParkingLotRow = () => {
    const newId = parkingLotData.length > 0
      ? Math.max(...parkingLotData.map(item => item.id)) + 1
      : 1;
    setParkingLotData(prev => [
      ...prev,
      {
        id: newId,
        representative: '서브',
        code: '',
        name: ''
      }
    ]);
  };

  const isViewMode = (mode: PageMode): mode is 'view' => mode === 'view'

  return (
    <Accordion>
      <AccordionSummary
        aria-controls={`panel-${item.id}-content`}
        id={`panel-${item.id}-header`}
        sx={{ '& .MuiAccordionSummary-expandIconWrapper': { display: 'none' } }}
      >
        <div className="flex items-center justify-between w-full gap-2">
          <Typography component="div" sx={{ flex: 1 }}>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 border border-blue-400 text-blue-600 rounded-full text-xs font-semibold bg-white">
                {item.title}
              </span>
              {item.formulaType && (
                <span className="px-2 py-0.5 border border-gray-300 text-gray-500 rounded-full text-xs font-semibold bg-white">
                  {getFormulaTypeLabel(item.formulaType)}
                </span>
              )}
              {/* 정산 제목은 읽기 전용 (edit 모드에서도 수정 불가) */}
              {monthlySettlement || "제목"}
            </div>
          </Typography>
          <Button
            variant="outlined"
            size="small"
            color="error"
            component="div"
            onClick={(e) => {
              e.stopPropagation()
              onRemove(item.id)
            }}
          >
            삭제
          </Button>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {/* 정산수식 섹션 - 일반타입만 표시 */}
        {item.formulaType === 'normal' ? (
          <>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-0 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Typography component="div" className="font-semibold text-gray-900">
                  <span style={{ marginRight: "8px" }}>
                    규칙 구성
                  </span>
                  <span style={{ fontSize: '14px' }} className="text-gray-400">
                     (
                  </span>
                  <span style={{ fontSize: '14px' }} className="text-gray-900">
                     {rCards.length}
                  </span>
                  <span style={{ fontSize: '14px' }} className="text-gray-400">
                     /10)
                  </span>
                </Typography>
                {pageMode === 'edit' && (
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <Select
                      value={selectedRType}
                      onChange={(e) => setSelectedRType(e.target.value)}
                      size="small"
                      sx={{ minWidth: 220 }}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <span>선택</span>
                      </MenuItem>
                      <MenuItem value="R01">R01:정액정률계산</MenuItem>
                      <MenuItem value="R02">R02:차액보전</MenuItem>
                      <MenuItem value="R03">R03:조건별구간요율</MenuItem>
                      <MenuItem value="R04">R04:초과분비율배분</MenuItem>
                      <MenuItem value="R05">R05:일할계산</MenuItem>
                      <MenuItem value="R06">R06:상한/하한보정</MenuItem>
                      <MenuItem value="R07">R07:세금계산서발행일 자동변경</MenuItem>
                      <MenuItem value="R08">R08:품목그룹계산</MenuItem>
                      <MenuItem value="R09">R09:부가세계산</MenuItem>
                      <MenuItem value="R10">R10:절사</MenuItem>
                      <MenuItem value="R11">R11:점주(대리점)</MenuItem>
                      <MenuItem value="R12">R12:브랜드제휴 변동보전료</MenuItem>
                      <MenuItem value="R13">R13:현금/일괄 용역료</MenuItem>
                      <MenuItem value="R14">R14:전기료</MenuItem>
                    </Select>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={handleAddRCard}
                      disabled={!selectedRType || rCards.length >= 10}
                    >
                      추가
                    </Button>
                  </div>
                )}
              </div>

              {/* 동적으로 생성되는 R 카드들 */}
              <div className="flex flex-col gap-2">
                {rCards.length > 0 ? (
                  rCards.map((rType, index) => (
                    <DraggableRCard
                      key={`${rType}-${index}`}
                      rType={rType}
                      index={index}
                      getRCardTitle={getRCardTitle}
                      getRCardContent={getRCardContent}
                      handleRemoveRCard={handleRemoveRCard}
                      pageMode={pageMode}
                      moveCard={moveCard}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center py-8 px-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <Typography
                      component="div"
                      className="text-gray-500 text-sm"
                      style={{ fontSize: '14px' }}
                    >
                      수식을 선택해주세요
                    </Typography>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-3 mb-0">
              <div className="flex items-center justify-between mb-2">
                <Typography component="div" className="font-semibold text-gray-900">
                  수식테스트
                </Typography>
                {pageMode === 'edit' && (
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      초기화
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      테스트
                    </Button>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mb-2 mt-2">
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="form-top-label">매출액</label>
                  <TextField
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={e => {
                      // 숫자만 입력 가능하도록 처리
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setSalesPurchaseType(value);
                    }}
                    sx={{
                      width: '100%',
                      '& input': { textAlign: 'right' }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <span>₩</span>
                        </InputAdornment>
                      )
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="form-top-label">건수</label>
                  <TextField
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={e => {
                      // 숫자만 입력 가능하도록 처리
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setSalesPurchaseType(value);
                    }}
                    sx={{
                      width: '100%',
                      '& input': { textAlign: 'right' }
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="form-top-label">충전량(kWh)</label>
                  <TextField
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={e => {
                      // 숫자만 입력 가능하도록 처리
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setSalesPurchaseType(value);
                    }}
                    sx={{
                      width: '100%',
                      '& input': { textAlign: 'right' }
                    }}
                  />
                </div>
              </div>
              <div
                className="bg-blue-100 flex gap-2 text-blue-600 py-3 justify-between"
                style={{ borderRadius: '8px' }}
              >
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-light" style={{ marginBottom: 4, fontSize: '13px' }}>공급가액</div>
                  <div className="font-semibold">0</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-light" style={{ marginBottom: 4, fontSize: '13px' }}>부가세</div>
                  <div className="font-semibold">0</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-light" style={{ marginBottom: 4, fontSize: '13px' }}>합계</div>
                  <div className="font-semibold">0</div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {(item.formulaType === 'park_a' || item.formulaType === 'park_b') && (
          <div>
            {/* 1. 지급대행 기준정보 */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-3">
              <div className="flex items-center justify-start mb-2">
                <Typography component="div" className="font-semibold text-gray-900">
                  1. 지급대행 기준정보
                </Typography>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <div>
                  <label className="form-top-label">
                    계약형태
                  </label>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="text"
                    disabled={pageMode === 'view'}
                    sx={{
                      width: '100%',
                      '& input': {
                        textAlign: 'left'
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="form-top-label required mb-0">
                    지급대행 대상여부
                  </label>
                  <div style={{ paddingTop: '-8px', paddingBottom: '-8px' }}>
                    <RadioGroup
                      row
                      name="paymentAgencyType"
                      defaultValue="지급대행방식"
                    >
                      <FormControlLabel
                        value="지급대행"
                        control={<Radio disabled={pageMode === 'view'} />}
                        label="지급대행"
                      />
                      <FormControlLabel
                        value="일반"
                        control={<Radio disabled={pageMode === 'view'} />}
                        label="일반"
                      />
                    </RadioGroup>
                  </div>
                </div>
                {item.formulaType === 'park_b' ? (
                  <>
                    <div>
                      <div>
                        <label className="form-top-label required mb-0">
                          위탁용역료 공제여부
                        </label>
                        <div style={{ paddingTop: '-8px', paddingBottom: '-8px' }}>
                          <RadioGroup
                            row
                            name="paymentAgencyType"
                            defaultValue="지급대행방식"
                          >
                            <FormControlLabel
                              value="대상"
                              control={<Radio disabled={pageMode === 'view'} />}
                              label="대상"
                            />
                            <FormControlLabel
                              value="비대상"
                              control={<Radio disabled={pageMode === 'view'} />}
                              label="비대상"
                            />
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="form-top-label">
                        지급일자
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        disabled={pageMode === 'view'}
                        InputProps={{
                          endAdornment: <span>일</span>,
                        }}
                        sx={{
                          width: '100%',
                          '& input': {
                            textAlign: 'right'
                          }
                        }}
                      />
                    </div>
                    <div>
                      <label className="form-top-label required">
                        지급대행수수료율
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="text"
                        disabled={pageMode === 'view'}
                        InputProps={{
                          endAdornment: <span>%</span>,
                        }}
                        sx={{
                          width: '100%',
                          '& input': {
                            textAlign: 'right'
                          }
                        }}
                      />
                    </div>
                  </>
                ) : (
                  // e타입만 입력가능, 값이 d타입에서는 null이 되도록 처리
                  <>
                    {/* e타입이 아닐 때 값 null 유지용 dummy */}
                  </>
                )}
              </div>
            </div>
            {/* 2. 대표 주차장 적용 */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <Typography component="div" className="font-semibold text-gray-900">
                  2. 대표 주차장 적용
                </Typography>
              </div>
              <table className="rul-table">
                <thead>
                  <tr>
                    <th className="w-auto">대표</th>
                    <th className="w-24">주차장코드</th>
                    <th className="w-auto">주차장명</th>
                    <th className="w-6 p-1" style={{ minWidth: '35px' }}>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {parkingLotData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.representative}</td>
                      <td className="w-24">
                        {item.id !== 1 ? (
                          <div className="flex items-center gap-1">
                            <TextField
                              variant="outlined"
                              size="small"
                              value={item.code}
                              onChange={(e) => {
                                setParkingLotData(prev => prev.map(p =>
                                  p.id === item.id ? { ...p, code: e.target.value } : p
                                ))
                              }}
                              sx={{ width: '120px' }}
                              disabled={pageMode === 'view'}
                            />
                            <Button
                              variant="outlined"
                              size="small"
                              color="secondary"
                              className="xsmallbtn3"
                              startIcon={<Search size={16} />}
                              disabled={pageMode === 'view'}
                            >
                              <span style={{ display: "none" }}>검색</span>
                            </Button>
                          </div>
                        ) : (
                          item.code
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td className="w-6 p-1">
                        {pageMode === 'edit' && item.id !== 1 && (
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            className="xsmallbtn2"
                            startIcon={<Minus size={16} />}
                            onClick={() => {
                              setParkingLotData(prev => prev.filter(p => p.id !== item.id))
                            }}
                          >
                            <span style={{ display: "none" }}>삭제</span>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {pageMode === 'edit' && (
                <div className="flex items-center mt-2" style={{ gap: '8px' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={handleAddParkingLotRow}
                  >
                    추가
                  </Button>
                </div>
              )}
            </div>
            {/* 3. 계약 현황 */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-3">
              <div className="mb-3">
                <Typography component="div" className="font-semibold text-gray-900">
                  3. 계약 현황
                </Typography>
              </div>
              <div
                className="mb-1"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {item.formulaType === 'park_a' && (
                  <div>
                    <label className="form-top-label">
                      임차료 지급방식
                    </label>
                    <Select
                      variant="outlined"
                      size="small"
                      disabled={pageMode === 'view'}
                      sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                          textAlign: 'left'
                        }
                      }}
                      defaultValue="수익배분"
                    >
                      <MenuItem value="수익배분">수익배분</MenuItem>
                    </Select>
                  </div>
                )}

                {item.formulaType === 'park_b' && (
                  <div>
                    <label className="form-top-label">
                      위탁용역료
                    </label>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      disabled={pageMode === 'view'}
                      InputProps={{
                        endAdornment: <span>원</span>,
                      }}
                      sx={{
                        width: '100%',
                        '& input': {
                          textAlign: 'right'
                        }
                      }}
                    />
                  </div>
                )}
                <div>
                  <label className="form-top-label">
                    임차료 납부방식
                  </label>
                  <Select
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    sx={{
                      width: '100%',
                      '& .MuiSelect-select': {
                        textAlign: 'left'
                      }
                    }}
                    defaultValue=""
                  >
                    <MenuItem value="">선택</MenuItem>
                    <MenuItem value="월납">월납</MenuItem>
                  </Select>
                </div>
                {item.formulaType === 'park_a' && (
                  <div>
                    <label className="form-top-label required">
                      결제수수료율
                    </label>
                    <TextField
                      variant="outlined"
                      size="small"
                      type="text"
                      disabled={pageMode === 'view'}
                      sx={{
                        width: '100%',
                        '& input': {
                          textAlign: 'left'
                        }
                      }}
                      defaultValue=""
                    />
                    <div style={{ color: '#d32f2f', fontSize: '12px' }} className="mt-1">
                      * 카드 수수료율은 소수점 둘째 자리까지 입력 가능합니다
                    </div>
                  </div>
                )}
                <div>
                  <label className="form-top-label mb-0">
                    임차료 계산결과
                  </label>
                  <div style={{ paddingTop: '-8px', paddingBottom: '-8px' }}>
                    <RadioGroup
                      row
                      name="paymentAgencyType"
                      defaultValue="반올림"
                    >
                      <FormControlLabel
                        value="반올림"
                        control={<Radio disabled={pageMode === 'view'} />}
                        label="반올림"
                      />
                      <FormControlLabel
                        value="올림"
                        control={<Radio disabled={pageMode === 'view'} />}
                        label="올림"
                      />
                      <FormControlLabel
                        value="내림"
                        control={<Radio disabled={pageMode === 'view'} />}
                        label="내림"
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {item.formulaType === 'park_a' && (
                <div className="mt-2">
                  <label className="form-top-label">
                    임차료 산정카드 수수료 항목
                  </label>
                  <div className="flex flex-wrap">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={timeDiffCard}
                          onChange={(e) => setTimeDiffCard(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="시간차(카드)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={timeDiffCash}
                          onChange={(e) => setTimeDiffCash(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="시간차(현금)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={regularCard}
                          onChange={(e) => setRegularCard(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="정기권(카드)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={regularCash}
                          onChange={(e) => setRegularCash(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="정기권(현금)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={discountCard}
                          onChange={(e) => setDiscountCard(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="할인권(카드)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={discountCash}
                          onChange={(e) => setDiscountCash(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="할인권(현금)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={refundCard}
                          onChange={(e) => setRefundCard(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="환불(카드)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={refundCash}
                          onChange={(e) => setRefundCash(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="환불(현금)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={postSettlementCard}
                          onChange={(e) => setPostSettlementCard(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="사후정산(카드)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={postSettlementCash}
                          onChange={(e) => setPostSettlementCash(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="사후정산(현금)"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={platformCash}
                          onChange={(e) => setPlatformCash(e.target.checked)}
                          size="small"
                          disabled={pageMode === 'view'}
                        />
                      }
                      label="플랫폼(현금)"
                    />
                  </div>
                </div>
              )}
            </div>
            {/* 4. 추가수익 매출정보 */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-3">
              <div className="mb-3 flex items-center justify-between">
                <Typography component="div" className="font-semibold text-gray-900">
                  4. 추가수익 매출정보
                </Typography>
                <Typography
                  component="div"
                  className="text-sm"
                  style={{ fontSize: '12px', color: '#6b7280' }} // gray-500
                >
                  * 체크박스는 사용여부
                </Typography>
              </div>
              <table className="rul-table">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: '80px' }} colSpan={3}>CASE</th>
                    <th className="text-center" style={{ width: '50px' }}>
                      <Checkbox
                        checked={salesData.every(item => item.usage)}
                        indeterminate={salesData.some(item => item.usage) && !salesData.every(item => item.usage)}
                        onChange={(e) => {
                          const checked = e.target.checked
                          setSalesData(prev => prev.map(item => ({ ...item, usage: checked })))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'flex', justifyContent: 'center' }}
                      />
                    </th>
                    <th className="text-center" style={{ width: '120px' }}>비율(%)</th>
                    <th className="text-center" style={{ width: '120px' }}>금액타입</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 정기권 */}
                  <tr>
                    <td className="text-center font-semibold" rowSpan={2} colSpan={2}>정기권</td>
                    <td className="text-center">카드</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'regular_card')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'regular_card' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'regular_cash')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'regular_cash' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                  {/* 할인권 */}
                  <tr>
                    <td className="text-center font-semibold" rowSpan={2} colSpan={2}>할인권</td>
                    <td className="text-center">카드</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'discount_card')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'discount_card' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'discount_cash')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'discount_cash' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                  {/* 카셰어링 */}
                  <tr>
                    <td className="text-center font-semibold" rowSpan={4}>카셰어링</td>
                    <td className="text-center">쏘카</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'socar')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'socar' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      <TextField
                        variant="outlined"
                        size="small"
                        value={salesData.find(item => item.id === 'socar')?.ratio || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'socar' ? { ...item, ratio: e.target.value } : item
                          ))
                        }}
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'socar')?.usage}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': {
                            textAlign: 'right'
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <Select
                        value={salesData.find(item => item.id === 'socar')?.amountType || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'socar' ? { ...item, amountType: e.target.value } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'socar')?.usage}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value=""><span>선택</span></MenuItem>
                        <MenuItem value="고정">고정</MenuItem>
                        <MenuItem value="변동">변동</MenuItem>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">그린카</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'greencar')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'greencar' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      <TextField
                        variant="outlined"
                        size="small"
                        value={salesData.find(item => item.id === 'greencar')?.ratio || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'greencar' ? { ...item, ratio: e.target.value } : item
                          ))
                        }}
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'greencar')?.usage}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': {
                            textAlign: 'right'
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <Select
                        value={salesData.find(item => item.id === 'greencar')?.amountType || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'greencar' ? { ...item, amountType: e.target.value } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'greencar')?.usage}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value=""><span>선택</span></MenuItem>
                        <MenuItem value="고정">고정</MenuItem>
                        <MenuItem value="변동">변동</MenuItem>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">피플카</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'peoplecar')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'peoplecar' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      <TextField
                        variant="outlined"
                        size="small"
                        value={salesData.find(item => item.id === 'peoplecar')?.ratio || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'peoplecar' ? { ...item, ratio: e.target.value } : item
                          ))
                        }}
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'peoplecar')?.usage}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': {
                            textAlign: 'right'
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <Select
                        value={salesData.find(item => item.id === 'peoplecar')?.amountType || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'peoplecar' ? { ...item, amountType: e.target.value } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'peoplecar')?.usage}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value=""><span>선택</span></MenuItem>
                        <MenuItem value="고정">고정</MenuItem>
                        <MenuItem value="변동">변동</MenuItem>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">리턴프리</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'returnfree')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'returnfree' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      <TextField
                        variant="outlined"
                        size="small"
                        value={salesData.find(item => item.id === 'returnfree')?.ratio || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'returnfree' ? { ...item, ratio: e.target.value } : item
                          ))
                        }}
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'returnfree')?.usage}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': {
                            textAlign: 'right'
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <Select
                        value={salesData.find(item => item.id === 'returnfree')?.amountType || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'returnfree' ? { ...item, amountType: e.target.value } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'returnfree')?.usage}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value=""><span>선택</span></MenuItem>
                        <MenuItem value="고정">고정</MenuItem>
                        <MenuItem value="변동">변동</MenuItem>
                      </Select>
                    </td>
                  </tr>
                  {/* 플랫폼매출 */}
                  <tr>
                    <td className="text-center font-semibold" rowSpan={10}>플랫폼매출</td>
                    <td className="text-center">모두-할인</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'modu_discount')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'modu_discount' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      <TextField
                        variant="outlined"
                        size="small"
                        value={salesData.find(item => item.id === 'modu_discount')?.ratio || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'modu_discount' ? { ...item, ratio: e.target.value } : item
                          ))
                        }}
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'modu_discount')?.usage}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': {
                            textAlign: 'right'
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <Select
                        value={salesData.find(item => item.id === 'modu_discount')?.amountType || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'modu_discount' ? { ...item, amountType: e.target.value } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'modu_discount')?.usage}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value=""><span>선택</span></MenuItem>
                        <MenuItem value="고정">고정</MenuItem>
                        <MenuItem value="변동">변동</MenuItem>
                      </Select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">모두-정기</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'modu_regular')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'modu_regular' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      <TextField
                        variant="outlined"
                        size="small"
                        value={salesData.find(item => item.id === 'modu_regular')?.ratio || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'modu_regular' ? { ...item, ratio: e.target.value } : item
                          ))
                        }}
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'modu_regular')?.usage}
                        sx={{
                          width: '100%',
                          '& .MuiInputBase-input': {
                            textAlign: 'right'
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      <Select
                        value={salesData.find(item => item.id === 'modu_regular')?.amountType || ''}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'modu_regular' ? { ...item, amountType: e.target.value } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode) || !salesData.find(item => item.id === 'modu_regular')?.usage}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value=""><span>선택</span></MenuItem>
                        <MenuItem value="고정">고정</MenuItem>
                        <MenuItem value="변동">변동</MenuItem>
                      </Select>
                    </td>
                  </tr>
                  {/* 플랫폼매출 나머지 항목들 */}
                  {[
                    { id: 'kakao_discount', name: '카카오-할인' },
                    { id: 'kakao_regular', name: '카카오-정기' },
                    { id: 'tmap_discount', name: '티맵-할인' },
                    { id: 'tmap_regular', name: '티맵-정기' },
                    { id: 'parking_friends_discount', name: '파킹프렌즈-할인' },
                    { id: 'parking_box_discount', name: '파킹박-할인권' },
                    { id: 'parking_box_regular', name: '파킹박-정기권' },
                    { id: 'jumansa', name: '주만사' }
                  ].map((platform) => (
                    <tr key={platform.id}>
                      <td className="text-center">{platform.name}</td>
                      <td className="text-center">현금</td>
                      <td className="text-center">
                        <Checkbox
                          checked={salesData.find(item => item.id === platform.id)?.usage || false}
                          onChange={(e) => {
                            setSalesData(prev => prev.map(item =>
                              item.id === platform.id ? { ...item, usage: e.target.checked } : item
                            ))
                          }}
                          size="small"
                          disabled={isViewMode(pageMode)}
                          sx={{ display: 'inline-block' }}
                        />
                      </td>
                      <td className="text-center">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={salesData.find(item => item.id === platform.id)?.ratio || ''}
                          onChange={(e) => {
                            setSalesData(prev => prev.map(item =>
                              item.id === platform.id ? { ...item, ratio: e.target.value } : item
                            ))
                          }}
                          disabled={isViewMode(pageMode) || !salesData.find(item => item.id === platform.id)?.usage}
                          sx={{
                            width: '100%',
                            '& .MuiInputBase-input': {
                              textAlign: 'right'
                            }
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <Select
                          value={salesData.find(item => item.id === platform.id)?.amountType || ''}
                          onChange={(e) => {
                            setSalesData(prev => prev.map(item =>
                              item.id === platform.id ? { ...item, amountType: e.target.value } : item
                            ))
                          }}
                          size="small"
                          disabled={isViewMode(pageMode) || !salesData.find(item => item.id === platform.id)?.usage}
                          sx={{ width: '100%' }}
                        >
                          <MenuItem value=""><span>선택</span></MenuItem>
                          <MenuItem value="고정">고정</MenuItem>
                          <MenuItem value="변동">변동</MenuItem>
                        </Select>
                      </td>
                    </tr>
                  ))}

                  {/* 차고지 */}
                  <tr>
                    <td className="text-center font-semibold" colSpan={2}>차고지</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'garage_regular')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'garage_regular' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                  {/* PCMK */}
                  <tr>
                    <td className="text-center font-semibold" colSpan={2}>PCMK</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'pcmk_regular')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'pcmk_regular' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>
                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                  {/* 사후정산 */}
                  <tr>
                    <td className="text-center font-semibold" rowSpan={2} colSpan={2}>사후정산</td>
                    <td className="text-center">카드</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'post_settlement_card')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'post_settlement_card' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>

                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'post_settlement_cash')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'post_settlement_cash' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>

                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                  {/* 환불 */}
                  <tr>
                    <td className="text-center font-semibold" colSpan={2}>환불</td>
                    <td className="text-center">현금</td>
                    <td className="text-center">
                      <Checkbox
                        checked={salesData.find(item => item.id === 'refund')?.usage || false}
                        onChange={(e) => {
                          setSalesData(prev => prev.map(item =>
                            item.id === 'refund' ? { ...item, usage: e.target.checked } : item
                          ))
                        }}
                        size="small"
                        disabled={isViewMode(pageMode)}
                        sx={{ display: 'inline-block' }}
                      />
                    </td>

                    <td className="text-center">
                      -
                    </td>
                    <td className="text-center">

                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* 5. 기준금액 */}
            {item.formulaType === 'park_a' ? (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-3">
                <div className="mb-3">
                  <Typography component="div" className="font-semibold text-gray-900">
                    5. 기준금액
                  </Typography>
                </div>
                <table className="rul-table">
                  <thead>
                    <tr>
                      <th className="w-auto">CASE</th>
                      <th className="w-auto">보장금액</th>
                      <th className="w-24">비율</th>
                      <th className="text-center" style={{ width: '60px' }}>보전여부</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>기준금액1<span className="text-red-500 ml-1">*</span></td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          disabled={pageMode === 'view'}
                          value={salesPurchaseType}
                          onChange={e => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            setSalesPurchaseType(value);
                          }}
                          sx={{
                            width: '100%',
                            '& input': { textAlign: 'right' }
                          }}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          disabled={pageMode === 'view'}
                          value={salesPurchaseType2}
                          onChange={e => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            setSalesPurchaseType2(value);
                          }}
                          sx={{
                            width: '100%',
                            '& input': { textAlign: 'right' }
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <span className="text-secondary" style={{ fontSize: 12 }}>%</span>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={timeDiffCard}
                            onChange={(e) => setTimeDiffCard(e.target.checked)}
                            size="small"
                            disabled={pageMode === 'view'}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>기준금액2</td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          disabled={pageMode === 'view'}
                          value={salesPurchaseType}
                          onChange={e => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            setSalesPurchaseType(value);
                          }}
                          sx={{
                            width: '100%',
                            '& input': { textAlign: 'right' }
                          }}
                        />
                      </td>
                      <td>
                        <TextField
                          variant="outlined"
                          size="small"
                          disabled={pageMode === 'view'}
                          value={salesPurchaseType2}
                          onChange={e => {
                            const value = e.target.value.replace(/[^0-9.]/g, '');
                            setSalesPurchaseType2(value);
                          }}
                          sx={{
                            width: '100%',
                            '& input': { textAlign: 'right' }
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <span className="text-secondary" style={{ fontSize: 12 }}>%</span>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </td>
                      <td className="text-center">

                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : null}
            {/* 6. 추가 임차료, 수익 섹션 */}
            {item.formulaType === 'park_a' ? (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-3">
                <div className="mb-3">
                  <Typography component="div" className="font-semibold text-gray-900">
                    6. 추가 임차료, 수익
                  </Typography>
                </div>
                <table className="rul-table">
                  <thead>
                    <tr>
                      <th className="w-auto" style={{ minWidth: '100px' }}>CASE</th>
                      <th className="w-28">추가금액</th>
                      <th className="w-auto">추가사유</th>
                      <th className="w-64">적용기간</th>
                      <th className="w-6 p-1" style={{ minWidth: '35px' }}>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {additionalRentData.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <FormControl sx={{ width: '100%' }}>
                            <Select
                              value={item.case}
                              onChange={(e) => {
                                const newData = additionalRentData.map(d =>
                                  d.id === item.id ? { ...d, case: e.target.value } : d
                                )
                                setAdditionalRentData(newData)
                              }}
                              displayEmpty
                              className="bg-white"
                              size="small"
                              disabled={pageMode === 'view'}
                            >
                              <MenuItem value="">
                                <span>선택</span>
                              </MenuItem>
                              <MenuItem value="CASE1">CASE1</MenuItem>
                              <MenuItem value="CASE2">CASE2</MenuItem>
                              <MenuItem value="CASE3">CASE3</MenuItem>
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <TextField
                            variant="outlined"
                            size="small"
                            disabled={pageMode === 'view'}
                            value={item.amount}
                            onChange={e => {
                              const value = e.target.value.replace(/[^0-9.]/g, '');
                              const newData = additionalRentData.map(d =>
                                d.id === item.id ? { ...d, amount: value } : d
                              )
                              setAdditionalRentData(newData)
                            }}
                            sx={{
                              width: '100%',
                              '& input': { textAlign: 'right' }
                            }}
                          />
                        </td>
                        <td>
                          <TextField
                            variant="outlined"
                            size="small"
                            disabled={pageMode === 'view'}
                            value={item.reason}
                            onChange={e => {
                              const newData = additionalRentData.map(d =>
                                d.id === item.id ? { ...d, reason: e.target.value } : d
                              )
                              setAdditionalRentData(newData)
                            }}
                            sx={{
                              width: '100%'
                            }}
                          />
                        </td>
                        <td>
                          <DateRangePicker
                            value={[item.period[0] ? new Date(item.period[0]) : null, item.period[1] ? new Date(item.period[1]) : null]}
                            onChange={(newValue: [Date | null, Date | null]) => {
                              const newPeriod = [
                                newValue[0] ? newValue[0].toISOString().split('T')[0] : '',
                                newValue[1] ? newValue[1].toISOString().split('T')[0] : ''
                              ]
                              const newData = additionalRentData.map(d =>
                                d.id === item.id ? { ...d, period: newPeriod } : d
                              )
                              setAdditionalRentData(newData)
                            }}
                            placeholder="날짜 범위를 선택하세요"
                            size="small"
                            datePickerWidth={130}
                            disabled={pageMode === 'view'}
                          />
                        </td>
                        <td className="w-6 p-1">
                          {pageMode === 'edit' && (
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              className="xsmallbtn2"
                              startIcon={<Minus size={16} />}
                              onClick={() => {
                                const newData = additionalRentData.filter(d => d.id !== item.id)
                                setAdditionalRentData(newData)
                              }}
                            >
                              <span style={{ display: "none" }}>-</span>
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {pageMode === 'edit' && (
                  <>
                    <div className="flex items-center mt-2" style={{ gap: '8px' }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => {
                          const newId = additionalRentData.length > 0
                            ? Math.max(...additionalRentData.map(d => d.id)) + 1
                            : 1
                          const newItem: {
                            id: number
                            case: string
                            amount: string
                            reason: string
                            period: string[]
                          } = {
                            id: newId,
                            case: '',
                            amount: '',
                            reason: '',
                            period: ['', '']
                          }
                          setAdditionalRentData([...additionalRentData, newItem] as typeof additionalRentData)
                        }}
                      >
                        추가
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : null}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mt-3 mb-0">
              <div className="flex items-center justify-between mb-2">
                <Typography component="div" className="font-semibold text-gray-900">
                  수식테스트
                </Typography>
                {pageMode === 'edit' && (
                  <div className="flex items-center" style={{ gap: '8px' }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      초기화
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                    >
                      테스트
                    </Button>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, width: '100%' }} className="mb-2 mt-2">
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="form-top-label">매출수수료</label>
                  <TextField
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={e => {
                      // 숫자만 입력 가능하도록 처리
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setSalesPurchaseType(value);
                    }}
                    sx={{
                      width: '100%',
                      '& input': { textAlign: 'right' }
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="form-top-label">기준금액1</label>
                  <TextField
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={e => {
                      // 숫자만 입력 가능하도록 처리
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setSalesPurchaseType(value);
                    }}
                    sx={{
                      width: '100%',
                      '& input': { textAlign: 'right' }
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="form-top-label">임차료비율1</label>
                  <TextField
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={e => {
                      // 숫자만 입력 가능하도록 처리
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setSalesPurchaseType(value);
                    }}
                    sx={{
                      width: '100%',
                      '& input': { textAlign: 'right' }
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="form-top-label">기준금액2</label>
                  <TextField
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={e => {
                      // 숫자만 입력 가능하도록 처리
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setSalesPurchaseType(value);
                    }}
                    sx={{
                      width: '100%',
                      '& input': { textAlign: 'right' }
                    }}
                  />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <label className="form-top-label">임차료 비율2</label>
                  <TextField
                    variant="outlined"
                    size="small"
                    disabled={pageMode === 'view'}
                    value={salesPurchaseType}
                    onChange={e => {
                      // 숫자만 입력 가능하도록 처리
                      const value = e.target.value.replace(/[^0-9.]/g, '');
                      setSalesPurchaseType(value);
                    }}
                    sx={{
                      width: '100%',
                      '& input': { textAlign: 'right' }
                    }}
                  />
                </div>
              </div>
              <div
                className="bg-blue-100 flex gap-2 text-blue-600 py-3 justify-between"
                style={{ borderRadius: '8px' }}
              >
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-light" style={{ marginBottom: 4, fontSize: '13px' }}>공급가액</div>
                  <div className="font-semibold">0</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-light" style={{ marginBottom: 4, fontSize: '13px' }}>부가세</div>
                  <div className="font-semibold">0</div>
                </div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div className="font-light" style={{ marginBottom: 4, fontSize: '13px' }}>합계</div>
                  <div className="font-semibold">0</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AccordionDetails >
    </Accordion >
  )
})
SettlementAccordion.displayName = 'SettlementAccordion'

export default function Rul002Page() {
  const [pageMode, setPageMode] = useState<PageMode>('view')
  const [currentFormulaType, setCurrentFormulaType] = useState<FormulaType>('normal')
  const [formState, dispatch] = useReducer(formReducer, initialFormState)
  const [contractPeriod, setContractPeriod] = useState<[Date | null, Date | null]>([null, null])
  const [rulePeriod, setRulePeriod] = useState<[Date | null, Date | null]>([null, null])

  const [alertState, setAlertState] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'warning' | 'info' })
  const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([])
  const [isConfirmed, setIsConfirmed] = useState(false) // 확정 상태
  const updateFormField = useCallback((field: keyof FormState, value: string) => { dispatch({ type: 'UPDATE_FIELD', field, value }) }, [])
  const updateAlertState = useCallback((updates: Partial<typeof alertState>) => { setAlertState(prev => ({ ...prev, ...updates })) }, [])

  // 통합된 이벤트 핸들러 (성능 최적화)
  const handleFormFieldChange = useCallback((field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormField(field, e.target.value)
  }, [updateFormField])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectChange = useCallback((field: keyof FormState) => (e: any) => {
    updateFormField(field, e.target.value)
  }, [updateFormField])

  // 옵션 데이터 (메모이제이션)
  const itemTypeOptions: Array<{ value: string, label: string }> = useMemo(() => [
    { value: 'fixed_regular', label: '고정/정기' },
    { value: 'fixed_irregular', label: '고정/비정기' },
    { value: 'settlement', label: '정산' }
  ], [])

  const formulaTypeOptions: Array<{ value: FormulaType, label: string }> = [
    { value: 'normal', label: '일반' },
    { value: 'park_a', label: '주차(직영)' },
    { value: 'park_b', label: '주차(위탁)' }
  ]

  // 패널 크기 조절 상태
  const leftPanelWidth = 600 // 고정 600px

  // 아코디언 추가 함수 (최적화된 버전)
  const addAccordionItem = useCallback((type: 'fixed_regular' | 'fixed_irregular' | 'settlement') => {
    const newItem: AccordionItem = {
      id: `accordion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: itemTypeOptions.find(option => option.value === type)?.label || type,
      data: getDefaultDataForType(type),
      formulaType: type === 'settlement' ? currentFormulaType : 'normal'
    }
    setAccordionItems(prev => [...prev, newItem])
  }, [currentFormulaType, itemTypeOptions])

  // 아코디언 삭제 함수 (최적화된 버전)
  const removeAccordionItem = useCallback((id: string) => {
    setAccordionItems(prev => prev.filter(item => item.id !== id))
  }, [])

  // 타입별 기본 데이터 생성
  const getDefaultDataForType = (type: 'fixed_regular' | 'fixed_irregular' | 'settlement') => {
    switch (type) {
      case 'fixed_regular':
        return {
          amount: '',
          checkedMonths: [],
          includeStartDate: false,
          includeEndDate: false
        }
      case 'fixed_irregular':
        return {
          amount: '',
          contractDate: null
        }
      case 'settlement':
        return {
          formula: '',
          formulaValue: '',
          settlementDecimalCalculationType: '반올림',
          formulaDecimalCalculationType: '반올림',
          vatRoundType: '반올림'
        }
      default:
        return {}
    }
  }

  // 수정 모드로 전환 핸들러
  const handleEdit = () => {
    setPageMode('edit')
    showAlert('수정 모드로 전환되었습니다.', 'info')
  }

  // 저장 핸들러
  const handleSave = () => {
    // 검증 로직 및 저장 로직
    setPageMode('view')
    showAlert('저장되었습니다.', 'success')
  }

  // 취소 핸들러 (view 모드로 복귀)
  const handleCancel = () => {
    setPageMode('view')
    showAlert('수정이 취소되었습니다.', 'info')
  }

  // 확정/확정취소 토글 핸들러
  const handleToggleConfirm = () => {
    setIsConfirmed(prev => !prev)
  }

  // 알림 표시 함수 (최적화된 버전)
  const showAlert = useCallback((message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    updateAlertState({ open: true, message, severity })
  }, [updateAlertState])

  // 알림 닫기 함수 (최적화된 버전)
  const handleAlertClose = useCallback(() => {
    updateAlertState({ open: false })
  }, [updateAlertState])

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex flex-col h-full min-h-0 layout-top-bottom"
        style={{
          height: 'calc(100vh - 2rem)', // 1rem top + 1rem bottom
        }}
      >

        {/* Breadcrumb and Page Title */}
        <div className="flex flex-row items-center justify-between mt-1 mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">정산규칙</h1>
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
          {/* 왼쪽 카드 (폭 고정) */}
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
                          규칙명
                        </label>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={formState.ruleName}
                          onChange={handleFormFieldChange('ruleName')}
                          sx={{ width: '100%' }}
                          disabled={pageMode === 'view'}
                          InputProps={{
                            endAdornment: formState.ruleName && (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() => updateFormField('ruleName', '')}
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
                        <label className="form-top-label">
                          상태
                        </label>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={formState.status}
                          onChange={handleFormFieldChange('status')}
                          sx={{ width: '100%' }}
                          disabled={pageMode === 'view'}
                          InputProps={{
                            endAdornment: formState.status && (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() => updateFormField('status', '')}
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
                          정산기준정보
                        </label>
                        <div className="flex items-center gap-1">
                          <TextField
                            variant="outlined"
                            size="small"
                            value={formState.customerCode}
                            onChange={handleFormFieldChange('customerCode')}
                            sx={{ flex: 1 }}
                            disabled={pageMode === 'view'}
                            InputProps={{
                              endAdornment: formState.customerCode && (
                                <InputAdornment position="end">
                                  <IconButton
                                    size="small"
                                    onClick={() => updateFormField('customerCode', '')}
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
                            disabled={pageMode === 'view'}
                          >
                            <span style={{ display: "none" }}>+</span>
                          </Button>
                          <TextField
                            variant="outlined"
                            size="small"
                            value={formState.deviceNumber}
                            onChange={handleFormFieldChange('deviceNumber')}
                            sx={{ width: '110px' }}
                            disabled={true}
                            InputProps={{
                              endAdornment: formState.deviceNumber && (
                                <InputAdornment position="end">
                                  <IconButton
                                    size="small"
                                    onClick={() => updateFormField('deviceNumber', '')}
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
                          품목
                        </label>
                        <div className="flex items-center gap-1">
                          <TextField
                            variant="outlined"
                            size="small"
                            value={formState.itemCode}
                            onChange={handleFormFieldChange('itemCode')}
                            sx={{ flex: 1 }}
                            disabled={pageMode === 'view'}
                            InputProps={{
                              endAdornment: formState.itemCode && (
                                <InputAdornment position="end">
                                  <IconButton
                                    size="small"
                                    onClick={() => updateFormField('itemCode', '')}
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
                            disabled={pageMode === 'view'}
                          >
                            <span style={{ display: "none" }}>+</span>
                          </Button>
                          <TextField
                            variant="outlined"
                            size="small"
                            value={formState.itemDeviceNumber}
                            onChange={handleFormFieldChange('itemDeviceNumber')}
                            sx={{ width: '110px' }}
                            disabled={true}
                            InputProps={{
                              endAdornment: formState.itemDeviceNumber && (
                                <InputAdornment position="end">
                                  <IconButton
                                    size="small"
                                    onClick={() => updateFormField('itemDeviceNumber', '')}
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
                        <label className="form-top-label">
                          계약기간
                        </label>
                        <DateRangePicker
                          value={contractPeriod}
                          onChange={(newValue: [Date | null, Date | null]) => {
                            setContractPeriod(newValue)
                          }}
                          placeholder="날짜 범위를 선택하세요"
                          size="small"
                          datePickerWidth={130}
                          disabled={true}
                        />
                      </div>
                      <div>
                        <label className="form-top-label">
                          계약금액
                        </label>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="text"
                          disabled={true}
                          value={
                            formState.contractAmount
                              ? Number(formState.contractAmount.replace(/,/g, '')).toLocaleString()
                              : ''
                          }
                          onChange={(e) => {
                            // 숫자만 추출
                            const raw = e.target.value.replace(/[^0-9]/g, '');
                            updateFormField('contractAmount', raw);
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
                                <span>₩</span>
                              </InputAdornment>
                            )
                          }}
                        />
                      </div>
                      <div>
                        <label className="form-top-label required">
                          규칙유효기간
                        </label>
                        <DateRangePicker
                          value={rulePeriod}
                          onChange={(newValue: [Date | null, Date | null]) => {
                            setRulePeriod(newValue)
                          }}
                          placeholder="날짜 범위를 선택하세요"
                          size="small"
                          datePickerWidth={130}
                          disabled={pageMode === 'view'}
                        />
                      </div>
                      <div>
                        <label className="form-top-label required">
                          매출반영시점
                        </label>
                        <div className="flex items-center gap-1">
                          <FormControl sx={{ width: '100%' }}>
                            <Select
                              value={formState.salesReflectionTiming}
                              onChange={handleSelectChange('salesReflectionTiming')}
                              displayEmpty
                              className="bg-white"
                              size="small"
                              disabled={pageMode === 'view'}
                            >
                              <MenuItem value="">
                                <span>선택</span>
                              </MenuItem>
                              <MenuItem value="CASE1">CASE1</MenuItem>
                              <MenuItem value="CASE2">CASE2</MenuItem>
                              <MenuItem value="CASE3">CASE3</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{ width: '100%' }}>
                            <Select
                              value={formState.salesReflectionTiming2}
                              onChange={handleSelectChange('salesReflectionTiming2')}
                              displayEmpty
                              className="bg-white"
                              size="small"
                              disabled={pageMode === 'view'}
                            >
                              <MenuItem value="">
                                <span>선택</span>
                              </MenuItem>
                              <MenuItem value="CASE1">CASE1</MenuItem>
                              <MenuItem value="CASE2">CASE2</MenuItem>
                              <MenuItem value="CASE3">CASE3</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                      <div>
                        <label className="form-top-label required">
                          매출매입유형
                        </label>
                        <div className="flex items-center gap-1">
                          <FormControl sx={{ width: '100%' }}>
                            <Select
                              value={formState.salesPurchaseType}
                              onChange={handleSelectChange('salesPurchaseType')}
                              displayEmpty
                              className="bg-white"
                              size="small"
                              disabled={pageMode === 'view'}
                            >
                              <MenuItem value="">
                                <span>선택</span>
                              </MenuItem>
                              <MenuItem value="CASE1">CASE1</MenuItem>
                              <MenuItem value="CASE2">CASE2</MenuItem>
                              <MenuItem value="CASE3">CASE3</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl sx={{ width: '100%' }}>
                            <Select
                              value={formState.salesPurchaseType2}
                              onChange={handleSelectChange('salesPurchaseType2')}
                              displayEmpty
                              className="bg-white"
                              size="small"
                              disabled={pageMode === 'view'}
                            >
                              <MenuItem value="">
                                <span>선택</span>
                              </MenuItem>
                              <MenuItem value="CASE1">CASE1</MenuItem>
                              <MenuItem value="CASE2">CASE2</MenuItem>
                              <MenuItem value="CASE3">CASE3</MenuItem>
                            </Select>
                          </FormControl>
                        </div>

                      </div>
                      <div>
                        <label className="form-top-label required">
                          세금유형
                        </label>
                        <FormControl sx={{ width: '100%' }}>
                          <Select
                            value={formState.taxType}
                            onChange={handleSelectChange('taxType')}
                            displayEmpty
                            className="bg-white"
                            size="small"
                            disabled={pageMode === 'view'}
                          >
                            <MenuItem value="">
                              <span>선택</span>
                            </MenuItem>
                            <MenuItem value="CASE1">CASE1</MenuItem>
                            <MenuItem value="CASE2">CASE2</MenuItem>
                            <MenuItem value="CASE3">CASE3</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                    <div className="pt-4">
                      <label className="form-top-label">
                        비고
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        multiline
                        fullWidth
                        value={formState.description}
                        onChange={handleFormFieldChange('description')}
                        sx={{
                          width: '100%',
                          margin: 0,
                          // 오버라이드 (resize 불가, 아이콘 숨김, overflowY auto)
                          '& textarea': {
                            resize: 'none !important',
                            overflowY: 'auto !important',
                          }
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={pageMode === 'view'}
                      />
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
                <div className="flex items-center justify-between mb-2 gap-2" style={{ flex: 0 }}>
                  <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
                    수식리스트
                  </Typography>
                  {pageMode === 'edit' && (
                    <div className="flex gap-1">
                      <FormControl sx={{ width: '120px' }}>
                        <Select
                          value={formState.itemType}
                          onChange={handleSelectChange('itemType')}
                          displayEmpty
                          className="bg-white"
                          size="small"
                        >
                          <MenuItem value="">
                            <span>선택</span>
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
                      {formState.itemType === 'settlement' && (
                        <FormControl sx={{ width: '100px' }}>
                          <Select
                            value={currentFormulaType}
                            onChange={(e) => setCurrentFormulaType(e.target.value as FormulaType)}
                            className="bg-white"
                            size="small"
                          >
                            {formulaTypeOptions.map((option) => (
                              <MenuItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => {
                          if (formState.itemType) {
                            addAccordionItem(formState.itemType as 'fixed_regular' | 'fixed_irregular' | 'settlement')
                            updateFormField('itemType', '') // 선택 초기화
                          }
                        }}
                        disabled={!formState.itemType}
                      >
                        수식추가
                      </Button>
                    </div>
                  )}
                </div>
                {/* 세로 꽉차는 영역 */}
                <div style={{ height: 'calc(100% - 40px)' }}>
                  {/* 상단에 뭔가 들어가면 높이만큼 빼줘야 */}
                  {/* 기본 설정: 좌우 스크롤 활성화 */}
                  <div className="h-full overflow-y-auto">
                    {/* 동적 아코디언 리스트 */}
                    <div className="mb-0">
                      {accordionItems.map((item) => {
                        switch (item.type) {
                          case 'fixed_regular':
                            return (
                              <FixedRegularAccordion
                                key={item.id}
                                item={item}
                                onRemove={removeAccordionItem}
                                pageMode={pageMode}
                              />
                            )
                          case 'fixed_irregular':
                            return (
                              <FixedIrregularAccordion
                                key={item.id}
                                item={item}
                                onRemove={removeAccordionItem}
                                pageMode={pageMode}
                              />
                            )
                          case 'settlement':
                            return (
                              <SettlementAccordion
                                key={item.id}
                                item={item}
                                onRemove={removeAccordionItem}
                                pageMode={pageMode}
                              />
                            )
                          default:
                            return null
                        }
                      })}
                      {accordionItems.length === 0 && (
                        <div className="text-center text-gray-500 py-8">
                          수식을 추가해주세요.
                        </div>
                      )}
                    </div>
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
                {pageMode === 'view' && (
                  <Button variant="contained" color="error">
                    삭제
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                {pageMode === 'view' ? (
                  // view 모드 버튼들
                  <>
                    <Button variant="outlined" color="secondary">
                      목록
                    </Button>
                    <Button variant="outlined" color="secondary">
                      결재요청
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleToggleConfirm}
                    >
                      {isConfirmed ? '확정취소' : '확정'}
                    </Button>
                    <Button variant="contained" onClick={handleEdit}>
                      수정
                    </Button>
                  </>
                ) : (
                  // edit 모드 버튼들
                  <>
                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                      취소
                    </Button>
                    <Button variant="contained" onClick={handleSave}>
                      저장
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MUI Alert Snackbar */}
        <Snackbar
          open={alertState.open}
          autoHideDuration={4000}
          onClose={handleAlertClose}
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
            onClose={handleAlertClose}
            severity={alertState.severity}
            sx={{
              width: '100%',
              '& .MuiAlert-message': {
                fontWeight: 500
              }
            }}
          >
            {alertState.message}
          </Alert>
        </Snackbar>

      </div>
    </DndProvider>
  )
}
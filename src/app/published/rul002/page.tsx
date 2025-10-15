"use client"

import React, { useState } from 'react'
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
  Icons,
  FormControl,
  Select,
  MenuItem,
  DateRangePicker,
  DatePicker,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@/components'
import { Search } from 'lucide-react'
import { Alert, Snackbar } from '@mui/material'
import FormulaInput from '@/components/formula-input'

type PageMode = 'view' | 'edit'

// 아코디언 아이템 인터페이스
interface AccordionItem {
  id: string
  type: 'fixed_regular' | 'fixed_irregular' | 'settlement'
  title: string
  data: Record<string, unknown>
}

// 고정/정기 아코디언 컴포넌트
const FixedRegularAccordion = ({ item, onRemove, pageMode }: { 
  item: AccordionItem, 
  onRemove: (id: string) => void, 
  pageMode: PageMode 
}) => {
  const [monthlyFixedAmount, setMonthlyFixedAmount] = useState((item.data.monthlyFixedAmount as string) || '200000')
  const [contractAmount, setContractAmount] = useState((item.data.contractAmount as string) || '')
  const [checkedMonths, setCheckedMonths] = useState<string[]>((item.data.checkedMonths as string[]) || [])
  const [includeStartDate, setIncludeStartDate] = useState((item.data.includeStartDate as boolean) || false)
  const [includeEndDate, setIncludeEndDate] = useState((item.data.includeEndDate as boolean) || false)

  const isViewMode = () => pageMode === 'view'

  return (
    <Accordion>
      <AccordionSummary
        aria-controls={`panel-${item.id}-content`}
        id={`panel-${item.id}-header`}
        sx={{ '& .MuiAccordionSummary-expandIconWrapper': { display: 'none' } }}
      >
        <div className="flex items-center justify-between w-full">
          <Typography component="div">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 border border-blue-400 text-blue-600 rounded-full text-xs font-semibold bg-white">
                {item.title}
              </span>
              {pageMode === 'view' ? (
                monthlyFixedAmount
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  value={monthlyFixedAmount}
                  onChange={(e) => {
                    setMonthlyFixedAmount(e.target.value);
                  }}
                  disabled={isViewMode()}
                  sx={{
                    width: '200px',
                    '& .MuiInputBase-input': {
                      textAlign: 'left'
                    }
                  }}
                />
              )}
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          <div>
            <label className="form-top-label required">
              금액
            </label>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              disabled={pageMode === 'view'}
              value={
                contractAmount
                  ? Number(contractAmount.replace(/,/g, '')).toLocaleString()
                  : ''
              }
              onChange={(e) => {
                // 숫자만 추출
                const raw = e.target.value.replace(/[^0-9]/g, '');
                setContractAmount(raw);
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
            />
          </div>
          <div>
            <label className="form-top-label">
              연이율
            </label>
            <div className="flex items-center gap-1">
              <TextField
                variant="outlined"
                size="small"
                type="text"
                disabled={pageMode === 'view'}
                value={
                  contractAmount
                    ? Number(contractAmount.replace(/,/g, '')).toLocaleString()
                    : ''
                }
                onChange={(e) => {
                  // 숫자만 추출
                  const raw = e.target.value.replace(/[^0-9]/g, '');
                  setContractAmount(raw);
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
              <TextField
                variant="outlined"
                size="small"
                type="text"
                disabled={pageMode === 'view'}
                value={
                  contractAmount
                    ? Number(contractAmount.replace(/,/g, '')).toLocaleString()
                    : ''
                }
                onChange={(e) => {
                  // 숫자만 추출
                  const raw = e.target.value.replace(/[^0-9]/g, '');
                  setContractAmount(raw);
                }}
                sx={{
                  width: '100%',
                  '& input': {
                    textAlign: 'left'
                  }
                }}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9,]*'
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <span className="text-secondary" style={{ fontSize: 12 }}>+</span>
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="form-top-label required">
            월 선택
          </label>
          {/* 월 선택 체크박스: 1월~12월 및 전체 */}
          {(() => {
            {/* 항목 및 상태 관리 */ }
            const monthItems = [
              "전체",
              "1월", "2월", "3월", "4월", "5월", "6월",
              "7월", "8월", "9월", "10월", "11월", "12월"
            ];

            // 전체 체크 여부
            const allChecked =
              checkedMonths.length === monthItems.length - 1;
            const isIndeterminate =
              checkedMonths.length > 0 &&
              checkedMonths.length < monthItems.length - 1;

            const handleCheck = (label: string) => {
              if (label === "전체") {
                if (allChecked) {
                  setCheckedMonths([]);
                } else {
                  setCheckedMonths(monthItems.slice(1));
                }
              } else {
                if (checkedMonths.includes(label)) {
                  setCheckedMonths(
                    checkedMonths.filter((m) => m !== label)
                  );
                } else {
                  setCheckedMonths([...checkedMonths, label]);
                }
              }
            };

            // 체크 표시 여부
            const isChecked = (label: string) => {
              if (label === "전체") return allChecked;
              return checkedMonths.includes(label);
            };

            return (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  maxWidth: "100%",
                }}
              >
                {monthItems.map((label) => (
                  <FormControlLabel
                    key={label}
                    control={
                      <Checkbox
                        checked={isChecked(label)}
                        onChange={() => handleCheck(label)}
                        size="small"
                        indeterminate={label === "전체" ? isIndeterminate : undefined}
                        disabled={pageMode === 'view'}
                      />
                    }
                    label={label}
                    style={{
                      marginRight: 8,
                      marginBottom: 0,
                      fontSize: 14,
                      whiteSpace: "nowrap"
                    }}
                  />
                ))}
              </div>
            );
          })()}
        </div>
        <div className="mt-4">
          <label className="form-top-label">
            일할계산
          </label>
          <div className="flex gap-1 mt-2">
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
      </AccordionDetails>
    </Accordion>
  )
}

// 고정/비정기 아코디언 컴포넌트
const FixedIrregularAccordion = ({ item, onRemove, pageMode }: { 
  item: AccordionItem, 
  onRemove: (id: string) => void, 
  pageMode: PageMode 
}) => {
  const [amount, setAmount] = useState((item.data.amount as string) || '')
  const [contractDate, setContractDate] = useState<Date | null>((item.data.contractDate as Date | null) || null)

  return (
    <Accordion>
      <AccordionSummary
        aria-controls={`panel-${item.id}-content`}
        id={`panel-${item.id}-header`}
        sx={{ '& .MuiAccordionSummary-expandIconWrapper': { display: 'none' } }}
      >
        <div className="flex items-center justify-between w-full">
          <Typography component="div">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 border border-blue-400 text-blue-600 rounded-full text-xs font-semibold bg-white">
                {item.title}
              </span>
              {pageMode === 'view' ? (
                amount
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={pageMode !== 'edit'}
                  sx={{
                    width: '200px',
                    '& .MuiInputBase-input': {
                      textAlign: 'left'
                    }
                  }}
                />
              )}
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div>
            <label className="form-top-label required">금액</label>
            <TextField
              variant="outlined"
              size="small"
              type="text"
              value={amount}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, '')
                setAmount(raw)
              }}
              disabled={pageMode !== 'edit'}
              sx={{
                width: '100%',
                '& input': { textAlign: 'right' }
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
            />
          </div>
          <div>
            <label className="form-top-label required">계약일</label>
            <DatePicker
              value={contractDate}
              onChange={setContractDate}
              placeholder="날짜를 선택하세요"
              width="100%"
              disabled={pageMode !== 'edit'}
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

// 정산 아코디언 컴포넌트
const SettlementAccordion = ({ item, onRemove, pageMode }: { 
  item: AccordionItem, 
  onRemove: (id: string) => void, 
  pageMode: PageMode 
}) => {
  const [monthlySettlement, setMonthlySettlement] = useState((item.data.monthlySettlement as string) || '')
  const [formulaValue, setFormulaValue] = useState((item.data.formulaValue as string) || '')
  const [salesReflectionTiming, setSalesReflectionTiming] = useState((item.data.salesReflectionTiming as string) || '')
  const [salesPurchaseType, setSalesPurchaseType] = useState((item.data.salesPurchaseType as string) || '')
  const [salesPurchaseType2, setSalesPurchaseType2] = useState((item.data.salesPurchaseType2 as string) || '')

  const isViewMode = () => pageMode === 'view'

  return (
    <Accordion>
      <AccordionSummary
        aria-controls={`panel-${item.id}-content`}
        id={`panel-${item.id}-header`}
        sx={{ '& .MuiAccordionSummary-expandIconWrapper': { display: 'none' } }}
      >
        <div className="flex items-center justify-between w-full">
          <Typography component="div">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 border border-green-400 text-green-600 rounded-full text-xs font-semibold bg-white">
                {item.title}
              </span>
              {pageMode === 'view' ? (
                monthlySettlement
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  value={monthlySettlement}
                  onChange={(e) => setMonthlySettlement(e.target.value)}
                  sx={{
                    width: '120px',
                    '& input': {
                      textAlign: 'left'
                    }
                  }}
                />
              )}
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
        {/* 정산수식 섹션 */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-2">
          <div className="flex items-center justify-between mb-2">
            <Typography component="div" className="font-semibold text-gray-900">
              정산수식
            </Typography>
            {pageMode === 'edit' && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
              >
                추가
              </Button>
            )}
          </div>
          {/* 정산수식 block01 섹션 */}
          <div className="mt-2 rounded-lg bg-white p-4 pb-2">
            <div className="flex items-center justify-between">
              <Typography component="div" className="font-semibold text-gray-900">
                지급액
              </Typography>
              {pageMode === 'edit' && (
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    수정
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                  >
                    삭제
                  </Button>
                </div>
              )}
            </div>

            {/* FormulaInput 컴포넌트 */}
            <div className="mt-2">
              <FormulaInput
                value={formulaValue}
                onChange={setFormulaValue}
                disabled={isViewMode()}
              />
            </div>

            {pageMode === 'edit' && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 4, marginBottom: 0 }}>
                <label className="form-top-label">
                  지급액 소수점계산 :
                </label>
                <RadioGroup row defaultValue="반올림" name="paymentDecimalCalculationType" style={{ marginLeft: 16 }}>
                  <FormControlLabel value="반올림" control={<Radio />} label="반올림" />
                  <FormControlLabel value="내림" control={<Radio />} label="내림" />
                  <FormControlLabel value="올림" control={<Radio />} label="올림" />
                </RadioGroup>
              </div>
            )}
          </div>
          {/* 정산수식 block02 섹션 */}
          <div className="mt-2 rounded-lg bg-white p-4 pb-2">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <div>
                <label className="form-top-label required">
                  수식명
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
                <label className="form-top-label required">
                  수식키
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
            </div>
            {/* FormulaInput 컴포넌트 */}
            <div className="mt-2">
              <FormulaInput
                value={formulaValue}
                onChange={setFormulaValue}
                disabled={isViewMode()}
              />
            </div>

            {pageMode === 'edit' && (
              <div className="flex items-center justify-between">
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 4, marginBottom: 0 }}>
                  <label className="form-top-label">
                    정산 소수점계산 :
                  </label>
                  <RadioGroup row defaultValue="반올림" name="settlementDecimalCalculationType" style={{ marginLeft: 16 }}>
                    <FormControlLabel value="반올림" control={<Radio disabled={false} />} label="반올림" />
                    <FormControlLabel value="내림" control={<Radio disabled={false} />} label="내림" />
                    <FormControlLabel value="올림" control={<Radio disabled={false} />} label="올림" />
                  </RadioGroup>
                </div>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    취소
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                      }
                    }}
                  >
                    작성완료
                  </Button>
                </div>
              </div>
            )}
          </div>
          {/* 정산수식 block03 섹션 */}
          <div className="mt-2 rounded-lg bg-white p-4 pb-2">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <div>
                <label className="form-top-label required">
                  수식명
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
                    },
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      boxSizing: 'border-box',
                      '& fieldset': {
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': {
                        borderWidth: '1px'
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </div>
              <div>
                <label className="form-top-label required">
                  수식키
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
                    },
                    '& .MuiOutlinedInput-root': {
                      height: '40px',
                      boxSizing: 'border-box',
                      '& fieldset': {
                        borderWidth: '1px'
                      },
                      '&:hover fieldset': {
                        borderWidth: '1px'
                      },
                      '&.Mui-focused fieldset': {
                        borderWidth: '2px'
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div
              className="mt-2"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', gap: 4, width: '100%' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label className="form-top-label required" style={{ marginBottom: 4 }}>
                        정산기준
                      </label>
                      <Select
                        value={salesReflectionTiming}
                        onChange={e => setSalesReflectionTiming(e.target.value as string)}
                        size="small"
                        disabled={pageMode === 'view'}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value=""><em>선택</em></MenuItem>
                        <MenuItem value="옵션1">옵션1</MenuItem>
                        <MenuItem value="옵션2">옵션2</MenuItem>
                        <MenuItem value="옵션3">옵션3</MenuItem>
                      </Select>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label className="form-top-label" style={{ marginBottom: 4 }}>
                        기준 &gt;
                      </label>
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
                        type="number"
                        sx={{
                          width: '100%',
                          '& input': { textAlign: 'left' }
                        }}
                      />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <label className="form-top-label" style={{ marginBottom: 4 }}>
                        기준 ≤
                      </label>
                      <TextField
                        variant="outlined"
                        size="small"
                        disabled={pageMode === 'view'}
                        value={salesPurchaseType2}
                        onChange={e => {
                          // 숫자만 입력 가능하도록 처리
                          const value = e.target.value.replace(/[^0-9.]/g, '');
                          setSalesPurchaseType2(value);
                        }}
                        type="number"
                        sx={{
                          width: '100%',
                          '& input': { textAlign: 'left' }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="form-top-label required">
                  정산금액
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', gap: 4, width: '100%' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Select
                        value={salesReflectionTiming}
                        onChange={e => setSalesReflectionTiming(e.target.value as string)}
                        size="small"
                        disabled={pageMode === 'view'}
                        sx={{ width: '100%' }}
                      >
                        <MenuItem value=""><em>선택</em></MenuItem>
                        <MenuItem value="옵션1">옵션1</MenuItem>
                        <MenuItem value="옵션2">옵션2</MenuItem>
                        <MenuItem value="옵션3">옵션3</MenuItem>
                      </Select>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                        type="number"
                        sx={{
                          width: '100%',
                          '& input': { textAlign: 'left' }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {pageMode === 'edit' && (
              <div className="flex items-center mt-2" style={{ gap: '8px' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                >
                  추가
                </Button>
              </div>
            )}
            {pageMode === 'edit' && (
              <div className="flex items-center justify-between">
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 4, marginBottom: 0 }}>
                  <label className="form-top-label">
                    수식 소수점계산 :
                  </label>
                  <RadioGroup row defaultValue="반올림" name="formulaDecimalCalculationType" style={{ marginLeft: 16 }}>
                    <FormControlLabel value="반올림" control={<Radio disabled={false} />} label="반올림" />
                    <FormControlLabel value="내림" control={<Radio disabled={false} />} label="내림" />
                    <FormControlLabel value="올림" control={<Radio disabled={false} />} label="올림" />
                  </RadioGroup>
                </div>
                <div className="flex items-center" style={{ gap: '8px' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                  >
                    취소
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{
                      backgroundColor: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                      }
                    }}
                  >
                    작성완료
                  </Button>
                </div>
              </div>
            )}
          </div>
          {/* 정산수식 block04 섹션 */}
          <div className="mt-2 rounded-lg bg-white p-4 pb-2">
            <div className="flex items-center justify-between mb-2">
              <Typography component="div" className="font-semibold text-gray-900">
                브랜드제휴 변동보전료
              </Typography>
            </div>
            <div style={{ display: 'flex', gap: 4, width: '100%' }} className="mb-2">
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">정산기준</label>
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
                  type="number"
                  sx={{
                    width: '100%',
                    '& input': { textAlign: 'right' }
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">근접지역</label>
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
                  type="number"
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
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label required">상한액</label>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType2}
                  onChange={e => {
                    // 숫자만 입력 가능하도록 처리
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    setSalesPurchaseType2(value);
                  }}
                  type="number"
                  sx={{
                    width: '100%',
                    '& input': { textAlign: 'right' }
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label">부스임대료</label>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType2}
                  onChange={e => {
                    // 숫자만 입력 가능하도록 처리
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    setSalesPurchaseType2(value);
                  }}
                  type="number"
                  sx={{
                    width: '100%',
                    '& input': { textAlign: 'right' }
                  }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label className="form-top-label">임차료</label>
                <TextField
                  variant="outlined"
                  size="small"
                  disabled={pageMode === 'view'}
                  value={salesPurchaseType2}
                  onChange={e => {
                    // 숫자만 입력 가능하도록 처리
                    const value = e.target.value.replace(/[^0-9.]/g, '');
                    setSalesPurchaseType2(value);
                  }}
                  type="number"
                  sx={{
                    width: '100%',
                    '& input': { textAlign: 'right' }
                  }}
                />
              </div>
            </div>
            {pageMode === 'edit' && (
              <div className="flex items-center justify-end" style={{ gap: '8px' }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                >
                  취소
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  sx={{
                    backgroundColor: 'white',
                    '&:hover': {
                      backgroundColor: 'white',
                    }
                  }}
                >
                  작성완료
                </Button>
              </div>
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}

export default function Rul002Page() {
  // 페이지 상태 관리
  const [pageMode, setPageMode] = useState<PageMode>('view')

  // 폼 상태 변수들
  const [ruleName, setRuleName] = useState('')
  const [status, setStatus] = useState('')
  const [customerCode, setCustomerCode] = useState('')
  const [deviceNumber, setDeviceNumber] = useState('')
  const [itemCode, setItemCode] = useState('')
  const [itemDeviceNumber, setItemDeviceNumber] = useState('')
  const [contractPeriod, setContractPeriod] = useState<[Date | null, Date | null]>([null, null])
  const [contractAmount, setContractAmount] = useState('')
  const [rulePeriod, setRulePeriod] = useState<[Date | null, Date | null]>([null, null])
  const [salesReflectionTiming, setSalesReflectionTiming] = useState('')
  const [salesReflectionTiming2, setSalesReflectionTiming2] = useState('')
  const [salesPurchaseType, setSalesPurchaseType] = useState('')
  const [salesPurchaseType2, setSalesPurchaseType2] = useState('')
  const [taxType, setTaxType] = useState('')
  const [description, setDescription] = useState('')
  const [itemType, setItemType] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success')

  // 동적 아코디언 리스트 상태 관리
  const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([])

  // Select 옵션들
  const departmentOptions: Array<{ value: string, label: string }> = [
    { value: 'option1', label: '옵션1' },
    { value: 'option2', label: '옵션2' },
    { value: 'option3', label: '옵션3' }
  ]

  const itemTypeOptions: Array<{ value: string, label: string }> = [
    { value: 'fixed_regular', label: '고정/정기' },
    { value: 'fixed_irregular', label: '고정/비정기' },
    { value: 'settlement', label: '정산' }
  ]

  // 패널 크기 조절 상태
  const leftPanelWidth = 600 // 고정 500px

  // 아코디언 추가 함수
  const addAccordionItem = (type: 'fixed_regular' | 'fixed_irregular' | 'settlement') => {
    const newItem: AccordionItem = {
      id: `accordion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: itemTypeOptions.find(option => option.value === type)?.label || type,
      data: getDefaultDataForType(type)
    }
    setAccordionItems(prev => [...prev, newItem])
  }

  // 아코디언 삭제 함수
  const removeAccordionItem = (id: string) => {
    setAccordionItems(prev => prev.filter(item => item.id !== id))
  }

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

  // Alert 표시 함수
  const showAlert = (message: string, severity: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setAlertMessage(message)
    setAlertSeverity(severity)
    setAlertOpen(true)
  }

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
                        value={ruleName}
                        onChange={(e) => setRuleName(e.target.value)}
                        sx={{ width: '100%' }}
                        disabled={pageMode === 'view'}
                        InputProps={{
                          endAdornment: ruleName && (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={() => setRuleName('')}
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
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ width: '100%' }}
                        disabled={pageMode === 'view'}
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
                        정산기준정보
                      </label>
                      <div className="flex items-center gap-1">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={customerCode}
                          onChange={(e) => setCustomerCode(e.target.value)}
                          sx={{ flex: 1 }}
                          disabled={pageMode === 'view'}
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
                          disabled={pageMode === 'view'}
                        >
                          <span style={{ display: "none" }}>+</span>
                        </Button>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={deviceNumber}
                          onChange={(e) => setDeviceNumber(e.target.value)}
                          sx={{ width: '110px' }}
                          disabled={true}
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
                        품목
                      </label>
                      <div className="flex items-center gap-1">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={itemCode}
                          onChange={(e) => setItemCode(e.target.value)}
                          sx={{ flex: 1 }}
                          disabled={pageMode === 'view'}
                          InputProps={{
                            endAdornment: itemCode && (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() => setItemCode('')}
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
                          value={itemDeviceNumber}
                          onChange={(e) => setItemDeviceNumber(e.target.value)}
                          sx={{ width: '110px' }}
                          disabled={true}
                          InputProps={{
                            endAdornment: itemDeviceNumber && (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() => setItemDeviceNumber('')}
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
                          contractAmount
                            ? Number(contractAmount.replace(/,/g, '')).toLocaleString()
                            : ''
                        }
                        onChange={(e) => {
                          // 숫자만 추출
                          const raw = e.target.value.replace(/[^0-9]/g, '');
                          setContractAmount(raw);
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
                            value={salesReflectionTiming}
                            onChange={(e) => setSalesReflectionTiming(e.target.value)}
                            displayEmpty
                            className="bg-white"
                            size="small"
                            disabled={pageMode === 'view'}
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
                        <FormControl sx={{ width: '100%' }}>
                          <Select
                            value={salesReflectionTiming2}
                            onChange={(e) => setSalesReflectionTiming2(e.target.value)}
                            displayEmpty
                            className="bg-white"
                            size="small"
                            disabled={pageMode === 'view'}
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
                    <div>
                      <label className="form-top-label required">
                        매출매입유형
                      </label>
                      <div className="flex items-center gap-1">
                        <FormControl sx={{ width: '100%' }}>
                          <Select
                            value={salesPurchaseType}
                            onChange={(e) => setSalesPurchaseType(e.target.value)}
                            displayEmpty
                            className="bg-white"
                            size="small"
                            disabled={pageMode === 'view'}
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
                        <FormControl sx={{ width: '100%' }}>
                          <Select
                            value={salesPurchaseType2}
                            onChange={(e) => setSalesPurchaseType2(e.target.value)}
                            displayEmpty
                            className="bg-white"
                            size="small"
                            disabled={pageMode === 'view'}
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
                    <div>
                      <label className="form-top-label required">
                        세금유형
                      </label>
                      <FormControl sx={{ width: '100%' }}>
                        <Select
                          value={taxType}
                          onChange={(e) => setTaxType(e.target.value)}
                          displayEmpty
                          className="bg-white"
                          size="small"
                          disabled={pageMode === 'view'}
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
                  <div>
                    <label className="form-top-label mt-4">
                      비고
                    </label>
                    <TextField
                      variant="outlined"
                      size="small"
                      multiline
                      minRows={4}
                      maxRows={8}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      sx={{ width: '100%', overflowY: 'auto', margin: 0 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        style: { resize: 'both', maxHeight: 100, overflowY: 'auto' },
                      }}
                      fullWidth
                      margin="none"
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
              <div className="flex items-center justify-between mb-4 gap-2" style={{ flex: 0 }}>
                <Typography variant="subtitle1" className="font-semibold text-gray-900 whitespace-nowrap">
                  수식리스트
                </Typography>
                {pageMode === 'edit' && (
                  <div className="flex gap-1">
                    <FormControl sx={{ width: '120px' }}>
                      <Select
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
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
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => {
                        if (itemType) {
                          addAccordionItem(itemType as 'fixed_regular' | 'fixed_irregular' | 'settlement')
                          setItemType('') // 선택 초기화
                        }
                      }}
                      disabled={!itemType}
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
                  <Button variant="outlined" color="secondary">
                    확정
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
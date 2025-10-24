import React, { useState, useCallback, memo } from 'react'
import {
  Button, Typography, Accordion, AccordionSummary, AccordionDetails,
  TextField, InputAdornment, Checkbox, FormControlLabel
} from '@/components'
import OptimizedTextField from './OptimizedTextField'

type PageMode = 'view' | 'edit'

interface AccordionItem {
  id: string
  type: 'fixed_regular' | 'fixed_irregular' | 'settlement'
  title: string
  data: Record<string, unknown>
  formulaType: string
}

interface FixedRegularAccordionProps {
  item: AccordionItem
  onRemove: (id: string) => void
  pageMode: PageMode
}

// 숫자 포맷 함수 (세 자리마다 콤마 추가)
const formatNumber = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '')
  if (!numericValue) return ''
  return Number(numericValue).toLocaleString()
}

const createNumberInputHandler = (setter: (value: string) => void) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    setter(onlyNumbers);
  };
};

const FixedRegularAccordion = memo(({ item, onRemove, pageMode }: FixedRegularAccordionProps) => {
  const [monthlyFixedAmount, setMonthlyFixedAmount] = useState((item.data.monthlyFixedAmount as string) || '200000')
  const [contractAmount, setContractAmount] = useState((item.data.contractAmount as string) || '')
  const [checkedMonths, setCheckedMonths] = useState<string[]>((item.data.checkedMonths as string[]) || [])
  const [includeStartDate, setIncludeStartDate] = useState((item.data.includeStartDate as boolean) || false)
  const [includeEndDate, setIncludeEndDate] = useState((item.data.includeEndDate as boolean) || false)
  const isViewMode = useCallback((mode: PageMode): mode is 'view' => mode === 'view', [])
  const handleMonthlyFixedAmountChange = createNumberInputHandler(setMonthlyFixedAmount)
  const handleContractAmountChange = createNumberInputHandler(setContractAmount)

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
              {pageMode === 'view' ? (
                monthlyFixedAmount
              ) : (
                <OptimizedTextField
                  variant="outlined"
                  size="small"
                  type="text"
                  value={monthlyFixedAmount}
                  onChange={handleMonthlyFixedAmountChange}
                  disabled={isViewMode(pageMode)}
                  sx={{
                    flex: 1,
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
              value={formatNumber(contractAmount)}
              onChange={handleContractAmountChange}
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
              placeholder="숫자만 입력"
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
              <div className="flex flex-wrap max-w-full gap-x-2 gap-y-0">
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
          <div className="flex gap-0 mt-2">
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
})

FixedRegularAccordion.displayName = 'FixedRegularAccordion'

export default FixedRegularAccordion

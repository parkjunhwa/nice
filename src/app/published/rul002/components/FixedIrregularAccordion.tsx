import React, { useState, memo } from 'react'
import {
  Button, Typography, Accordion, AccordionSummary, AccordionDetails,
  TextField, InputAdornment, DatePicker
} from '@/components'

type PageMode = 'view' | 'edit'

interface AccordionItem {
  id: string
  type: 'fixed_regular' | 'fixed_irregular' | 'settlement'
  title: string
  data: Record<string, unknown>
  formulaType: string
}

interface FixedIrregularAccordionProps {
  item: AccordionItem
  onRemove: (id: string) => void
  pageMode: PageMode
}

const createNumberInputHandler = (setter: (value: string) => void) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
    setter(onlyNumbers);
  };
};

const FixedIrregularAccordion = memo(({ item, onRemove, pageMode }: FixedIrregularAccordionProps) => {
  const [amount, setAmount] = useState((item.data.amount as string) || '')
  const [contractDate, setContractDate] = useState<Date | null>((item.data.contractDate as Date | null) || null)

  const handleAmountChange = createNumberInputHandler(setAmount)

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
                amount
              ) : (
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  disabled={pageMode !== 'edit'}
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
})

FixedIrregularAccordion.displayName = 'FixedIrregularAccordion'

export default FixedIrregularAccordion

import React, { memo } from 'react'
import { TextField, InputAdornment, IconButton } from '@/components'
import { Minus } from 'lucide-react'
import { SxProps, Theme } from '@mui/material/styles'

interface OptimizedTextFieldProps {
  variant?: 'outlined' | 'filled' | 'standard'
  size?: 'small' | 'medium'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  sx?: SxProps<Theme>
  disabled?: boolean
  placeholder?: string
  type?: string
  multiline?: boolean
  fullWidth?: boolean
  rows?: number
  onClear?: () => void
}

const OptimizedTextField = memo(({
  variant = 'outlined',
  size = 'small',
  value,
  onChange,
  sx,
  disabled = false,
  placeholder,
  type = 'text',
  multiline = false,
  fullWidth = false,
  rows,
  onClear
}: OptimizedTextFieldProps) => {
  return (
    <TextField
      variant={variant}
      size={size}
      value={value}
      onChange={onChange}
      sx={sx}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      multiline={multiline}
      fullWidth={fullWidth}
      rows={rows}
      InputProps={{
        endAdornment: value && onClear && (
          <InputAdornment position="end">
            <IconButton
              aria-label="clear"
              onClick={onClear}
              edge="end"
              size="small"
              sx={{ padding: '4px' }}
            >
              <Minus />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )
})

OptimizedTextField.displayName = 'OptimizedTextField'

export default OptimizedTextField

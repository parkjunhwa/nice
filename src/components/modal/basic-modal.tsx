'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton } from '@mui/material'
import { X } from 'lucide-react'

interface BasicModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
}

export default function BasicModal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  fullWidth = true
}: BasicModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }
      }}
    >
      {title && (
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ 
              color: 'text.secondary',
              '&:hover': { backgroundColor: 'action.hover' }
            }}
          >
            <X size={20} />
          </IconButton>
        </DialogTitle>
      )}
      
      <DialogContent sx={{ pt: title ? 1 : 3 }}>
        {children}
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          취소
        </Button>
        <Button variant="contained" onClick={onClose}>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

"use client"

import React, { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { muiTheme } from '@/lib/mui-theme'

interface MuiThemeProviderProps {
  children: ReactNode;
}

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  return (
    <ThemeProvider theme={muiTheme}>
      {children}
    </ThemeProvider>
  );
} 
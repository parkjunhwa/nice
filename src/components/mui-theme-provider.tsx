"use client"

import { ThemeProvider } from '@mui/material/styles';
import { ReactNode } from 'react';
import { muiTheme } from '@/lib/mui-theme';

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
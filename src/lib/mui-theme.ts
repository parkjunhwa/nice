import { createTheme } from '@mui/material/styles';

// 커스텀 blue 팔레트 생성 - 700을 #2563EB으로 변경
const customBlue = {
  50: '#eff6ff',   // Blue-50
  100: '#dbeafe',  // Blue-100
  200: '#bfdbfe',  // Blue-200
  300: '#93c5fd',  // Blue-300
  400: '#60a5fa',  // Blue-400
  500: '#3b82f6',  // Blue-500
  600: '#2563eb',  // Blue-600 (기존 700 대신 사용)
  700: '#1d4ed8',  // Blue-700 (기존 800 대신 사용)
  800: '#1e40af',  // Blue-800 (기존 900 대신 사용)
  900: '#1e3a8a',  // Blue-900
  A100: '#93c5fd', // Blue-300
  A200: '#60a5fa', // Blue-400
  A400: '#3b82f6', // Blue-500
  A700: '#2563eb', // Blue-600
};

// MUI 테마 생성
export const muiTheme = createTheme({
  typography: {
    fontFamily: [
      'NICE',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'sans-serif'
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
    },
    caption: {
      fontWeight: 400,
    },
    overline: {
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: customBlue[600], // #2563EB
      light: customBlue[400], // #60a5fa
      dark: customBlue[700],  // #1d4ed8
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#6B7280', // Gray-500
      light: '#9CA3AF', // Gray-400
      dark: '#4B5563', // Gray-600
      contrastText: '#FFFFFF',
    },
    // blue 팔레트는 MUI v7에서 지원되지 않음
  },
  // 컴포넌트별 스타일 커스터마이징
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: 'inherit',
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#000000',
          color: '#ffffff',
          fontSize: '12px',
          fontFamily: 'inherit',
        },
        arrow: {
          color: '#000000',
        },
      },
    },
  },
}); 
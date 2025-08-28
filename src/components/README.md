# Components Structure

이 디렉토리는 프로젝트의 모든 공통 컴포넌트들을 관리합니다. 현재 사이트는 **Published Pages** 구조로 되어 있으며, 다양한 기능별 페이지들을 지원합니다.

## 사이트 구조

### Published Pages (`/app/published`)
- **Analytics** (`/analytics`) - 데이터 분석 및 차트 페이지
- **Calendar** (`/calendar`) - 캘린더 기능 페이지
- **Documents** (`/documents`) - 문서 관리 페이지
  - Media/Images/Profile - 프로필 이미지 관리
- **Forms** (`/forms`) - 폼 관련 페이지들
  - Advanced - 고급 폼
  - Basic - 기본 폼
  - File Upload - 파일 업로드
  - Multi-step - 다단계 폼
  - Search - 검색 폼
  - Validation - 유효성 검사 폼
- **Messages** (`/messages`) - 메시지 관리 페이지
- **MUI** (`/mui`) - MUI 컴포넌트 데모 페이지
- **Notifications** (`/notifications`) - 알림 관리 페이지
- **Search** (`/search01`, `/search02`) - 검색 기능 페이지들

## 컴포넌트 구조

### MUI 컴포넌트 (`/mui`)
- `index.ts`: MUI 컴포넌트들을 카테고리별로 분류하여 export
  - **Layout & Navigation**: AppBar, Toolbar, Drawer, Tabs, Grid, Card 등
  - **Forms & Inputs**: TextField, Button, Checkbox, Select, Autocomplete 등
  - **Data Display**: Table, Avatar, Badge, Chip, Typography 등
  - **Feedback**: Alert, Dialog, Snackbar, Tooltip, Popover 등
  - **Navigation & Actions**: Pagination, SpeedDial, Link 등
  - **Transitions & Animations**: Grow, Fade, Zoom, Slide, Collapse 등

### 아이콘 (`/icons`)
- `index.ts`: Lucide React 아이콘들을 카테고리별로 분류하여 export
  - **Navigation & Direction**: Chevron, Arrow, Home, MapPin 등
  - **Search & Actions**: Search, Filter, Sort, Refresh, Zoom 등
  - **User & Authentication**: User, Lock, Eye, Settings, Bell 등
  - **Content & Media**: FileText, Image, Video, Folder, Download 등
  - **Communication**: Mail, Phone, MessageCircle 등
  - **Status & Feedback**: Check, X, Alert, Info, Help 등
  - **Actions & Tools**: Plus, Minus, Edit, Trash, Heart, Star 등
  - **Time & Date**: Calendar, Clock 등
  - **Technology & Devices**: HardDrive, Database, Server, Wifi 등
  - **Business & Finance**: Building, Store, ShoppingCart, CreditCard 등
  - **Charts & Analytics**: BarChart3, PieChart, LineChart, Activity 등
  - **Science & Education**: Rocket, Telescope, Microscope, BookOpen 등
  - **Health & Medicine**: Pill, Stethoscope, Syringe, HeartPulse 등
  - **Food & Nature**: Cake, Coffee, Apple, Leaf, Mountain 등
  - **Weather & Environment**: Sun, Moon, Cloud, Zap 등
  - **Awards & Recognition**: Trophy, Award, Gift 등

### 공통 컴포넌트
- `index.ts`: 모든 컴포넌트들을 통합하여 export
- `date-picker.tsx`: 날짜 선택 컴포넌트 (Forms 페이지에서 사용)
- `time-picker.tsx`: 시간 선택 컴포넌트 (Forms 페이지에서 사용)
- `date-time-picker.tsx`: 날짜/시간 선택 컴포넌트 (Calendar 페이지에서 사용)
- `dashboard-layout.tsx`: 대시보드 레이아웃 (Analytics 페이지에서 사용)
- `dashboard-card.tsx`: 대시보드 카드 (Analytics 페이지에서 사용)
- `header.tsx`: 헤더 컴포넌트 (전체 사이트 공통)
- `sidebar.tsx`: 사이드바 컴포넌트 (전체 사이트 공통)
- `sidebar-toggle.tsx`: 사이드바 토글 (전체 사이트 공통)
- `chart.tsx`: 차트 컴포넌트 (Analytics 페이지에서 사용)
- `tabulator-table.tsx`: Tabulator 테이블 컴포넌트 (Data Display용)
- `mui-theme-provider.tsx`: MUI 테마 프로바이더 (전체 사이트 공통)

## 사용법

### Published Pages에서 컴포넌트 사용
```tsx
// Analytics 페이지에서 차트 컴포넌트 사용
import { Chart, DashboardLayout, DashboardCard } from '@/components'

// Forms 페이지에서 폼 컴포넌트 사용
import { DatePicker, TimePicker, DateTimePicker, TextField, Button } from '@/components'

// Calendar 페이지에서 날짜/시간 선택기 사용
import { DateTimePicker, CalendarIcon } from '@/components'

// Documents 페이지에서 테이블 컴포넌트 사용
import { TabulatorTable, Table, TableBody, TableCell } from '@/components'

// 아이콘 사용 (모든 페이지에서 공통)
import { Icons } from '@/components'
<Icons.SearchIcon size={24} />
<Icons.UserIcon size={20} />
<Icons.CalendarIcon size={16} />
```

### 페이지별 주요 사용 컴포넌트

#### Analytics 페이지 (`/analytics`)
- `DashboardLayout`: 전체 레이아웃
- `DashboardCard`: 데이터 카드
- `Chart`: 차트 표시
- `Icons.BarChart3Icon`, `Icons.LineChartIcon`: 차트 아이콘

#### Forms 페이지들 (`/forms/*`)
- `DatePicker`, `TimePicker`, `DateTimePicker`: 날짜/시간 선택
- `TextField`, `Button`, `Select`: 폼 입력 요소
- `Icons.CalendarIcon`, `Icons.ClockIcon`: 날짜/시간 아이콘

#### Calendar 페이지 (`/calendar`)
- `DateTimePicker`: 날짜/시간 선택
- `Icons.CalendarIcon`: 캘린더 아이콘

#### Documents 페이지 (`/documents`)
- `TabulatorTable`: 고급 테이블
- `Icons.FileTextIcon`, `Icons.FolderIcon`: 문서 아이콘

#### Messages 페이지 (`/messages`)
- `Icons.MessageCircleIcon`, `Icons.MailIcon`: 메시지 아이콘

#### Notifications 페이지 (`/notifications`)
- `Icons.BellIcon`, `Icons.AlertCircleIcon`: 알림 아이콘

### 장점
1. **중앙 집중식 관리**: 모든 MUI 컴포넌트와 아이콘을 한 곳에서 관리
2. **일관성**: Published Pages 전체에서 동일한 컴포넌트와 아이콘 사용
3. **유지보수성**: 버전 업데이트나 변경사항을 한 곳에서 관리
4. **가독성**: import 구문이 간결해짐
5. **카테고리별 분류**: 컴포넌트와 아이콘을 용도별로 체계적으로 분류
6. **페이지별 최적화**: 각 Published Page의 기능에 맞는 컴포넌트 제공

## 주의사항

- 새로운 MUI 컴포넌트나 아이콘을 추가할 때는 해당 카테고리에 맞는 파일에 추가
- 기존 코드에서 직접 `@mui/material`이나 `lucide-react`에서 import하던 것을 `@/components`로 변경
- 아이콘 사용 시 `Icons.아이콘명` 형태로 사용
- Published Pages에서 사용할 새로운 컴포넌트는 `index.ts`에 export 추가 필요
- Tabulator 테이블은 Documents 페이지에서 주로 사용되며, 고급 데이터 표시 기능 제공

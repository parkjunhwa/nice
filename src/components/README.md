# Components Structure

이 디렉토리는 프로젝트의 공통 컴포넌트들을 관리합니다. 사이트는 **Published Pages** 구조로, 다양한 기능별 페이지를 지원합니다.

## 사이트 구조

### Published Pages (`/app/published`)
- **Analytics** (`/analytics`) - 데이터 분석 및 차트
- **Calendar** (`/calendar`) - 캘린더 기능
- **Documents** (`/documents`) - 문서 관리
  - Media/Images/Profile - 프로필 이미지 관리
- **Forms** (`/forms`) - 폼 관련
  - Advanced, Basic, File Upload, Multi-step, Search, Validation
- **Messages** (`/messages`) - 메시지 관리
- **MUI** (`/mui`) - MUI 컴포넌트 데모
- **Notifications** (`/notifications`) - 알림 관리
- **Search** (`/search01`, `/search02`) - 검색 기능

## 컴포넌트 구조

### MUI 컴포넌트 (`/mui`)
- `index.ts`: MUI 컴포넌트들을 카테고리별로 export
  - **Layout & Navigation**: AppBar, Toolbar, Drawer, Tabs, Grid, Card 등
  - **Forms & Inputs**: TextField, Button, Checkbox, Select, Autocomplete 등
  - **Data Display**: Table, Avatar, Badge, Chip, Typography 등
  - **Feedback**: Alert, Dialog, Snackbar, Tooltip, Popover 등
  - **Navigation & Actions**: Pagination, SpeedDial, Link 등
  - **Transitions & Animations**: Grow, Fade, Zoom, Slide, Collapse 등

### 아이콘 (`/icons`)
- `index.ts`: Lucide React 아이콘들을 카테고리별로 export
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
- `index.ts`: 모든 컴포넌트 통합 export
- `date-picker.tsx`: 날짜 선택 (Forms)
- `time-picker.tsx`: 시간 선택 (Forms)
- `date-time-picker.tsx`: 날짜/시간 선택 (Calendar)
- `dashboard-layout.tsx`: 대시보드 레이아웃 (Analytics)
- `dashboard-card.tsx`: 대시보드 카드 (Analytics)
- `header.tsx`: 헤더 (공통)
- `sidebar.tsx`: 사이드바 (공통)
- `sidebar-toggle.tsx`: 사이드바 토글 (공통)
- `chart.tsx`: 차트 (Analytics)
- `tabulator-table.tsx`: Tabulator 테이블 (Documents)
- `mui-theme-provider.tsx`: MUI 테마 프로바이더 (공통)

## 사용법

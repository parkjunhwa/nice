# Components Structure

이 디렉토리는 프로젝트의 공통 컴포넌트들을 관리합니다. 사이트는 **Published Pages** 구조로, 다양한 기능별 페이지를 지원합니다.

## 사이트 구조

### Published Pages (`/app/published`)
- **ADM001** (`/adm001`) - 관리 페이지 001
- **ADM002** (`/adm002`) - 관리 페이지 002
- **ADM003** (`/adm003`) - 관리 페이지 003
- **ADM004** (`/adm004`) - 관리 페이지 004
- **ADM005** (`/adm005`) - 관리 페이지 005
- **MNB005** (`/mnb005`) - 메뉴 페이지 005
- **MNB006** (`/mnb006`) - 메뉴 페이지 006
- **Components** (`/components`) - 컴포넌트 데모 페이지들
  - Modal (`/modal`) - 모달 컴포넌트 데모
  - MUI (`/mui`) - MUI 컴포넌트 데모
  - Search01 (`/search01`) - 검색 컴포넌트 데모 1
  - Search02 (`/search02`) - 검색 컴포넌트 데모 2

### 메뉴 페이지들
- **MNB001** (`/mnb001`) - 메뉴 페이지 001

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
- `date-picker.tsx`: 날짜 선택 (MUI X Date Pickers)
- `time-picker.tsx`: 시간 선택 (MUI X Date Pickers) - 향후 사용 예정
- `date-time-picker.tsx`: 날짜/시간 선택 (MUI X Date Pickers)
- `date-range-picker.tsx`: 날짜 범위 선택 (MUI X Date Pickers)
- `dashboard-layout.tsx`: 대시보드 레이아웃 (Published Pages)
- `sidebar.tsx`: 사이드바 (공통)
- `sidebar-toggle.tsx`: 사이드바 토글 (공통)
- `accordion-toggle-button.tsx`: 아코디언 토글 버튼
- `chart.tsx`: 차트 (Chart.js + Recharts)
- `Breadcrumb.tsx`: 브레드크럼 네비게이션
- `mui-theme-provider.tsx`: MUI 테마 프로바이더 (공통)

### 테이블 컴포넌트 (`/table`)
- `index.ts`: 테이블 컴포넌트 export
- `sample-table.tsx`: 샘플 테이블 컴포넌트
- `table-common.scss`: 공통 테이블 스타일
- `README.md`: 테이블 컴포넌트 가이드

### 모달 컴포넌트 (`/modal`)
- `index.ts`: 모달 컴포넌트 export
- `basic-modal.tsx`: 기본 모달
- `confirm-modal.tsx`: 확인 모달
- `cmn001.tsx` ~ `cmn012.tsx`: 공통 모달 컴포넌트들
  - `cmn010.tsx`: 결재상신 본문 등록 모달 (MD Editor 포함)
- `mui-basic-modal.tsx`: MUI 기본 모달
- `mui-confirm-modal.tsx`: MUI 확인 모달
- `mui-form-modal.tsx`: MUI 폼 모달
- `mui-fullscreen-modal.tsx`: MUI 전체화면 모달
- `mnb002.tsx`: MNB002 모달 컴포넌트

## 사용법

### 기본 컴포넌트 사용

```tsx
import { 
  DashboardLayout, 
  Chart,
  DatePicker,
  SampleTable 
} from '@/components'

// 대시보드 레이아웃
<DashboardLayout>
  <div className="c-section">
    {/* 대시보드 내용 */}
  </div>
</DashboardLayout>
```

### MUI 컴포넌트 사용

```tsx
import { 
  TextField, 
  Button, 
  Typography,
  Icons 
} from '@/components'

// MUI 컴포넌트
<TextField label="이메일" variant="outlined" />
<Button variant="contained" color="primary">저장</Button>

// 아이콘 사용
<Icons.SearchIcon size={24} />
<Icons.CalendarIcon size={20} />
```

### 날짜/시간 선택기 사용

```tsx
import { 
  DatePicker, 
  DateTimePicker, 
  DateRangePicker 
} from '@/components'

// 기본 날짜 선택
<DatePicker
  label="날짜 선택"
  value={selectedDate}
  onChange={handleDateChange}
/>

// 날짜/시간 선택
<DateTimePicker
  label="날짜/시간 선택"
  value={selectedDateTime}
  onChange={handleDateTimeChange}
/>

// 날짜 범위 선택
<DateRangePicker
  label="날짜 범위"
  value={[startDate, endDate]}
  onChange={handleDateRangeChange}
/>
```

### 테이블 컴포넌트 사용

```tsx
import { SampleTable } from '@/components'

<SampleTable
  data={tableData}
  columns={columns}
  // 추가 옵션들
/>
```

### 모달 컴포넌트 사용

```tsx
import { 
  BasicModal, 
  ConfirmModal,
  Cmn001,
  Cmn012, // 정산기준정보 검색 모달
  MuiBasicModal 
} from '@/components'

// 기본 모달
<BasicModal 
  isOpen={isOpen}
  onClose={handleClose}
  title="모달 제목"
>
  모달 내용
</BasicModal>

// 확인 모달
<ConfirmModal
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="확인"
  message="정말 삭제하시겠습니까?"
/>
```

### 시간 선택기 사용

```tsx
import { TimePicker } from '@/components'

<TimePicker
  label="시간 선택"
  value={selectedTime}
  onChange={handleTimeChange}
/>
```

### 리치 텍스트 에디터 (MD Editor) 사용

```tsx
import dynamic from 'next/dynamic'

// MD Editor를 동적으로 import (SSR 문제 방지)
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

// MD Editor 사용
<MDEditor
  value={content}
  onChange={(val) => setContent(val || '')}
  height={300}
  data-color-mode="light"
  placeholder="본문 내용을 입력하세요..."
/>
```

**MD Editor 특징:**
- 마크다운 문법 지원
- 실시간 미리보기
- React 19 완전 호환
- 이미지 및 링크 삽입 지원
- 한국어 환경 최적화
- SSR 문제 방지를 위한 동적 import
- 결재상신 본문 등록 모달에서 사용

## 컴포넌트 개발 가이드

### 새로운 컴포넌트 추가

1. `src/components/` 디렉토리에 새 컴포넌트 파일 생성
2. TypeScript 인터페이스 정의
3. `src/components/index.ts`에 export 추가

```tsx
// src/components/new-component.tsx
interface NewComponentProps {
  title: string
  value: string
  className?: string
}

export function NewComponent({ title, value, className }: NewComponentProps) {
  return (
    <div className={`c-panel ${className || ''}`}>
      <h3 className="c-section-title">{title}</h3>
      <p className="c-stat-item__value">{value}</p>
    </div>
  )
}
```

### 컴포넌트 스타일링

- **SCSS 컴포넌트 클래스**: `c-` 접두사 사용
- **Tailwind CSS**: 유틸리티 클래스 활용
- **토큰 기반 시스템**: CSS 변수 활용
- **반응형 디자인**: 브레이크포인트 지원

```scss
// 컴포넌트 스타일 예시
.c-new-component {
  @include card-base;
  padding: var(--space-6);
  
  .c-new-component__title {
    font-family: 'NICE', sans-serif;
    font-weight: var(--font-weight-semibold);
    color: hsl(var(--color-fg));
  }
}
```

### 컴포넌트 테스트

각 컴포넌트는 해당하는 데모 페이지에서 테스트할 수 있습니다:

- **MUI 컴포넌트**: `/published/components/mui`
- **모달 컴포넌트**: `/published/components/modal`
- **검색 컴포넌트**: `/published/components/search01`, `/published/components/search02`

## 주의사항

1. **타입 안전성**: 모든 컴포넌트는 TypeScript 인터페이스 정의 필수
2. **접근성**: ARIA 속성과 키보드 네비게이션 지원
3. **반응형**: 모바일, 태블릿, 데스크톱 모든 디바이스 지원
4. **성능**: 불필요한 리렌더링 방지
5. **일관성**: 프로젝트 전체에서 동일한 스타일 가이드라인 적용

---

**작성자**
디자이너/퍼블리셔 박준화 수석 (최종수정일: 2025-09-25)
010-9479-3188
junhwa.park@gmail.com

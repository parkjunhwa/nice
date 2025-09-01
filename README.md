# Next.js Published Pages 대시보드

Next.js 15와 TypeScript, Tailwind CSS, MUI를 사용하여 구축된 현대적인 Published Pages 대시보드 환경입니다. 다양한 기능별 페이지들을 포함한 완전한 관리 시스템을 제공합니다.

## 🚀 주요 기능

- **Published Pages 구조**: Analytics, Calendar, Documents, Forms, Messages, MUI, Notifications, Search 등 다양한 기능별 페이지
- **MUI 통합**: Material-UI 컴포넌트를 체계적으로 분류하여 제공
- **NICE 폰트**: 한국어 최적화된 폰트 시스템 (Light, Regular, SemiBold)
- **고급 테이블**: Tabulator.js 기반의 강력한 데이터 테이블 컴포넌트
- **다양한 차트**: Chart.js와 Recharts를 활용한 데이터 시각화
- **날짜/시간 선택기**: MUI X Date Pickers를 활용한 고급 날짜/시간 선택 기능
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 지원
- **TypeScript**: 타입 안전성을 보장하는 TypeScript 지원
- **컴포넌트 기반**: 재사용 가능한 컴포넌트 구조
- **토큰 기반 디자인 시스템**: SCSS와 CSS 변수를 활용한 일관된 디자인 관리
- **Lucide React 아이콘**: 200+ 아이콘을 카테고리별로 체계화

## 📁 프로젝트 구조

```
nice/
├── public/                   # 정적 파일들
│   ├── fonts/               # NICE 폰트 파일들
│   │   ├── NICEGtNeobUni-bLt.woff2
│   │   ├── NICEGtNeobUni-bLt.otf
│   │   ├── NICEGtNeobUniTTF-bLt.ttf
│   │   ├── NICEGtNeobUni-cRg.woff2
│   │   ├── NICEGtNeobUni-cRg.otf
│   │   ├── NICEGtNeobUniTTF-cRg.ttf
│   │   ├── NICEGtNeobUni-eSb.woff2
│   │   ├── NICEGtNeobUni-eSb.otf
│   │   └── NICEGtNeobUniTTF-eSb.ttf
│   └── images/              # 이미지 파일들
│       ├── background_login.png
│       ├── ci.png
│       ├── logo.png
│       └── nice_ci.png
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── published/       # Published Pages (메인 페이지들)
│   │   │   ├── components/  # 컴포넌트 데모 페이지들
│   │   │   │   ├── modal/   # 모달 컴포넌트 데모
│   │   │   │   ├── mui/     # MUI 컴포넌트 데모
│   │   │   │   ├── search01/ # 검색 컴포넌트 데모 1
│   │   │   │   └── search02/ # 검색 컴포넌트 데모 2
│   │   │   ├── forms/       # 폼 관리 페이지들
│   │   │   │   ├── advanced/    # 고급 폼
│   │   │   │   ├── basic/       # 기본 폼
│   │   │   │   ├── file-upload/ # 파일 업로드
│   │   │   │   ├── multi-step/  # 다단계 폼
│   │   │   │   ├── search/      # 검색 폼
│   │   │   │   └── validation/  # 폼 검증
│   │   │   ├── layout.tsx   # Published Pages 레이아웃
│   │   │   └── page.tsx     # 메인 대시보드 페이지
│   │   ├── globals.scss     # 전역 SCSS 스타일 (폰트 정의 포함)
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   └── page.tsx         # 홈페이지
│   ├── components/          # 재사용 가능한 컴포넌트들
│   │   ├── mui/             # MUI 컴포넌트 분류
│   │   │   └── index.ts     # MUI 컴포넌트 카테고리별 export
│   │   ├── icons/           # Lucide React 아이콘 분류
│   │   │   └── index.ts     # 아이콘 카테고리별 export
│   │   ├── chart.tsx        # Chart.js 기반 차트 컴포넌트
│   │   ├── dashboard-card.tsx # 대시보드 카드 컴포넌트
│   │   ├── dashboard-layout.tsx # 대시보드 레이아웃
│   │   ├── date-picker.tsx  # 날짜 선택 컴포넌트 (MUI X Date Pickers)
│   │   ├── date-range-picker.tsx # 날짜 범위 선택 컴포넌트
│   │   ├── date-time-picker.tsx # 날짜/시간 선택 컴포넌트
│   │   ├── header.tsx       # 헤더 컴포넌트
│   │   ├── sidebar.tsx      # 사이드바 컴포넌트
│   │   ├── sidebar-toggle.tsx # 사이드바 토글 컴포넌트
│   │   ├── table/           # 테이블 컴포넌트들
│   │   │   ├── tabulator-table.tsx # Tabulator.js 테이블 컴포넌트
│   │   │   └── sample-table.tsx # 샘플 테이블 컴포넌트
│   │   ├── modal/           # 모달 컴포넌트들
│   │   │   ├── basic-modal.tsx # 기본 모달
│   │   │   ├── confirm-modal.tsx # 확인 모달
│   │   │   └── mui-*.tsx    # MUI 모달 컴포넌트들
│   │   ├── mui-theme-provider.tsx # MUI 테마 프로바이더
│   │   ├── index.ts         # 모든 컴포넌트 통합 export
│   │   └── README.md        # 컴포넌트 구조 설명
│   ├── lib/                 # 유틸리티 함수들
│   │   ├── mui-theme.ts     # MUI 테마 설정
│   │   └── utils.ts         # 공통 유틸리티 함수
│   └── styles/              # SCSS 스타일 파일들
│       ├── components/      # 컴포넌트별 스타일
│       │   ├── _buttons.scss # 버튼 컴포넌트 스타일
│       │   ├── _cards.scss   # 카드 컴포넌트 스타일
│       │   ├── _common.scss  # 공통 컴포넌트 스타일
│       │   ├── _data.scss    # 데이터 표시 컴포넌트 스타일
│       │   ├── _examples.scss # 예제 컴포넌트 스타일
│       │   ├── _forms.scss   # 폼 컴포넌트 스타일 (MUI DatePicker 스타일 포함)
│       │   ├── _layout.scss  # 레이아웃 컴포넌트 스타일
│       │   └── _navigation.scss # 네비게이션 컴포넌트 스타일
│       ├── core/            # 핵심 스타일
│       │   ├── _mixins.scss # SCSS 믹스인
│       │   └── _tokens.scss # 디자인 토큰 (CSS 변수)
│       ├── layers/          # 레이어 스타일
│       │   └── _base.scss   # 기본 스타일
│       └── utilities/       # 유틸리티 스타일
│           └── _helpers.scss # 헬퍼 유틸리티
├── eslint.config.mjs        # ESLint 설정
├── next.config.ts           # Next.js 설정
├── package.json             # 프로젝트 의존성 및 스크립트
├── postcss.config.mjs       # PostCSS 설정
├── tailwind.config.ts       # Tailwind CSS 설정
└── tsconfig.json            # TypeScript 설정
```

## 🛠️ 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 브라우저에서 확인

[http://localhost:3000]에서 데시보드를 확인할 수 있습니다.

## 🎨 주요 컴포넌트 설명

### DashboardCard
통계 정보를 표시하는 카드 컴포넌트입니다.

```tsx
<DashboardCard
  title="총 사용자"
  value="12,345"
  description="활성 사용자 수"
  icon={Users}
  trend={{ value: 12, isPositive: true }}
/>
```

### Chart
Chart.js와 Recharts 기반의 다양한 차트를 표시하는 컴포넌트입니다.

```tsx
<Chart
  title="월별 매출 추이"
  data={monthlyData}
  type="line"
  colors={{
    value1: '#3b82f6',
    value2: '#fbbf24'
  }}
  labels={{
    value1: '건수',
    value2: '금액 (억원)'
  }}
/>
```

### TabulatorTable
Tabulator.js 기반의 고급 테이블 컴포넌트입니다.

```tsx
<TabulatorTable
  data={tableData}
  columns={columns}
  options={{
    pagination: true,
    movableColumns: true,
    resizableRows: true
  }}
/>
```

### Date/Time Pickers
MUI X Date Pickers를 활용한 날짜/시간 선택 컴포넌트들입니다.

```tsx
<DatePicker
  label="날짜 선택"
  value={selectedDate}
  onChange={handleDateChange}
/>

<DateTimePicker
  label="날짜/시간 선택"
  value={selectedDateTime}
  onChange={handleDateTimeChange}
/>

<DateRangePicker
  label="날짜 범위 선택"
  value={[startDate, endDate]}
  onChange={handleDateRangeChange}
/>
```

### MUI 컴포넌트 통합
Material-UI 컴포넌트들을 카테고리별로 분류하여 제공합니다.

```tsx
import { 
  TextField, 
  Button, 
  Typography,
  Icons 
} from '@/components'

// 아이콘 사용
<Icons.SearchIcon size={24} />
<Icons.CalendarIcon size={20} />
```

### DashboardLayout
Published Pages의 공통 레이아웃 컴포넌트입니다.
- **사이드바 네비게이션**: 접힘/펼침 기능 지원
- **헤더**: 상단 헤더 컴포넌트
- **메인 콘텐츠**: 페이지별 콘텐츠 영역
- **반응형 디자인**: 모바일/태블릿/데스크톱 지원

## 📄 페이지 구성

### 메인 대시보드 (`/published`)
- **통계 카드**: 총 사용자, 매출, 주문, 전환율
- **차트 시각화**: 최근 7일간 매출, 3개월간 매출, 제품별 매출, 월별 매출
- **최근 활동**: 사용자 활동 및 시스템 활동 실시간 피드
- **추가 통계**: 인기 상품, 지역별 매출, 시스템 상태 모니터링

### Forms 페이지들 (`/published/forms`)
- **Advanced** (`/advanced`): 고급 폼 컴포넌트 (DatePicker, DateTimePicker 포함)
- **Basic** (`/basic`): 기본 폼 요소들
- **File Upload** (`/file-upload`): 파일 업로드 폼
- **Multi-step** (`/multi-step`): 다단계 폼 프로세스
- **Search** (`/search`): 검색 폼 기능
- **Validation** (`/validation`): 폼 유효성 검사

### Components 데모 페이지들 (`/published/components`)
- **Modal** (`/modal`): 모달 컴포넌트 데모
- **MUI** (`/mui`): MUI 컴포넌트 데모 및 예제
- **Search01** (`/search01`): 검색 컴포넌트 데모 1
- **Search02** (`/search02`): 검색 컴포넌트 데모 2

## 🎯 사용된 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + SCSS
- **UI Library**: Material-UI (MUI) v7
- **Icons**: Lucide React (200+ 아이콘)
- **Charts**: Chart.js + react-chartjs-2, Recharts
- **Tables**: Tabulator.js (고급 테이블)
- **Date Pickers**: MUI X Date Pickers (DatePicker, DateTimePicker, DateRangePicker)
- **Fonts**: NICE (한국어 최적화)
- **State Management**: React useState, useEffect
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Storage**: LocalStorage (메뉴 상태 저장)
- **Design System**: 토큰 기반 CSS 변수 시스템

## 🔧 개발 가이드

### 새로운 Published Page 추가

1. `src/app/published/` 디렉토리에 새 폴더 생성
2. `page.tsx` 파일 생성
3. `DashboardLayout` 컴포넌트로 감싸기

```tsx
import { DashboardLayout } from "@/components/dashboard-layout"

export default function NewPage() {
  return (
    <DashboardLayout>
      <div className="c-section">
        <div className="c-page-header">
          <h1 className="c-page-header__title">새 페이지</h1>
          <p className="c-page-header__description">페이지 설명</p>
        </div>
        {/* 페이지 내용 */}
      </div>
    </DashboardLayout>
  )
}
```

### 새로운 컴포넌트 추가

1. `src/components/` 디렉토리에 새 컴포넌트 파일 생성
2. TypeScript 인터페이스 정의
3. `src/components/index.ts`에 export 추가

```tsx
// src/components/new-component.tsx
interface NewComponentProps {
  title: string
  value: string
}

export function NewComponent({ title, value }: NewComponentProps) {
  return (
    <div className="c-panel">
      <h3 className="c-section-title">{title}</h3>
      <p className="c-stat-item__value">{value}</p>
    </div>
  )
}
```

### MUI 컴포넌트 사용

```tsx
import { 
  TextField, 
  Button, 
  Typography,
  Icons 
} from '@/components'

// MUI 컴포넌트 사용
<TextField 
  label="입력 필드" 
  variant="outlined" 
  size="small"
/>

// 아이콘 사용
<Icons.SearchIcon size={24} />
```

### DatePicker 사용

```tsx
import { DatePicker, DateTimePicker, DateRangePicker } from '@/components'

// 기본 날짜 선택
<DatePicker
  label="날짜 선택"
  value={selectedDate}
  onChange={handleDateChange}
  inputFormat="yyyy-MM-dd"
/>

// 날짜/시간 선택
<DateTimePicker
  label="날짜/시간 선택"
  value={selectedDateTime}
  onChange={handleDateTimeChange}
  inputFormat="yyyy-MM-dd HH:mm"
/>

// 날짜 범위 선택
<DateRangePicker
  label="날짜 범위"
  value={[startDate, endDate]}
  onChange={handleDateRangeChange}
/>
```

### 스타일링 가이드

- **Tailwind CSS**: 유틸리티 클래스 사용
- **SCSS 컴포넌트 클래스**: `c-` 접두사 사용
- **토큰 기반 시스템**: CSS 변수 활용
- **NICE**: 한국어 폰트 사용
- **반응형 디자인**: 브레이크포인트 활용

```scss
// SCSS 컴포넌트 클래스 예시
.c-panel {
  background: hsl(var(--color-bg));
  border-radius: var(--radius);
  padding: var(--space-6);
}

.c-section-title {
  font-family: 'NICE', sans-serif;
  font-weight: var(--font-weight-semibold);
  color: hsl(var(--color-fg));
}
```

### 폰트 사용 가이드

```tsx
// 폰트 두께 클래스 사용
<div className="font-light">Light (300)</div>
<div className="font-normal">Regular (400)</div>
<div className="font-semibold">SemiBold (600)</div>

// 모노스페이스 폰트
<div className="font-mono">Monospace</div>
```

## 🎨 디자인 시스템

### NICE 폰트 시스템
- **Light (300)**: 가벼운 두께
- **Regular (400)**: 기본 두께
- **SemiBold (600)**: 중간-굵은 두께
- **Mono**: 모노스페이스 폰트 (코드, 데이터 표시용)

### 토큰 기반 시스템
- **색상**: primary, secondary, accent, status, neutral, background
- **간격**: 컴포넌트, 섹션, 페이지별 세분화된 spacing
- **타이포그래피**: NICE 폰트 패밀리, 크기, 굵기, 줄 높이
- **그림자**: elevation, depth별 shadow 시스템
- **Z-index**: 컴포넌트별 계층 구조
- **애니메이션**: duration, easing 함수

### SCSS 컴포넌트 클래스
- **레이아웃**: `c-dashboard-layout`, `c-sidebar`, `c-main-content`
- **페이지**: `c-page-header`, `c-section`, `c-panel`
- **데이터**: `c-stat-item`, `c-data-card`, `c-activity-item`
- **폼**: `c-form-group`, `c-input`, `c-button`
- **네비게이션**: `c-menu-item`, `c-popover-menu`, `c-popover-arrow`
- **공통**: `c-grid`, `c-section-grid`, `c-progress-bar`

### MUI 통합 시스템
- **컴포넌트 분류**: Layout, Forms, Data Display, Feedback, Navigation
- **테마 통합**: MUI 테마와 SCSS 토큰 시스템 연동
- **아이콘 시스템**: Lucide React 200+ 아이콘 카테고리별 분류
- **날짜/시간**: MUI X Date Pickers 통합 (DatePicker, DateTimePicker, DateRangePicker)

### DatePicker 스타일링
- **오늘 날짜**: gray-100 배경색, 테두리 제거
- **호버 효과**: gray-200 배경색
- **선택된 날짜**: MUI 기본 선택 스타일 유지
- **아이콘**: Lucide React CalendarIcon 사용

### 믹스인 시스템
- **레이아웃**: flexbox, grid, positioning
- **반응형**: breakpoint별 스타일 적용
- **접근성**: focus, hover, disabled 상태
- **애니메이션**: transition, transform, keyframe
- **컴포넌트**: card, button, input, table 스타일

## 📝 라이센스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**작성자**: 디자이너/퍼블리셔 박준화 수석

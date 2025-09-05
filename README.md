# NICE Dashboard System

Next.js 15와 TypeScript, Tailwind CSS, MUI를 사용하여 구축된 현대적인 대시보드 시스템입니다. 다양한 관리 페이지와 컴포넌트 데모를 포함한 완전한 관리 시스템을 제공합니다.

## 🚀 주요 기능

- **Published Pages 구조**: 관리 페이지(ADM001-005), 메뉴 페이지(MNB001, MNB005-006) 등 다양한 기능별 페이지
- **MUI 통합**: Material-UI 컴포넌트를 체계적으로 분류하여 제공
- **고급 차트**: Chart.js와 Recharts를 활용한 데이터 시각화
- **날짜/시간 선택기**: MUI X Date Pickers를 활용한 고급 날짜/시간 선택 기능
- **모달 시스템**: 다양한 모달 컴포넌트 (기본, 확인, 폼, 전체화면)
- **테이블 컴포넌트**: Tabulator.js 기반의 강력한 데이터 테이블
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 지원
- **TypeScript**: 타입 안전성을 보장하는 TypeScript 지원
- **컴포넌트 기반**: 재사용 가능한 컴포넌트 구조
- **SCSS 스타일링**: 토큰 기반 디자인 시스템과 SCSS 컴포넌트 클래스
- **Lucide React 아이콘**: 200+ 아이콘을 카테고리별로 체계화

## 📁 프로젝트 구조

```
nice/
├── public/                   # 정적 파일들
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── mnb001/          # 메뉴 페이지 001
│   │   │   └── page.tsx
│   │   ├── published/       # Published Pages (메인 페이지들)
│   │   │   ├── adm001/      # 관리 페이지 001
│   │   │   ├── adm002/      # 관리 페이지 002
│   │   │   ├── adm003/      # 관리 페이지 003
│   │   │   ├── adm004/      # 관리 페이지 004
│   │   │   ├── adm005/      # 관리 페이지 005
│   │   │   ├── components/  # 컴포넌트 데모 페이지들
│   │   │   │   ├── modal/   # 모달 컴포넌트 데모
│   │   │   │   ├── mui/     # MUI 컴포넌트 데모
│   │   │   │   ├── search01/ # 검색 컴포넌트 데모 1
│   │   │   │   └── search02/ # 검색 컴포넌트 데모 2
│   │   │   ├── mnb005/      # 메뉴 페이지 005
│   │   │   ├── mnb006/      # 메뉴 페이지 006
│   │   │   ├── layout.tsx   # Published Pages 레이아웃
│   │   │   └── page.tsx     # 메인 대시보드 페이지
│   │   ├── globals.scss     # 전역 SCSS 스타일
│   │   ├── layout.tsx       # 루트 레이아웃
│   │   └── page.tsx         # 홈페이지 (redirect to /published)
│   ├── components/          # 재사용 가능한 컴포넌트들
│   │   ├── mui/             # MUI 컴포넌트 분류
│   │   │   └── index.ts     # MUI 컴포넌트 카테고리별 export
│   │   ├── icons/           # Lucide React 아이콘 분류
│   │   │   └── index.ts     # 아이콘 카테고리별 export
│   │   ├── modal/           # 모달 컴포넌트들
│   │   │   ├── basic-modal.tsx
│   │   │   ├── confirm-modal.tsx
│   │   │   ├── cmn001.tsx ~ cmn012.tsx
│   │   │   ├── mui-basic-modal.tsx
│   │   │   ├── mui-confirm-modal.tsx
│   │   │   ├── mui-form-modal.tsx
│   │   │   └── mui-fullscreen-modal.tsx
│   │   ├── table/           # 테이블 컴포넌트들
│   │   │   ├── sample-table.tsx
│   │   │   └── table-common.scss
│   │   ├── chart.tsx        # Chart.js 기반 차트 컴포넌트
│   │   ├── dashboard-card.tsx # 대시보드 카드 컴포넌트
│   │   ├── dashboard-layout.tsx # 대시보드 레이아웃
│   │   ├── date-picker.tsx  # 날짜 선택 컴포넌트
│   │   ├── date-range-picker.tsx # 날짜 범위 선택 컴포넌트
│   │   ├── date-time-picker.tsx # 날짜/시간 선택 컴포넌트
│   │   ├── time-picker.tsx  # 시간 선택 컴포넌트
│   │   ├── sidebar.tsx      # 사이드바 컴포넌트
│   │   ├── sidebar-toggle.tsx # 사이드바 토글 컴포넌트
│   │   ├── accordion-toggle-button.tsx # 아코디언 토글 버튼
│   │   ├── Breadcrumb.tsx   # 브레드크럼 네비게이션
│   │   ├── mui-theme-provider.tsx # MUI 테마 프로바이더
│   │   ├── index.ts         # 모든 컴포넌트 통합 export
│   │   └── README.md        # 컴포넌트 구조 설명
│   ├── lib/                 # 유틸리티 함수들
│   │   ├── mui-theme.ts     # MUI 테마 설정
│   │   └── utils.ts         # 공통 유틸리티 함수
│   └── styles/              # SCSS 스타일 파일들
│       ├── components/      # 컴포넌트별 스타일
│       │   ├── _buttons.scss
│       │   ├── _cards.scss
│       │   ├── _common.scss
│       │   ├── _data.scss
│       │   ├── _examples.scss
│       │   ├── _forms.scss
│       │   ├── _layout.scss
│       │   ├── _navigation.scss
│       │   └── README.md
│       ├── core/            # 핵심 스타일
│       │   ├── _mixins.scss
│       │   └── _tokens.scss
│       ├── layers/          # 레이어 스타일
│       │   └── _base.scss
│       └── utilities/        # 유틸리티 스타일
│           └── _helpers.scss
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

[http://localhost:3000](http://localhost:3000)에서 대시보드를 확인할 수 있습니다.

## 📄 페이지 구성

### 메인 대시보드 (`/published`)
- **매출 현황**: 최근 7일간과 3개월간 매출 차트
- **공지사항**: 실시간 활동 피드
- **고객센터**: 고객 지원 섹션

### 관리 페이지들 (`/published/adm*`)
- **ADM001** (`/adm001`): 관리 페이지 001
- **ADM002** (`/adm002`): 관리 페이지 002
- **ADM003** (`/adm003`): 관리 페이지 003
- **ADM004** (`/adm004`): 관리 페이지 004
- **ADM005** (`/adm005`): 관리 페이지 005

### 메뉴 페이지들
- **MNB001** (`/mnb001`): 메뉴 페이지 001
- **MNB005** (`/published/mnb005`): 메뉴 페이지 005
- **MNB006** (`/published/mnb006`): 메뉴 페이지 006

### Components 데모 페이지들 (`/published/components`)
- **Modal** (`/modal`): 모달 컴포넌트 데모
- **MUI** (`/mui`): MUI 컴포넌트 데모 및 예제
- **Search01** (`/search01`): 검색 컴포넌트 데모 1
- **Search02** (`/search02`): 검색 컴포넌트 데모 2

## 🎯 사용된 기술 스택

### Core Framework
- **Next.js 15**: App Router 기반 React 프레임워크
- **React 19.1.0**: 최신 React 버전
- **TypeScript 5**: 타입 안전성 보장

### Styling & UI
- **Tailwind CSS v4**: 유틸리티 퍼스트 CSS 프레임워크
- **SCSS**: CSS 전처리기
- **Material-UI (MUI) v7**: React UI 컴포넌트 라이브러리
- **MUI X Date Pickers v8**: 고급 날짜/시간 선택기
- **Lucide React**: 200+ 아이콘 라이브러리

### Data Visualization & Tables
- **Chart.js v4**: 차트 라이브러리
- **react-chartjs-2 v5**: Chart.js React 래퍼
- **Recharts v3**: React 차트 라이브러리
- **Tabulator.js v6**: 고급 테이블 컴포넌트

### Utilities & Tools
- **clsx**: 조건부 클래스명 유틸리티
- **tailwind-merge**: Tailwind 클래스 병합
- **class-variance-authority**: 컴포넌트 변형 관리
- **date-fns v4**: 날짜 유틸리티
- **jszip v3**: ZIP 파일 처리

### Development Tools
- **ESLint 9**: 코드 품질 관리
- **PostCSS**: CSS 후처리기
- **Autoprefixer**: CSS 벤더 프리픽스 자동 추가

## 🎨 주요 컴포넌트 설명

### Chart 컴포넌트
Chart.js와 Recharts 기반의 다양한 차트를 표시하는 컴포넌트입니다.

```tsx
<Chart
  data={salesData}
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

// MUI 컴포넌트 사용
<TextField 
  label="입력 필드" 
  variant="outlined" 
  size="small"
/>

// 아이콘 사용
<Icons.SearchIcon size={24} />
<Icons.CalendarIcon size={20} />
```

### 모달 컴포넌트 시스템
다양한 모달 컴포넌트를 제공합니다.

```tsx
import { 
  BasicModal, 
  ConfirmModal,
  Cmn001,
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

## 🔧 개발 가이드

### 새로운 Published Page 추가

1. `src/app/published/` 디렉토리에 새 폴더 생성
2. `page.tsx` 파일 생성
3. 필요한 경우 레이아웃 컴포넌트 사용

```tsx
export default function NewPage() {
  return (
    <div className="bg-gray-50">
      <div className="flex flex-row items-center justify-between mt-2 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">새 페이지</h1>
        </div>
      </div>
      {/* 페이지 내용 */}
    </div>
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
  className?: string
}

export function NewComponent({ title, value, className }: NewComponentProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 shadow-sm ${className || ''}`}>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{value}</p>
    </div>
  )
}
```

### 스타일링 가이드

- **Tailwind CSS**: 유틸리티 클래스 사용
- **SCSS 컴포넌트 클래스**: `c-` 접두사 사용
- **토큰 기반 시스템**: CSS 변수 활용
- **반응형 디자인**: 브레이크포인트 활용

```scss
// SCSS 컴포넌트 클래스 예시
.c-panel {
  background: hsl(var(--color-bg));
  border-radius: var(--radius);
  padding: var(--space-6);
}

.c-section-title {
  font-weight: var(--font-weight-semibold);
  color: hsl(var(--color-fg));
}
```

## 🎨 디자인 시스템

### 토큰 기반 시스템
- **색상**: primary, secondary, accent, status, neutral, background
- **간격**: 컴포넌트, 섹션, 페이지별 세분화된 spacing
- **타이포그래피**: 폰트 패밀리, 크기, 굵기, 줄 높이
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
- **날짜/시간**: MUI X Date Pickers 통합

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

**작성자**  
디자이너/퍼블리셔 박준화 수석 (최종수정일: 2025-01-27)  
010-9479-3188  
junhwa.park@gmail.com
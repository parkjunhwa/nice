# NICE 정산 System

Next.js 15와 TypeScript, Tailwind CSS, MUI를 사용하여 구축된 현대적인 대시보드 시스템입니다. 다양한 관리 페이지와 컴포넌트 데모를 포함한 완전한 관리 시스템을 제공합니다.

## 🚀 주요 기능

- **Published Pages 구조**: 관리 페이지(ADM001-005), 메뉴 페이지(MNB005-006) 등 다양한 기능별 페이지
- **MUI 통합**: Material-UI 컴포넌트를 실제 사용되는 것만 선별하여 제공 (80개 이상 불필요한 export 제거)
- **날짜/시간 선택기**: MUI X Date Pickers를 활용한 고급 날짜/시간 선택 기능
- **모달 시스템**: 다양한 모달 컴포넌트 (기본, 확인, 폼, 전체화면, 프로젝트 모달)
- **테이블 컴포넌트**: Tabulator 기반 SampleTable, 컬럼 정렬/팝업 버튼 커스터마이징 지원
- **전역 로더 시스템**: Context API 기반 전역 로더 상태 관리
- **사이드바 시스템**: 접힘/펼침 네비게이션, 하위 메뉴 active 상태 스타일링 (gray-100/gray-900)
- **에러 페이지**: 401, 404 전용 에러 페이지 (Next.js 자동 404 처리 포함)
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 지원(향후 대응용)
- **TypeScript**: 타입 안전성을 보장하는 TypeScript 지원
- **컴포넌트 기반**: 재사용 가능한 컴포넌트 구조
- **SCSS 스타일링**: 토큰 기반 디자인 시스템과 SCSS 컴포넌트 클래스 (c-panel 통일)
- **Lucide React 아이콘**: 200+ 아이콘을 카테고리별로 체계화
- **React 19 호환**: 최신 React 버전과 완전 호환
- **동적 아코디언 시스템**: 정산규칙 페이지의 고정/정기, 고정/비정기, 정산 아코디언을 동적으로 추가/삭제
- **FormulaInput 컴포넌트**: 수식 입력을 위한 전용 컴포넌트
 - **드래그 앤 드롭**: React DnD를 활용한 R01~R17 카드 순서 변경 기능
- **성능 최적화**: MUI 컴포넌트 ripple 애니메이션 제거로 반응성 향상
- **컴포넌트 분할**: 큰 컴포넌트를 모듈화하여 코드 스플리팅 및 유지보수성 향상

## 📁 프로젝트 구조

```
nice/
├── public/                   # 정적 파일들
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── err401/          # 401 에러 페이지
│   │   │   └── page.tsx
│   │   ├── err404/          # 404 에러 페이지 (수동 접근용)
│   │   │   └── page.tsx
│   │   ├── not-found.tsx    # Next.js 자동 404 처리 페이지
│   │   ├── mnb001/          # 공지사항 팝업 001
│   │   │   └── page.tsx
│   │   ├── published/       # Published Pages (메인 페이지들)
│   │   │   ├── adm001/      # 사용자 관리
│   │   │   ├── adm002/      # 권한 관리
│   │   │   ├── adm003/      # I/F로그 관리
│   │   │   ├── adm004/      # I/F로그 상세
│   │   │   ├── adm005/      # 공통코드 관리
│   │   │   ├── components/  # 컴포넌트 데모 페이지들
│   │   │   │   ├── loading/ # 로딩 중 컴포넌트 예시 페이지
│   │   │   │   ├── modal/   # 모달 컴포넌트 데모
│   │   │   │   └── mui/     # MUI 컴포넌트 데모
│   │   │   ├── cst001/      # 매입 집계(월)
│   │   │   ├── inc001/      # 매출 집계(일)
│   │   │   ├── inc002/      # 매출 집계(월)
│   │   │   ├── pmt001/      # 수납 집계(일)
│   │   │   ├── stl001/      # 정산 내역
│   │   │   ├── con001/      # 정산기준정보 목록
│   │   │   ├── con002/      # 정산기준정보
│   │   │   ├── rul001/      # 정산규칙 목록
│   │   │   ├── rul002/      # 정산규칙 (동적 아코디언 시스템)
│   │   │   │   ├── components/ # 분리된 컴포넌트들
│   │   │   │   │   ├── FixedRegularAccordion.tsx
│   │   │   │   │   ├── FixedIrregularAccordion.tsx
│   │   │   │   │   └── OptimizedTextField.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── mnb005/      # 공지사항 목록
│   │   │   ├── mnb006/      # 공지사항 상세
│   │   │   ├── layout.tsx   # Published Pages 레이아웃
│   │   │   └── page.tsx     # 대시보드 메인 페이지
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
│   │   │   ├── cmn001.tsx ~ cmn014.tsx
│   │   │   ├── mnb002.tsx   # 비밀번호 변경 모달
│   │   │   ├── mui-basic-modal.tsx
│   │   │   ├── mui-confirm-modal.tsx
│   │   │   ├── mui-form-modal.tsx
│   │   │   └── mui-fullscreen-modal.tsx
│   │   ├── table/           # 테이블 컴포넌트들
│   │   │   ├── sample-table.tsx
│   │   │   └── table-common.scss
│   │   ├── dashboard-layout.tsx # 대시보드 레이아웃 (LoaderProvider 포함)
│   │   ├── loader-overlay.tsx # 전역 로더 오버레이 컴포넌트
│   │   ├── date-picker.tsx  # 날짜 선택 컴포넌트
│   │   ├── date-range-picker.tsx # 날짜 범위 선택 컴포넌트
│   │   ├── date-time-picker.tsx # 날짜/시간 선택 컴포넌트
│   │   ├── time-picker.tsx  # 시간 선택 컴포넌트
│   │   ├── formula-input.tsx # 수식 입력 전용 컴포넌트
│   │   ├── sidebar.tsx      # 사이드바 컴포넌트
│   │   ├── sidebar-toggle.tsx # 사이드바 토글 컴포넌트
│   │   ├── accordion-toggle-button.tsx # 아코디언 토글 버튼
│   │   ├── Breadcrumb.tsx   # 브레드크럼 네비게이션
│   │   ├── mui-theme-provider.tsx # MUI 테마 프로바이더
│   │   ├── index.ts         # 모든 컴포넌트 통합 export
│   │   └── README.md        # 컴포넌트 구조 설명
│   ├── contexts/            # 전역 상태 관리 (React Context)
│   │   └── loader-context.tsx # 로더 Context
│   ├── lib/                 # 유틸리티 함수들
│   │   ├── mui-theme.ts     # MUI 테마 설정
│   │   └── utils.ts         # 공통 유틸리티 함수
│   └── styles/              # SCSS 스타일 파일들
│       ├── components/      # 컴포넌트별 스타일 (간략화됨)
│       │   ├── _buttons.scss      # 버튼 스타일 (기본 애니메이션만 유지)
│       │   ├── _cards.scss        # 카드 UI 컴포넌트 스타일 (사용되지 않는 클래스 제거)
│       │   ├── _common.scss       # 공통 패널 스타일 (c-panel만 유지)
│       │   ├── _data.scss         # 데이터 관련 스타일 (사용되지 않는 클래스 제거)
│       │   ├── _examples.scss     # 실제 사용되는 컴포넌트 스타일 (검색패널, 아코디언, 하단패널)
│       │   ├── _forms.scss        # 폼 요소 및 MUI 스타일 (실제 사용되는 스타일만 유지)
│       │   ├── _layout.scss       # 레이아웃 스타일 (사용되지 않는 클래스 제거)
│       │   ├── _navigation.scss   # 네비게이션 스타일 (사용되지 않는 클래스 제거)
│       │   └── README.md          # components/styles 폴더 내 SCSS 파일 구조 및 역할 설명 문서
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

(http://localhost:3000)에서 대시보드를 확인할 수 있습니다.  
포트가 사용 중인 경우 자동으로 다른 포트(3001, 3002 등)로 실행됩니다.

## 📄 페이지 구성

### 메인 대시보드 (`/published`)
- **메인 섹션**: 로고, 인사말 (배경 이미지 포함)
- **공지사항**: 실시간 공지사항 목록 및 상세 보기
- **고객센터**: 고객 지원 섹션 (전화번호 포함)

### 관리 페이지들 (`/published/adm*`)
- **ADM001** (`/adm001`): 사용자 관리
- **ADM002** (`/adm002`): 권한 관리
- **ADM003** (`/adm003`): I/F로그 관리
- **ADM004** (`/adm004`): I/F로그 상세
- **ADM005** (`/adm005`): 공통코드 관리

### 비즈니스 페이지들 (`/published/*`)
- **CST001** (`/cst001`): 매입 집계(월)
- **INC001** (`/inc001`): 매출 집계(일)
- **INC002** (`/inc002`): 매출 집계(월)
- **PMT001** (`/pmt001`): 수납 집계(일)
- **STL001** (`/stl001`): 정산 내역
- **CON001** (`/con001`): 정산기준정보 목록
- **CON002** (`/con002`): 정산기준정보
- **RUL001** (`/rul001`): 정산규칙 목록
- **RUL002** (`/rul002`): 정산규칙 (완성)

### 메뉴 페이지들
- **공지사항** (`/published/mnb005`): 공지사항 관리 페이지
- **메뉴 관리** (`/published/mnb006`): 메뉴 관리 페이지

### Components 데모 페이지들 (`/published/components`)
- **로딩중** (`/loading`)
- **모달** (`/modal`)
- **MUI 컴포넌트** (`/mui`)

## 🎯 사용된 기술 스택

### Core Framework
- **Next.js 15.5.2**: App Router 기반 React 프레임워크
- **React 19.1.0**: 최신 React 버전 (findDOMNode 제거로 인한 호환성 개선)
- **TypeScript 5**: 타입 안전성 보장

### Styling & UI
- **Tailwind CSS v4**: 유틸리티 퍼스트 CSS 프레임워크
- **SCSS**: CSS 전처리기
- **Material-UI (MUI) v7.3.1**: React UI 컴포넌트 라이브러리
- **MUI X Date Pickers v8.10.2**: 고급 날짜/시간 선택기
- **Lucide React v0.536.0**: 200+ 아이콘 라이브러리

### Data Tables
- **SampleTable**: 기본 테이블 컴포넌트 (Tabulator.js 기반)
- **Tabulator.js v6.3.1**: 고급 테이블 라이브러리

**테이블 주요 기능:**
- 컬럼 정렬 설정: `headerSort`, `headerHozAlign` (left/center/right)
- 헤더 컬럼 정렬별 padding 처리 (왼쪽: 9px, 중앙: 0px)
- 전체선택 체크박스 컬럼: padding 제거하여 중앙 정렬
- 팝업 버튼: 컬럼별 개별 활성화/비활성화 가능

### Modal Components
- **기본 모달**: BasicModal, ConfirmModal
- **MUI 모달**: MuiBasicModal, MuiFormModal, MuiConfirmModal, MuiFullscreenModal
- **프로젝트 모달**: Cmn001-Cmn014 (검색, 업로드, 폼 등), Mnb002 (비밀번호 변경), Stl002 (정산 실행 월)
- **리치 텍스트 에디터**: MD Editor (@uiw/react-md-editor) - 결재상신 본문 등록 모달에서 사용

### Drag & Drop
- **React DnD v16.0.1**: 드래그 앤 드롭 라이브러리
- **React DnD HTML5 Backend v16.0.1**: HTML5 드래그 앤 드롭 백엔드

### Utilities & Tools
- **clsx v2.1.1**: 조건부 클래스명 유틸리티
- **tailwind-merge v3.3.1**: Tailwind 클래스 병합
- **class-variance-authority v0.7.1**: 컴포넌트 변형 관리
- **date-fns v4.1.0**: 날짜 유틸리티
- **jszip v3.10.1**: ZIP 파일 처리
- **@uiw/react-md-editor v4.0.8**: 마크다운 에디터

### Development Tools
- **ESLint 9**: 코드 품질 관리
- **PostCSS**: CSS 후처리기
- **Autoprefixer**: CSS 벤더 프리픽스 자동 추가

## 🎨 주요 컴포넌트 설명

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
Material-UI 컴포넌트들을 실제 사용되는 것만 선별하여 export합니다.

**사용 가능한 MUI 컴포넌트:**
- **Layout**: Box, Typography, Accordion, AccordionSummary, AccordionDetails
- **Forms**: TextField, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, Radio, RadioGroup, Select, MenuItem, Slider, Switch, Autocomplete, InputAdornment, IconButton
- **Data Display**: Chip, ListItemText
- **Feedback**: Alert, Snackbar, Tooltip, Collapse

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

**최적화 내역:**
- 사용되지 않는 80개 이상의 MUI export 제거 (123줄 → 40줄)
- 실제 사용하는 컴포넌트만 유지하여 번들 크기 최적화
- 필요한 컴포넌트는 `@mui/material`에서 직접 import 가능

### 모달 컴포넌트 시스템
다양한 모달 컴포넌트를 제공합니다.

```tsx
import { 
  BasicModal, 
  ConfirmModal,
  Cmn001 ~ Cmn014, // 검색 모달
  Mnb002, // MNB002 비밀번호 변경 모달
  Stl002, // STL002 정산 실행 월 모달
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

// 프로젝트 모달
<Cmn001
  open={isOpen}
  onClose={handleClose}
/>

// 비밀번호 변경 모달
<Mnb002
  open={isOpen}
  onClose={handleClose}
  onSuccess={(message) => console.log(message)}
/>
```

### FormulaInput 컴포넌트
수식 입력을 위한 전용 컴포넌트입니다. 정산규칙 페이지에서 사용됩니다.

```tsx
import FormulaInput from '@/components/formula-input'

<FormulaInput
  value={formulaValue}
  onChange={setFormulaValue}
  disabled={isViewMode()}
/>
```

### 동적 아코디언 시스템
정산규칙 페이지에서 사용되는 동적 아코디언 컴포넌트 시스템입니다.

```tsx
// 아코디언 아이템 인터페이스
interface AccordionItem {
  id: string
  type: 'fixed_regular' | 'fixed_irregular' | 'settlement'
  title: string
  data: Record<string, unknown>
}

// 동적 아코디언 렌더링
{accordionItems.map((item) => {
  switch (item.type) {
    case 'fixed_regular':
      return (
        <FixedRegularAccordion
          key={item.id}
          item={item}
          onRemove={removeAccordionItem}
          pageMode={pageMode}
        />
      )
    case 'fixed_irregular':
      return (
        <FixedIrregularAccordion
          key={item.id}
          item={item}
          onRemove={removeAccordionItem}
          pageMode={pageMode}
        />
      )
    case 'settlement':
      return (
        <SettlementAccordion
          key={item.id}
          item={item}
          onRemove={removeAccordionItem}
          pageMode={pageMode}
        />
      )
    default:
      return null
  }
})}
```

### 드래그 앤 드롭 시스템
R01~R17 카드들의 순서를 마우스 드래그로 변경할 수 있는 기능입니다.

```tsx
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// 드래그 가능한 R 카드 컴포넌트
const DraggableRCard = ({ rType, index, moveCard, pageMode }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'RCARD',
    item: () => ({ id: rType, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  })

  const [{ isOver }, drop] = useDrop({
    accept: 'RCARD',
    hover: (item, monitor) => {
      // 드래그 중인 카드의 위치 변경 로직
      moveCard(item.index, index)
    }
  })

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ 
        opacity: isDragging ? 0.4 : 1,
        border: isOver ? '2px dashed #3b82f6' : '1px solid #e5e7eb'
      }}
      className="rounded-lg p-4 bg-white"
    >
      <div className="flex items-center gap-2">
        <GripVertical className="cursor-grab" />
        <span>{rType} {getRCardTitle(rType)}</span>
      </div>
    </div>
  )
}

// 메인 페이지에서 사용
<DndProvider backend={HTML5Backend}>
  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-2">
    {rCards.map((rType, index) => (
      <DraggableRCard
        key={rType}
        rType={rType}
        index={index}
        moveCard={moveCard}
        pageMode={pageMode}
      />
    ))}
  </div>
</DndProvider>
```

**드래그 앤 드롭 특징:**
- **마우스 커서**: 드래그 시 손 모양 커서 (`cursor-grab`, `cursor-grabbing`)
- **시각적 피드백**: 드래그 중 투명도 변경, 드롭 영역 점선 테두리 표시
- **부드러운 애니메이션**: `transition-all duration-200`으로 자연스러운 전환


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
- **반응형 디자인**: 브레이크포인트 활용(향후 대응용)

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

## ⚡ 성능 최적화

### MUI 애니메이션 제거
모든 MUI 컴포넌트의 ripple 애니메이션과 transition을 제거하여 성능을 향상시켰습니다.

**제거된 애니메이션:**
- **Button, Checkbox, Radio**: ripple 효과 제거
- **Select, MenuItem**: 드롭다운 애니메이션 제거
- **DatePicker**: 달력 날짜 클릭 및 전환 애니메이션 제거
- **IconButton, Fab**: 버튼 클릭 애니메이션 제거

**성능 향상 효과:**
- **렌더링 성능**: DOM 조작 감소로 리렌더링 최적화
- **메모리 사용량**: 애니메이션 관련 DOM 노드 제거
- **사용자 경험**: 즉각적인 반응으로 반응성 향상
- **배터리 절약**: 모바일 기기에서 CPU 사용량 감소

### MUI Export 정리
사용되지 않는 MUI 컴포넌트 export를 제거하여 번들 크기와 유지보수성을 개선했습니다.

**최적화 내용:**
- **export 정리**: 123줄에서 40줄로 축소 (80개 이상 제거)
- **실제 사용 컴포넌트만 유지**: Layout, Forms, Data Display, Feedback 범주에서 실제 사용되는 것만 export
- **불필요한 의존성 제거**: AppBar, Drawer, Stepper, Tabs, Grid, Card, Table, Dialog, Popover 등 미사용 컴포넌트 제거

**최적화 효과:**
- **번들 크기 감소**: 불필요한 컴포넌트 import 방지
- **빌드 속도 향상**: 타입 체크 및 번들링 시간 단축
- **유지보수성**: 실제 사용하는 컴포넌트만 관리하여 가독성 향상

### Card → c-panel 통일
페이지별로 혼재되어 있던 Card/CardContent를 c-panel로 통일하여 디자인 일관성 확보.

**변경된 페이지:**
- con002, rul002, adm002, adm005, components/loading

**변경 효과:**
- **일관된 디자인**: 모든 페이지에서 동일한 스타일 적용
- **SCSS 기반 스타일링**: 통일된 컴포넌트 클래스 사용
- **유지보수성**: 스타일 변경 시 한 곳만 수정하면 전체 적용

### 테이블 스타일 최적화
Tabulator 테이블의 헤더 스타일, 정렬, padding을 세밀하게 조정.

**개선 내용:**
- **헤더 정렬별 padding**: 왼쪽 정렬(9px), 중앙 정렬(0px)
- **전체선택 체크박스**: padding 제거로 중앙 정렬 향상
- **팝업 버튼**: 컬럼별 활성화/비활성화 가능, 왼쪽 고정 배치

### 컴포넌트 분할 및 코드 스플리팅
큰 컴포넌트를 모듈화하여 번들 크기를 줄이고 유지보수성을 향상시켰습니다.

**분리된 컴포넌트:**
- **FixedRegularAccordion**: 고정/정기 아코디언 컴포넌트
- **FixedIrregularAccordion**: 고정/비정기 아코디언 컴포넌트  
- **OptimizedTextField**: 최적화된 텍스트 필드 컴포넌트

**최적화 효과:**
- **번들 크기**: 필요시에만 컴포넌트 로드
- **메모리 효율성**: 컴포넌트별 독립적인 메모리 관리
- **캐싱 최적화**: 개별 컴포넌트 변경시 전체 번들 재빌드 불필요
- **개발 경험**: 모듈화된 구조로 유지보수성 향상

### 상태 관리 최적화
useReducer를 활용한 통합 상태 관리와 이벤트 핸들러 최적화를 적용했습니다.

**최적화 내용:**
- **useReducer**: 개별 useState를 통합 상태 관리로 변경
- **통합 핸들러**: 개별 핸들러 함수들을 통합된 핸들러로 압축
- **메모이제이션**: useMemo, useCallback을 활용한 불필요한 재생성 방지

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
- **반응형**: breakpoint별 스타일 적용(향후 대응용)
- **접근성**: focus, hover, disabled 상태
- **애니메이션**: transition, transform, keyframe
- **컴포넌트**: card, button, input, table 스타일

## 📝 라이센스

MIT License

---

**작성자**  
디자이너/퍼블리셔 박준화 수석 (최종수정일: 2025.10.31)  
010-9479-3188  
s77t04257@woongjin.co.kr
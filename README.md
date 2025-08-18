# Next.js 대시보드 퍼블리싱 환경

Next.js 14와 TypeScript, Tailwind CSS를 사용하여 구축된 현대적인 대시보드 퍼블리싱 환경입니다.

## 🚀 주요 기능

- **모던 UI/UX**: Tailwind CSS를 활용한 깔끔하고 현대적인 디자인
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 디바이스 지원
- **TypeScript**: 타입 안전성을 보장하는 TypeScript 지원
- **컴포넌트 기반**: 재사용 가능한 컴포넌트 구조
- **실시간 데이터**: Chart.js 기반 차트와 통계 데이터 시각화
- **사이드바 네비게이션**: 직관적인 메뉴 구조와 접힘/펼침 기능
- **다단계 팝오버**: 4depth까지 지원하는 계층적 메뉴 시스템
- **상태 지속성**: 사이드바 상태와 메뉴 상태를 로컬 스토리지에 저장
- **토큰 기반 디자인 시스템**: SCSS와 CSS 변수를 활용한 일관된 디자인 관리

## 📁 프로젝트 구조

```
next/
├── public/              # 정적 파일들
│   ├── font/           # 폰트 파일
│   └── images/         # 이미지 파일들
│       ├── file.svg
│       ├── globe.svg
│       ├── logo.png
│       ├── next.svg
│       ├── vercel.svg
│       └── window.svg
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── dashboard/  # 개발 후 페이지들
│   │   │   └── users/
│   │   │       └── permissions/
│   │   ├── published/  # 퍼블 후 페이지들
│   │   │   ├── analytics/    # 분석 페이지
│   │   │   ├── calendar/     # 캘린더 페이지
│   │   │   ├── documents/    # 문서 관리
│   │   │   ├── forms/        # 폼 관리
│   │   │   │   ├── advanced/ # 고급 폼
│   │   │   │   ├── basic/    # 기본 폼
│   │   │   │   ├── file-upload/ # 파일 업로드
│   │   │   │   ├── multi-step/ # 다단계 폼
│   │   │   │   ├── search/   # 검색 폼
│   │   │   │   └── validation/ # 폼 검증
│   │   │   ├── messages/     # 메시지 페이지
│   │   │   ├── notifications/ # 알림 페이지
│   │   │   ├── settings/     # 설정 페이지
│   │   │   ├── system/       # 시스템 관리
│   │   │   │   └── security/ # 보안 관리
│   │   │   │       └── firewall/ # 방화벽 설정
│   │   │   └── users/        # 사용자 관리
│   │   │       ├── admin/    # 관리자
│   │   │       └── permissions/ # 권한 관리
│   │   ├── globals.scss      # 전역 SCSS 스타일
│   │   ├── layout.tsx        # 루트 레이아웃
│   │   └── page.tsx          # 홈페이지 (리다이렉트)
│   ├── components/           # 재사용 가능한 컴포넌트들
│   │   ├── chart.tsx         # Chart.js 기반 차트 컴포넌트
│   │   ├── dashboard-card.tsx # 대시보드 카드 컴포넌트
│   │   ├── dashboard-layout.tsx # 대시보드 레이아웃
│   │   ├── header.tsx        # 헤더 컴포넌트
│   │   ├── sidebar.tsx       # 사이드바 컴포넌트 (접힘/펼침 지원)
│   │   └── sidebar-toggle.tsx # 사이드바 토글 컴포넌트
│   ├── lib/                  # 유틸리티 함수들
│   │   └── utils.ts          # 공통 유틸리티 함수 (cn 함수 포함)
│   └── styles/               # SCSS 스타일 파일들
│       ├── components/       # 컴포넌트별 스타일
│       │   ├── _buttons.scss # 버튼 컴포넌트 스타일
│       │   ├── _cards.scss   # 카드 컴포넌트 스타일
│       │   ├── _common.scss  # 공통 컴포넌트 스타일
│       │   ├── _data.scss    # 데이터 표시 컴포넌트 스타일
│       │   ├── _examples.scss # 예제 컴포넌트 스타일
│       │   ├── _forms.scss   # 폼 컴포넌트 스타일
│       │   ├── _layout.scss  # 레이아웃 컴포넌트 스타일
│       │   └── _navigation.scss # 네비게이션 컴포넌트 스타일
│       ├── core/             # 핵심 스타일
│       │   ├── _mixins.scss  # SCSS 믹스인
│       │   └── _tokens.scss  # 디자인 토큰 (CSS 변수)
│       ├── layers/           # 레이어 스타일
│       │   └── _base.scss    # 기본 스타일
│       └── utilities/        # 유틸리티 스타일
│           └── _helpers.scss # 헬퍼 유틸리티
├── eslint.config.mjs         # ESLint 설정
├── next.config.ts            # Next.js 설정
├── package.json              # 프로젝트 의존성 및 스크립트
├── postcss.config.mjs        # PostCSS 설정
├── tailwind.config.ts        # Tailwind CSS 설정
└── tsconfig.json             # TypeScript 설정
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

## 🎨 컴포넌트 설명

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
Chart.js 기반의 다양한 차트를 표시하는 컴포넌트입니다.

```tsx
<Chart
  title="월별 매출 추이"
  data={[65, 59, 80, 81, 56, 55, 40]}
  labels={["1월", "2월", "3월", "4월", "5월", "6월", "7월"]}
/>
```

### Sidebar
대시보드의 사이드바 네비게이션 컴포넌트입니다.
- **접힘/펼침 기능**: 16px(접힘) ↔ 256px(펼침) 전환
- **다단계 메뉴**: 4depth까지 지원하는 계층적 구조
- **팝오버 메뉴**: 접힌 상태에서 hover 시 서브메뉴 표시
- **화살표 표시**: 각 depth별 상위 메뉴를 가리키는 화살표
- **로컬 스토리지**: 메뉴 상태와 사이드바 상태 저장
- **상태 지속성**: 페이지 이동 시에도 사이드바 상태 유지

### Header
대시보드의 상단 헤더 컴포넌트입니다.

## �� 페이지 구성

### 메인 대시보드 (`/published`)
- 통계 카드 (사용자, 매출, 주문, 전환율)
- 월별 매출 추이 차트
- 최근 활동 목록
- 인기 상품, 지역별 매출, 시스템 상태

### 분석 페이지 (`/published/analytics`)
- 페이지 뷰, 고유 방문자, 세션 시간, 이탈률
- 월별/주간 트래픽 차트
- 인기 페이지 및 사용자 디바이스 통계
- 실시간 통계

### 문서 관리 (`/published/documents`)
- 문서 업로드 및 관리

### 폼 관리 (`/published/forms`)
- 기본/고급 폼
- 파일 업로드 폼
- 다단계 폼
- 검색 및 검증 폼

### 사용자 관리 (`/published/users`)
- 사용자 목록 테이블
- 사용자 통계 카드
- 사용자 추가/편집/삭제 기능
- 권한 관리

### 시스템 관리 (`/published/system`)
- 보안 설정
- 방화벽 설정
- 시스템 모니터링

## 🎯 사용된 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + SCSS
- **Icons**: Lucide React
- **State Management**: React useState, useEffect
- **Utilities**: clsx (cn 함수), tailwind-merge
- **Storage**: LocalStorage (메뉴 상태 저장)
- **Charts**: Chart.js + react-chartjs-2
- **Design System**: 토큰 기반 CSS 변수 시스템

## 🔧 개발 가이드

### 새로운 페이지 추가

1. `src/app/published/` 디렉토리에 새 폴더 생성
2. `page.tsx` 파일 생성
3. `DashboardLayout` 컴포넌트로 감싸기

```tsx
import { DashboardLayout } from "@/components/dashboard-layout"

export default function NewPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">새 페이지</h1>
        {/* 페이지 내용 */}
      </div>
    </DashboardLayout>
  )
}
```

### 새로운 컴포넌트 추가

1. `src/components/` 디렉토리에 새 컴포넌트 파일 생성
2. TypeScript 인터페이스 정의
3. Tailwind CSS 클래스 사용

### 스타일링 가이드

- Tailwind CSS 유틸리티 클래스 사용
- `cn()` 유틸리티 함수로 조건부 클래스 적용
- 반응형 디자인을 위한 브레이크포인트 활용
- SCSS와 Tailwind CSS 혼용 사용
- 토큰 기반 디자인 시스템 활용

### 사이드바 메뉴 추가

1. `src/components/sidebar.tsx`의 `sidebarItems` 배열에 새 메뉴 추가
2. 계층 구조 지원 (children 배열 사용)
3. 아이콘, 링크, 섹션 설정

```tsx
{
  title: "새 메뉴",
  icon: NewIcon,
  section: "management",
  children: [
    {
      title: "하위 메뉴",
      href: "/published/new-menu", // 실제 페이지가 있는 경우
      icon: SubIcon,
    }
  ]
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
- **네비게이션**: `c-menu-item`, `c-popover-menu`, `c-popover-arrow`
- **데이터**: `c-table`, `c-data-card`, `c-stat-card`
- **폼**: `c-form-group`, `c-input`, `c-button`
- **공통**: `c-page-header`, `c-section`, `c-panel`

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

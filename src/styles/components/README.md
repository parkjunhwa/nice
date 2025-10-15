# SCSS 컴포넌트 클래스 시스템 가이드

이 문서는 `styles/components` 폴더에 정의된 공통 컴포넌트 클래스들과 `styles/core`의 토큰과 믹스인 시스템의 사용법을 설명합니다.

## 🎯 목적

- **일관성**: 모든 컴포넌트에서 동일한 스타일 적용
- **재사용성**: 자주 사용하는 스타일 조합을 클래스로 정의
- **유지보수성**: 스타일 변경 시 한 곳에서만 수정
- **Tailwind CSS 통합**: `@apply` 지시어를 사용하여 Tailwind 클래스 활용
- **토큰 기반**: CSS 변수를 통한 중앙 집중식 디자인 값 관리
- **믹스인 활용**: 반복되는 패턴을 믹스인으로 추상화
- **코드 간소화**: 자주 사용되는 Tailwind 클래스 조합을 단순한 클래스로 대체
- **NICE 폰트**: 한국어 최적화된 폰트 시스템 통합

## 📁 파일 구조

```
styles/
├── core/                    # 핵심 디자인 시스템
│   ├── _tokens.scss        # CSS 변수 토큰 (색상, 간격, 타이포그래피 등)
│   └── _mixins.scss        # 재사용 가능한 믹스인들
├── components/              # 컴포넌트별 클래스
│   ├── _buttons.scss       # 버튼 관련 클래스
│   ├── _cards.scss         # 카드 관련 클래스
│   ├── _forms.scss         # 폼 관련 클래스 (MUI DatePicker 포함)
│   ├── _layout.scss        # 레이아웃 관련 클래스
│   ├── _navigation.scss    # 네비게이션 관련 클래스
│   ├── _data.scss          # 데이터 표시 관련 클래스
│   ├── _common.scss        # 자주 사용되는 공통 패턴
│   ├── _examples.scss      # 예시 및 데모 컴포넌트
│   └── README.md           # 이 가이드 문서
├── layers/                  # 레이어 스타일
└── utilities/               # 유틸리티 스타일
```

## 🚀 핵심 시스템

### 1. 디자인 토큰 (`_tokens.scss`)

모든 디자인 값이 중앙에서 관리됩니다:

```scss
:root {
  /* 색상 시스템 */
  --color-primary: 222 89% 52%;
  --color-success: 142 76% 36%;
  --color-error: 0 84% 60%;
  --color-warning: 38 92% 50%;
  --color-info: 199 89% 48%;
  
  /* 간격 시스템 */
  --space-4: 1rem;           /* 16px */
  --space-6: 1.5rem;         /* 24px */
  --space-8: 2rem;           /* 32px */
  --space-component: 0.75rem; /* 12px */
  --space-section: 1.5rem;   /* 24px */
  --space-page: 2rem;        /* 32px */
  
  /* 타이포그래피 */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-weight-semibold: 600;
  --line-height-tight: 1.25;
  --font-family-nice: 'NICE', sans-serif;
  
  /* 그림자 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

### 2. 믹스인 시스템 (`_mixins.scss`)

반복되는 패턴을 추상화합니다:

```scss
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@mixin card-base {
  background-color: hsl(var(--color-bg-elevated));
  border: 1px solid hsl(var(--color-border));
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  box-shadow: var(--shadow-sm);
}

@mixin button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-duration);
  cursor: pointer;
  border: none;
  outline: none;
}

@mixin responsive-grid($columns: 1, $gap: var(--space-6)) {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  gap: $gap;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
```

## 🎨 컴포넌트 클래스 사용법

### 1. 기본 클래스 사용

```tsx
// 기존 Tailwind 클래스
<div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">

// 새로운 컴포넌트 클래스
<div className="c-stat-card">
```

### 2. 수정자(Modifier) 클래스 사용

```tsx
// 기본 클래스 + 수정자
<div className="c-card c-card--elevated">
<button className="c-btn c-btn--primary c-btn--lg">
```

### 3. BEM 방식의 하위 요소

```tsx
<div className="c-card">
  <div className="c-card__header">
    <h3 className="c-card__title">제목</h3>
  </div>
  <div className="c-card__body">내용</div>
</div>
```

## 🎯 주요 컴포넌트 클래스

### 공통 패턴 (`_common.scss`)

#### 페이지 헤더
```tsx
<div className="c-page-header">
  <h1 className="c-page-header__title">페이지 제목</h1>
  <p className="c-page-header__description">페이지 설명</p>
</div>
```

#### 섹션 컨테이너
```tsx
<div className="c-section">섹션 내용</div>
```

#### 기본 패널
```tsx
<div className="c-panel">패널 내용</div>
```

#### 활동 아이템
```tsx
<div className="c-activity-item">
  <div className="c-activity-item__dot c-activity-item__dot--blue"></div>
  <div className="c-activity-item__content">
    <p className="c-activity-item__action">활동 내용</p>
    <p className="c-activity-item__meta">사용자 • 시간</p>
  </div>
</div>
```

#### 활동 섹션
```tsx
<div className="c-activity-section">
  <h4 className="c-activity-section__title">섹션 제목</h4>
  {/* 활동 아이템들 */}
</div>
```

#### 통계 아이템
```tsx
<div className="c-stat-item">
  <div className="c-stat-item__content">
    <p className="c-stat-item__name">이름</p>
    <p className="c-stat-item__subtitle">부제목</p>
  </div>
  <p className="c-stat-item__value">값</p>
</div>
```

#### 진행률 바
```tsx
<div className="c-progress-bar">
  <div className="c-progress-bar__fill" style={{ width: '45%' }}></div>
</div>
```

#### 상태 배지
```tsx
<span className="c-status-badge c-status-badge--success">성공</span>
<span className="c-status-badge c-status-badge--warning">경고</span>
<span className="c-status-badge c-status-badge--error">오류</span>
<span className="c-status-badge c-status-badge--info">정보</span>
```

#### 섹션 제목
```tsx
<h3 className="c-section-title">섹션 제목</h3>
```

#### 섹션 그리드
```tsx
<div className="c-section-grid c-section-grid--2">2열 그리드</div>
<div className="c-section-grid c-section-grid--3">3열 그리드</div>
```

#### 아이콘 컨테이너
```tsx
<div className="c-icon-container">
  <Icon className="w-6 h-6" />
</div>
```

#### 텍스트 그룹
```tsx
<div className="c-text-group">
  <p className="c-text-group__primary">주요 텍스트</p>
  <p className="c-text-group__secondary">보조 텍스트</p>
</div>

<div className="c-text-group">
  <p className="c-text-group__primary c-text-group__primary--large">큰 숫자</p>
  <p className="c-text-group__secondary">설명</p>
</div>
```

#### 구분선
```tsx
<div className="c-divider"></div>
```

#### 스페이서
```tsx
<div className="c-spacer c-spacer--md"></div>
<div className="c-spacer c-spacer--lg"></div>
```

#### 반응형 유틸리티
```tsx
<div className="c-hidden c-hidden--mobile">모바일에서 숨김</div>
<div className="c-visible c-visible--desktop">데스크톱에서만 표시</div>
```

#### 애니메이션 유틸리티
```tsx
<div className="c-animate c-animate--fade-in">페이드인 애니메이션</div>
<div className="c-animate c-animate--slide-up">슬라이드업 애니메이션</div>
<div className="c-animate c-animate--scale-in">스케일인 애니메이션</div>
```

### 레이아웃 (`_layout.scss`)

#### 그리드 시스템
```tsx
<div className="c-grid c-grid--2">     {/* 2열 그리드 */}
<div className="c-grid c-grid--3">     {/* 3열 그리드 */}
<div className="c-grid c-grid--4">     {/* 4열 그리드 */}
```

#### 패널
```tsx
<div className="c-panel">              {/* 기본 패널 */}
```

#### 대시보드 레이아웃
```tsx
<div className="c-dashboard-layout">
  <aside className="c-sidebar">사이드바</aside>
  <main className="c-main-content">메인 콘텐츠</main>
</div>
```

### 네비게이션 (`_navigation.scss`)

#### 메뉴 아이템
```tsx
<div className="c-menu-item">         {/* 기본 메뉴 아이템 */}
<div className="c-menu-item c-menu-item--active">  {/* 활성 상태 */}
```

#### 팝오버 메뉴
```tsx
<div className="c-popover-menu c-popover-menu--level-2">
  <div className="c-popover-menu-item">메뉴 항목</div>
  <div className="c-popover-arrow c-popover-arrow--level-2"></div>
</div>
```

#### 브레드크럼
```tsx
<nav className="c-breadcrumb">
  <ol className="c-breadcrumb__list">
    <li className="c-breadcrumb__item">
      <a href="/" className="c-breadcrumb__link">홈</a>
    </li>
    <li className="c-breadcrumb__item">
      <span className="c-breadcrumb__current">현재 페이지</span>
    </li>
  </ol>
</nav>
```

### 데이터 표시 (`_data.scss`)

#### 통계 카드
```tsx
<div className="c-stat-card">
  <div className="c-stat-card__body">
    <div className="c-stat-card__icon">아이콘</div>
    <div className="c-stat-card__content">
      <div className="c-stat-card__value">1,234</div>
      <div className="c-stat-card__label">총 사용자</div>
      <div className="c-stat-card__trend c-stat-card__trend--positive">+12%</div>
    </div>
  </div>
</div>
```

#### 배지
```tsx
<span className="c-badge c-badge--success">성공</span>
<span className="c-badge c-badge--warning">경고</span>
<span className="c-badge c-badge--error">오류</span>
```

#### 상태 표시
```tsx
<div className="c-status">
  <div className="c-status__dot c-status__dot--online"></div>
  온라인
</div>
```

### 폼 (`_forms.scss`)

#### 입력 필드
```tsx
<div className="c-form-group">
  <label className="c-form-label c-form-label--required">이메일</label>
  <input className="c-form-input" type="email" />
  <div className="c-form-message c-form-message--error">오류 메시지</div>
</div>
```

#### 폼 액션
```tsx
<div className="c-form-actions">
  <button className="c-btn c-btn--secondary">취소</button>
  <button className="c-btn c-btn--primary">저장</button>
</div>
```

#### MUI DatePicker 스타일링
```scss
// DatePicker 커스텀 스타일
.MuiDatePicker-root {
  .MuiPickersDay-root {
    &.Mui-selected {
      background-color: hsl(var(--color-primary));
      color: hsl(var(--color-primary-foreground));
    }
    
    &.MuiPickersDay-today {
      background-color: hsl(var(--color-muted));
      border: none;
    }
    
    &:hover {
      background-color: hsl(var(--color-muted-hover));
    }
  }
}
```

### 카드 (`_cards.scss`)

#### 기본 카드
```tsx
<div className="c-card c-card--elevated">
  <div className="c-card__header">
    <h3 className="c-card__title">카드 제목</h3>
    <p className="c-card__subtitle">카드 부제목</p>
  </div>
  <div className="c-card__body">카드 내용</div>
  <div className="c-card__footer">카드 푸터</div>
</div>
```

#### 데이터 카드
```tsx
<div className="c-data-card">
  <div className="c-data-card__header">
    <h4 className="c-data-card__title">데이터 제목</h4>
    <div className="c-data-card__actions">
      <button className="c-btn c-btn--icon">액션</button>
    </div>
  </div>
  <div className="c-data-card__content">
    데이터 내용
  </div>
</div>
```

### 버튼 (`_buttons.scss`)

#### 버튼 변형
```tsx
<button className="c-btn c-btn--primary">기본 버튼</button>
<button className="c-btn c-btn--secondary">보조 버튼</button>
<button className="c-btn c-btn--ghost">고스트 버튼</button>
<button className="c-btn c-btn--outline">아웃라인 버튼</button>
<button className="c-btn c-btn--destructive">삭제 버튼</button>
```

#### 버튼 크기
```tsx
<button className="c-btn c-btn--sm">작은 버튼</button>
<button className="c-btn c-btn--lg">큰 버튼</button>
```

#### 버튼 상태
```tsx
<button className="c-btn c-btn--loading">로딩 중</button>
<button className="c-btn c-btn--icon-only">아이콘만</button>
<button className="c-btn c-btn--animated">애니메이션</button>
```

## 🔧 믹스인 활용

### 1. 레이아웃 믹스인

```scss
.my-component {
  @include flex-center;           // 중앙 정렬
  @include flex-between;          // 양쪽 정렬
  @include responsive-grid(3);    // 반응형 3열 그리드
  @include hover-lift;            // 호버 시 위로 이동
}
```

### 2. 반응형 믹스인

```scss
.my-component {
  @include mobile {
    // 모바일 전용 스타일
  }
  
  @include tablet-up {
    // 태블릿 이상 스타일
  }
  
  @include desktop {
    // 데스크톱 전용 스타일
  }
}
```

### 3. 컴포넌트 믹스인

```scss
.my-button {
  @include button-base;
  @include button-size('lg');
  @include button-variant('primary');
}

.my-card {
  @include card-base;
  @include card-variant('elevated');
}
```

## 🎨 토큰 활용

### 1. 색상 토큰

```scss
.my-component {
  background-color: hsl(var(--color-primary));
  color: hsl(var(--color-primary-foreground));
  border-color: hsl(var(--color-border));
}
```

### 2. 간격 토큰

```scss
.my-component {
  padding: var(--space-6);
  margin: var(--space-section);
  gap: var(--space-component);
}
```

### 3. 타이포그래피 토큰

```scss
.my-component {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  font-family: var(--font-family-nice);
}
```

## 📱 반응형 디자인

모든 컴포넌트 클래스는 Tailwind CSS의 반응형 접두사를 지원합니다:

```tsx
<div className="c-grid c-grid--1 lg:c-grid--3">  {/* 모바일: 1열, 데스크톱: 3열 */}
```

### 브레이크포인트

```scss
// 모바일: 0px - 767px
// 태블릿: 768px - 1023px
// 데스크톱: 1024px+
```

## 🎨 테마 및 색상

컴포넌트 클래스는 CSS 변수를 사용하여 테마를 지원합니다:

```scss
:where(.c-card) {
  background-color: hsl(var(--color-bg-elevated));
  border-color: hsl(var(--color-border));
}
```

### 색상 팔레트

- **Primary**: 주요 브랜드 색상
- **Secondary**: 보조 색상
- **Success**: 성공 상태
- **Warning**: 경고 상태
- **Error**: 오류 상태
- **Info**: 정보 상태
- **Muted**: 중성 색상

## 📝 네이밍 컨벤션

- **기본 클래스**: `c-component-name`
- **수정자**: `c-component-name--modifier`
- **하위 요소**: `c-component-name__element`
- **상태**: `c-component-name--state`

## 🔧 커스터마이징

### 1. 새로운 컴포넌트 클래스 추가

```scss
// _new-component.scss
@use "../core/mixins" as *;

@layer components {
  :where(.c-new-component) {
    @include card-base;
    
    &.c-new-component--variant {
      @include card-variant('elevated');
    }
    
    .c-new-component__element {
      @include flex-center;
      gap: var(--space-4);
    }
  }
}
```

### 2. 기존 클래스 수정

```scss
// _buttons.scss 수정
:where(.c-btn--primary) {
  @include button-variant('primary');
  background-color: hsl(var(--color-primary-hover));  // 색상 변경
}
```

### 3. 전역 SCSS에 import

```scss
// globals.scss
@import "../styles/components/new-component";
```

## 🚨 주의사항

1. **CSS 우선순위**: `:where()` 선택자를 사용하여 낮은 specificity 유지
2. **Tailwind 통합**: `@apply` 지시어를 사용하여 Tailwind 클래스 활용
3. **일관성**: 프로젝트 전체에서 동일한 클래스명 사용
4. **의존성**: `_mixins.scss`와 `_tokens.scss` 파일에 의존
5. **토큰 우선**: 하드코딩된 값 대신 토큰 사용
6. **NICE 폰트**: 한국어 최적화된 폰트 사용

## 🔍 디버깅

브라우저 개발자 도구에서 클래스가 제대로 적용되었는지 확인:

```tsx
// 올바른 사용
<div className="c-stat-card">  {/* ✅ 정상 작동 */}

// 잘못된 사용
<div className="c-statcard">   {/* ❌ 클래스명 오타 */}
<div className="stat-card">    {/* ❌ 접두사 누락 */}
```

## 📚 예시 컴포넌트

`_examples.scss`에는 다양한 데모 컴포넌트들이 포함되어 있습니다:

- **색상 팔레트**: `c-color-palette`
- **타이포그래피 쇼케이스**: `c-typography-showcase`
- **간격 시각화**: `c-spacing-showcase`
- **그림자 데모**: `c-shadow-showcase`
- **반응형 데모**: `c-responsive-demo`
- **애니메이션 데모**: `c-animation-demo`
- **NICE 폰트 데모**: `c-font-showcase`

## 💡 코드 간소화 예시

### Before (기존 Tailwind 클래스)
```tsx
<div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
  <h3 className="mb-4 text-lg font-semibold text-gray-900">제목</h3>
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-900">이름</span>
      <span className="text-sm font-semibold text-blue-600">값</span>
    </div>
  </div>
</div>
```

### After (새로운 컴포넌트 클래스)
```tsx
<div className="c-panel">
  <h3 className="c-section-title">제목</h3>
  <div className="c-section">
    <div className="c-stat-item">
      <span className="c-stat-item__name">이름</span>
      <span className="c-stat-item__value">값</span>
    </div>
  </div>
</div>
```

## 🎨 NICE 폰트 시스템

### 폰트 두께
- **Light (300)**: `font-light`
- **Regular (400)**: `font-normal`
- **SemiBold (600)**: `font-semibold`

### 사용법
```scss
.my-component {
  font-family: var(--font-family-nice);
  font-weight: var(--font-weight-semibold);
}
```

이 가이드를 따라 사용하면 일관되고 유지보수하기 쉬운 컴포넌트를 만들 수 있으며, 코드도 훨씬 간결해집니다!

---

**작성자**
디자이너/퍼블리셔 박준화 수석 (최종수정일: 2025-10-15)  
010-9479-3188
junhwa.park@gmail.com 
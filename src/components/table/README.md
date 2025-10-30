# 테이블 컴포넌트

이 폴더는 프로젝트에서 사용하는 모든 테이블 컴포넌트들을 포함합니다. Tabulator.js를 기반으로 한 고급 테이블 기능을 제공합니다.

## 파일 구조

```
src/components/table/
├── index.ts                 # 테이블 컴포넌트 export
├── table-common.scss        # 공통 테이블 스타일
├── tabulator-table.tsx      # Tabulator.js 기반 테이블
├── sample-table.tsx         # 샘플 테이블 컴포넌트
└── README.md               # 이 파일
```

## 컴포넌트 목록

### TabulatorTable

Tabulator.js 라이브러리를 기반으로 한 고급 테이블 컴포넌트입니다.

#### 특징
- 정렬, 필터링, 페이지네이션 지원
- 행 선택, 컬럼 이동, 크기 조절 가능
- 액션 버튼 (보기, 편집, 삭제) 내장
- 반응형 디자인(향후 대응용)
- 고급 데이터 처리 기능
- 커스터마이징 가능한 스타일링

#### 사용법

```tsx
import { TabulatorTable } from '@/components'

// 기본 사용
<TabulatorTable />

// 커스텀 데이터와 컬럼
<TabulatorTable 
  data={customData}
  columns={customColumns}
  height={300}
  className="my-table"
  options={{
    pagination: true,
    movableColumns: true,
    resizableRows: true,
    selectable: true
  }}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | `[]` | 테이블 데이터 |
| `columns` | `any[]` | `[]` | 컬럼 정의 |
| `height` | `string \| number` | `200` | 테이블 높이 |
| `className` | `string` | `""` | 추가 CSS 클래스 |
| `options` | `TabulatorOptions` | `{}` | Tabulator 옵션 |

#### 컬럼 정의 예시

```tsx
const columns = [
  { title: "ID", field: "id", width: 80 },
  { title: "이름", field: "name", headerFilter: true },
  { title: "이메일", field: "email", headerFilter: true },
  { title: "상태", field: "status", formatter: "tickCross" },
  { 
    title: "액션", 
    formatter: function(cell) {
      return `
        <button class="btn btn-sm btn-primary">보기</button>
        <button class="btn btn-sm btn-secondary">편집</button>
        <button class="btn btn-sm btn-danger">삭제</button>
      `;
    }
  }
];
```

### SampleTable

기본적인 테이블 컴포넌트로, 간단한 데이터 표시에 사용됩니다.

#### 사용법

```tsx
import { SampleTable } from '@/components'

<SampleTable 
  data={simpleData}
  columns={simpleColumns}
/>
```

## 공통 스타일

`table-common.scss` 파일에는 모든 테이블 컴포넌트에서 사용할 수 있는 공통 스타일이 정의되어 있습니다.

### 주요 스타일 특징

1. **기본 테이블 스타일**
   - 테두리, 그림자, 둥근 모서리
   - 헤더 배경색 (gray-50)
   - 짝수 줄 배경색 (gray-50)
   - NICE 폰트 적용

2. **호버 효과**
   - 행 호버 시 light-blue-100 배경색
   - 부드러운 전환 애니메이션
   - 포커스 상태 스타일

3. **셀 패딩**
   - 상하: 4px, 좌우: 12px
   - 반응형 패딩 조정

4. **액션 버튼 스타일**
   - 보기, 편집, 삭제 버튼 스타일
   - 호버 효과와 트랜지션
   - 아이콘과 텍스트 조합

### CSS 클래스

- `.tabulator-table`: 테이블 컨테이너
- `.tabulator`: Tabulator 인스턴스
- `.tabulator-header`: 헤더 영역
- `.tabulator-row`: 테이블 행
- `.tabulator-cell`: 테이블 셀
- `.tabulator-footer`: 페이지네이션 영역
- `.tabulator-paginator`: 페이지네이션 컨트롤
- `.tabulator-filter`: 필터 입력 필드

### 색상 토큰

- `#f9fafb` (gray-50): 짝수 줄, 헤더 배경
- `#dbeafe` (light-blue-100): 호버 배경
- `#e5e7eb` (gray-200): 테두리
- `#374151` (gray-700): 텍스트 색상
- `#1f2937` (gray-800): 헤더 텍스트
- `#f3f4f6` (gray-100): 선택된 행 배경

## 새로운 테이블 컴포넌트 추가하기

1. `src/components/table/` 폴더에 새 컴포넌트 파일 생성
2. `table-common.scss` import
3. `src/components/table/index.ts`에 export 추가
4. 필요시 `table-common.scss`에 추가 스타일 정의

### 예시

```tsx
// src/components/table/custom-table.tsx
"use client"

import { useEffect, useRef } from 'react'
import './table-common.scss'

interface CustomTableProps {
  data: any[]
  columns: any[]
  className?: string
}

export default function CustomTable({ data, columns, className }: CustomTableProps) {
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (tableRef.current && data.length > 0) {
      // 테이블 초기화 로직
    }
  }, [data])

  return (
    <div 
      ref={tableRef}
      className={`tabulator-table ${className || ''}`}
    >
      {/* 테이블 구현 */}
    </div>
  )
}
```

```ts
// src/components/table/index.ts에 추가
export { default as CustomTable } from './custom-table'
```

## Tabulator.js 옵션

### 기본 옵션

```tsx
const defaultOptions = {
  pagination: true,
  paginationSize: 10,
  movableColumns: true,
  resizableRows: true,
  selectable: true,
  layout: "fitDataFill",
  responsiveLayout: "hide",
  placeholder: "데이터가 없습니다.",
  headerFilterPlaceholder: "필터...",
  locale: "ko-kr"
}
```

### 고급 옵션

```tsx
const advancedOptions = {
  // 데이터 처리
  ajaxURL: "/api/data",
  ajaxMethod: "GET",
  
  // 스타일링
  rowFormatter: function(row) {
    // 행 포맷터
  },
  cellFormatter: function(cell) {
    // 셀 포맷터
  },
  
  // 이벤트 핸들러
  rowClick: function(e, row) {
    console.log("행 클릭:", row.getData())
  },
  
  // 정렬
  initialSort: [
    { column: "name", dir: "asc" }
  ],
  
  // 필터링
  headerFilter: true,
  headerFilterPlaceholder: "검색..."
}
```

## 스타일 커스터마이징

공통 스타일을 수정하려면 `table-common.scss` 파일을 편집하세요.

### 테마 색상 변경

```scss
.tabulator-table {
  --table-header-bg: #f8fafc;
  --table-row-hover: #dbeafe;
  --table-border: #e2e8f0;
  --table-text: #1e293b;
}
```

### 반응형 스타일(향후 대응용)

```scss
@media (max-width: 768px) {
  .tabulator-table {
    .tabulator-cell {
      padding: 8px 6px;
      font-size: 14px;
    }
  }
}
```

## 성능 최적화

### 대용량 데이터 처리

```tsx
const optimizedOptions = {
  pagination: true,
  paginationSize: 50,
  virtualDom: true,
  renderHorizontal: "virtual",
  placeholder: "데이터를 불러오는 중..."
}
```

### 메모리 관리

```tsx
useEffect(() => {
  return () => {
    // 컴포넌트 언마운트 시 테이블 정리
    if (tableRef.current) {
      // 테이블 인스턴스 정리
    }
  }
}, [])
```

## 접근성

### 키보드 네비게이션

```tsx
const accessibleOptions = {
  keyboardNavigation: true,
  tabEndNewRow: true,
  tabEndNewRow: true
}
```

### 스크린 리더 지원

```tsx
const ariaOptions = {
  ariaLabels: {
    filterInput: "테이블 필터",
    paginationFirst: "첫 페이지",
    paginationPrev: "이전 페이지",
    paginationNext: "다음 페이지",
    paginationLast: "마지막 페이지"
  }
}
```

## 디버깅

### 일반적인 문제 해결

1. **데이터가 표시되지 않는 경우**
   - 데이터 형식 확인
   - 컬럼 정의 확인
   - 콘솔 에러 확인

2. **스타일이 적용되지 않는 경우**
   - `table-common.scss` import 확인
   - CSS 클래스명 확인
   - 브라우저 개발자 도구에서 스타일 확인

3. **성능 문제**
   - 가상 DOM 활성화
   - 페이지네이션 크기 조정
   - 불필요한 리렌더링 방지

### 개발자 도구 활용

```tsx
// 테이블 인스턴스 디버깅
useEffect(() => {
  if (tableRef.current) {
    console.log("테이블 데이터:", tableRef.current.getData())
    console.log("테이블 컬럼:", tableRef.current.getColumnDefinitions())
  }
}, [])
```

이 가이드를 따라 사용하면 Tabulator.js의 강력한 기능을 활용하여 고급 테이블을 구현할 수 있습니다!

---

**작성자**
디자이너/퍼블리셔 박준화 수석 (최종수정일: 2025-10-22)  
010-9479-3188
s77t04257@woongjin.co.kr

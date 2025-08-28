# 테이블 컴포넌트

이 폴더는 프로젝트에서 사용하는 모든 테이블 컴포넌트들을 포함합니다.

## 파일 구조

```
src/components/table/
├── index.ts                 # 테이블 컴포넌트 export
├── table-common.scss        # 공통 테이블 스타일
├── tabulator-table.tsx      # Tabulator.js 기반 테이블
└── README.md               # 이 파일
```

## 컴포넌트 목록

### TabulatorTable

Tabulator.js 라이브러리를 기반으로 한 고급 테이블 컴포넌트입니다.

#### 특징
- 정렬, 필터링, 페이지네이션 지원
- 행 선택, 컬럼 이동, 크기 조절 가능
- 액션 버튼 (보기, 편집, 삭제) 내장
- 반응형 디자인

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
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | `[]` | 테이블 데이터 |
| `columns` | `any[]` | `[]` | 컬럼 정의 |
| `height` | `string \| number` | `200` | 테이블 높이 |
| `className` | `string` | `""` | 추가 CSS 클래스 |

## 공통 스타일

`table-common.scss` 파일에는 모든 테이블 컴포넌트에서 사용할 수 있는 공통 스타일이 정의되어 있습니다.

### 주요 스타일 특징

1. **기본 테이블 스타일**
   - 테두리, 그림자, 둥근 모서리
   - 헤더 배경색 (gray-50)
   - 짝수 줄 배경색 (gray-50)

2. **호버 효과**
   - 행 호버 시 light-blue-100 배경색
   - 부드러운 전환 애니메이션

3. **셀 패딩**
   - 상하: 4px, 좌우: 12px

4. **반응형 디자인**
   - 모바일에서 패딩과 폰트 크기 조정

## 새로운 테이블 컴포넌트 추가하기

1. `src/components/table/` 폴더에 새 컴포넌트 파일 생성
2. `table-common.scss` import
3. `src/components/table/index.ts`에 export 추가
4. 필요시 `table-common.scss`에 추가 스타일 정의

### 예시

```tsx
// src/components/table/simple-table.tsx
"use client"

import './table-common.scss'

export default function SimpleTable({ data, columns }) {
  return (
    <div className="tabulator-table">
      {/* 테이블 구현 */}
    </div>
  )
}
```

```ts
// src/components/table/index.ts에 추가
export { default as SimpleTable } from './simple-table'
```

## 스타일 커스터마이징

공통 스타일을 수정하려면 `table-common.scss` 파일을 편집하세요. 

### 주요 CSS 클래스

- `.tabulator-table`: 테이블 컨테이너
- `.tabulator`: Tabulator 인스턴스
- `.tabulator-header`: 헤더 영역
- `.tabulator-row`: 테이블 행
- `.tabulator-cell`: 테이블 셀
- `.tabulator-footer`: 페이지네이션 영역

### 색상 토큰

- `#f9fafb` (gray-50): 짝수 줄, 헤더 배경
- `#dbeafe` (light-blue-100): 호버 배경
- `#e5e7eb` (gray-200): 테두리
- `#374151` (gray-700): 텍스트 색상

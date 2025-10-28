 } from '@/components'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
  TableRow,
  Breadcrumb,
  AccordionToggleButton
} from '@/components'

export default function Search02Page() {
  const [searchPanelExpanded, setSearchPanelExpanded] = useState(true)

  // TextField 값 상태 (이 페이지 한정 clear 기능)
  const [keyword, setKeyword] = useState('')

  return (
    <div
      className="flex flex-col h-full min-h-0 layout-top-bottom"
      style={{
        height: 'calc(100vh - 2rem)', // 1rem top + 1rem bottom
      }}
    >
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mt-1 mb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Search02 검색 페이지</h1>
        </div>
        <div>
          <Breadcrumb
            items={[
              { label: '대메뉴', href: '/' },
              { label: '중메뉴', href: '/' },
              { label: '현재페이지', active: true }
            ]}
          />
        </div>
      </div>
      <div className="top-search-panel">
        <Collapse in={searchPanelExpanded} collapsedSize={0}>
          <div className="pt-4 px-4 pb-5">
            <div className="flex flex-row items-center w-full gap-4 flex-1">
              {/* 좌측: 키워드 검색 (flex:1) */}
              <div className="flex items-center flex-1 min-w-0  gap-4">
                <div className="flex items-center">
                  <label className="form-side-label">
                    키워드 검색
                  </label>
                  <TextField
                    variant="outlined"
                    size="small"
                    placeholder="검색어를 입력하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <label className="form-side-label">
                    카테고리
                  </label>
                  <FormControl sx={{ fontSize: 12 }}>
                    <Select
                      defaultValue=""
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="" sx={{ fontSize: 12 }}>전체 카테고리</MenuItem>
                      <MenuItem value="tech" sx={{ fontSize: 12 }}>기술</MenuItem>
                      <MenuItem value="design" sx={{ fontSize: 12 }}>디자인</MenuItem>
                      <MenuItem value="business" sx={{ fontSize: 12 }}>비즈니스</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="flex items-center">
                  <label className="form-side-label">
                    상태
                  </label>
                  <FormControl>
                    <Select
                      defaultValue=""
                      displayEmpty
                      size="small"
                    >
                      <MenuItem value="">전체 상태</MenuItem>
                      <MenuItem value="active">활성</MenuItem>
                      <MenuItem value="inactive">비활성</MenuItem>
                      <MenuItem value="pending">대기중</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* 우측: 카테고리/상태/버튼 (width auto) */}
              <div className="flex flex-row items-center gap-2 flex-shrink-0">

                <Button variant="outlined" size="small" startIcon={<RefreshCw size={16} />}>
                  새로고침
                </Button>
                <Button variant="contained" size="small" startIcon={<Search size={16} />}>
                  검색
                </Button>
              </div>
            </div>
          </div>
        </Collapse>

        {/* 아코디언 토글 버튼 */}
        <AccordionToggleButton
          expanded={searchPanelExpanded}
          onClick={() => setSearchPanelExpanded(!searchPanelExpanded)}
        />
      </div>

      {/* bottom-contents-pannel */}
      <div className="c-panel bottom-contents-pannel">
        <div className="bottom-contents-pannel__content">
          {/* 컨텐츠 입력 */}


          {/* 제목이 왼쪽(행 헤더)이고, 폭 100%인 테이블 */}
          <div className="flex items-center mb-2">
            {/* 테이블은 제목 오른쪽에 배치 */}
            <TableContainer component={Paper} sx={{ width: '100%' }} className="table-header-left">
              <Table size="small">
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">노트북</TableCell>
                    <TableCell>1,200,000원</TableCell>
                    <TableCell>15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">모니터</TableCell>
                    <TableCell>350,000원</TableCell>
                    <TableCell>30</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">키보드</TableCell>
                    <TableCell>80,000원</TableCell>
                    <TableCell>50</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          {/* 제목이 상단(열 헤더)이고, 폭 100%인 테이블 */}
          <div className="mb-0">
            <TableContainer component={Paper} sx={{ width: '100%' }} className="table-header-top">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>이름</TableCell>
                    <TableCell>나이</TableCell>
                    <TableCell>직업</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>홍길동</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>개발자</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>김영희</TableCell>
                    <TableCell>32</TableCell>
                    <TableCell>디자이너</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>이철수</TableCell>
                    <TableCell>41</TableCell>
                    <TableCell>기획자</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        </div>
      </div>
    </div>
  )
}

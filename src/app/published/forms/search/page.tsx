"use client"

import { 
  TextField, 
  Button, 
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  Typography,
  Box,
  Divider,
  Chip,
  Slider,
  Switch,
  FormGroup,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Badge,
  IconButton
} from "@mui/material"
import { 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon
} from "@mui/icons-material"
import { useState } from "react"

interface SearchFilters {
  keyword: string
  category: string
  location: string
  dateRange: string
  priceRange: [number, number]
  rating: number
  features: string[]
  status: string
  sortBy: string
}

interface SearchResult {
  id: string
  title: string
  description: string
  category: string
  location: string
  price: number
  rating: number
  status: string
  date: string
  features: string[]
}

export default function SearchFormPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    category: '',
    location: '',
    dateRange: '',
    priceRange: [0, 1000],
    rating: 0,
    features: [],
    status: '',
    sortBy: 'relevance'
  })

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [savedSearches, setSavedSearches] = useState<string[]>(['최근 검색', '즐겨찾기 검색'])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  const handleFilterChange = (field: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    // 실제 검색 로직을 여기에 구현할 수 있습니다
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: '프론트엔드 개발자',
        description: 'React, TypeScript 경험이 있는 프론트엔드 개발자를 찾습니다.',
        category: '개발',
        location: '서울',
        price: 5000,
        rating: 4.5,
        status: '모집중',
        date: '2024-01-15',
        features: ['React', 'TypeScript', 'Material-UI']
      },
      {
        id: '2',
        title: 'UI/UX 디자이너',
        description: '사용자 경험을 중시하는 UI/UX 디자이너를 모집합니다.',
        category: '디자인',
        location: '부산',
        price: 4500,
        rating: 4.8,
        status: '모집중',
        date: '2024-01-14',
        features: ['Figma', 'Adobe XD', '프로토타이핑']
      }
    ]
    setSearchResults(mockResults)
  }

  const handleClearFilters = () => {
    setFilters({
      keyword: '',
      category: '',
      location: '',
      dateRange: '',
      priceRange: [0, 1000],
      rating: 0,
      features: [],
      status: '',
      sortBy: 'relevance'
    })
    setSearchResults([])
  }

  const handleSaveSearch = () => {
    const searchName = `검색 ${savedSearches.length + 1}`
    setSavedSearches(prev => [...prev, searchName])
  }

  const categories = ['전체', '개발', '디자인', '마케팅', '영업', '기타']
  const locations = ['전체', '서울', '부산', '대구', '인천', '광주', '대전']
  const statuses = ['전체', '모집중', '모집완료', '마감']
  const sortOptions = [
    { value: 'relevance', label: '관련도순' },
    { value: 'date', label: '최신순' },
    { value: 'price', label: '가격순' },
    { value: 'rating', label: '평점순' }
  ]

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">검색 및 필터 예시</h1>
          <p className="text-gray-600">Material UI의 검색 및 필터링 기능을 보여주는 예시입니다.</p>
        </div>

        {/* 기본 검색 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            기본 검색
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 키워드 검색 */}
            <TextField
              label="검색어"
              placeholder="직무, 회사, 키워드를 입력하세요..."
              value={filters.keyword}
              onChange={(e) => handleFilterChange('keyword', e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: filters.keyword && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => handleFilterChange('keyword', '')}
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            {/* 빠른 필터 */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>카테고리</InputLabel>
                <Select
                  value={filters.category}
                  label="카테고리"
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>지역</InputLabel>
                <Select
                  value={filters.location}
                  label="지역"
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>{location}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>정렬</InputLabel>
                <Select
                  value={filters.sortBy}
                  label="정렬"
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* 검색 버튼 */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleSearch}
                sx={{ textTransform: 'none' }}
              >
                검색
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FilterIcon />}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                sx={{ textTransform: 'none' }}
              >
                고급 필터 {showAdvancedFilters ? '숨기기' : '보이기'}
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<ClearIcon />}
                onClick={handleClearFilters}
                sx={{ textTransform: 'none' }}
              >
                필터 초기화
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* 고급 필터 */}
        {showAdvancedFilters && (
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              고급 필터
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* 가격 범위 */}
              <Box>
                <Typography variant="h6" gutterBottom>가격 범위</Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={filters.priceRange}
                    onChange={(e, newValue) => handleFilterChange('priceRange', newValue)}
                    valueLabelDisplay="auto"
                    min={0}
                    max={10000}
                    step={100}
                    marks={[
                      { value: 0, label: '0원' },
                      { value: 5000, label: '5,000원' },
                      { value: 10000, label: '10,000원' }
                    ]}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {filters.priceRange[0].toLocaleString()}원 ~ {filters.priceRange[1].toLocaleString()}원
                  </Typography>
                </Box>
              </Box>

              {/* 평점 */}
              <Box>
                <Typography variant="h6" gutterBottom>최소 평점</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Slider
                    value={filters.rating}
                    onChange={(e, newValue) => handleFilterChange('rating', newValue)}
                    min={0}
                    max={5}
                    step={0.5}
                    marks={[
                      { value: 0, label: '0' },
                      { value: 2.5, label: '2.5' },
                      { value: 5, label: '5' }
                    ]}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <StarIcon color="warning" />
                    <Typography>{filters.rating} 이상</Typography>
                  </Box>
                </Box>
              </Box>

              {/* 상태 */}
              <Box>
                <Typography variant="h6" gutterBottom>상태</Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                  >
                    {statuses.map((status) => (
                      <FormControlLabel
                        key={status}
                        value={status}
                        control={<Radio />}
                        label={status}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* 기능/기술 */}
              <Box>
                <Typography variant="h6" gutterBottom>기능/기술</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((feature) => (
                    <Chip
                      key={feature}
                      label={feature}
                      onClick={() => {
                        const newFeatures = filters.features.includes(feature)
                          ? filters.features.filter(f => f !== feature)
                          : [...filters.features, feature]
                        handleFilterChange('features', newFeatures)
                      }}
                      color={filters.features.includes(feature) ? 'primary' : 'default'}
                      variant={filters.features.includes(feature) ? 'filled' : 'outlined'}
                      clickable
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>
        )}

        {/* 저장된 검색 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            저장된 검색
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<SaveIcon />}
                onClick={handleSaveSearch}
                sx={{ textTransform: 'none' }}
              >
                현재 검색 저장
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {savedSearches.map((search, index) => (
                <Chip
                  key={index}
                  label={search}
                  variant="outlined"
                  clickable
                  onDelete={index > 1 ? () => {
                    setSavedSearches(prev => prev.filter((_, i) => i !== index))
                  } : undefined}
                />
              ))}
            </Box>
          </Box>
        </Paper>

        {/* 검색 결과 */}
        {searchResults.length > 0 && (
          <Paper elevation={2} sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              검색 결과 ({searchResults.length}건)
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <List>
              {searchResults.map((result) => (
                <ListItem key={result.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar>
                      <BusinessIcon />
                    </Avatar>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6">{result.title}</Typography>
                        <Chip
                          label={result.status}
                          color={result.status === '모집중' ? 'success' : 'default'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                          {result.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                          <Chip
                            icon={<LocationIcon />}
                            label={result.location}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            icon={<MoneyIcon />}
                            label={`${result.price.toLocaleString()}원`}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            icon={<StarIcon />}
                            label={result.rating}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            icon={<CalendarIcon />}
                            label={result.date}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {result.features.map((feature) => (
                            <Chip
                              key={feature}
                              label={feature}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

        {/* 사용법 안내 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            검색 팁
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="info">
              <Typography variant="subtitle2" gutterBottom>
                키워드 검색
              </Typography>
              <Typography variant="body2">
                구체적인 키워드를 사용하면 더 정확한 결과를 얻을 수 있습니다.
              </Typography>
            </Alert>
            
            <Alert severity="warning">
              <Typography variant="subtitle2" gutterBottom>
                필터 조합
              </Typography>
              <Typography variant="body2">
                여러 필터를 조합하여 원하는 조건에 맞는 결과를 찾을 수 있습니다.
              </Typography>
            </Alert>
            
            <Alert severity="success">
              <Typography variant="subtitle2" gutterBottom>
                검색 저장
              </Typography>
              <Typography variant="body2">
                자주 사용하는 검색 조건을 저장하여 빠르게 재사용할 수 있습니다.
              </Typography>
            </Alert>
          </Box>
        </Paper>
              </div>
    )
  } 
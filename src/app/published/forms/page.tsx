import { 
  Paper,
  Typography,
  Box,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import { 
  Form as FormIcon,
  CheckCircle as CheckIcon,
  Star as StarIcon,
  CloudUpload as UploadIcon,
  Search as SearchIcon,
  Timeline as TimelineIcon,
  Description as DescriptionIcon
} from "@mui/icons-material"
import Link from "next/link"

const formExamples = [
  {
    title: "기본 폼",
    description: "Material UI의 기본적인 폼 컴포넌트들을 사용한 예시입니다.",
    icon: <FormIcon />,
    href: "/published/forms/basic",
    features: ["TextField", "Select", "Radio", "Checkbox", "Button"],
    difficulty: "초급",
    color: "primary"
  },
  {
    title: "고급 폼",
    description: "Material UI의 고급 폼 컴포넌트들과 레이아웃을 보여주는 예시입니다.",
    icon: <StarIcon />,
    href: "/published/forms/advanced",
    features: ["Stepper", "Tabs", "Accordion", "Slider", "Rating", "Autocomplete"],
    difficulty: "중급",
    color: "secondary"
  },
  {
    title: "폼 검증",
    description: "실시간 폼 검증과 오류 처리를 보여주는 예시입니다.",
    icon: <CheckIcon />,
    href: "/published/forms/validation",
    features: ["실시간 검증", "오류 메시지", "입력 상태 표시", "폼 제출 처리"],
    difficulty: "중급",
    color: "success"
  },
  {
    title: "파일 업로드",
    description: "드래그 앤 드롭 파일 업로드와 진행 상황 표시를 보여주는 예시입니다.",
    icon: <UploadIcon />,
    href: "/published/forms/file-upload",
    features: ["드래그 앤 드롭", "진행률 표시", "파일 타입별 아이콘", "업로드 상태 관리"],
    difficulty: "중급",
    color: "warning"
  },
  {
    title: "검색 및 필터",
    description: "고급 검색 기능과 다양한 필터링 옵션을 보여주는 예시입니다.",
    icon: <SearchIcon />,
    href: "/published/forms/search",
    features: ["키워드 검색", "고급 필터", "저장된 검색", "검색 결과 표시"],
    difficulty: "중급",
    color: "info"
  },
  {
    title: "다단계 폼",
    description: "Stepper를 사용한 단계별 폼 입력을 보여주는 예시입니다.",
    icon: <TimelineIcon />,
    href: "/published/forms/multi-step",
    features: ["단계별 입력", "진행 상황 표시", "단계별 검증", "이전/다음 네비게이션"],
    difficulty: "고급",
    color: "error"
  }
]

const materialUIComponents = [
  "TextField", "Select", "MenuItem", "InputLabel", "FormControl",
  "Button", "IconButton", "ToggleButton", "ToggleButtonGroup",
  "Checkbox", "Radio", "RadioGroup", "FormControlLabel", "FormLabel",
  "Switch", "Slider", "Rating", "Autocomplete", "Chip",
  "Stepper", "Step", "StepLabel", "StepContent",
  "Tabs", "Tab", "Accordion", "AccordionSummary", "AccordionDetails",
  "Paper", "Card", "CardContent", "Typography", "Box", "Divider",
  "Grid", "List", "ListItem", "ListItemText", "ListItemIcon",
  "Alert", "Snackbar", "LinearProgress", "CircularProgress", "Skeleton"
]

export default function FormsPage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Material UI 폼 예시</h1>
          <p className="text-gray-600">Material UI의 다양한 폼 컴포넌트들을 활용한 실용적인 예시들을 확인하세요.</p>
        </div>

        {/* 폼 예시 카드들 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            폼 예시 모음
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            {formExamples.map((example) => (
              <Grid item xs={12} md={6} lg={4} key={example.title}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ color: `${example.color}.main` }}>
                        {example.icon}
                      </Box>
                      <Typography variant="h6" component="h3">
                        {example.title}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      {example.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Chip 
                        label={example.difficulty} 
                        size="small" 
                        sx={{ 
                          mb: 1,
                          backgroundColor: example.color === 'primary' ? '#eff6ff' : 
                                         example.color === 'secondary' ? '#f3e8ff' :
                                         example.color === 'success' ? '#f0fdf4' :
                                         example.color === 'error' ? '#fef2f2' :
                                         example.color === 'warning' ? '#fffbeb' : '#f3f4f6',
                          color: example.color === 'primary' ? '#1d4ed8' : 
                                 example.color === 'secondary' ? '#7c3aed' :
                                 example.color === 'success' ? '#15803d' :
                                 example.color === 'error' ? '#dc2626' :
                                 example.color === 'warning' ? '#d97706' : '#374151',
                          borderColor: example.color === 'primary' ? '#3b82f6' : 
                                      example.color === 'secondary' ? '#a855f7' :
                                      example.color === 'success' ? '#22c55e' :
                                      example.color === 'error' ? '#ef4444' :
                                      example.color === 'warning' ? '#f59e0b' : '#6b7280'
                        }}
                      />
                    </Box>
                    
                    <Typography variant="subtitle2" gutterBottom>
                      주요 기능:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {example.features.map((feature) => (
                        <Chip
                          key={feature}
                          label={feature}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: '#d1d5db', // gray-300
                            color: '#374151', // gray-700
                            '&:hover': {
                              borderColor: '#9ca3af', // gray-400
                              backgroundColor: '#f9fafb', // gray-50
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  
                  <CardActions>
                    <Link href={example.href} passHref style={{ textDecoration: 'none' }}>
                      <Button 
                        variant="contained" 
                        fullWidth
                        sx={{ 
                          textTransform: 'none',
                          backgroundColor: example.color === 'primary' ? '#3b82f6' : 
                                         example.color === 'secondary' ? '#8b5cf6' :
                                         example.color === 'success' ? '#22c55e' :
                                         example.color === 'error' ? '#ef4444' :
                                         example.color === 'warning' ? '#f59e0b' : '#6b7280',
                          '&:hover': {
                            backgroundColor: example.color === 'primary' ? '#2563eb' : 
                                           example.color === 'secondary' ? '#7c3aed' :
                                           example.color === 'success' ? '#16a34a' :
                                           example.color === 'error' ? '#dc2626' :
                                           example.color === 'warning' ? '#d97706' : '#4b5563'
                          }
                        }}
                      >
                        예시 보기
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Material UI 컴포넌트 목록 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            사용된 Material UI 컴포넌트
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {materialUIComponents.map((component) => (
              <Chip
                key={component}
                label={component}
                variant="outlined"
                size="small"
                clickable
                sx={{
                  borderColor: '#d1d5db', // gray-300
                  color: '#374151', // gray-700
                  '&:hover': {
                    borderColor: '#9ca3af', // gray-400
                    backgroundColor: '#f9fafb', // gray-50
                  }
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* 사용법 안내 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            사용법 및 팁
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>시작하기</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="기본 폼부터 시작하여 점진적으로 학습하세요" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="각 예시의 코드를 참고하여 실제 프로젝트에 적용하세요" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary="Material UI 공식 문서와 함께 학습하면 더욱 효과적입니다" />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>모범 사례</Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary="일관된 디자인 시스템을 유지하세요" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary="접근성을 고려한 폼 설계를 하세요" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StarIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText primary="사용자 경험을 최우선으로 고려하세요" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>

        {/* 추가 리소스 */}
        <Paper elevation={2} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            추가 리소스
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">공식 문서</Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Material UI 공식 문서" 
                  secondary="https://mui.com/material-ui/"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Material UI 컴포넌트 API" 
                  secondary="https://mui.com/material-ui/api/"
                />
              </ListItem>
            </List>
            
            <Typography variant="h6">예시 및 템플릿</Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Material UI 템플릿" 
                  secondary="https://mui.com/material-ui/getting-started/templates/"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Material UI 예시" 
                  secondary="https://mui.com/material-ui/getting-started/usage/"
                />
              </ListItem>
            </List>
          </Box>
        </Paper>
              </div>
    )
  } 
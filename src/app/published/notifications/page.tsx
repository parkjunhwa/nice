import { DashboardLayout } from "@/components/dashboard-layout"
import { Bell, Check, X, Settings, Filter } from "lucide-react"
import { 
  Button, 
  IconButton, 
  Chip, 
  Switch,
  FormControlLabel,
  Paper,
  Typography,
  Box
} from "@mui/material"
import { Add as AddIcon, FilterList as FilterIcon, Search as SearchIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from "@mui/icons-material"

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "새로운 사용자 가입",
      message: "김철수님이 시스템에 가입했습니다.",
      type: "사용자",
      time: "2분 전",
      read: false,
      priority: "높음"
    },
    {
      id: 2,
      title: "시스템 업데이트 완료",
      message: "시스템 업데이트가 성공적으로 완료되었습니다.",
      type: "시스템",
      time: "5분 전",
      read: false,
      priority: "보통"
    },
    {
      id: 3,
      title: "새로운 주문",
      message: "새로운 주문이 들어왔습니다. 확인이 필요합니다.",
      type: "주문",
      time: "10분 전",
      read: true,
      priority: "높음"
    },
    {
      id: 4,
      title: "백업 완료",
      message: "데이터베이스 백업이 완료되었습니다.",
      type: "시스템",
      time: "15분 전",
      read: true,
      priority: "낮음"
    },
    {
      id: 5,
      title: "결제 실패",
      message: "결제 처리 중 오류가 발생했습니다.",
      type: "결제",
      time: "30분 전",
      read: false,
      priority: "높음"
    },
    {
      id: 6,
      title: "서버 점검 예정",
      message: "내일 새벽 2시부터 서버 점검이 예정되어 있습니다.",
      type: "시스템",
      time: "1시간 전",
      read: true,
      priority: "보통"
    },
  ]

  const unreadCount = notifications.filter(notif => !notif.read).length

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">알림</h1>
            <p className="text-gray-600">시스템 알림을 관리하고 확인하세요.</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outlined" 
              startIcon={<FilterIcon />} 
              sx={{ 
                textTransform: 'none',
                borderColor: '#d1d5db', // gray-300
                color: '#374151', // gray-700
                '&:hover': {
                  borderColor: '#9ca3af', // gray-400
                  backgroundColor: '#f9fafb', // gray-50
                }
              }}
            >
              필터
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<Settings className="h-4 w-4" />} 
              sx={{ 
                textTransform: 'none',
                borderColor: '#d1d5db', // gray-300
                color: '#374151', // gray-700
                '&:hover': {
                  borderColor: '#9ca3af', // gray-400
                  backgroundColor: '#f9fafb', // gray-50
                }
              }}
            >
              설정
            </Button>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 알림</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-red-100 p-3">
                <Bell className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">읽지 않은 알림</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <Bell className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">오늘</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">이번 주</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
              </div>
            </div>
          </div>
        </div>

        {/* 알림 목록 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">최근 알림</h3>
              <div className="flex items-center space-x-2">
                                      <Button size="small" color="primary" sx={{ textTransform: 'none' }}>
                        모두 읽음으로 표시
                      </Button>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className={`px-6 py-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`h-3 w-3 rounded-full ${!notification.read ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </p>
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          notification.priority === "높음" 
                            ? "bg-red-100 text-red-800" 
                            : notification.priority === "보통"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {notification.priority}
                        </span>
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          notification.type === "사용자" 
                            ? "bg-blue-100 text-blue-800" 
                            : notification.type === "시스템"
                            ? "bg-purple-100 text-purple-800"
                            : notification.type === "주문"
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}>
                          {notification.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!notification.read && (
                      <IconButton size="small" sx={{ color: 'success.main' }} aria-label="읽음으로 표시">
                        <CheckCircleIcon />
                      </IconButton>
                    )}
                    <IconButton size="small" sx={{ color: 'error.main' }} aria-label="삭제">
                      <CancelIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">알림 설정</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">이메일 알림</p>
                  <p className="text-sm text-gray-500">중요한 알림을 이메일로 받기</p>
                </div>
                <Switch defaultChecked color="primary" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">푸시 알림</p>
                  <p className="text-sm text-gray-500">브라우저 푸시 알림 받기</p>
                </div>
                <Switch color="primary" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS 알림</p>
                  <p className="text-sm text-gray-500">긴급 알림을 SMS로 받기</p>
                </div>
                <Switch color="primary" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">알림 통계</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">시스템 알림</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">사용자 알림</span>
                  <span className="text-sm font-medium text-gray-900">30%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">주문 알림</span>
                  <span className="text-sm font-medium text-gray-900">25%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-yellow-500" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 
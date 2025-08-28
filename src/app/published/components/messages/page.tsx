import { Mail, Send, Inbox, Archive, Trash2, Search, Plus, User } from "lucide-react"
import { 
  TextField, 
  Button, 
  IconButton
} from "@mui/material"

export default function MessagesPage() {
  const messages = [
    {
      id: 1,
      sender: "김철수",
      subject: "프로젝트 진행 상황 보고",
      preview: "안녕하세요, 이번 주 프로젝트 진행 상황을 보고드립니다...",
      date: "2024-01-15 14:30",
      read: false,
      priority: "높음"
    },
    {
      id: 2,
      sender: "이영희",
      subject: "회의 일정 변경 안내",
      preview: "내일 예정된 회의 일정이 변경되었습니다. 확인 부탁드립니다...",
      date: "2024-01-15 12:15",
      read: true,
      priority: "보통"
    },
    {
      id: 3,
      sender: "박민수",
      subject: "새로운 기능 요청",
      preview: "고객으로부터 새로운 기능 요청이 들어왔습니다. 검토가 필요합니다...",
      date: "2024-01-15 10:45",
      read: false,
      priority: "높음"
    },
    {
      id: 4,
      sender: "최지영",
      subject: "월간 리포트",
      preview: "1월 월간 리포트가 완료되었습니다. 첨부파일을 확인해주세요...",
      date: "2024-01-14 16:20",
      read: true,
      priority: "보통"
    },
    {
      id: 5,
      sender: "정현우",
      subject: "시스템 점검 안내",
      preview: "내일 새벽 2시부터 4시까지 시스템 점검이 예정되어 있습니다...",
      date: "2024-01-14 15:30",
      read: true,
      priority: "낮음"
    },
  ]

  const unreadCount = messages.filter(msg => !msg.read).length

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">메시지</h1>
            <p className="text-gray-600">메시지를 관리하고 소통하세요.</p>
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Plus className="h-4 w-4" />}
            sx={{ textTransform: 'none' }}
          >
            새 메시지
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <Inbox className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">받은 메시지</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-red-100 p-3">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">읽지 않은 메시지</p>
                <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">보낸 메시지</p>
                <p className="text-2xl font-bold text-gray-900">567</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3">
                <Archive className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">보관된 메시지</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
            </div>
          </div>
        </div>

        {/* 메시지 목록 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">받은 메시지</h3>
              <div className="flex items-center space-x-2">
                <TextField
                  placeholder="메시지 검색..."
                  variant="outlined"
                  size="small"
                  sx={{ width: 256 }}
                  InputProps={{
                    startAdornment: <Search className="h-4 w-4 text-gray-400 mr-2" />,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <div key={message.id} className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className={`text-sm font-medium ${!message.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {message.sender}
                        </p>
                        {!message.read && (
                          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                        )}
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          message.priority === "높음" 
                            ? "bg-red-100 text-red-800" 
                            : message.priority === "보통"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {message.priority}
                        </span>
                      </div>
                      <p className={`text-sm ${!message.read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                        {message.subject}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {message.preview}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{message.date}</span>
                    <div className="flex space-x-1">
                      <IconButton size="small" aria-label="보관" sx={{ color: 'text.secondary' }}>
                        <Archive className="h-4 w-4" />
                      </IconButton>
                      <IconButton size="small" aria-label="삭제" sx={{ color: 'error.main' }}>
                        <Trash2 className="h-4 w-4" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 연락처</h3>
            <div className="space-y-3">
              {["김철수", "이영희", "박민수", "최지영", "정현우"].map((contact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <User className="h-3 w-3 text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{contact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">메시지 통계</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">이번 주</span>
                  <span className="text-sm font-medium text-gray-900">45</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">이번 달</span>
                  <span className="text-sm font-medium text-gray-900">234</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
} 
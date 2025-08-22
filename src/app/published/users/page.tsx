import { Users, UserPlus, UserCheck, UserX } from "lucide-react"
import { 
  Button, 
  IconButton, 
  Chip, 
  Avatar, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Typography,
  Box
} from "@mui/material"
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: "김철수",
      email: "kim@example.com",
      role: "관리자",
      status: "활성",
      lastLogin: "2024-01-15 14:30",
      avatar: "KC"
    },
    {
      id: 2,
      name: "이영희",
      email: "lee@example.com",
      role: "사용자",
      status: "활성",
      lastLogin: "2024-01-15 12:15",
      avatar: "이영"
    },
    {
      id: 3,
      name: "박민수",
      email: "park@example.com",
      role: "사용자",
      status: "비활성",
      lastLogin: "2024-01-10 09:45",
      avatar: "박민"
    },
    {
      id: 4,
      name: "최지영",
      email: "choi@example.com",
      role: "관리자",
      status: "활성",
      lastLogin: "2024-01-15 16:20",
      avatar: "최지"
    },
    {
      id: 5,
      name: "정현우",
      email: "jung@example.com",
      role: "사용자",
      status: "활성",
      lastLogin: "2024-01-14 11:30",
      avatar: "정현"
    },
  ]

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">사용자 관리</h1>
            <p className="text-gray-600">시스템 사용자를 관리하고 모니터링하세요.</p>
          </div>
          <Button 
            variant="contained" 
            startIcon={<UserPlus className="h-4 w-4" />}
            sx={{ 
              textTransform: 'none',
              backgroundColor: '#3b82f6', // blue-500
              '&:hover': {
                backgroundColor: '#2563eb', // blue-600
              }
            }}
          >
            새 사용자 추가
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 사용자</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">활성 사용자</p>
                <p className="text-2xl font-bold text-gray-900">1,156</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-red-100 p-3">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">비활성 사용자</p>
                <p className="text-2xl font-bold text-gray-900">78</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3">
                <UserPlus className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">이번 달 신규</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
            </div>
          </div>
        </div>

        {/* 사용자 테이블 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">사용자 목록</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    역할
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    마지막 로그인
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{user.avatar}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        user.role === "관리자" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        user.status === "활성" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: '#3b82f6', // blue-500
                          mr: 1,
                          '&:hover': {
                            backgroundColor: '#eff6ff', // blue-50
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: '#ef4444', // red-500
                          '&:hover': {
                            backgroundColor: '#fef2f2', // red-50
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
} 
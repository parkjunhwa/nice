import { DashboardLayout } from "@/components/dashboard-layout"
import { Shield, AlertTriangle, CheckCircle, XCircle, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
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
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material"

export default function FirewallPage() {
  const firewallRules = [
    {
      id: 1,
      name: "SSH 접근 제한",
      description: "SSH 포트 22번에 대한 접근을 특정 IP에서만 허용",
      type: "Allow",
      source: "192.168.1.0/24",
      destination: "0.0.0.0/0",
      port: "22",
      status: "활성",
      priority: "High"
    },
    {
      id: 2,
      name: "HTTP 트래픽 허용",
      description: "웹 서버 포트 80번에 대한 모든 접근 허용",
      type: "Allow",
      source: "0.0.0.0/0",
      destination: "0.0.0.0/0",
      port: "80",
      status: "활성",
      priority: "Medium"
    },
    {
      id: 3,
      name: "FTP 접근 차단",
      description: "FTP 포트 21번에 대한 모든 접근 차단",
      type: "Deny",
      source: "0.0.0.0/0",
      destination: "0.0.0.0/0",
      port: "21",
      status: "활성",
      priority: "High"
    },
    {
      id: 4,
      name: "데이터베이스 접근 제한",
      description: "MySQL 포트 3306번에 대한 내부 네트워크 접근만 허용",
      type: "Allow",
      source: "10.0.0.0/8",
      destination: "0.0.0.0/0",
      port: "3306",
      status: "비활성",
      priority: "High"
    },
  ]

  const recentLogs = [
    {
      id: 1,
      timestamp: "2024-01-15 14:30:25",
      source: "192.168.1.100",
      destination: "10.0.0.1",
      port: "22",
      action: "BLOCKED",
      reason: "Unauthorized SSH access attempt"
    },
    {
      id: 2,
      timestamp: "2024-01-15 14:28:10",
      source: "203.0.113.45",
      destination: "10.0.0.1",
      port: "80",
      action: "ALLOWED",
      reason: "HTTP request"
    },
    {
      id: 3,
      timestamp: "2024-01-15 14:25:33",
      source: "198.51.100.22",
      destination: "10.0.0.1",
      port: "21",
      action: "BLOCKED",
      reason: "FTP access denied"
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">방화벽 설정</h1>
          <p className="text-gray-600">네트워크 보안을 위한 방화벽 규칙을 관리하세요.</p>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">활성 규칙</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">차단된 접근</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">허용된 접근</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <Settings className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 규칙</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
              </div>
            </div>
          </div>
        </div>

        {/* 방화벽 규칙 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">방화벽 규칙</h3>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<Settings className="h-4 w-4" />}
              sx={{ textTransform: 'none' }}
            >
              규칙 추가
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    규칙명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    타입
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    소스
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    포트
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    우선순위
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {firewallRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                        <div className="text-sm text-gray-500">{rule.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                        rule.type === "Allow" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      )}>
                        {rule.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rule.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rule.port}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                        rule.status === "활성" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      )}>
                        {rule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                        rule.priority === "High" 
                          ? "bg-red-100 text-red-800" 
                          : "bg-yellow-100 text-yellow-800"
                      )}>
                        {rule.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <IconButton size="small" sx={{ color: 'primary.main', mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'error.main' }}>
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 최근 로그 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">최근 로그</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    소스 IP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    포트
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    액션
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    사유
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.port}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex rounded-full px-2 text-xs font-semibold leading-5",
                        log.action === "ALLOWED" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      )}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 
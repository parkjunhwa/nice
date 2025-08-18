import { DashboardLayout } from "@/components/dashboard-layout"
import { FileText, Download, Eye, Edit, Trash2, Plus } from "lucide-react"
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
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Download as DownloadIcon } from "@mui/icons-material"

export default function DocumentsPage() {
  const documents = [
    {
      id: 1,
      title: "2024년 1분기 보고서",
      type: "PDF",
      size: "2.4 MB",
      author: "김철수",
      lastModified: "2024-01-15",
      status: "공개"
    },
    {
      id: 2,
      title: "사용자 매뉴얼 v2.1",
      type: "DOCX",
      size: "1.8 MB",
      author: "이영희",
      lastModified: "2024-01-12",
      status: "초안"
    },
    {
      id: 3,
      title: "프로젝트 계획서",
      type: "PDF",
      size: "3.2 MB",
      author: "박민수",
      lastModified: "2024-01-10",
      status: "검토중"
    },
    {
      id: 4,
      title: "회의록 - 2024년 1월",
      type: "DOCX",
      size: "0.8 MB",
      author: "최지영",
      lastModified: "2024-01-08",
      status: "공개"
    },
    {
      id: 5,
      title: "기술 명세서",
      type: "PDF",
      size: "5.1 MB",
      author: "정현우",
      lastModified: "2024-01-05",
      status: "비공개"
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">문서 관리</h1>
            <p className="text-gray-600">문서를 관리하고 공유하세요.</p>
          </div>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<Plus className="h-4 w-4" />}
            sx={{ textTransform: 'none' }}
          >
            새 문서
          </Button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 문서</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">공개 문서</p>
                <p className="text-2xl font-bold text-gray-900">856</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <Edit className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">초안</p>
                <p className="text-2xl font-bold text-gray-900">234</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3">
                <Download className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">다운로드</p>
                <p className="text-2xl font-bold text-gray-900">567</p>
              </div>
            </div>
          </div>
        </div>

        {/* 문서 테이블 */}
        <div className="rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">문서 목록</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    문서명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    크기
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    작성자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    수정일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex rounded-full px-2 text-xs font-semibold leading-5 bg-gray-100 text-gray-800">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.lastModified}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        doc.status === "공개" 
                          ? "bg-green-100 text-green-800" 
                          : doc.status === "초안"
                          ? "bg-yellow-100 text-yellow-800"
                          : doc.status === "검토중"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <IconButton size="small" sx={{ color: 'primary.main', mr: 1 }} aria-label="보기">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'success.main', mr: 1 }} aria-label="다운로드">
                        <DownloadIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'warning.main', mr: 1 }} aria-label="편집">
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'error.main' }} aria-label="삭제">
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
    </DashboardLayout>
  )
} 
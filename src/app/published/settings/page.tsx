import { DashboardLayout } from "@/components/dashboard-layout"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">설정</h1>
          <p className="text-gray-600">시스템 설정을 관리합니다.</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center text-gray-500 py-12">
            <p>설정 관리 기능이 여기에 표시됩니다.</p>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center text-gray-500 py-12">
            <p>설정 관리 기능이 여기에 표시됩니다.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 
import { DashboardCard } from "@/components/dashboard-card"
import { Chart } from "@/components/chart"
import {
  Users,
  DollarSign,
  ShoppingCart,
  Target
} from "lucide-react"

export default function DashboardPage() {
  // 최근 7일간 매출 데이터 (건수, 금액)
  const recentSalesData = [
    { name: "08.13", value1: 14, value2: 7 },    // 2025.08.13 / 14건, 7억
    { name: "08.14", value1: 15, value2: 8 },    // 2025.08.14 / 15건, 8억
    { name: "08.15", value1: 8, value2: 6 },     // 2025.08.15 / 8건, 6억
    { name: "08.16", value1: 9, value2: 6.5 },   // 2025.08.16 / 9건, 6.5억
    { name: "08.17", value1: 10, value2: 8 },    // 2025.08.17 / 10건, 8억
    { name: "08.18", value1: 12, value2: 9 },    // 2025.08.18 / 12건, 9억
    { name: "08.19", value1: 13, value2: 11 },   // 2025.08.19 / 13건, 11억
    { name: "08.20", value1: 14, value2: 12 }    // 2025.08.20 / 14건, 12억
  ]

  // 최근 3개월간 매출 데이터 (건수, 금액)
  const monthlySalesData = [
    { name: "2025.06", value1: 140, value2: 72 },   // 140건, 72억
    { name: "2025.07", value1: 150, value2: 80 },   // 150건, 80억
    { name: "2025.08", value1: 160, value2: 83 }    // 160건, 83억
  ]

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mt-2 mb-2" >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인페이지</h1>
        </div>
      </div >
      {/* 카드들 (2:1로 3등분) */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* 첫 번째 2/3 영역: 카드 1개 */}
        <div className="col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">섹션1</h3>
              </div>
            </div>
          </div>
        </div>
        {/* 두 번째 1/3 영역: 나머지 카드 2개를 세로로 배치 */}
        <div className="flex flex-col gap-4">
          {/* 공지사항 섹션 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">공지사항</h3>
            <div className="space-y-3">
              {[
                { time: "2분 전", action: "새 사용자가 가입했습니다", user: "김철수" },
                { time: "5분 전", action: "프로필 정보를 업데이트했습니다프로필 정보를 업데이트했습니다프로필 정보를 업데이트했습니다", user: "이영희" },
                { time: "10분 전", action: "비밀번호를 변경했습니다", user: "박민수" },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-[6px] flex-shrink-0"></div>
                  <div className="flex-1 min-w-0" style={{ maxWidth: "100%" }}>
                    <p className="text-sm text-gray-900 truncate max-w-full overflow-hidden whitespace-nowrap">{activity.action}</p>
                    <p className="text-xs text-gray-500 truncate max-w-full overflow-hidden whitespace-nowrap">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 고객센터 섹션 */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">

          </div>
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* 첫 번째 차트 카드 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full flex flex-col">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900 inline-block">매출현황</h3>
            <p className="text-[12px] text-gray-600 inline-block align-middle">최근 7일간의 매출</p>
          </div>
          <Chart
            data={recentSalesData}
            type="line"
            colors={{
              value1: '#3b82f6', // blue-500 (파란색)
              value2: '#fbbf24', // amber-400 (노란색)
            }}
            labels={{
              value1: '건수',
              value2: '금액 (억원)'
            }}
          />
        </div>
        {/* 두 번째 차트 카드 */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full flex flex-col">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900 inline-block">매출현황</h3>
            <p className="text-[12px] text-gray-600 inline-block align-middle">최근 3개월간의 매출</p>
          </div>
          <Chart
            data={monthlySalesData}
            type="line"
            colors={{
              value1: '#3b82f6', // blue-500 (파란색)
              value2: '#fbbf24', // amber-400 (노란색)
            }}
            labels={{
              value1: '건수',
              value2: '금액 (억원)'
            }}
          />
        </div>
      </div>

    </div>
  )
} 
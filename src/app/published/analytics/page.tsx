import { DashboardCard } from "@/components/dashboard-card"
import { Chart } from "@/components/chart"
import { TrendingUp, TrendingDown, Users, Eye } from "lucide-react"

export default function AnalyticsPage() {
  // 월별 다중 데이터 (페이지뷰, 방문자, 세션시간)
  const monthlyData = [
    { name: "1월", value1: 65000, value2: 5900, value3: 240 },
    { name: "2월", value1: 59000, value2: 5200, value3: 210 },
    { name: "3월", value1: 80000, value2: 6800, value3: 280 },
    { name: "4월", value1: 81000, value2: 7200, value3: 290 },
    { name: "5월", value1: 56000, value2: 4800, value3: 200 },
    { name: "6월", value1: 55000, value2: 4700, value3: 195 },
    { name: "7월", value1: 40000, value2: 3500, value3: 150 },
    { name: "8월", value1: 45000, value2: 3800, value3: 170 },
    { name: "9월", value1: 60000, value2: 5100, value3: 220 },
    { name: "10월", value1: 70000, value2: 5900, value3: 250 },
    { name: "11월", value1: 85000, value2: 7200, value3: 300 },
    { name: "12월", value1: 90000, value2: 7600, value3: 320 }
  ]
  
  // 주간 다중 데이터 (페이지뷰, 방문자, 세션시간)
  const weeklyData = [
    { name: "월", value1: 12000, value2: 1200, value3: 45 },
    { name: "화", value1: 19000, value2: 1800, value3: 52 },
    { name: "수", value1: 15000, value2: 1400, value3: 48 },
    { name: "목", value1: 25000, value2: 2200, value3: 65 },
    { name: "금", value1: 22000, value2: 2000, value3: 58 },
    { name: "토", value1: 30000, value2: 2800, value3: 72 },
    { name: "일", value1: 28000, value2: 2600, value3: 68 }
  ]

  return (
    <div className="c-section">
        <div className="c-page-header">
          <h1 className="c-page-header__title">분석</h1>
          <p className="c-page-header__description">상세한 데이터 분석과 인사이트를 확인하세요.</p>
        </div>

        {/* 주요 지표 */}
        <div className="c-grid c-grid--4">
          <DashboardCard
            title="페이지 뷰"
            value="1,234,567"
            description="이번 달 총 페이지 뷰"
            icon={Eye}
            trend={{ value: 15, isPositive: true }}
          />
          <DashboardCard
            title="고유 방문자"
            value="89,123"
            description="이번 달 고유 방문자"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="평균 세션 시간"
            value="4분 32초"
            description="사용자당 평균 체류 시간"
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="이탈률"
            value="23.4%"
            description="평균 이탈률"
            icon={TrendingDown}
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        {/* 차트 섹션 */}
        <div className="c-grid c-grid--2">
          <Chart
            title="월별 트래픽 분석"
            data={monthlyData}
            type="line"
            colors={{
              value1: '#3b82f6', // blue-500
              value2: '#10b981', // emerald-500
              value3: '#f59e0b'  // amber-500
            }}
            labels={{
              value1: '페이지뷰',
              value2: '방문자',
              value3: '세션시간(초)'
            }}
          />
          <Chart
            title="주간 트래픽 패턴"
            data={weeklyData}
            type="bar"
            colors={{
              value1: '#8b5cf6', // violet-500
              value2: '#06b6d4', // cyan-500
              value3: '#84cc16'  // lime-500
            }}
            labels={{
              value1: '페이지뷰',
              value2: '방문자',
              value3: '세션시간(초)'
            }}
          />
        </div>

        {/* 상세 분석 */}
        <div className="c-grid c-grid--2">
          <div className="c-panel">
            <h3 className="c-section-title">인기 페이지</h3>
            <div className="c-section">
              {[
                { page: "/", views: 12345, percentage: 45 },
                { page: "/products", views: 8901, percentage: 32 },
                { page: "/about", views: 5678, percentage: 21 },
                { page: "/contact", views: 2345, percentage: 8 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="c-stat-item">
                    <span className="c-stat-item__name">{item.page}</span>
                    <span className="c-stat-item__value">{item.views.toLocaleString()}</span>
                  </div>
                  <div className="c-progress-bar">
                    <div
                      className="c-progress-bar__fill"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="c-panel">
            <h3 className="c-section-title">사용자 디바이스</h3>
            <div className="c-section">
              {[
                { device: "데스크톱", users: 45678, percentage: 65 },
                { device: "모바일", users: 23456, percentage: 34 },
                { device: "태블릿", users: 1234, percentage: 1 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="c-stat-item">
                    <span className="c-stat-item__name">{item.device}</span>
                    <span className="c-stat-item__value">{item.users.toLocaleString()}</span>
                  </div>
                  <div className="c-progress-bar">
                    <div
                      className="c-progress-bar__fill"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 추가 통계 */}
        <div className="c-panel">
          <h3 className="c-section-title">실시간 통계</h3>
          <div className="c-grid c-grid--4">
            <div className="c-text-group">
              <p className="c-text-group__primary c-text-group__primary--large">1,234</p>
              <p className="c-text-group__secondary">현재 온라인</p>
            </div>
            <div className="c-text-group">
              <p className="c-text-group__primary c-text-group__primary--large">567</p>
              <p className="c-text-group__secondary">오늘 신규 사용자</p>
            </div>
            <div className="c-text-group">
              <p className="c-text-group__primary c-text-group__primary--large">89</p>
              <p className="c-text-group__secondary">활성 세션</p>
            </div>
            <div className="c-text-group">
              <p className="c-text-group__primary c-text-group__primary--large">23</p>
              <p className="c-text-group__secondary">동시 접속자</p>
            </div>
          </div>
        </div>
      </div>
  )
} 
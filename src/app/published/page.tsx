import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardCard } from "@/components/dashboard-card"
import { Chart } from "@/components/chart"
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  Activity,
  Target
} from "lucide-react"

export default function DashboardPage() {
  // 월별 다중 데이터 (매출, 사용자, 주문)
  const multiChartData = [
    { name: "1월", value1: 125, value2: 1200, value3: 89 },
    { name: "2월", value1: 142, value2: 1350, value3: 102 },
    { name: "3월", value1: 168, value2: 1580, value3: 118 },
    { name: "4월", value1: 189, value2: 1720, value3: 134 },
    { name: "5월", value1: 203, value2: 1890, value3: 145 },
    { name: "6월", value1: 218, value2: 2100, value3: 156 },
    { name: "7월", value1: 245, value2: 2350, value3: 167 },
    { name: "8월", value1: 267, value2: 2580, value3: 178 },
    { name: "9월", value1: 289, value2: 2780, value3: 189 },
    { name: "10월", value1: 312, value2: 2950, value3: 201 },
    { name: "11월", value1: 298, value2: 3120, value3: 189 },
    { name: "12월", value1: 325, value2: 3280, value3: 212 }
  ]

  // 지역별 다중 데이터 (매출, 사용자, 주문)
  const regionChartData = [
    { name: "서울", value1: 23456, value2: 4560, value3: 1234 },
    { name: "부산", value1: 12345, value2: 2890, value3: 678 },
    { name: "대구", value1: 8901, value2: 1890, value3: 456 },
    { name: "인천", value1: 6789, value2: 1450, value3: 345 },
    { name: "광주", value1: 5678, value2: 1230, value3: 289 },
    { name: "대전", value1: 4567, value2: 980, value3: 234 }
  ]

  return (
    <DashboardLayout>
      <div className="c-section">
        {/* 페이지 헤더 */}
        <div className="c-page-header">
          <h1 className="c-page-header__title">대시보드</h1>
          <p className="c-page-header__description">시스템 현황과 주요 지표를 확인하세요.</p>
        </div>

        {/* 통계 카드들 */}
        <div className="c-grid c-grid--4">
          <DashboardCard
            title="총 사용자"
            value="12,345"
            description="활성 사용자 수"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <DashboardCard
            title="매출"
            value="₩45,678,900"
            description="이번 달 매출"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
          <DashboardCard
            title="주문"
            value="1,234"
            description="이번 달 주문 수"
            icon={ShoppingCart}
            trend={{ value: 15, isPositive: true }}
          />
          <DashboardCard
            title="전환율"
            value="3.2%"
            description="평균 전환율"
            icon={Target}
            trend={{ value: 2, isPositive: false }}
          />
        </div>

        {/* 차트 섹션 */}
        <div className="c-grid c-grid--2">
          <Chart
            title="월별 통계 (매출, 사용자, 주문)"
            data={multiChartData}
            type="line"
            colors={{
              value1: '#3b82f6', // blue-500
              value2: '#10b981', // emerald-500
              value3: '#f59e0b'  // amber-500
            }}
            labels={{
              value1: '매출 (백만원)',
              value2: '사용자 수',
              value3: '주문 수'
            }}
          />
          <Chart
            title="지역별 통계 (매출, 사용자, 주문)"
            data={regionChartData}
            type="bar"
            colors={{
              value1: '#8b5cf6', // violet-500
              value2: '#06b6d4', // cyan-500
              value3: '#84cc16'  // lime-500
            }}
            labels={{
              value1: '매출 (백만원)',
              value2: '사용자 수',
              value3: '주문 수'
            }}
          />
        </div>
        
        {/* 최근 활동 섹션 */}
        <div className="c-panel">
          <h3 className="c-section-title">최근 활동</h3>
          <div className="c-section-grid c-section-grid--2">
            <div className="c-activity-section">
              <h4 className="c-activity-section__title">사용자 활동</h4>
              {[
                { time: "2분 전", action: "새 사용자가 가입했습니다", user: "김철수" },
                { time: "5분 전", action: "프로필 정보를 업데이트했습니다", user: "이영희" },
                { time: "10분 전", action: "비밀번호를 변경했습니다", user: "박민수" },
                { time: "15분 전", action: "로그인했습니다", user: "최지영" },
              ].map((activity, index) => (
                <div key={index} className="c-activity-item">
                  <div className="c-activity-item__dot c-activity-item__dot--blue"></div>
                  <div className="c-activity-item__content">
                    <p className="c-activity-item__action">{activity.action}</p>
                    <p className="c-activity-item__meta">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="c-activity-section">
              <h4 className="c-activity-section__title">시스템 활동</h4>
              {[
                { time: "1분 전", action: "새 주문이 들어왔습니다", user: "시스템" },
                { time: "3분 전", action: "결제가 완료되었습니다", user: "시스템" },
                { time: "8분 전", action: "재고가 업데이트되었습니다", user: "시스템" },
                { time: "12분 전", action: "백업이 완료되었습니다", user: "시스템" },
              ].map((activity, index) => (
                <div key={index} className="c-activity-item">
                  <div className="c-activity-item__dot c-activity-item__dot--green"></div>
                  <div className="c-activity-item__content">
                    <p className="c-activity-item__action">{activity.action}</p>
                    <p className="c-activity-item__meta">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 추가 통계 */}
        <div className="c-grid c-grid--3">
          <div className="c-panel">
            <h3 className="c-section-title">인기 상품</h3>
            <div className="c-section">
              {[
                { name: "노트북", sales: 234, revenue: "₩12,345,000" },
                { name: "스마트폰", sales: 189, revenue: "₩8,901,000" },
                { name: "태블릿", sales: 156, revenue: "₩6,789,000" },
              ].map((product, index) => (
                <div key={index} className="c-stat-item">
                  <div className="c-stat-item__content">
                    <p className="c-stat-item__name">{product.name}</p>
                    <p className="c-stat-item__subtitle">{product.sales}개 판매</p>
                  </div>
                  <p className="c-stat-item__value">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="c-panel">
            <h3 className="c-section-title">지역별 매출</h3>
            <div className="c-section">
              {[
                { region: "서울", revenue: "₩23,456,000", percentage: 45 },
                { region: "부산", revenue: "₩12,345,000", percentage: 24 },
                { region: "대구", revenue: "₩8,901,000", percentage: 17 },
                { region: "인천", revenue: "₩6,789,000", percentage: 14 },
              ].map((region, index) => (
                <div key={index}>
                  <div className="c-stat-item">
                    <span className="c-stat-item__name">{region.region}</span>
                    <span className="c-stat-item__value">{region.revenue}</span>
                  </div>
                  <div className="c-progress-bar">
                    <div
                      className="c-progress-bar__fill"
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="c-panel">
            <h3 className="c-section-title">시스템 상태</h3>
            <div className="c-section">
              {[
                { service: "웹 서버", status: "정상", color: "success" },
                { service: "데이터베이스", status: "정상", color: "success" },
                { service: "캐시 서버", status: "경고", color: "warning" },
                { service: "이메일 서비스", status: "정상", color: "success" },
              ].map((service, index) => (
                <div key={index} className="c-stat-item">
                  <span className="c-stat-item__name">{service.service}</span>
                  <span className={`c-status-badge c-status-badge--${service.color}`}>
                    {service.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 하단 여백 추가 - 스크롤 문제 해결 */}
        <div className="h-16"></div>
      </div>
    </DashboardLayout>
  )
} 
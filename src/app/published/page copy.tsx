export default function DashboardPage() {

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb and Page Title */}
      <div className="flex flex-row items-center justify-between mt-2 mb-2" >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">메인페이지</h1>
        </div>
      </div >
      {/* 카드들 (1:2로 3등분) */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* 첫 번째 1/3 영역: 메인 섹션 */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm h-full">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">섹션1</h3>
              </div>
            </div>
          </div>
        </div>
        {/* 두 번째 2/3 영역: 공지사항과 고객센터 */}
        <div className="col-span-2 flex flex-col gap-4">
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


    </div>
  )
}
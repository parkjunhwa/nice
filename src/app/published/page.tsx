'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Phone, ChevronRight, Paperclip, Download } from 'lucide-react'
import { ChevronRightIcon } from '@/components/icons'

export default function DashboardPage() {
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState(2) // 기본적으로 3번째 항목 선택


  const notices = [
    {
      title: "[시스템 점검 안내] 2025년 11월 15일(토) 02:00~06:00 서버 정기 점검으로 인한 서비스 일시 중단 안내",
      date: "2025.11.10 14:30",
      content: "안녕하세요. NICE 시스템 운영팀입니다. 더 나은 서비스 제공을 위해 정기 시스템 점검을 실시합니다. 점검 시간 동안에는 모든 서비스가 일시 중단되오니 이용에 참고하시기 바랍니다. 점검 시간: 2025년 11월 15일(토) 02:00~06:00 (4시간) 점검 내용: 서버 하드웨어 업그레이드, 데이터베이스 최적화, 보안 패치 적용 점검 중 서비스 중단: 로그인, 거래 조회, 결제 서비스, 고객센터 문의 점검 완료 후 정상 서비스 재개 예정입니다. 불편을 드려 죄송하며, 양해 부탁드립니다.",
      attachments: [
        { name: "시스템점검_안내문.pdf", size: "2.3MB", path: "#" },
        { name: "점검일정표.xlsx", size: "1.1MB", path: "#" }
      ]
    },
    {
      title: "[보안 강화] 2단계 인증(2FA) 의무화 시행 안내 - 2025년 12월 1일부터 적용",
      date: "2025.11.08 09:15",
      content: "고객님의 계정 보안을 강화하기 위해 2단계 인증(2FA) 의무화를 시행합니다. 시행일: 2025년 12월 1일(월)부터 적용 대상: 모든 사용자 계정 2단계 인증 설정 방법: 1. 로그인 후 [마이페이지] → [보안 설정] 이동 2. [2단계 인증 설정] 클릭 3. SMS 또는 인증 앱 선택 4. 인증 코드 입력하여 설정 완료 2단계 인증 미설정 시: 12월 1일부터 로그인이 제한됩니다. 미리 설정하시기 바랍니다. 문의사항은 고객센터(1522-0741)로 연락 주시기 바랍니다.",
      attachments: []
    },
    {
      title: "[신규 기능 출시] AI 기반 거래 분석 서비스 베타 버전 오픈 - 스마트 투자 인사이트 제공",
      date: "2025.11.05 16:45",
      content: "NICE에서 혁신적인 AI 기반 거래 분석 서비스를 출시합니다. 베타 버전 오픈: 2025년 11월 20일(수) 주요 기능: 1. AI 거래 패턴 분석: 개인 거래 패턴을 분석하여 맞춤형 인사이트 제공 2. 시장 예측: 머신러닝 기반 시장 트렌드 예측 및 알림 3. 리스크 관리: 개인 투자 성향에 따른 리스크 레벨 분석 4. 포트폴리오 최적화: AI 추천 포트폴리오 구성 제안 베타 테스터 모집: 선착순 1,000명 (11월 15일까지 신청) 베타 테스터 혜택: 3개월 무료 이용, 프리미엄 기능 무료 체험 신청 방법: [서비스] → [AI 분석] → [베타 테스터 신청] 많은 관심과 참여 부탁드립니다.",
      attachments: [
        { name: "AI서비스_소개서.pdf", size: "5.2MB", path: "#" },
        { name: "베타테스터_신청서.docx", size: "890KB", path: "#" },
        { name: "사용자_가이드.pptx", size: "3.1MB", path: "#" }
      ]
    },
    {
      title: "[이벤트 안내] 연말 감사 이벤트 - 최대 50만원 적립금 지급! 12월 한 달간 진행",
      date: "2025.11.03 11:20",
      content: "2025년을 마무리하며 고객님께 감사 인사를 전합니다. 연말 감사 이벤트를 진행합니다. 이벤트 기간: 2025년 12월 1일(월) ~ 12월 31일(화) 참여 방법: 1. 거래 금액별 적립: 월 거래 금액에 따라 최대 10만원 적립 2. 친구 초대 이벤트: 친구 초대 시 양쪽 모두 5만원 적립 3. 퀴즈 이벤트: 매주 금요일 퀴즈 참여 시 1만원 적립 4. 리뷰 이벤트: 서비스 이용 후기 작성 시 2만원 적립 적립금 지급: 이벤트 종료 후 2026년 1월 10일 일괄 지급 적립금 사용: 2026년 1월 15일부터 사용 가능 (유효기간: 6개월) 자세한 내용은 이벤트 페이지에서 확인하실 수 있습니다.",
      attachments: [
        { name: "이벤트_상세안내.pdf", size: "1.8MB", path: "#" }
      ]
    },
    {
      title: "[중요 공지] 개인정보 처리방침 개정 안내 - 2025년 12월 15일 시행",
      date: "2025.10.30 13:55",
      content: "개인정보보호법 개정에 따라 개인정보 처리방침을 개정합니다. 개정 시행일: 2025년 12월 15일(월) 주요 개정 사항: 1. 개인정보 수집·이용 목적 명확화 2. 개인정보 보유·이용 기간 구체화 3. 개인정보 제3자 제공 현황 상세화 4. 개인정보 처리 위탁 현황 업데이트 5. 정보주체 권리 행사 방법 안내 개선 개정된 처리방침은 2025년 11월 1일부터 사전 공지되며, 12월 15일부터 적용됩니다. 처리방침 개정에 동의하지 않으시는 경우, 12월 14일까지 서비스 이용을 중단하시기 바랍니다. 개정된 처리방침은 [고객센터] → [약관 및 정책]에서 확인하실 수 있습니다. 문의사항: 개인정보보호팀 (privacy@nice.co.kr)",
      attachments: [
        { name: "개인정보처리방침_개정안.pdf", size: "2.7MB", path: "#" },
        { name: "개정사항_비교표.xlsx", size: "1.5MB", path: "#" }
      ]
    }
  ]
  return (
    <div className="h-screen bg-gray-50 flex flex-col"
      style={{ height: 'calc(100vh - 2rem)' }}>
      {/* Header */}
      <div className="flex-shrink-0 mb-3">
        <h1 className="text-2xl font-bold text-gray-900">메인페이지</h1>
      </div>
      {/* Main Content - Flex to fill remaining space */}
      <div className="flex gap-4 flex-1 min-h-0">
        {/* Left Column - 1/3 width with dark background */}
        <div
          className="w-1/3 bg-gray-900 rounded-lg relative overflow-hidden h-full flex flex-col"
          style={{
            backgroundImage: "url('/images/main_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '400px'
          }}
        >
          {/* Dark Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-30"
          ></div>

          {/* Text Overlay */}
          <div className="relative z-10 pt-8 pl-8 text-white">
            <Image
              src="/images/logo_w.png"
              alt="NICE인프라 로고"
              height={20}
              width={120}
            />
            <div
              className="font-normal mt-4"
              style={{
                fontSize: '20px',
                lineHeight: '120%',
              }}
            >
              안녕하세요.<br />
              오늘도 NICE한 하루 보내세요.
            </div>
          </div>

          {/* 집계카드 5개 */}
          <div className="relative z-10 flex-1 flex flex-col min-h-0">
            <div className="px-8 mt-4 pb-8 flex-1 overflow-y-auto scrollbar-transparent">
              <div className="flex flex-col gap-4">
                {/* 현금사업 카드 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-0 border border-white/20">
                  <table className="w-full text-xs aggregation-table p-4">
                    <thead className="bg-transparent">
                      <tr className="text-white/70">
                        <th className="text-left pb-2">현금사업</th>
                        <th className="text-right pb-2">건수</th>
                        <th className="text-right pb-2">금액(원)</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr>
                        <td className="text-white/50 py-1">당일 매출 집계</td>
                        <td className="text-white text-right py-1">13,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">전일 매출 집계</td>
                        <td className="text-white text-right py-1">223,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">당월 누적 집계</td>
                        <td className="text-white text-right py-1">123,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 주차사업 카드 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-0 border border-white/20">
                  <table className="w-full text-xs aggregation-table p-4">
                    <thead className="bg-transparent">
                      <tr className="text-white/70">
                        <th className="text-left pb-2">주차사업</th>
                        <th className="text-right pb-2">건수</th>
                        <th className="text-right pb-2">금액(원)</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr>
                        <td className="text-white/50 py-1">당일 매출 집계</td>
                        <td className="text-white text-right py-1">13,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">전일 매출 집계</td>
                        <td className="text-white text-right py-1">223,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">당월 누적 집계</td>
                        <td className="text-white text-right py-1">123,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* EV사업 카드 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-0 border border-white/20">
                  <table className="w-full text-xs aggregation-table p-4">
                    <thead className="bg-transparent">
                      <tr className="text-white/70">
                        <th className="text-left pb-2">EV사업</th>
                        <th className="text-right pb-2">건수</th>
                        <th className="text-right pb-2">금액(원)</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr>
                        <td className="text-white/50 py-1">당일 매출 집계</td>
                        <td className="text-white text-right py-1">13,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">전일 매출 집계</td>
                        <td className="text-white text-right py-1">223,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">당월 누적 집계</td>
                        <td className="text-white text-right py-1">123,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 키오스크사업 카드 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-0 border border-white/20">
                  <table className="w-full text-xs aggregation-table p-4">
                    <thead className="bg-transparent">
                      <tr className="text-white/70">
                        <th className="text-left pb-2">키오스크사업</th>
                        <th className="text-right pb-2">건수</th>
                        <th className="text-right pb-2">금액(원)</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr>
                        <td className="text-white/50 py-1">당일 매출 집계</td>
                        <td className="text-white text-right py-1">13,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">전일 매출 집계</td>
                        <td className="text-white text-right py-1">223,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">당월 누적 집계</td>
                        <td className="text-white text-right py-1">123,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 영상사업 카드 */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-0 border border-white/20">
                  <table className="w-full text-xs aggregation-table p-4">
                    <thead className="bg-transparent">
                      <tr className="text-white/70">
                        <th className="text-left pb-2">영상사업</th>
                        <th className="text-right pb-2">건수</th>
                        <th className="text-right pb-2">금액(원)</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr>
                        <td className="text-white/50 py-1">당일 매출 집계</td>
                        <td className="text-white text-right py-1">13,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">전일 매출 집계</td>
                        <td className="text-white text-right py-1">223,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                      <tr>
                        <td className="text-white/50 py-1">당월 누적 집계</td>
                        <td className="text-white text-right py-1">123,123</td>
                        <td className="text-white text-right py-1">10,120,100,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 2/3 width with cards */}
        <div className="w-2/3 flex flex-col gap-4 min-h-0 h-full">
          {/* 공지사항 Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">공지사항</h3>
              <a
                href="/published/inc001"
                className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-800"
              >
                바로가기
                <ChevronRightIcon size={16} className="ml-1" />
              </a>
            </div>
            <div className="space-y-0">
              {notices.map((notice, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 cursor-pointer hover:bg-gray-50 p-0 py-1 rounded transition-colors"
                  onClick={() => setSelectedNoticeIndex(index)}
                >
                  <div className={`w-1 h-1 rounded-full flex-shrink-0 ${selectedNoticeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`} style={{ marginTop: '8px' }}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className={`text-sm flex-1 pr-2 truncate ${selectedNoticeIndex === index ? 'text-blue-600' : 'text-gray-900'}`}>{notice.title}</p>
                      <span className="text-gray-500 flex-shrink-0 ml-2" style={{ fontSize: '13px' }}>{notice.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 공지사항 상세 Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex-1 min-h-0 flex flex-col flex-1">

            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">공지사항 상세</h3>
            </div>
            <div className="flex-shrink-0 mb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-900 flex items-center flex-1 pr-2 min-w-0">
                  <ChevronRight size={16} className="text-blue-500 mr-1 flex-shrink-0" />
                  <span className="truncate text-blue-600" style={{ fontSize: '15px' }}>{notices[selectedNoticeIndex].title}</span>
                </h3>
                <span className="text-gray-500 flex-shrink-0 ml-2" style={{ fontSize: '13px' }}>
                  {notices[selectedNoticeIndex].date}
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-auto text-sm text-gray-700 leading-relaxed h-full">
              <div className="h-full">
                <p className="mb-4">{notices[selectedNoticeIndex].content}</p>

                {/* 첨부파일 섹션 */}
                {notices[selectedNoticeIndex].attachments && notices[selectedNoticeIndex].attachments.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center mb-3">
                      <Paperclip size={16} className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">첨부파일</span>
                      <span className="text-xs text-gray-500 ml-2">({notices[selectedNoticeIndex].attachments.length}개)</span>
                    </div>
                    <div className="space-y-2">
                      {notices[selectedNoticeIndex].attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => window.open(attachment.path, '_blank')}
                        >
                          <div className="flex items-center flex-1 min-w-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                              <Paperclip size={14} className="text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                          </div>
                          <button
                            className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(attachment.path, '_blank');
                            }}
                          >
                            <Download size={16} className="text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 이용문의 Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 flex-shrink-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-0">이용문의</h3>
            <p className="text-sm text-gray-600 mb-4">
              이용 중 궁금하신 점이나 불편한 사항이 있으면 아래 연락처로 문의 바랍니다.
            </p>
            <div className="flex items-center space-x-4 bg-blue-50 rounded-[12px] p-6">
              <div className="w-[60px] h-[60px] bg-green-500 rounded-full flex items-center justify-center">
                <Phone size={26} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">1522-0741</div>
                <div className="text-sm text-gray-500">
                  담당자 : 홍길동 / 평일 09:00, 주말 및 공휴일 10:00 ~ 18:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
} 
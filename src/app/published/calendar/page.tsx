"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
  type: "미팅" | "발표" | "워크샵" | "리뷰" | "기타";
  description?: string;
  priority: "높음" | "보통" | "낮음";
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const events: Event[] = [
    {
      id: 1,
      title: "팀 미팅",
      date: "2024-01-20",
      time: "10:00 - 11:00",
      location: "회의실 A",
      attendees: ["김철수", "이영희", "박민수"],
      type: "미팅",
      description: "주간 프로젝트 진행 상황 점검",
      priority: "높음",
    },
    {
      id: 2,
      title: "프로젝트 발표",
      date: "2024-01-22",
      time: "14:00 - 15:30",
      location: "대회의실",
      attendees: ["전체 팀"],
      type: "발표",
      description: "Q1 프로젝트 결과 발표",
      priority: "높음",
    },
    {
      id: 3,
      title: "고객 미팅",
      date: "2024-01-25",
      time: "09:00 - 10:00",
      location: "온라인",
      attendees: ["김철수", "최지영"],
      type: "미팅",
      description: "신규 프로젝트 요구사항 논의",
      priority: "보통",
    },
    {
      id: 4,
      title: "워크샵",
      date: "2024-01-28",
      time: "10:00 - 17:00",
      location: "컨퍼런스 센터",
      attendees: ["전체 팀"],
      type: "워크샵",
      description: "팀 빌딩 및 아이디어 브레인스토밍",
      priority: "보통",
    },
    {
      id: 5,
      title: "월간 리뷰",
      date: "2024-01-30",
      time: "16:00 - 17:00",
      location: "회의실 B",
      attendees: ["관리자 팀"],
      type: "리뷰",
      description: "1월 성과 및 2월 계획 수립",
      priority: "높음",
    },
  ];

  // 현재 월의 첫 번째 날과 마지막 날 계산
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  // 캘린더 그리드 생성 (6주 x 7일)
  const calendarDays = [];
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    calendarDays.push(date);
  }

  // 특정 날짜의 이벤트 가져오기
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return events.filter((event) => event.date === dateStr);
  };

  // 이전/다음 월 이동
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // 이벤트 타입별 색상
  const getEventTypeColor = (type: string) => {
    const colors = {
      미팅: "bg-blue-100 text-blue-800 border-blue-200",
      발표: "bg-green-100 text-green-800 border-green-200",
      워크샵: "bg-purple-100 text-purple-800 border-purple-200",
      리뷰: "bg-yellow-100 text-yellow-800 border-yellow-200",
      기타: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return colors[type as keyof typeof colors] || colors["기타"];
  };

  // 우선순위별 색상
  const getPriorityColor = (priority: string) => {
    const colors = {
      높음: "bg-red-100 text-red-800 border-red-200",
      보통: "bg-yellow-100 text-yellow-800 border-yellow-200",
      낮음: "bg-green-100 text-green-800 border-green-200",
    };
    return colors[priority as keyof typeof colors] || colors["보통"];
  };

  // 필터링된 이벤트
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">일정 관리</h1>
            <p className="text-gray-600">일정을 관리하고 조율하세요.</p>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            <Plus className="h-4 w-4 mr-2" />새 일정
          </button>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200">
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3 border border-blue-200">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">총 일정</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-green-200">
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3 border border-green-200">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">이번 주</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    events.filter((event) => {
                      const eventDate = new Date(event.date);
                      const now = new Date();
                      const weekStart = new Date(
                        now.setDate(now.getDate() - now.getDay())
                      );
                      const weekEnd = new Date(now.setDate(now.getDate() + 6));
                      return eventDate >= weekStart && eventDate <= weekEnd;
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-yellow-200">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 border border-yellow-200">
                <MapPin className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">오프라인</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.filter((event) => event.location !== "온라인").length}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-purple-200">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-3 border border-purple-200">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">참석자</p>
                <p className="text-2xl font-bold text-gray-900">
                  {events.reduce(
                    (total, event) => total + event.attendees.length,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="일정 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            title="일정 유형 필터"
            aria-label="일정 유형 필터"
          >
            <option value="all">모든 유형</option>
            <option value="미팅">미팅</option>
            <option value="발표">발표</option>
            <option value="워크샵">워크샵</option>
            <option value="리뷰">리뷰</option>
            <option value="기타">기타</option>
          </select>
        </div>

        {/* 캘린더 뷰 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 캘린더 */}
          <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  title="이전 달"
                  aria-label="이전 달"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  title="다음 달"
                  aria-label="다음 달"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* 요일 헤더 */}
            <div className="border border-gray-200 rounded-t-lg overflow-hidden">
              <div className="grid grid-cols-7">
                {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
                  <div
                    key={day}
                    className={`
                      p-3 text-center text-sm font-semibold text-gray-600 bg-gray-50 border-r border-gray-200
                      ${index === 6 ? "border-r-0" : ""}
                    `}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* 캘린더 그리드 */}
            <div className="border-l border-r border-b border-gray-200 rounded-b-lg overflow-hidden">
              <div className="grid grid-cols-7">
                {calendarDays.map((date, index) => {
                  const isCurrentMonth =
                    date.getMonth() === currentDate.getMonth();
                  const isToday =
                    date.toDateString() === new Date().toDateString();
                  const isSelected =
                    selectedDate &&
                    date.toDateString() === selectedDate.toDateString();
                  const dayEvents = getEventsForDate(date);
                  const isLastInRow = (index + 1) % 7 === 0;
                  const isLastRow = index >= 35;

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`
                        min-h-[100px] p-3 text-sm cursor-pointer transition-all duration-200
                        border-r border-b border-gray-200
                        ${isLastInRow ? "border-r-0" : ""}
                        ${isLastRow ? "border-b-0" : ""}
                        ${
                          !isCurrentMonth
                            ? "text-gray-300 bg-gray-25"
                            : "text-gray-900 bg-white"
                        }
                        ${isToday ? "bg-blue-50 border-blue-300" : ""}
                        ${isSelected ? "bg-blue-100 border-blue-400" : ""}
                        hover:bg-gray-50 hover:shadow-sm
                        ${!isCurrentMonth ? "hover:bg-gray-25" : ""}
                      `}
                    >
                                             <div className="text-right mb-2">
                         <span
                           className={`
                        ${isToday ? "bg-blue-600 text-white" : ""}
                        ${isSelected ? "bg-blue-700 text-white" : ""}
                        ${!isCurrentMonth ? "text-gray-300" : "text-gray-700"}
                        px-2 py-1 rounded-full text-xs font-medium
                        ${!isToday && !isSelected ? "hover:bg-gray-200" : ""}
                      `}
                         >
                           {date.getDate()}
                         </span>
                       </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1.5 rounded-md truncate border ${getEventTypeColor(
                              event.type
                            )} shadow-sm`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 text-center py-1 bg-gray-50 rounded-md border border-gray-200">
                            +{dayEvents.length - 2}개 더
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 다가오는 일정 */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              다가오는 일정
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-gray-50 rounded-r-lg transition-all duration-200 border border-gray-100 hover:border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">
                        {event.date} • {event.time}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        {event.location}
                      </p>
                      <div className="flex gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(
                            event.type
                          )}`}
                        >
                          {event.type}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                            event.priority
                          )}`}
                        >
                          {event.priority}
                        </span>
                      </div>
                    </div>
                    <button
                      className="p-1.5 hover:bg-gray-200 rounded-md transition-colors"
                      title="더보기"
                      aria-label="더보기"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 일정 목록 */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">전체 일정</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                    일정명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                    날짜
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                    시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                    장소
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                    참석자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                    우선순위
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {filteredEvents.map((event, index) => (
                  <tr
                    key={event.id}
                    className="hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {event.title}
                      </div>
                      {event.description && (
                        <div className="text-xs text-gray-500 mt-1">
                          {event.description}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {event.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {event.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex flex-wrap gap-1">
                        {event.attendees.map((attendee, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200"
                          >
                            {attendee}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(
                          event.type
                        )}`}
                      >
                        {event.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          event.priority
                        )}`}
                      >
                        {event.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          className="p-1.5 hover:bg-blue-100 rounded-md transition-colors"
                          title="보기"
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-green-100 rounded-md transition-colors"
                          title="편집"
                        >
                          <Edit className="h-4 w-4 text-green-600" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-red-100 rounded-md transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

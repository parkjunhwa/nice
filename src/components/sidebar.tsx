"use client"

import { cn } from "@/lib/utils"
import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  Calendar,
  Mail,
  Bell,
  ChevronDown,
  ChevronRight,
  UserCheck,
  FileImage,
  Eye,
  Pencil
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useCallback, useMemo, memo } from "react"
import { SidebarToggle } from "./sidebar-toggle"

interface MenuItem {
  title: string
  href?: string
  icon?: any
  children?: MenuItem[]
  badge?: string
}

const sidebarItems: MenuItem[] = [
  {
    title: "로그인",
    href: "/mnb001",
    icon: Users
  },
  {
    title: "메인",
    href: "/published",
    icon: Home
  },
  {
    title: "공지사항",
    icon: Bell,
    children: [
      {
        title: "공지사항 목록",
        href: "/published/mnb005",
        icon: FileText // 목록(리스트) 아이콘
      },
      {
        title: "공지사항 상세",
        href: "/published/mnb006",
        icon: Eye // 보기(상세) 아이콘
      },
      {
        title: "공지사항 등록/수정",
        href: "/published/mnb007",
        icon: Pencil // 수정(등록/수정) 아이콘
      }
    ]
  },
  {
    title: "컴포넌트 예시",
    icon: FileText,
    children: [
      {
        title: "MUI 컴포넌트",
        href: "/published/components/mui",
        icon: FileText
      },
      {
        title: "검색01",
        href: "/published/components/search01",
        icon: Settings
      },
      {
        title: "검색02",
        href: "/published/components/search02",
        icon: Settings
      },
      {
        title: "모달팝업",
        href: "/published/components/modal",
        icon: Calendar
      }
    ]
  }
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

// 현재 경로에 따라 메뉴 아이템이 활성화되어야 하는지 확인하는 함수
function isMenuItemActive(item: MenuItem, pathname: string): boolean {
  if (item.href && pathname === item.href) {
    return true
  }

  if (item.children) {
    return item.children.some(child => isMenuItemActive(child, pathname))
  }

  return false
}

// 현재 경로에 따라 메뉴 아이템을 펼쳐야 하는지 확인하는 함수
function shouldExpandMenuItem(item: MenuItem, pathname: string): boolean {
  if (item.href && pathname === item.href) {
    return false // 링크가 있는 아이템은 펼칠 필요 없음
  }

  if (item.children) {
    return item.children.some(child => isMenuItemActive(child, pathname))
  }

  return false
}

function MenuItem({
  item,
  level = 0,
  isOpen,
  activePopover,
  setActivePopover
}: {
  item: MenuItem;
  level?: number;
  isOpen: boolean;
  activePopover: string | null;
  setActivePopover: (title: string | null) => void;
}) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 })
  const [hoveredChildIndex, setHoveredChildIndex] = useState<number | null>(null)
  const [hoveredGrandChildIndex, setHoveredGrandChildIndex] = useState<number | null>(null)
  const [hoveredGreatGrandChildIndex, setHoveredGreatGrandChildIndex] = useState<number | null>(null)

  // 각 depth별로 독립적인 hover 상태 관리
  const [hoveredChildFor3Depth, setHoveredChildFor3Depth] = useState<number | null>(null)
  const [hoveredGrandChildFor4Depth, setHoveredGrandChildFor4Depth] = useState<number | null>(null)
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href ? pathname === item.href : false
  const isChildActive = hasChildren && item.children?.some(child =>
    child.href ? pathname === child.href : false
  )

  // 메뉴 상태를 로컬 스토리지에 저장하는 함수
  const saveMenuState = (expanded: boolean) => {
    try {
      if (typeof window !== 'undefined') {
        const menuStates = JSON.parse(localStorage.getItem('sidebarMenuStates') || '{}')
        menuStates[item.title] = expanded
        localStorage.setItem('sidebarMenuStates', JSON.stringify(menuStates))
      }
    } catch (error) {
      console.warn('Failed to save menu state:', error)
    }
  }

  // 로컬 스토리지에서 메뉴 상태를 불러오는 함수
  const loadMenuState = (): boolean => {
    try {
      if (typeof window !== 'undefined') {
        const menuStates = JSON.parse(localStorage.getItem('sidebarMenuStates') || '{}')
        return menuStates[item.title] || false
      }
    } catch (error) {
      console.warn('Failed to load menu state:', error)
    }
    return false
  }

  // 현재 경로에 따라 메뉴를 자동으로 펼치기
  useEffect(() => {
    const shouldExpand = shouldExpandMenuItem(item, pathname)
    const savedState = loadMenuState()

    // 경로 기반 자동 펼침이 우선, 그 다음 저장된 상태
    if (shouldExpand) {
      setIsExpanded(true)
      saveMenuState(true)
    } else if (savedState && !shouldExpand) {
      // 저장된 상태가 있고, 현재 경로와 관련이 없으면 사용자 선택 상태 유지
      setIsExpanded(savedState)
    }
  }, [pathname, item])

  const handleClick = () => {
    if (hasChildren) {
      const newExpanded = !isExpanded
      setIsExpanded(newExpanded)
      saveMenuState(newExpanded)
    }
  }



  const paddingLeft = level * 16 + (isOpen ? 12 : 0)

  // Popover 메뉴 렌더링 함수 (4depth까지 지원)
  const renderPopoverMenu = (children: MenuItem[], level: number) => (
    <div
      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99999]"
      style={{
        left: popoverPosition.left,
        top: popoverPosition.top,
        marginLeft: '0px'
      }}
      onMouseEnter={() => setActivePopover(item.title)}
      onMouseLeave={() => setActivePopover(null)}
    >
      {/* 상위 메뉴를 가리키는 화살표 */}
      <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform -rotate-45 z-[10002]"></div>
      {children.map((child, index) => (
        <div key={index} className="relative group">
          {child.href ? (
            <Link href={child.href}>
              <div className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                {child.icon && <child.icon className="h-4 w-4 mr-3" />}
                <span>{child.title}</span>
              </div>
            </Link>
          ) : (
            <div
              className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 hover:text-gray-900"
              onMouseEnter={() => setHoveredChildIndex(index)}
              onMouseLeave={() => setHoveredChildIndex(null)}
            >
              {child.icon && <child.icon className="h-4 w-4 mr-3" />}
              <span>{child.title}</span>
              {child.children && child.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
            </div>
          )}

          {/* 3depth popover - 하위 메뉴가 있는 경우에만 해당 child에 마우스 오버 시 표시 */}
          {child.children && child.children.length > 0 && hoveredChildIndex === index && (
            <div
              className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99998]"
              style={{
                left: popoverPosition.left + 196, // 2depth popover 오른쪽에 배치 (200 - 4 = 196)
                top: popoverPosition.top,
                marginLeft: '0px'
              }}
              onMouseEnter={() => setHoveredChildIndex(index)}
              onMouseLeave={() => setHoveredChildIndex(null)}
            >
              {/* 상위 메뉴를 가리키는 화살표 */}
              <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform -rotate-45 z-[10002]"></div>
              {child.children.map((grandChild, grandIndex) => (
                <div key={grandIndex} className="relative group">
                  {grandChild.href ? (
                    <Link href={grandChild.href}>
                      <div className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                        {grandChild.icon && <grandChild.icon className="h-4 w-4 mr-3" />}
                        <span>{grandChild.title}</span>
                        {grandChild.children && grandChild.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
                      </div>
                    </Link>
                  ) : (
                    <div
                      className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 hover:text-gray-900"
                      onMouseEnter={() => setHoveredGrandChildIndex(grandIndex)}
                      onMouseLeave={() => setHoveredGrandChildIndex(null)}
                    >
                      {grandChild.icon && <grandChild.icon className="h-4 w-4 mr-3" />}
                      <span>{grandChild.title}</span>
                      {grandChild.children && grandChild.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
                    </div>
                  )}

                  {/* 4depth popover - 하위 메뉴가 있는 경우에만 해당 grandChild에 마우스 오버 시 표시 */}
                  {grandChild.children && grandChild.children.length > 0 && hoveredGrandChildIndex === grandIndex && (
                    <div
                      className="fixed bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99997]"
                      style={{
                        left: popoverPosition.left + 392, // 3depth popover 오른쪽에 배치 (196 + 196 = 392)
                        top: popoverPosition.top,
                        marginLeft: '0px'
                      }}
                      onMouseEnter={() => setHoveredGrandChildIndex(grandIndex)}
                      onMouseLeave={() => setHoveredGrandChildIndex(null)}
                    >
                      {/* 상위 메뉴를 가리키는 화살표 */}
                      <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform -rotate-45 z-[10002]"></div>
                      {grandChild.children.map((greatGrandChild, greatGrandIndex) => (
                        <Link key={greatGrandIndex} href={greatGrandChild.href || '#'}>
                          <div className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                            {greatGrandChild.icon && <greatGrandChild.icon className="h-4 w-4 mr-3" />}
                            <span>{greatGrandChild.title}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )

  const MenuContent = () => (
    <div
      className={cn(
        "flex items-center text-sm font-medium rounded-md transition-all duration-100 group relative cursor-pointer",
        isActive || isChildActive
          ? "bg-blue-900 text-white"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        isOpen ? "px-3 py-2" : "justify-center py-2"
      )}
      style={{ paddingLeft: isOpen ? `${paddingLeft}px` : undefined }}
      onClick={handleClick}
      title={!isOpen ? item.title : undefined}
      onMouseEnter={(e) => {
        if (!isOpen && hasChildren) {
          const rect = e.currentTarget.getBoundingClientRect()
          setPopoverPosition({
            top: rect.top,
            left: rect.left + rect.width + 8 // 메뉴 아이템 오른쪽에 8px 간격
          })
          setActivePopover(item.title)
        }
      }}
      onMouseLeave={() => {
        if (!isOpen && hasChildren) {
          setActivePopover(null)
          setHoveredChildIndex(null)
          setHoveredGrandChildIndex(null)
          setHoveredGreatGrandChildIndex(null)
          setHoveredChildFor3Depth(null)
          setHoveredGrandChildFor4Depth(null)
        }
      }}
    >
      {item.icon && (
        <item.icon className={cn(
          "h-5 w-5 transition-all duration-100 flex-shrink-0",
          isOpen ? "mr-3" : ""
        )} />
      )}
      {isOpen && (
        <>
          <span className="transition-opacity duration-100 flex-1">
            {item.title}
          </span>
          {hasChildren && (
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-100",
              isExpanded ? "rotate-180" : ""
            )} />
          )}
        </>
      )}

      {/* 접힌 상태에서 하위 메뉴가 있을 때 popover 표시 */}
      {!isOpen && hasChildren && activePopover === item.title && (
        <div className="absolute left-full top-0 -ml-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99999]">
          {/* 상위 메뉴를 가리키는 화살표 */}
          <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform -rotate-45 z-[10002]"></div>
          {item.children?.map((child, index) => (
            <div key={index} className="relative group">
              {child.href ? (
                <Link href={child.href}>
                  <div className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                    {child.icon && <child.icon className="h-4 w-4 mr-3" />}
                    <span>{child.title}</span>
                    {child.children && child.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
                  </div>
                </Link>
              ) : (
                <div
                  className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 hover:text-gray-900"
                  onMouseEnter={() => {
                    console.log('2depth menu onMouseEnter, index:', index)
                    setHoveredChildFor3Depth(index)
                  }}
                  onMouseLeave={() => {
                    console.log('2depth menu onMouseLeave')
                    setHoveredChildFor3Depth(null)
                  }}
                >
                  {child.icon && <child.icon className="h-4 w-4 mr-3" />}
                  <span>{child.title}</span>
                  {child.children && child.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
                </div>
              )}

              {/* 3depth popover - 하위 메뉴가 있는 경우에만 해당 child에 마우스 오버 시 표시 */}
              {child.children && child.children.length > 0 && hoveredChildFor3Depth === index && (
                <div
                  className="absolute left-full top-0 -ml-3 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99998]"
                  onMouseEnter={() => {
                    console.log('3depth popover onMouseEnter, index:', index)
                    setHoveredChildFor3Depth(index)
                  }}
                  onMouseLeave={() => {
                    console.log('3depth popover onMouseLeave')
                    setHoveredChildFor3Depth(null)
                    setHoveredGrandChildFor4Depth(null)
                  }}
                >
                  {/* 상위 메뉴를 가리키는 화살표 */}
                  <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform -rotate-45 z-[10002]"></div>
                  {child.children.map((grandChild, grandIndex) => (
                    <div key={grandIndex} className="relative group">
                      {grandChild.href ? (
                        <Link href={grandChild.href}>
                          <div className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                            {grandChild.icon && <grandChild.icon className="h-4 w-4 mr-3" />}
                            <span>{grandChild.title}</span>
                            {grandChild.children && grandChild.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
                          </div>
                        </Link>
                      ) : (
                        <div
                          className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-50 hover:text-gray-900"
                          onMouseEnter={() => {
                            console.log('3depth menu onMouseEnter, grandIndex:', grandIndex)
                            setHoveredGrandChildFor4Depth(grandIndex)
                          }}
                          onMouseLeave={() => {
                            console.log('3depth menu onMouseLeave')
                            setHoveredGrandChildFor4Depth(null)
                          }}
                        >
                          {grandChild.icon && <grandChild.icon className="h-4 w-4 mr-3" />}
                          <span>{grandChild.title}</span>
                          {grandChild.children && grandChild.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
                        </div>
                      )}

                      {/* 4depth popover - 하위 메뉴가 있는 경우에만 해당 grandChild에 마우스 오버 시 표시 */}
                      {grandChild.children && grandChild.children.length > 0 && hoveredGrandChildFor4Depth === grandIndex && (
                        <div
                          className="absolute left-full top-0 -ml-3 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99997]"
                          onMouseEnter={() => setHoveredGrandChildFor4Depth(grandIndex)}
                          onMouseLeave={() => setHoveredGrandChildFor4Depth(null)}
                        >
                          {/* 상위 메뉴를 가리키는 화살표 */}
                          <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform -rotate-45 z-[10002]"></div>
                          {grandChild.children.map((greatGrandChild, greatGrandIndex) => (
                            <Link key={greatGrandIndex} href={greatGrandChild.href || '#'}>
                              <div className="flex items-center px-2 py-2 mx-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                                {greatGrandChild.icon && <greatGrandChild.icon className="h-4 w-4 mr-3" />}
                                <span>{greatGrandChild.title}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 접힌 상태에서 모든 메뉴에 tooltip 표시 */}
      {!isOpen && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {item.title}
          <div
            className="absolute left-1/2 bottom-full w-0 h-0 border-l-4 border-r-4 border-b-4 border-t-0 border-transparent border-b-gray-900"
            style={{
              transform: 'translateX(-50%)'
            }}
          ></div>
        </div>
      )}
    </div>
  )

  return (
    <div>
      {item.href ? (
        <Link href={item.href}>
          <MenuContent />
        </Link>
      ) : (
        <MenuContent />
      )}

      {hasChildren && isExpanded && isOpen && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              level={level + 1}
              isOpen={isOpen}
              activePopover={activePopover}
              setActivePopover={setActivePopover}
            />
          ))}
        </div>
      )}

      {/* 접힌 상태에서는 renderPopoverMenu 함수를 통해서만 popover 표시 */}
    </div>
  )
}

const Sidebar = memo(function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [activePopover, setActivePopover] = useState<string | null>(null)

  return (
    <div className={cn(
      "c-sidebar flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out relative shadow-sm",
      isOpen ? "c-sidebar--expanded w-64 min-w-64" : "c-sidebar--collapsed w-16 min-w-16"
    )} style={{ zIndex: 10 }}>
      {/* CSS 스타일 추가 */}
      <style jsx>{`
        a {
          text-decoration: none !important;
        }
        a:hover {
          text-decoration: none !important;
        }
        a:focus {
          text-decoration: none !important;
        }
        a:active {
          text-decoration: none !important;
        }
        a:visited {
          text-decoration: none !important;
        }
      `}</style>

      <div className={cn(
        "flex h-16 items-center justify-between border-b border-gray-200",
        isOpen ? "pl-4 pr-2" : "px-4"
      )}>
        <div className="flex items-center h-16">
          {isOpen ? (
            <img
              src="/images/logo.png"
              alt="나이스 인프라"
              style={{ height: 18, width: 'auto', display: 'block', maxHeight: '18px' }}
            />
          ) : (
            // 접혔을 때 아무것도 렌더링하지 않음
            null
          )}
        </div>

        {/* 접었다 펼치는 버튼 */}
        <SidebarToggle isOpen={isOpen} onToggle={onToggle} />
      </div>
      <nav className={cn(
        "flex-1 space-y-1 px-2 py-4",
        isOpen ? "overflow-y-auto overflow-x-hidden" : ""
      )}>
        {/* 모든 메뉴 아이템을 하나의 리스트로 표시 */}
        {sidebarItems.map((item, index) => (
          <MenuItem
            key={`menu-${index}`}
            item={item}
            isOpen={isOpen}
            activePopover={activePopover}
            setActivePopover={setActivePopover}
          />
        ))}
      </nav>
      {isOpen && (
        <div className="border-t border-gray-200 p-4 space-y-3 mt-auto sticky bottom-0 bg-white">
          <p className="text-[11px] text-gray-400 text-center">Copyright NICE Infra. All Right Reserved.</p>
        </div>
      )}
    </div>
  )
})

export { Sidebar } 
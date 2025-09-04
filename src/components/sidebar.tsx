"use client"

import { cn } from "@/lib/utils"
import { 
  Home, 
  Users, 
  Settings, 
  FileText, 
  Bell,
  ChevronDown,
  ChevronRight,
  Eye,
  Shield,
  User,
  LogOut
} from "lucide-react"
import {
  Tooltip,
  IconButton
} from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, memo, useCallback } from "react"
import { SidebarToggle } from "./sidebar-toggle"

interface MenuItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  children?: MenuItem[]
  badge?: string
  section?: string
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
    title: "공통팝업",
    href: "/published/components/modal",
    icon: FileText
  },
  {
    title: "공지사항",
    icon: Bell,
    children: [
      {
        title: "공지사항 목록",
        href: "/published/mnb005",
        icon: FileText
      },
      {
        title: "공지사항 상세",
        href: "/published/mnb006",
        icon: Eye
      }
    ]
  },
  {
    title: "ADMIN",
    icon: Settings,
    children: [
      {
        title: "사용자 관리",
        href: "/published/adm001",
        icon: Users
      },
      {
        title: "권한 관리",
        href: "/published/adm002",
        icon: Shield
      },
      {
        title: "I/F로그 관리",
        href: "#",
        icon: FileText,
        children: [
          {
            title: "I/F로그 관리 목록",
            href: "/published/adm003",
            icon: FileText
          },
          {
            title: "I/F로그 관리 상세",
            href: "/published/adm004",
            icon: Eye
          }
        ]
      },
      {
        title: "공통코드 관리",
        href: "/published/adm005",
        icon: Settings
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
    return false
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
  const [hoveredChildIndex, setHoveredChildIndex] = useState<number | null>(null)
  const [hoveredGrandChildIndex, setHoveredGrandChildIndex] = useState<number | null>(null)
  const hasChildren = item.children && item.children.length > 0
  const isActive = item.href ? pathname === item.href : false
  const isChildActive = hasChildren && item.children?.some(child => 
    child.href ? pathname === child.href : false
  )

  // 메뉴 상태를 로컬 스토리지에 저장하는 함수
  const saveMenuState = useCallback((expanded: boolean) => {
    try {
      if (typeof window !== 'undefined') {
        const menuStates = JSON.parse(localStorage.getItem('sidebarMenuStates') || '{}')
        menuStates[item.title] = expanded
        localStorage.setItem('sidebarMenuStates', JSON.stringify(menuStates))
      }
    } catch (error) {
      console.warn('Failed to save menu state:', error)
    }
  }, [item.title])

  // 로컬 스토리지에서 메뉴 상태를 불러오는 함수
  const loadMenuState = useCallback((): boolean => {
    try {
      if (typeof window !== 'undefined') {
        const menuStates = JSON.parse(localStorage.getItem('sidebarMenuStates') || '{}')
        return menuStates[item.title] || false
      }
    } catch (error) {
      console.warn('Failed to load menu state:', error)
    }
    return false
  }, [item.title])

  // 현재 경로에 따라 메뉴를 자동으로 펼치기
  useEffect(() => {
    const shouldExpand = shouldExpandMenuItem(item, pathname)
    const savedState = loadMenuState()
    
    if (shouldExpand) {
      setIsExpanded(true)
      saveMenuState(true)
    } else if (savedState && !shouldExpand) {
      setIsExpanded(savedState)
    }
  }, [pathname, item, loadMenuState, saveMenuState])

  const handleClick = () => {
    if (hasChildren) {
      const newExpanded = !isExpanded
      setIsExpanded(newExpanded)
      saveMenuState(newExpanded)
    }
  }

  const paddingLeft = level * 16 + (isOpen ? 12 : 0)

  const MenuContent = () => (
    <div
      className={cn(
        "flex items-center text-sm font-medium rounded-md transition-all duration-100 group relative cursor-pointer",
        isActive || isChildActive
          ? "bg-blue-50 text-blue-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        isOpen ? "px-3 py-2" : "justify-center py-2"
      )}
      style={{ paddingLeft: isOpen ? `${paddingLeft}px` : undefined }}
      onClick={handleClick}
      title={!isOpen ? item.title : undefined}
      onMouseEnter={() => {
        if (!isOpen && hasChildren) {
          setActivePopover(item.title)
        }
      }}
      onMouseLeave={() => {
        if (!isOpen && hasChildren) {
          setActivePopover(null)
          setHoveredChildIndex(null)
          setHoveredGrandChildIndex(null)
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
        <div 
          className="absolute left-full top-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99999]"
          onMouseEnter={() => setActivePopover(item.title)}
          onMouseLeave={() => {
            setActivePopover(null)
            setHoveredChildIndex(null)
            setHoveredGrandChildIndex(null)
          }}
        >
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
                    console.log('2depth menu onMouseEnter, index:', index, 'child:', child.title)
                    setHoveredChildIndex(index)
                  }}
                >
                  {child.icon && <child.icon className="h-4 w-4 mr-3" />}
                  <span>{child.title}</span>
                  {child.children && child.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
                </div>
              )}
              
              {/* 3depth popover - 하위 메뉴가 있는 경우에만 해당 child에 마우스 오버 시 표시 */}
              {(() => {
                const shouldShow = child.children && child.children.length > 0 && hoveredChildIndex === index
                console.log('3depth popover check:', {
                  childTitle: child.title,
                  hasChildren: child.children && child.children.length > 0,
                  hoveredChildIndex,
                  index,
                  shouldShow
                })
                return shouldShow
              })() && (
                <div 
                  className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99998]"
                  onMouseEnter={() => setHoveredChildIndex(index)}
                  onMouseLeave={() => {
                    setHoveredGrandChildIndex(null)
                  }}
                >
                  {/* 상위 메뉴를 가리키는 화살표 */}
                  <div className="absolute -left-2 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform -rotate-45 z-[10002]"></div>
                  {child.children?.map((grandChild, grandIndex) => (
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
                            console.log('3depth menu onMouseEnter, grandIndex:', grandIndex, 'grandChild:', grandChild.title)
                            setHoveredGrandChildIndex(grandIndex)
                          }}
                        >
                          {grandChild.icon && <grandChild.icon className="h-4 w-4 mr-3" />}
                          <span>{grandChild.title}</span>
                          {grandChild.children && grandChild.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
                        </div>
                      )}
                      
                      {/* 4depth popover - 하위 메뉴가 있는 경우에만 해당 grandChild에 마우스 오버 시 표시 */}
                      {grandChild.children && grandChild.children.length > 0 && hoveredGrandChildIndex === grandIndex && (
                        <div 
                          className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[99997]"
                          onMouseEnter={() => setHoveredGrandChildIndex(grandIndex)}
                        >
                          {/* 상위 메뉴를 가리키는 화살표 */}
                          <div className="absolute -left-2 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 transform -rotate-45 z-[10002]"></div>
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
    </div>
  )
}

const Sidebar = memo(function Sidebar({ isOpen, onToggle }: SidebarProps) {
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
            null
          )}
        </div>

        <SidebarToggle isOpen={isOpen} onToggle={onToggle} />
      </div>
      
      <nav className={cn(
        "flex-1 space-y-1 px-2 py-4",
        isOpen ? "overflow-y-auto overflow-x-hidden" : ""
      )}>
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
      
      <div
        className={cn(
          "flex gap-0 border-t border-gray-200 mt-auto sticky bottom-0 bg-white",
          isOpen
            ? "flex items-center justify-between p-2"
            : "flex flex-col items-center justify-center space-y-2 p-4"
        )}
      >
        <button
          type="button"
          className={cn(
            "flex items-center space-x-3 focus:outline-none hover:bg-gray-100 rounded-full transition flex-1 min-w-0",
            isOpen ? "px-2 py-1" : "p-0"
          )}
          aria-label="프로필"
          style={{ flex: 1, minWidth: 0 }}
        >
          {isOpen ? (
            <div className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-100 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          ) : (
            <Tooltip title="홍길동 / 소속부서명 정보" placement="right" arrow>
              <div className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-100 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </Tooltip>
          )}
          {isOpen && (
            <>
              <div className="text-left pr-2 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate whitespace-nowrap">홍길동</p>
                <p className="text-xs text-gray-500 truncate whitespace-nowrap">소속부서명 정보</p>
              </div>
            </>
          )}
        </button>

        <Tooltip title="로그아웃" placement="top" arrow>
          <IconButton
            aria-label="로그아웃"
            onClick={() => {
              console.log('로그아웃 클릭')
            }}
            className={
              cn(
                "text-gray-600 p-4 flex-shrink-0",
                isOpen
                  ? "hover:text-gray-600 hover:bg-gray-100"
                  : "bg-gray-100 hover:bg-gray-100"
              )
            }
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </IconButton>
        </Tooltip>
      </div>
      
      {isOpen && (
        <>
          <div className="border-t border-gray-200 p-4 space-y-3 mt-auto sticky bottom-0 bg-white">
            <p className="text-[11px] text-gray-400 text-center">
              Copyright(c) NICE Infra Service.<br />
              All Right Reserved.
            </p>
          </div>
        </>
      )}
    </div>
  )
})

export { Sidebar } 
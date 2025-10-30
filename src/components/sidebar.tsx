"use client"

import { cn } from "@/lib/utils"
import {
  Settings,
  FileText,
  Bell,
  ChevronDown,
  ShoppingCart,
  Wallet,
  User as UserIcon,
  LogOut,
  Box,
  BadgeCheck,
  BadgeInfo,
  AlertTriangle,
  Home,
  Lock
} from "lucide-react"
import { Tooltip, IconButton, Select, MenuItem as MuiMenuItem, FormControl } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState, useEffect, memo, useCallback, useRef } from "react"
import { createPortal } from "react-dom"
import { SidebarToggle } from "./sidebar-toggle"
import Image from 'next/image'
import { useLoader } from "@/contexts/loader-context"

interface MenuItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  children?: MenuItem[]
  badge?: string
  section?: string
  separator?: boolean
}

// 사업 선택 옵션
const businessOptions = [
  { value: "cash", label: "현금" },
  { value: "parking", label: "주차" },
  { value: "ev", label: "EV" },
  { value: "kiosk", label: "키오스크" },
  { value: "video", label: "영상" },
  { value: "management", label: "경영" }
]

const sidebarItems: MenuItem[] = [
  {
    title: "매출 관리",
    icon: Box,
    children: [
      { title: "매출 집계(일)", href: "/published/inc001" },
      { title: "매출 집계(월)", href: "/published/inc002" },
    ]
  },
  {
    title: "매입 관리",
    icon: ShoppingCart,
    children: [
      { title: "매입 집계", href: "/published/cst001" },
    ]
  },
  {
    title: "수납 관리",
    icon: Wallet,
    children: [
      { title: "수납 집계", href: "/published/pmt001" },
    ]
  },
  {
    title: "정산 관리",
    icon: BadgeCheck,
    children: [
      { title: "정산", href: "/published/stl001" },
    ]
  },
  {
    title: "정산기준 관리",
    icon: BadgeInfo,
    children: [
      { title: "정산기준정보", href: "/published/con001" },
      { title: "정산기준정보(확인용상세)", href: "/published/con002" },
      { title: "정산 규칙", href: "/published/rul001" },
      { title: "정산 규칙(확인용상세)", href: "/published/rul002" },
    ]
  },
  {
    title: "시스템 관리",
    icon: Settings,
    children: [
      { title: "사용자 관리", href: "/published/adm001" },
      { title: "권한 관리", href: "/published/adm002" },
      { title: "I/F로그 관리", href: "/published/adm003" },
      { title: "I/F로그 상세", href: "/published/adm004" },
      { title: "공통코드 관리", href: "/published/adm005" }
    ]
  },
  { title: "", separator: true },
  {
    title: "컴포넌트 예시",
    icon: Box,
    children: [
      { title: "MUI 컴포넌트", href: "/published/components/mui" },
      { title: "로딩중", href: "/published/components/loading" },
      {
        title: "테스트 3뎁스",
        children: [
          { title: "하위 메뉴 1", href: "/" },
          { title: "하위 메뉴 2", href: "/" }
        ]
      }
    ]
  },
  { title: "공통팝업", href: "/published/components/modal", icon: FileText },
  { title: "로그인", href: "/mnb001", icon: Lock },
  { title: "메인", href: "/published", icon: Home },
  {
    title: "공지사항",
    icon: Bell,
    children: [
      { title: "공지사항 목록", href: "/published/mnb005" },
      { title: "공지사항 상세", href: "/published/mnb006" }
    ]
  },
  {
    title: "에러",
    icon: AlertTriangle,
    children: [
      { title: "401", href: "/err401" },
      { title: "404", href: "/err404" }
    ]
  }
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

// 현재 경로에 따라 메뉴 아이템이 활성화되어야 하는지 확인하는 함수
function isMenuItemActive(item: MenuItem, pathname: string): boolean {
  if (item.href && pathname === item.href) return true
  if (item.children) return item.children.some(child => isMenuItemActive(child, pathname))
  return false
}

// 현재 경로에 따라 메뉴 아이템을 펼쳐야 하는지 확인하는 함수
function shouldExpandMenuItem(item: MenuItem, pathname: string): boolean {
  if (item.href && pathname === item.href) return false
  if (item.children) return item.children.some(child => isMenuItemActive(child, pathname))
  return false
}

/**
 * 포털 레이어: 사이드바가 접힌 상태에서 popover가 부모의 overflow에 잘리지 않도록 body로 렌더링
 */
function PopoverLayer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(children, document.body)
}

/**
 * 마우스 나갔다가 들어올 때 순간 끊김/깜빡임 방지용 타이머 훅
 */
function useHoverDelay(closeDelay = 300) {
  const closeTimer = useRef<number | null>(null)
  const scheduleClose = (fn: () => void) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(fn, closeDelay)
  }
  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  useEffect(() => () => cancelClose(), [])
  return { scheduleClose, cancelClose }
}

function MenuItem({
  item,
  level = 0,
  isOpen,
  activePopover,
  setActivePopover,
  onMenuClick
}: {
  item: MenuItem
  level?: 0 | 1 | 2
  isOpen: boolean
  activePopover: string | null
  setActivePopover: (title: string | null) => void
  onMenuClick: () => void
}) {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = useState(false)
  const hasChildren = !!(item.children && item.children.length > 0)
  const isActive = item.href ? pathname === item.href : false
  const isChildActive = hasChildren && item.children?.some(child => (child.href ? pathname === child.href : false))

  const { scheduleClose, cancelClose } = useHoverDelay(160)

  // 메뉴 상태를 로컬 스토리지에 저장/로드
  const saveMenuState = useCallback(
    (expanded: boolean) => {
      try {
        if (typeof window !== "undefined") {
          const menuStates = JSON.parse(localStorage.getItem("sidebarMenuStates") || "{}")
          menuStates[item.title] = expanded
          localStorage.setItem("sidebarMenuStates", JSON.stringify(menuStates))
        }
      } catch (error) {
        console.warn("Failed to save menu state:", error)
      }
    },
    [item.title]
  )

  const loadMenuState = useCallback((): boolean => {
    try {
      if (typeof window !== "undefined") {
        const menuStates = JSON.parse(localStorage.getItem("sidebarMenuStates") || "{}")
        return menuStates[item.title] || false
      }
    } catch (error) {
      console.warn("Failed to load menu state:", error)
    }
    return false
  }, [item.title])

  // 현재 경로에 따라 메뉴 자동 펼침
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

  // 구분선인 경우 간단한 구분선 렌더링
  if (item.separator) {
    return (
      <div className={cn("my-2", isOpen ? "mx-3" : "mx-2")}>
        <div className="border-t border-gray-200" />
      </div>
    )
  }

  const handleClick = () => {
    if (hasChildren) {
      const newExpanded = !isExpanded
      setIsExpanded(newExpanded)
      saveMenuState(newExpanded)
    }
  }

  const paddingLeft = level === 0 ? (isOpen ? 12 : 0) :
    level === 1 ? (isOpen ? 52 : 0) :
      level === 2 ? (isOpen ? 60 : 0) : 0

  /**
   * 접힘 상태 popover: 2뎁스가 연속적으로 열리도록
   * - mouseleave 즉시 닫지 않고, 짧은 지연 후 닫기 (틈새에서 끊김 방지)
   * - 모든 popover를 body 포털로 렌더링 (overflow 잘림 방지)
   */
  const renderCollapsedPopovers = () => {
    if (!hasChildren || activePopover !== item.title) return null

    // 기준 엘리먼트의 위치 계산 (첫번째 레벨 아이콘 버튼의 DOM 좌표)
    const anchor = document.querySelector(
      `[data-popover-anchor="${CSS.escape(item.title)}"]`
    ) as HTMLElement | null

    if (!anchor) return null
    const rect = anchor.getBoundingClientRect()
    const baseTop = rect.top
    const baseLeft = rect.right

    const popBaseStyle: React.CSSProperties = {
      position: "fixed",
      top: baseTop,
      left: baseLeft,
      zIndex: 10000
    }

    return (
      <PopoverLayer>
        {/* 2depth */}
        <div
          style={popBaseStyle}
          className="bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48"
          onMouseEnter={() => {
            cancelClose()
            setActivePopover(item.title)
          }}
          onMouseLeave={() => {
            scheduleClose(() => {
              setActivePopover(null)
            })
          }}
        >
          {/* 상위 메뉴를 가리키는 화살표 */}
          <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 -rotate-45" />

          {item.children?.map((child: MenuItem, index: number) => {
            const childIsActive = child.href ? pathname === child.href : false
            return (
              <div key={index} className="relative group">
                {child.href ? (
                  <Link href={child.href} onClick={onMenuClick}>
                    <div
                      className={cn(
                        "flex items-center px-2 py-2 mx-2 text-sm",
                        childIsActive ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      {child.icon && <child.icon className={cn("h-4 w-4 mr-3", childIsActive ? "text-white" : undefined)} />}
                      <span>{child.title}</span>
                    </div>
                  </Link>
                ) : (
                  <div
                    className={cn(
                      "flex items-center px-2 py-2 mx-2 text-sm cursor-pointer",
                      childIsActive ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    {child.icon && <child.icon className={cn("h-4 w-4 mr-3", childIsActive ? "text-white" : undefined)} />}
                    <span>{child.title}</span>
                  </div>
                )}
                {/* level-2 submenu (collapsed only): appears when child has its own children */}
                {child.children && child.children.length > 0 && (
                  <div
                    className="hidden group-hover:block absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48 z-[10001]"
                  >
                    {/* pointer arrow */}
                    <div className="absolute -left-1.5 top-3 w-3 h-3 bg-white border-l border-t border-gray-200 -rotate-45" />
                    {child.children.map((grand: MenuItem, gi: number) => {
                      const grandIsActive = grand.href ? pathname === grand.href : false
                      return (
                        <div key={gi} className="relative">
                          {grand.href ? (
                            <Link href={grand.href} onClick={onMenuClick}>
                              <div
                                className={cn(
                                  "flex items-center px-2 py-2 mx-2 text-sm",
                                  grandIsActive ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                )}
                              >
                                {grand.icon && (
                                  <grand.icon className={cn("h-4 w-4 mr-3", grandIsActive ? "text-white" : undefined)} />
                                )}
                                <span>{grand.title}</span>
                              </div>
                            </Link>
                          ) : (
                            <div
                              className={cn(
                                "flex items-center px-2 py-2 mx-2 text-sm cursor-pointer",
                                grandIsActive ? "bg-blue-900 text-white" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                              )}
                            >
                              {grand.icon && (
                                <grand.icon className={cn("h-4 w-4 mr-3", grandIsActive ? "text-white" : undefined)} />
                              )}
                              <span>{grand.title}</span>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </PopoverLayer>
    )
  }

  const MenuContent = () => (
    <div
      data-popover-anchor={item.title}
      className={cn(
        "flex items-center text-sm font-medium rounded-md transition-all duration-100 group relative cursor-pointer",
        isActive ? "bg-blue-900 text-white" :
          isChildActive ? "bg-gray-100 text-gray-900" :
            "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        isOpen ? "px-3 py-2" : "justify-center py-2",
        (!isOpen && level === 0 && (isActive || isChildActive)) ? "bg-blue-900 text-white" : ""
      )}
      style={{ paddingLeft: isOpen ? `${paddingLeft}px` : undefined }}
      onClick={handleClick}
      title={!isOpen ? item.title : undefined}
      onMouseEnter={() => {
        if (!isOpen && hasChildren) {
          cancelClose()
          setActivePopover(item.title)
        }
      }}
      onMouseMove={() => {
        if (!isOpen && hasChildren) {
          cancelClose()
          setActivePopover(item.title)
        }
      }}
      onMouseLeave={() => {
        if (!isOpen && hasChildren) {
          scheduleClose(() => {
            setActivePopover(null)
          })
        }
      }}
    >
      {item.icon && (
        <item.icon className={cn("h-5 w-5 transition-all duration-100 flex-shrink-0", isOpen ? "mr-3" : "")} />
      )}
      {isOpen && (
        <>
          <span className="transition-opacity duration-100 flex-1">{item.title}</span>
          {hasChildren && (
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-100", isExpanded ? "rotate-180" : "")} />
          )}
        </>
      )}
    </div>
  )

  return (
    <div>
      {item.href ? (
        <Link href={item.href} onClick={onMenuClick}>
          <MenuContent />
        </Link>
      ) : (
        <MenuContent />
      )}

      {/* 접힘 상태에서만 popover 렌더 */}
      {!isOpen && renderCollapsedPopovers()}

      {hasChildren && isExpanded && isOpen && level < 2 && (
        <div className="mt-1 space-y-1">
          {item.children?.map((child: MenuItem, index: number) => (
            <MenuItem
              key={index}
              item={child}
              level={(level + 1) as 0 | 1 | 2}
              isOpen={isOpen}
              activePopover={activePopover}
              setActivePopover={setActivePopover}
              onMenuClick={onMenuClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Sidebar = memo(function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [activePopover, setActivePopover] = useState<string | null>(null)
  const [selectedBusiness, setSelectedBusiness] = useState<string>("")
  const { showLoader } = useLoader()

  /**
   * 메뉴 클릭 시 로더 표시 (최적화된 버전)
   * - 로더 표시 시간을 1초에서 200ms로 단축
   * - 빠른 페이지 전환을 위한 최소한의 로더 표시
   */
  const handleMenuClick = useCallback(() => {
    showLoader(200) // 200ms간 로더 표시 (성능 개선)
  }, [showLoader])

  // 사업 선택 상태를 localStorage에서 로드하거나 기본값 설정
  useEffect(() => {
    const loadBusinessSelection = () => {
      try {
        if (typeof window !== "undefined") {
          const saved = localStorage.getItem("selectedBusiness")
          if (saved && businessOptions.find(option => option.value === saved)) {
            setSelectedBusiness(saved)
          } else {
            setSelectedBusiness("") // 기본값: "-사업-"
          }
        }
      } catch (error) {
        console.warn("Failed to load business selection:", error)
        setSelectedBusiness("")
      }
    }

    loadBusinessSelection()
  }, [])

  // 사업 선택값 저장
  const handleBusinessChange = (value: string) => {
    setSelectedBusiness(value)
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedBusiness", value)
      }
    } catch (error) {
      console.warn("Failed to save business selection:", error)
    }
  }

  return (
    <div
      className={cn(
        "c-sidebar flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-150 ease-in-out relative shadow-sm",
        isOpen ? "c-sidebar--expanded w-64 min-w-64" : "c-sidebar--collapsed w-16 min-w-16"
      )}
      style={{ zIndex: 10, overflow: "visible" }}
    >
      {/* 텍스트 데코 제거 */}
      <style jsx>{`
        a { text-decoration: none !important; }
        a:hover { text-decoration: none !important; }
        a:focus { text-decoration: none !important; }
        a:active { text-decoration: none !important; }
        a:visited { text-decoration: none !important; }
      `}</style>

      <div className={cn("flex h-16 items-center justify-between border-b border-gray-200", isOpen ? "pl-4 pr-2" : "px-2")}>
        {isOpen ? (<div className="flex items-center h-16">
          <Link href="/published" onClick={handleMenuClick}>
            <Image
              src="/images/logo.png"
              alt="나이스 인프라"
              width={120}
              height={18}
              style={{ height: 18, width: "auto", display: "block", maxHeight: "18px", cursor: "pointer" }}
            />
          </Link>
        </div>
        ) : null}
        <SidebarToggle isOpen={isOpen} onToggle={onToggle} />
      </div>

      <nav className={cn("flex-1 space-y-1 px-2 py-4", isOpen ? "overflow-y-auto overflow-x-hidden" : "overflow-visible")}
        style={!isOpen ? { overflow: "visible" } : undefined}
      >
        {sidebarItems.map((item, index) => (
          <MenuItem key={`menu-${index}`} item={item} isOpen={isOpen} activePopover={activePopover} setActivePopover={setActivePopover} onMenuClick={handleMenuClick} />
        ))}
      </nav>

      <div
        className={cn(
          "flex gap-0 border-t border-gray-200 mt-auto sticky bottom-0 bg-white",
          isOpen ? "flex items-center justify-between p-2" : "flex flex-col items-center justify-center space-y-2 p-4"
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
              <UserIcon className="h-5 w-5 text-gray-600" />
            </div>
          ) : (
            <Tooltip title="홍길동 / 소속부서명 정보" placement="right" arrow>
              <div className="h-8 w-8 rounded-full bg-gray-100 hover:bg-gray-100 flex items-center justify-center flex-shrink-0">
                <UserIcon className="h-5 w-5 text-gray-600" />
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
              console.log("로그아웃 클릭")
            }}
            className={cn(
              "text-gray-600 p-4 flex-shrink-0",
              isOpen ? "hover:text-gray-600 hover:bg-gray-100" : "bg-gray-100 hover:bg-gray-100"
            )}
          >
            <LogOut className="h-5 w-5 text-gray-600" />
          </IconButton>
        </Tooltip>
      </div>

      {/* 사업 선택 영역 */}
      {isOpen && (
        <div className="p-3 pt-0 bg-white">
          <FormControl size="small" fullWidth>
            <Select
              value={selectedBusiness}
              onChange={(e) => handleBusinessChange(e.target.value)}
              displayEmpty
              sx={{
                fontSize: '13px',
                height: '32px',
                '& .MuiSelect-select': {
                  padding: '6px 12px',
                  fontSize: '13px'
                }
              }}
            >
              <MuiMenuItem value="" disabled>
                <span>--사업--</span>
              </MuiMenuItem>
              {businessOptions.map((option) => (
                <MuiMenuItem key={option.value} value={option.value} sx={{ fontSize: '12px' }}>
                  {option.label}
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}

      {isOpen && (
        <div className="p-4 space-y-3 mt-auto pt-0 sticky bottom-0 bg-white">
          <p className="text-[11px] text-gray-400 text-center" style={{ lineHeight: "14px" }}>
            Copyright(c) NICE Infra Service.<br />
            All Rights Reserved.
          </p>
        </div>
      )}
    </div>
  )
})

export { Sidebar }

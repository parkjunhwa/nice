import { ReactNode } from 'react'

interface LoginLayoutProps {
  children: ReactNode
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  // 로그인 페이지는 독립적인 레이아웃을 사용
  // DashboardLayout을 사용하지 않고 children을 직접 반환
  return <>{children}</>
}

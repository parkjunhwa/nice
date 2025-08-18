import type { Metadata } from "next";
import "./globals.scss";
import { MuiThemeProvider } from "@/components/mui-theme-provider";

export const metadata: Metadata = {
  title: "대시보드 - Next.js",
  description: "Next.js로 구축된 현대적인 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  );
}

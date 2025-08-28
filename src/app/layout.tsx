import type { Metadata } from "next";
import "./globals.scss";
import { MuiThemeProvider } from "@/components/mui-theme-provider";

export const metadata: Metadata = {
  title: "NICE정신시스템",
  description: "나이스인프라 정산시스템",
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

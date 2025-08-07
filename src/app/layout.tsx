import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Family Soo Studio - 소중한 순간을 사진으로",
  description: "가족사진, 리마인드웨딩, 베이비 촬영 전문 스튜디오. 따뜻한 감성으로 담는 소중한 순간들",
  keywords: "가족사진, 리마인드웨딩, 베이비 촬영, 스튜디오, 사진촬영",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

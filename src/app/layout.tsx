import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import ReactQueryProvider from "./ReactQueryProvider";

export const metadata: Metadata = {
  title: "어디가지🍆",
  description: "자랑하고 싶은 숨은 명소들, 함께 즐기고 싶은 특별한 장소들을 공유하는 지도 기반의 소셜 플랫폼 입니다!"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <html lang="ko">
        <body>
          <Header />
          <main className="max-w-[1200px] mx-auto w-[90%]">{children}</main>
          <Footer />
          <Script
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
            strategy="beforeInteractive"
          />
        </body>
      </html>
    </ReactQueryProvider>
  );
}

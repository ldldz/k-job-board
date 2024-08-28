import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

import { GoogleAnalytics } from "@next/third-parties/google";
import { NavBar } from "./components";

const pretendard = localFont({
  src: "../static/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "CareerLib",
  description: "Job board of korean start-up ",
  openGraph: {
    title: "CareerLib - 스타트업 채용 공고를 모아서 보여주는 플랫폼",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <NavBar />
        {children}
        <footer className="mt-12 border-t border-gray-200 bg-gray-100">
          <div className="container mx-auto max-w-5xl px-4 py-8">
            <div className="text-center text-sm text-gray-500">
              <p>&copy; 2024 CareerLib. All rights reserved.</p>
              <div className="mt-2">
                <a
                  href="https://forms.gle/q5Ng5J2bjZSN3bjL9"
                  className="mx-2 text-gray-600 hover:text-gray-900"
                >
                  문의하기
                </a>
              </div>
            </div>
          </div>
        </footer>
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
      </body>
    </html>
  );
}

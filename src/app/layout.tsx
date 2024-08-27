import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "./login/actions";
import { LogOut } from "lucide-react";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/">
              <h1 className="text-2xl font-semibold text-gray-900">Career Lib</h1>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user.user_metadata.avatar_url}
                      alt={user.user_metadata.name}
                    />
                    <AvatarFallback>{user.user_metadata.name}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <Link href="/my">
                    <DropdownMenuItem>
                      <span>마이페이지</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <form className="inline-flex" action={signOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <button type="submit">로그아웃</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
                >
                  로그인
                </Button>
              </Link>
            )}
          </div>
        </header>
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

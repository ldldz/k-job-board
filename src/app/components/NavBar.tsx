import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "../login/actions";

export default async function NavBar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold text-gray-900">Career Lib</h1>
        </Link>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.name} />
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
  );
}

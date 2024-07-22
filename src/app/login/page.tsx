import { Button } from "@/components/ui/button";
import { signIn, signOut } from "./actions";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LoginPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96">
        {!data.user ? (
          <>
            <CardHeader>
              <CardTitle>로그인</CardTitle>
              <CardDescription>Careerlib에 로그인하고 채용 정보를 받아보세요!</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <form>
                <Button className="bg-yellow-300 text-black" formAction={signIn}>
                  카카오로 로그인
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <CardContent className="flex justify-center p-6">
            <form>
              <Button formAction={signOut}>로그아웃</Button>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

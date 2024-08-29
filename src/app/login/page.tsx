import { Button } from "@/components/ui/button";
import { signIn } from "./actions";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();

  if (data.user) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96">
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
      </Card>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getBookmarkedJobPosts } from "@/actions/jobPosts";
import { cn, formatDateToKorean } from "@/lib/utils";
import BookmarkButton from "@/components/BookmarkButton";
import Link from "next/link";
import { Tables } from "@/lib/supabase/types";
import { AlertCircle } from "lucide-react";

export default async function MyPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { avatar_url, name, email } = user.user_metadata;
  const bookmarkedJobPosts: Tables<"job_post_details">[] = await getBookmarkedJobPosts();

  return (
    <>
      <Section title="사용자 정보">
        <UserInfoCard avatar_url={avatar_url} name={name} email={email} />
      </Section>
      <Section title="북마크한 채용공고">
        <BookmarkedJobList jobPosts={bookmarkedJobPosts} />
      </Section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className="py-4 text-2xl font-semibold text-gray-900">{title}</h2>
      {children}
    </>
  );
}

function UserInfoCard({
  avatar_url,
  name,
  email,
}: {
  avatar_url: string;
  name: string;
  email: string;
}) {
  return (
    <Card className="mb-8">
      <CardContent className="flex items-center space-x-4 p-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatar_url} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function BookmarkedJobList({ jobPosts }: { jobPosts: Tables<"job_post_details">[] }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-2 sm:p-6">
        {jobPosts.map((post) => (
          <JobPostCard key={post.id} {...post} />
        ))}
      </CardContent>
    </Card>
  );
}

function JobPostCard({
  id,
  title,
  company_name,
  due_date,
  url,
  is_expired,
}: Tables<"job_post_details">) {
  return (
    <Card
      className={cn(
        "relative",
        !is_expired && "transition-shadow duration-200 last:mb-0 hover:shadow-md",
      )}
    >
      <div className={is_expired ? "opacity-50" : ""}>
        <Link href={is_expired ? "" : (url as string)}>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{company_name}</p>
            {due_date && (
              <p className="text-xs text-gray-500">
                마감일: {formatDateToKorean(new Date(due_date))}
              </p>
            )}
            {is_expired && (
              <p className="mt-1 flex items-center text-xs text-red-500">
                <AlertCircle className="mr-1 h-3 w-3" />
                만료된 공고입니다.
              </p>
            )}
          </CardContent>
        </Link>
      </div>
      <BookmarkButton key={id} jobPostID={id as string} isBookmarked={true} />
    </Card>
  );
}

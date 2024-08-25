import { Card } from "@/components/ui/card";
import { formatDateToKorean } from "@/lib/utils";
import { Tables } from "@/types/supabase";
import BookmarkButton from "@/components/BookmarkButton";

type JobCardProps = Tables<"job_post_details"> & { isBookmarked: boolean };

export default function JobCard({
  id,
  company_name,
  due_date,
  title,
  url,
  isBookmarked,
  signing_bonus,
}: JobCardProps) {
  return (
    <Card className="relative p-2">
      <a className="flex justify-between" href={url || "/"} target="_blank">
        <div className="flex flex-col gap-1 p-2">
          <div className="flex gap-2">
            <div className="text-sm">{company_name}</div>
            {signing_bonus && (
              <div className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                입사 축하금 {(signing_bonus / 10000).toFixed(0)}만원
              </div>
            )}
          </div>
          <h3 className="pb-2 text-lg font-semibold">{title}</h3>
        </div>
        {due_date && (
          <div className="self-center p-2 text-sm">
            {formatDateToKorean(new Date(due_date))}까지
          </div>
        )}
      </a>
      {/* TODO: postgresql의 view에 not null이 적용되지 않아 id type에 null이 허용됨 */}
      <BookmarkButton key={+isBookmarked} isBookmarked={isBookmarked} jobPostID={id as string} />
    </Card>
  );
}

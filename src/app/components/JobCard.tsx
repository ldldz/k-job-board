import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { Job } from "@/lib/definitions";

import { formatDateToKorean } from "@/lib/utils";
import { Tables } from "@/types/supabase";

export default function JobCard({
  category,
  company_id,
  created_at,
  due_date,
  id,
  title,
  updated_at,
  url,
}: Tables<"job_posts">) {
  return (
    <Card className="p-2">
      <a className="flex flex-row justify-between" href={url} target="_blank">
        <div className="flex flex-col gap-1 p-2">
          <div className="text-sm">{company_id}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <ul className="flex gap-1">
            <li>
              <Badge variant="outline">{category}</Badge>
            </li>
          </ul>
        </div>
        {due_date && (
          <div className="self-center p-2 text-sm">
            {formatDateToKorean(new Date(due_date))}까지
          </div>
        )}
      </a>
    </Card>
  );
}

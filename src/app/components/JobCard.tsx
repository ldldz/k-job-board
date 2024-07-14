import { Badge } from "@/components/badge";
import { Card } from "@/components/card";
import { Job } from "@/lib/definitions";

import { formatDateToKorean } from "@/lib/utils";

export default function JobCard({
  company,
  title,
  employmentType,
  dueDate,
  url,
}: Job) {
  return (
    <Card className="p-2">
      <a className="flex flex-row justify-between" href={url} target="_blank">
        <div className="flex flex-col gap-1 p-2">
          <div className="text-sm">{company}</div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <ul className="flex gap-1">
            <li>
              <Badge variant="outline">{employmentType}</Badge>
            </li>
          </ul>
        </div>
        {dueDate && (
          <div className="self-center p-2 text-sm">
            {formatDateToKorean(dueDate)}까지
          </div>
        )}
      </a>
    </Card>
  );
}

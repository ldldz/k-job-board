"use client";

import { deleteBookmark, insertBookmark } from "@/lib/data";
import { Bookmark } from "lucide-react";
import { useState } from "react";

export default function BookmarkButton({
  jobPostID,
  isBookmarked: initialIsBookmarked,
}: {
  jobPostID: string;
  isBookmarked: boolean;
}) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(initialIsBookmarked);
  const toggleBookmark = async () => {
    setIsBookmarked((prev) => !prev);

    if (isBookmarked) {
      await deleteBookmark(jobPostID);
    } else {
      await insertBookmark(jobPostID);
    }
  };
  return (
    <button className="absolute right-2 top-2" onClick={toggleBookmark}>
      {isBookmarked ? <Bookmark fill="#3366ff" color="#3366ff" /> : <Bookmark />}
    </button>
  );
}

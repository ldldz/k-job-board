"use client";

import { deleteBookmark, insertBookmark } from "@/lib/data";
import { createClient } from "@/utils/supabase/client";
import { Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BookmarkButton({
  jobPostID,
  isBookmarked: initialIsBookmarked,
}: {
  jobPostID: string;
  isBookmarked: boolean;
}) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(initialIsBookmarked);
  const toggleBookmark = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

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

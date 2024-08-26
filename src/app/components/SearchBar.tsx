"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [searchParam, setSearchParam] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams();
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.push("/?" + params.toString());
  }

  return (
    <form
      className="flex w-full max-w-sm items-center space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchParam);
      }}
    >
      <Input
        type="text"
        placeholder="키워드를 검색하세요"
        onChange={(e) => {
          setSearchParam(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <Button type="submit">검색</Button>
    </form>
  );
}

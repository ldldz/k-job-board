import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <form className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="키워드를 검색하세요" />
      <Button type="submit">검색</Button>
    </form>
  );
}

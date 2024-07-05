"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useState } from "react";

const jobCategories = [
  { id: 0, name: "프론트엔드" },
  { id: 1, name: "백엔드" },
  { id: 2, name: "AI" },
  { id: 3, name: "디자인" },
  { id: 4, name: "마케팅" },
];

export default function SubscribeModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(nextIsOpen) => {
        if (nextIsOpen) {
          setEmail("");
          setSelectedCategories({});
        }
        setIsOpen(nextIsOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">채용공고 구독하기 📬</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>스타트업 채용 공고 구독하기</DialogTitle>
          <DialogDescription>
            스타트업 채용 사이트에 올라온 새로운 공고를 매주 받아보세요!
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            //TODO: 구독 정보 api POST
            setIsOpen(false);
          }}
        >
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              placeholder="abc@linkruit.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="flex gap-1">
              {jobCategories.map(({ id, name }) => (
                <Badge
                  key={id}
                  variant={selectedCategories[id] ? "default" : "outline"}
                  onClick={() => {
                    setSelectedCategories({
                      ...selectedCategories,
                      [id]: !selectedCategories[id],
                    });
                  }}
                >
                  {name}
                </Badge>
              ))}
            </div>
            <DialogFooter>
              <Button type="submit" disabled={email.length === 0}>
                구독하기
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

import Link from "next/link";
import SubscribeModal from "./SubscribeDialog";

export default function Main() {
  return (
    <main className="my-4 flex w-full flex-col items-center	">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-extrabold">
          <Link href="/">CareerLib🧑‍💻</Link>
        </h1>
        <div>스타트업의 채용공고를 한곳에서 만나보세요</div>
        <div className="mt-8">
          <SubscribeModal />
        </div>
      </div>
    </main>
  );
}

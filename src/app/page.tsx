import { ArrowRightCircleIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-9 h-screen font-bold">
      <h1>Spoon Video List</h1>

      <span className="flex items-center gap-2 border border-white p-2 rounded-lg">
        <ArrowRightCircleIcon className="w-4 h-4" />
        <Link href="/video/15000001">클릭 시 Video 페이지로 이동</Link>
      </span>
    </div>
  );
}

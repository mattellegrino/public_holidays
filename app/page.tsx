import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <Link href="/public_holidays">
        <div className="cursor-pointer bg-white rounded-xl border shadow-md p-6 transition hover:shadow-lg">
          <h2 className="text-2xl text-black font-bold mb-2 ">Public Holidays</h2>
        </div>
      </Link>
      <Link href="/accordions">
        <div className="cursor-pointer bg-white rounded-xl border shadow-md p-6 transition hover:shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Accordions</h2>
        </div>
      </Link>
      <Link href="/local_storage">
        <div className="cursor-pointer bg-white rounded-xl border shadow-md p-6 transition hover:shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Local Storage</h2>
        </div>
      </Link>
      <Link href="/memory_game">
        <div className="cursor-pointer bg-white rounded-xl border shadow-md p-6 transition hover:shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Memory Game</h2>
        </div>
      </Link>
      <Link href="/hacker_news">
        <div className="cursor-pointer bg-white rounded-xl border shadow-md p-6 transition hover:shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Hacker News</h2>
        </div>
      </Link>
    </div>
  );
}


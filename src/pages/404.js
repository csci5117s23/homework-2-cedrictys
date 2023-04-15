import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>404 - Page Not Found</h1>
      <p>Oooooops The page you are looking for does not exist.</p>
      <Link
        href={"/todos"}
        className="text-center bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Check todos
      </Link>
    </main>
  );
}

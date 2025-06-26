
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>JD&apos;s Diary</h1>
			<p> Welcome to my blog site! Please feel free to explore.</p>
      <nav>
        <Link href="/about">About Page</Link> |
        <Link href="/blog"> Go to Blog Page</Link>
      </nav>
    </>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>JD&apos;s Diary</h1>
      <p> Welcome to my blog site! Please feel free to explore.</p>
      <Link href="/blog">See all posts</Link> | 
      <Link href="/about">About Page</Link>
    </>
  );
}

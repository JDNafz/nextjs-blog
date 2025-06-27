import Link from "next/link";
import Login from "../components/Login";

export default function Home() {
  return (
    <>
      <h1>JD&apos;s Diary</h1>
      <p> Welcome to my blog site! Please feel free to explore. Make sure to login to leave comments.</p>
      <Link href="/blog">See all posts</Link> |<Link href="/about">About Page</Link>
      <Login />
    </>
  );
}

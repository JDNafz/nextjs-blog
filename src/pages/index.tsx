import Link from "next/link";
import Login from "../components/Login";

export default function Home() {
  return (
    <>
      <h1>JD&apos;s Diary</h1>
      <h3> Welcome to my blog site! Please feel free to explore.</h3>
      <h3> Make sure to login to leave comments.</h3>
      <Login />
      <div className="footer">
        <Link href="/blog">See all posts</Link> | <Link href="/about">About Page</Link>
      </div>
    </>
  );
}

import { useUser } from "@/context/UserProvider";
import Link from "next/link";
import { useEffect } from "react";
import Login from "../components/Login";

export default function Home() {
  const { loggedInUser, setLoggedInUser } = useUser();
  const dummy = {
    id: "alibby",
    name: "Alex",
    email: "alexrules@gmail.com",
    password: "alex",
  };

  useEffect(() => {
    console.log(loggedInUser);
  }, [loggedInUser]);

  return (
    <>
      <h1>JD&apos;s Diary</h1>
      <p> Welcome to my blog site! Please feel free to explore.</p>
      <button onClick={() => setLoggedInUser(dummy)}>Login </button>
      <Login />
      <Link href="/blog">See all posts</Link> |<Link href="/about">About Page</Link>
    </>
  );
}

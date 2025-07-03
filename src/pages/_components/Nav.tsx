import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <Link href="/">Go to Home Page</Link> | <Link href="/contact">Go to Contact Page</Link> |{" "}
      <Link href="/blog"> Go to Blog Page</Link>
    </nav>
  );
}

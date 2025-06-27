import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page</p>
      {/* Navigation links */}
      <nav>
        <Link href="/">Go to Home Page</Link> |  {" "}
        <Link href="/contact">Go to Contact Page</Link> | {" "}
				<Link href="/blog"> Go to Blog Page</Link>
      </nav>
    </div>
  );
}

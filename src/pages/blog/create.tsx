import { useUser } from "@/context/UserProvider";
import { Post } from "@/lib/interfaces/PostInterface";
import { useState } from "react";
import Nav from "../_components/Nav";

type FormState = {
  title: "";
  slug: "";
  body: "";
};

export default function CreatePost() {
  const { loggedInUser } = useUser();
  const [form, setForm] = useState<FormState>({
    title: "",
    slug: "",
    body: "",
  });

  if (loggedInUser === null) {
    return <div>Must be logged in to submit a new Post</div>;
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.body.trim() === "" || form.title.trim() === "" || form.slug.trim() === "") {
      return;
    }

    const postSubmission: Omit<Post, "id"> = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      body: form.body.trim(),
			authorId: loggedInUser.id
    };
    try {
      const res = await fetch("/api/posts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postSubmission }),
      });
      if (!res.ok) {
				throw new Error("Failed to POST blog post")
      }
      // route.push(/blog);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown Error handlePOST";
      return Response.json({ success: false, error: errorMessage }, { status: 500 });
    }
  };
  return (
    <div className="form-container">
      <h1>Submit Blog Post</h1>

      <form id="blogForm" onSubmit={handleSubmit}>
        <div className="meta-info">
          <div className="meta-item">
            <span className="meta-label">Author: </span>
            <span className="meta-value" id="authorName">
              {loggedInUser.name}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Date: </span>
            <span className="meta-value" id="submissionTime">
              {today}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Blog Post Title: </label>
          <input
            onChange={handleChange}
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter your blog post title..."
          />
        </div>
        <div className="form-group">
          <label>Slug: </label>
          <input
            onChange={handleChange}
            type="text"
            id="slug"
            name="slug"
            required
            placeholder="Enter your slug here..."
          />
        </div>

        <div className="form-group">
          <label>Content: </label>
          <textarea
            onChange={handleChange}
            id="body"
            name="body"
            required
            placeholder="Write your blog post content here..."
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Submit Post
        </button>
      </form>

      <div className="success-message" id="successMessage">
        <h3>🎉 Blog Post Submitted Successfully!</h3>
        <p>Your post has been saved and will be reviewed shortly.</p>
      </div>
      <Nav />
    </div>
  );
}

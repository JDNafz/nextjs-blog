import { BlogComment } from "@/lib/interfaces/Comment";
import React, { useEffect, useState } from "react";
import { ReactFormState } from "react-dom/client";

interface CommentProps {
  slug: string;
}

const Comment: React.FC<CommentProps> = ({ slug }) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  //TODO: const { loggedInUser } = useUser(); // is that right?

  useEffect(() => {
    const fetchComments = async () => {
      const res = await fetch(`http://localhost:5000/comments?slug=${slug}`).then((res) =>
        res.json()
      );
      setComments(res);
    };
    fetchComments();
    console.log("Comments component mounted");
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentSubmission: BlogComment = {
      id: `${comments.length + 1}`,
      slug: slug,
      userId: "1", //TODO use context get logged in user
      content: newComment,
      timestamp: new Date().toISOString(),
    };
    setComments((prev) => [...prev, commentSubmission]);
    const res = await fetch(`http://localhost:5000/comments`, {
      method: "POST",
      body: JSON.stringify(commentSubmission),
    });
    if (!res.ok) {
      throw new Error(`Error POST comment`);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        <textarea rows={4} cols={60} onChange={(e) => setNewComment(e.target.value)}></textarea>
        <button>Submit</button>
      </form>
      {comments.length === 0 ? (
        <div>No Comments yet...</div>
      ) : (
        comments.map((comment) => {
          return (
            <li key={comment.id} className="comment">
              {comment.userId}: {comment.content}
            </li>
            // comment.timestamp
          );
        })
      )}
    </div>
  );
};

export default Comment;

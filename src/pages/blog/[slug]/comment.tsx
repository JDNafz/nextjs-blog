import { useUser } from "@/context/UserProvider";
import { BlogComment } from "@/lib/interfaces/Comment";
import React, { useEffect, useState } from "react";

interface CommentProps {
  slug: string;
}

const Comment: React.FC<CommentProps> = ({ slug }) => {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { loggedInUser } = useUser();

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     const res = await fetch(`http://localhost:5000/comments?slug=${slug}`).then((res) =>
  //       res.json()
  //     );
  //     setComments(res);
  //   };
  //   fetchComments();
  //   console.log("Comments component mounted");
  // }, [slug]);

useEffect(() => {
  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?slug=${slug}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
    fetchComments();
}, [slug]);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentSubmission: Omit<BlogComment, "id"> = {
      slug: slug,
      userId: loggedInUser ? loggedInUser.id : "anonymous",
      author: loggedInUser ? loggedInUser.name : "anonymous",
      content: newComment,
      timestamp: new Date().toISOString(),
    };
    const res = await fetch(`http://localhost:5000/comments`, {
      method: "POST",
      body: JSON.stringify(commentSubmission),
    });
    if (!res.ok) {
      throw new Error(`Error POST comment`);
    }
    const resComment: BlogComment = await res.json();
    setComments((prev) => [...prev, resComment]);
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        {loggedInUser && `Logged in as ${loggedInUser?.name}`}

        <textarea
          disabled={ loggedInUser ? false: true}
					placeholder={ loggedInUser ? "" : "Please login to comment."}
          rows={4}
          cols={60}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button>Submit</button>
      </form>
      {comments.length === 0 ? (
        <div>No Comments yet...</div>
      ) : (
        comments.map((comment) => {
          return (
            <li key={comment.id} className="comment">
              {comment.author ? comment.author : "Anonymous"}: {comment.content}
            </li>
            // comment.timestamp
          );
        })
      )}
    </div>
  );
};

export default Comment;

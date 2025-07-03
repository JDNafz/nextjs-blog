import { useUser } from "@/context/UserProvider";
import { Comment } from "@/lib/interfaces/Comment";
import React, { useEffect, useState } from "react";

interface CommentProps {
  postId: number;
}
interface CommentDisplay extends Comment {
  author: string;
}

const CommentComponent: React.FC<CommentProps> = ({ postId }) => {
  const [comments, setComments] = useState<CommentDisplay[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const { loggedInUser } = useUser();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?post_id=${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loggedInUser === null) {
      alert("Must be logged in to Comment");
    } else {

      const commentSubmission: Omit<Comment, "id"> = {
        postId: postId,
        authorId: loggedInUser.id,
        content: newComment,
        createdAt: new Date().toISOString(),
      };
			console.log(loggedInUser);
      const res = await fetch(`/api/comments`, {
        method: "POST",
        body: JSON.stringify(commentSubmission),
      });
      if (!res.ok) {
        throw new Error(`Error in /api/comments ~ POST`);
      }
      const resComment: CommentDisplay = await res.json();
      const displayComment = { ...resComment, author: loggedInUser.name };
      setComments((prev) => [...prev, displayComment]);
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={handleSubmit}>
        {loggedInUser && `Logged in as ${loggedInUser?.name}`}

        <textarea
          disabled={loggedInUser ? false : true}
          placeholder={loggedInUser ? "" : "Please login to comment."}
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

export default CommentComponent;

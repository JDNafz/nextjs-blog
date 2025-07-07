import { useUser } from "@/context/UserProvider";
import { Comment } from "@/lib/interfaces/Comment";
import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";

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
        const res = await fetch(`/api/comments?post_id=${postId}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const payload = await res.json();
        const comments = payload.data;
        setComments(comments || []);
        console.log(comments.reverse());
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
      return;
    }
		if (newComment === ""){
			//apply css to indicate it was blank //TODO
			return;
		}
    try {
      const commentSubmission: Omit<Comment, "id"> = {
        postId: postId,
        authorId: loggedInUser.id,
        content: newComment,
        createdAt: new Date().toISOString(),
      };
      const res = await (
        await fetch(`/api/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentSubmission),
        })
      ).json();
      const resComment: CommentDisplay = res.data;

      const displayComment = { ...resComment, author: loggedInUser.name };

      setComments((prev) => [...prev, displayComment]);
    } catch (err) {
      throw new Error("Error Posting comment: " + err);
    }
  };

  return (
    <div>
      <h2>Comments</h2>

      <form className={styles.commentForm} onSubmit={handleSubmit}>
        {loggedInUser && `Leave a comment as ${loggedInUser?.name}`}

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

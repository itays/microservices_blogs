import React from "react";

type CommentsProps = {
  comments: Comment[];
};

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const list =
    (comments &&
      Object.values(comments).map((comment: any) => {
        let content;
        switch (comment.status) {
          case "approved":
            content = comment.content;
            break;
          case "pending":
            content = "this comment is awaiting moderation";
            break;
          case "rejected":
            content = "this comment has been rejected";
        }
        return <li key={comment.id}>{content}</li>;
      })) ||
    null;
  return <ul>{list}</ul>;
};

export default Comments;

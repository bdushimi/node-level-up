import React from "react";

export default function CommentList({ comments }) {
  const renderedComments =
    comments.length > 0
      ? comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>;
        })
      : "";

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
}

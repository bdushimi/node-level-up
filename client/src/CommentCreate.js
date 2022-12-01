import React, { useState } from "react";
import axios from "axios";

export default function CommentCreate({ postId }) {

  const [content, setContent] = useState("");

  const onSubmit = async(event) => {
    event.preventDefault()
    await axios.post(`http://localhost:5050/posts/${postId}/comments`,{
        content
    })
    setContent('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div class="form-group">
        <label>New Comment</label>
        <input
          type="text"
          class="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  );
}

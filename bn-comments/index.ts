import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: any = {};

app.get("/posts/:id/comments", (req: any, res: any) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req: any, res: any) => {
  const postId = req.params.id;

  const { content } = req.body;

  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content: content, status: "pending" });

  commentsByPostId[postId] = comments;

  // sends event to the events bus
  await axios
    .post("http://event-clusterip-srv:4003/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId,
        status: "pending",
      },
    })
    .catch((error) => {
      console.log("Error : ", error.message);
    });

  res.status(201).send(commentsByPostId[postId]);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body.event;
  console.log("Received event", type);

  if (type === "CommentModerated") {
    commentsByPostId[data.postId].map((comment: any) => {
      if (comment.id === data.id) {
        comment.status = data.status;
      }

      return comment;
    });

    await axios
      .post("http://event-clusterip-srv:4003/events", {
        type: "CommentUpdated",
        data,
      })
      .catch((error) => {
        console.log("Error : ", error.message);
      });
  }
  res.send({});
});

app.listen(4002, () => {
  console.log("comments service listens on port 4002");
});

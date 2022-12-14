import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";


const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: any = {};

const handleEvent = (event: any) => {
  const { type, data } = event;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = {
      id,
      title,
      comments: [],
    };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const tempPost = posts[postId];

    tempPost.comments.push({ id, content, status });
  } else if (type === "CommentUpdated") {
    const { postId, status, id } = data;

    posts[postId].comments.map((comment: any) => {
      if (comment.id === id) {
        comment.status = status;
      }

      return comment;
    });
  }
};

app.post("/events", (req, res) => {
  const { event } = req.body;

  handleEvent(event);

  res.send({ status: "OK" });
});

//@ts-ignore
app.get("/events", (req, res) => {
  res.send(posts);
});

app.listen(4005, async () => {
  console.log("listening on port 4005");

  // Make a request to the event bus to get events that this service might have missed out when it was offline

  const res = await axios.get('http://event-clusterip-srv:4003/events')
  for (let event of res.data){
    console.log('Processing event: ', event.type)
    handleEvent(event)
  }

});

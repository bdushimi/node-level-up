import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: any = {};

app.post("/events", (req, res) => {
  const { type, data } = req.body.event;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = {
      id,
      title,
      comments: [],
    };
  } else if (type === "CommentCreated") {

    const {id, content, postId, status} = data

    const tempPost = posts[postId]

    tempPost.comments.push({id, content, status})
     
  }else  if ( type === "CommentUpdated"){
    
    const { postId, status,  id} = data

    posts[postId].comments.map((comment : any)=> {

      if(comment.id === id){
        comment.status = status
      }

      return comment

    })
  }

  console.log("posts", posts)

  res.send({status: 'OK'})
});

//@ts-ignore
app.get("/events", (req, res) => {
    
    res.send(posts)
});

app.listen(4005, () => {
  console.log("listening on port 4005");
});

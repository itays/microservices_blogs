import express from "express";
import { Post } from "./types";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const posts: Record<string, Post> = {};

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body.event;
  handleEvent(type, data);
  console.log(posts);
  res.sendStatus(200);
});

app.listen(4002, async () => {
  console.log("V1.0.1");
  console.log("Listening on 4002");
  try {
    const res = await axios.get("http://event-bus-srv:4005/events");

    for (const event of res.data) {
      console.log("processing event:", event.type);
      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});

function handleEvent(type: string, data: any) {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);
    if (!comment) return;
    comment.status = status;
    comment.content = content;
  }
}

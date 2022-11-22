import express from "express";
import { randomBytes } from "crypto";
import { Comment } from "./types";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId: Record<string, Comment[]> = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;

  // notify event bus
  axios
    .post("http://event-bus-srv:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        postId: req.params.id,
        content,
        status: "pending",
      },
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body.event;
  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    if (!comment) return;
    comment.status = status;
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: { id, postId, status, content },
    });
  }

  res.sendStatus(200);
});

app.listen(4001, () => {
  console.log("V1.0.2");
  console.log("Listening on 4001");
});

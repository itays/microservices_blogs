import express from "express";
import { randomBytes } from "crypto";
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

app.post("/posts/create", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  // notify event bus
  axios
    .post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: { id, title },
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event);

  res.sendStatus(200);
});

app.listen(4000, () => {
  console.log("V1.0.8");
  console.log("Listening on 4000");
});

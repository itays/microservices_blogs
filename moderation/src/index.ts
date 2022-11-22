import express from "express";

import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body.event;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.sendStatus(200);
});

app.listen(4003, () => {
  console.log("V1.0.1");
  console.log("Listening on 4003");
});

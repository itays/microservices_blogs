import express from "express";
import axios from "axios";
import cors from "cors";

const postService = "http://posts-clusterip-srv:4000/events";
const commentsService = "http://comments-srv:4001/events";
const queryService = "http://query-srv:4002/events";
const moderationService = "http://moderation-srv:4003/events";

const app = express();
app.use(express.json());
app.use(cors());

const events: any[] = [];

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post(postService, {
    event,
  });
  axios.post(commentsService, {
    event,
  });
  axios
    .post(queryService, {
      event,
    })
    .catch((err) => {
      console.error(err);
    });
  axios.post(moderationService, {
    event,
  });

  res.send({ status: "OK" });
});

app.get("/events", (_, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log(`V1.0.3`);
  console.log("Listening on 4005");
});

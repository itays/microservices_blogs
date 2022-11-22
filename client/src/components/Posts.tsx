import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CommentCreate from "./CommentCreate";
import Comments from "./Comments";

const Posts: React.FC<any> = () => {
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await fetch("http://posts.com/posts").then((res) =>
          res.json()
        );
        setPosts(posts);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPosts();
  }, []);

  const list =
    (posts &&
      Object.values(posts).map(({ id, title, comments }: any) => {
        return (
          <Grid key={id} item xs={12} md={6}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {title}
                </Typography>
                <br />
                <Comments comments={comments} />
                <CommentCreate postId={id} />
              </CardContent>
            </Card>
          </Grid>
        );
      })) ||
    null;
  return (
    <Grid container spacing={4}>
      {list}
    </Grid>
  );
};

export default Posts;

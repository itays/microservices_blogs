import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

type CommentCreateProp = {
  postId: string;
};

const CommentCreate: React.FC<CommentCreateProp> = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await fetch(`http://posts.com/posts/${postId}/comments`, {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const created = await res.json();
      console.log(created);
      setContent("");
    },
    [content, postId]
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="new comment"
            required
            fullWidth
            id="new-comment"
            label="New Comment"
            value={content}
            onChange={onChange}
            autoFocus
          />
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Button type="submit" fullWidth variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommentCreate;

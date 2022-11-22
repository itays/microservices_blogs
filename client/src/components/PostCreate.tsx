import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const PostCreate: React.FC<any> = () => {
  const [title, setTitle] = useState("");
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const res = await fetch(`http://posts.com/posts/create`, {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const created = await res.json();
      console.log(created);
      setTitle("");
    },
    [title]
  );
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            name="title"
            required
            fullWidth
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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

export default PostCreate;

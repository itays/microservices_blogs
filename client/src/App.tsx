import React from "react";
import AppBar from "./components/AppBar";
import PostCreate from "./components/PostCreate";
import Divider from "@mui/material/Divider";
import Posts from "./components/Posts";

function App() {
  return (
    <>
      <AppBar />
      <main>
        <h1>Create Post!</h1>
        <PostCreate />
        <br />
        <Divider />
        <br />
        <Posts />
      </main>
    </>
  );
}

export default App;

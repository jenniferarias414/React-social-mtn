import express from "express";
import ViteExpress from "vite-express";
import {addPost, getAllPosts, getCurrentUserPosts, editPost, deletePost} from './controllers/posts.js';
import {register, login} from './controllers/auth.js';
import { isAuthenticated } from "./middleware/isAuthenticated.js";

const app = express();
app.use(express.json());

app.post('/register', register);
app.post('/login', login);

app.get('/posts', getAllPosts);

app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);

// app.get("/hello", (req, res) => {
//   res.send("Hello Vite + React!");
// });

ViteExpress.listen(app, 4004, () =>
  console.log("Server is listening on port 4004..."),
);

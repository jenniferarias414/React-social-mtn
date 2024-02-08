import express from "express";
import ViteExpress from "vite-express";
import {addPost, getAllPosts, getCurrentUserPosts, editPost, deletePost} from './controllers/posts.js';
import {register, login} from './controllers/auth.js';
import { isAuthenticated } from "./middleware/isAuthenticated.js";
import {sequelize} from './util/database.js';
import {User} from './models/user.js';
import {Post} from './models/post.js';

const app = express();
app.use(express.json());

User.hasMany(Post);
Post.belongsTo(User);

app.post('/register', register);
app.post('/login', login);

app.get('/posts', getAllPosts);

app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);

sequelize
  .sync() // the force: true is for development -- it DROPS tables!!!
  // you can use it if you like while you are building.
  // sequelize.sync({ force: true })
  .then(() => {
    ViteExpress.listen(app, 4004, () => {
      console.log("Server is listening on port 4004...");
    });
  })
  .catch((error) => {
    console.error("unable to sync the db", error);
  });


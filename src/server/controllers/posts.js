import {Post} from '../models/post.js';
import {User} from '../models/user.js';


export const addPost = async (req, res) => {
  try {
    const { title, content, status, userId } = req.body;
    await Post.create({ title, content, privateStatus: status, userId });
    res.sendStatus(200);
  } catch (err) {
    console.log('error in getCurrentUserPosts');
    console.log(err)
    res.status(400).send(err);
  }
  // console.log('addPost')
};

//This code fetches all posts from the database that are not marked as private and includes the username of the user who authored each post.
export const getAllPosts = async (req, res) => {
  // console.log('getAllPosts')
  // res.sendStatus(200)
  try {
    const posts = await Post.findAll({
      //queries the database to find all posts using the Post model. It uses the findAll method provided by Sequelize ORM
      where: { privateStatus: false }, //query condition to only return 'public posts'
      include: [  //joins the User model with the Post model based on association
        {
          model: User,
          required: true,
          attributes: [`username`], //allows retrieving 'username' attribute of the user who authorized the post
        },
      ],
    });
    res.status(200).send(posts); //sends an array of post objects retrieved from the db
  } catch (error) {
    console.log("ERROR IN getAllPosts");
    console.log(error);
    res.sendStatus(400);
  }
};

export const getCurrentUserPosts = async (req, res) => {
  // console.log('getCurrentUserPosts')
  // res.sendStatus(200)
  try {
    const { userId } = req.params;
    const posts = await Post.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          required: true,
          attributes: [`username`],
        },
      ],
    });
    res.status(200).send(posts);
  } catch (error) {
    console.log("error in getCurrentUserPosts");
    console.log(error);
    res.sendStatus(400);
  }
}

export const editPost = async (req, res) => {
    // console.log('editPost')
    // res.sendStatus(200)
    try {
        const {id} = req.params
        const {status} = req.body
        await Post.update({privateStatus: status}, {
            where: {id: +id}
        })
        res.sendStatus(200)
    } catch (error) {
        console.log('ERROR IN getCurrentUserPosts')
        console.log(error)
        res.sendStatus(400)
    }
}

export const deletePost = async (req, res) => {
    // console.log('deletePost')
    // res.sendStatus(200)
    try {
        const {id} = req.params
        await Post.destroy({where: {id: +id}})
        res.sendStatus(200)
    } catch (error) {
        console.log('ERROR IN getCurrentUserPosts')
        console.log(error)
        res.sendStatus(400)
    }
}
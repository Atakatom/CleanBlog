const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const Post = require('./models/Post')

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('index', {
    posts
  });
});

app.get('/about', (req,res) => {
  res.render('about')
})

app.get('/post/:id', async (req,res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post
  })
})

app.get('/add_post', (req,res) => {
  res.render('add_post')
})

app.post('/posts', async (req,res) => {
  console.log(req.body);
  Post.create(req.body);
  res.redirect('/')
})

const port = 4000;
app.listen(port, () => {
  console.log(`Welcome to the server running on port ${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const Post = require('./models/Post')

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
)

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

app.get('/posts/edit/:id', async (req,res) => {
  const post = await Post.findOne({ _id: req.params.id})
  res.render('edit',{
    post
  })
})

app.put('/posts/:id', async (req, res) => {
  const post = await Post.findOne({_id: req.params.id});
  post.title = req.body.title;
  console.log(req.body.title);
  post.detail = req.body.detail;
  console.log(req.body.detail);
  post.save();

  res.redirect(`/post/${req.params.id}`);
})

const port = 4000;
app.listen(port, () => {
  console.log(`Welcome to the server running on port ${port}`);
});

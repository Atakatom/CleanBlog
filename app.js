const express = require('express');
const ejs = require('ejs');

const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req,res) => {
  res.render('about')
})

app.get('/add_post', (req,res) => {
  res.render('add_post')
})

const port = 4000;
app.listen(port, () => {
  console.log(`Welcome to the server running on port ${port}`);
});

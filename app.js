const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejs = require('ejs');
const fs = require('fs')
const Message = require('./models/Message')
const app = express();
const postController = require('./controllers/postController')
const pageController = require('./controllers/pageController')

mongoose.set('strictQuery', false);

//Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db')

//Template Engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));

//Routes
app.get('/', postController.getAllPosts);
app.get('/post/:id', postController.getPost);
app.post('/messages', postController.createPost);
app.put('/post/:id', postController.updatePost);
app.delete('/post/:id', postController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/post/edit/:id', pageController.getEditPage);


const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
});
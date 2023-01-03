const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejs = require('ejs');
const Message = require('./models/Message')
const app = express();

mongoose.set('strictQuery', false);

//Connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db')

//Template Engine
app.set("view engine", "ejs")

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

//Routes
app.get('/', async (req, res) => {
    const messages = await Message.find({}).sort('-dateCreated')
    res.render('index', {
        messages
    })
});

app.get('/post/:id', async (req, res) => {
    const post = await Message.findById(req.params.id);
    res.render('post', {
        post
    })
});

app.get('/about', (req, res) => {
    res.render('about.ejs')
});

app.get('/add_post', (req, res) => {
    res.render('add_post')
});

app.post('/messages', async (req, res) => {
    await Message.create(req.body)
    res.redirect('/')
});

app.get('/post/edit/:id', async (req, res) => {
    const post = await Message.findOne({ _id: req.params.id });
    res.render('edit', {
        post
    })
});

app.put('/post/:id', async (req, res) => {
    const post = await Message.findOne({ _id: req.params.id })
    post.name = req.body.name
    post.title = req.body.title;
    post.message = req.body.message;
    post.save();
    res.redirect(`/post/${req.params.id}`)
})

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
});
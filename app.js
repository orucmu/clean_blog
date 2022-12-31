const express = require('express');
const mongoose = require('mongoose');
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

//Routes
app.get('/', async (req, res) => {
    const messages = await Message.find({})
    res.render('index', {
        messages
    })
});

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/add_post', (req, res) => {
    res.render('add_post')
});

app.post('/messages', async (req, res) => {
    await Message.create(req.body)
    res.redirect('/')
});

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
});
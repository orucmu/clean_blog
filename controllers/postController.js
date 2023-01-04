const Message = require('../models/Message');
const fs = require('fs')

exports.getAllPosts = async (req, res) => {
    const messages = await Message.find({}).sort('-dateCreated')
    res.render('index', {
        messages
    })
};

exports.getPost = async (req, res) => {
    const post = await Message.findById(req.params.id);
    res.render('post', {
        post
    })
};

exports.createPost = async (req, res) => {
    await Message.create(req.body)
    res.redirect('/')
};

exports.updatePost = async (req, res) => {
    const post = await Message.findOne({ _id: req.params.id })
    post.name = req.body.name
    post.title = req.body.title;
    post.message = req.body.message;
    post.save();
    res.redirect(`/post/${req.params.id}`)
};

exports.deletePhoto = async (req, res) => {
    await Message.findByIdAndRemove(req.params.id);
    res.redirect('/');
};
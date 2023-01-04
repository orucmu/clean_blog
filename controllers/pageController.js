const Message = require('../models/Message');

exports.getAboutPage = (req, res) => {
    res.render('about.ejs')
};

exports.getAddPage = (req, res) => {
    res.render('add_post')
};

exports.getEditPage = async (req, res) => {
    const post = await Message.findOne({ _id: req.params.id });
    res.render('edit', {
        post
    })
};
const express = require('express')

const app = express();

app.get('/', (req, res) => {

    const blog = {
        id: 1,
        name: "Blog Title 4",
        description: "Blog description"
    }
    res.send(blog)
})

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
})
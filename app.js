const express = requires('express')

const app = express();

app.get('/', (req, res) => {

    const blog = {
        id: 1,
        name: "Photo Name",
        description: "Photo description"
    }
    res.send(blog)
})

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
})
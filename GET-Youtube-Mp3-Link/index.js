const express = require('express');
const ytdl = require('ytdl-core');

const app = express();
const port = process.env.PORT || 3000; // Sử dụng cổng được cung cấp bởi Heroku hoặc mặc định là 3000

app.get('/link', async (req, res) => {
    const videoURL = req.query.url;

    if (!videoURL) {
        return res.status(400).send('Vui lòng cung cấp đường link video YouTube.');
    }

    try {
        const info = await ytdl.getInfo(videoURL);
        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        const mp3Link = audioFormat.url;

        res.send(`${mp3Link}`);
    } catch (error) {
        res.status(500).send(`Lỗi: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server đang lắng nghe trên http://localhost:${port}`);
});
//https://zzzzzzz.herokuapp.com/link?url=https://www.youtube.com/watch?v=kVG9XjbX1Ig
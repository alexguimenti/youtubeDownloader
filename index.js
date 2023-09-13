const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.listen(PORT, () => {
  console.log(`Server Works !!! At port ${PORT}`);
});

app.use(express.static(__dirname + '/public'))

app.get('/download', (req,res) => {
  let URL = req.query.url;
  console.log("URL: " + URL)
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(URL, {
      format: 'mp4'
      }).pipe(res);
  });
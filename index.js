const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core'); // Importa o pacote ytdl-core
const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Server Works !!! At port ${PORT}`);
});

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).send('URL do vídeo é necessária ou inválida.');
  }

  try {
    console.log(`Baixando o vídeo: ${videoUrl}`);

    // Definir cabeçalhos apropriados
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');

    // Usar ytdl-core para baixar o vídeo
    ytdl(videoUrl, { format: 'mp4' })
      .pipe(res)
      .on('finish', () => {
        console.log('Download concluído.');
      })
      .on('error', (err) => {
        console.error('Erro ao baixar o vídeo:', err);
        res.status(500).send('Erro ao baixar o vídeo');
      });

  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).send('Erro ao baixar o vídeo');
  }
});

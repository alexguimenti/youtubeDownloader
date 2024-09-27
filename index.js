const express = require('express');
const cors = require('cors');
const { exec } = require('yt-dlp-exec');
const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`Server Works !!! At port ${PORT}`);
});

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).send('URL do vídeo é necessária');
  }

  try {
    console.log(`Baixando o vídeo: ${videoUrl}`);

    // Definir cabeçalhos apropriados
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');

    // Use yt-dlp para baixar o vídeo
    const ytDlpProcess = exec(videoUrl, {
      output: '-',
      format: 'best',
    });

    // Eventos para verificar o progresso e erros
    ytDlpProcess.stdout.pipe(res);

    ytDlpProcess.stdout.on('data', (data) => {
      console.log(`Baixando dados... Tamanho: ${data.length} bytes`);
    });

    ytDlpProcess.stdout.on('end', () => {
      console.log('Download concluído.');
    });

    ytDlpProcess.on('error', (err) => {
      console.error('Erro ao baixar o vídeo:', err);
      res.status(500).send('Erro ao baixar o vídeo');
    });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).send('Erro ao baixar o vídeo');
  }
});

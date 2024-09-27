const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
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

    // Use spawn para executar o yt-dlp diretamente
    const ytDlpProcess = spawn('yt-dlp', ['-o', '-', '-f', 'best', videoUrl]);

    // Pipe o stdout para a resposta
    ytDlpProcess.stdout.pipe(res);

    // Capturar e exibir quaisquer erros do yt-dlp
    ytDlpProcess.stderr.on('data', (data) => {
      console.error(`Erro do yt-dlp: ${data}`);
    });

    ytDlpProcess.on('close', (code) => {
      console.log(`Processo yt-dlp encerrado com o código ${code}`);
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

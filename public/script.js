var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');

convertBtn.addEventListener('click', () => {
    console.log("Botão de conversão clicado");
    triggerDownload();
});

URLinput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        console.log("Enter pressionado no campo de URL");
        triggerDownload();
    }
});

function sendURL(URL) {
    try {
        console.log("Enviando URL para o servidor: " + URL);
        window.location.href = `http://localhost:3030/download?url=${URL}`;
        //window.location.href = `https://marvindownloader.onrender.com/download?url=${URL}`;
    } catch (error) {
        console.error('Erro ao redirecionar para download:', error);
    }
}

function triggerDownload() {
    try {
        console.log(`Full URL: ${URLinput.value}`);
        let queryString = URLinput.value;
        
        // Criando uma instância da URL e extraindo parâmetros corretamente
        let url = new URL(queryString);
        let urlParams = new URLSearchParams(url.search);
        let v = urlParams.get('v');

        if (!v) {
            console.error('O parâmetro "v" não foi encontrado na URL.');
            throw new Error('O parâmetro "v" não foi encontrado na URL.');
        }

        let downloadUrl = `https://www.youtube.com/watch?v=${v}`;
        console.log(`Download URL: ${downloadUrl}`);

        sendURL(URLinput.value);
        URLinput.value = "";
    } catch (error) {
        console.error('Erro ao processar a URL:', error);
        alert('Erro ao processar o download. Verifique a URL fornecida.');
    }
}


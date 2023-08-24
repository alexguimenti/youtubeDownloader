var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
convertBtn.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});
function sendURL(URL) {
    window.location.href = `https://youtubemex.onrender.com/download?url=${URL}`;
    //window.location.href = `http://localhost:3030/download?url=${URL}`;
}
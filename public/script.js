var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
convertBtn.addEventListener('click', () => {
    console.log(`Full URL: ${URLinput.value}`);
    let queryString = URLinput;
    console.log(`Query String: ${queryString}`)
    let urlParams = new URLSearchParams(queryString);
    let v = urlParams.get('v')
    let downloadUrl = `https://www.youtube.com/watch?v=${v}`
    console.log(`Download URL: ${downloadUrl}`);
    sendURL(URLinput.value);
});
function sendURL(URL) {
    window.location.href = `https://marvindowloader.onrender.com/download?url=${URL}`;
    //window.location.href = `http://localhost:3030/download?url=${URL}`;
}
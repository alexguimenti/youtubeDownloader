var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
convertBtn.addEventListener('click', () => {
    triggerDownload()
});

URLinput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {  // Check if "Enter" key was pressed
        triggerDownload()// Your action goes here
    }
});

function sendURL(URL) {
    window.location.href = `https://marvindownloader.onrender.com/download?url=${URL}`;
    //window.location.href = `http://localhost:3030/download?url=${URL}`;
}

function triggerDownload() {
    console.log(`Full URL: ${URLinput.value}`);
    let queryString = URLinput;
    console.log(`Query String: ${queryString}`)
    let urlParams = new URLSearchParams(queryString);
    let v = urlParams.get('v')
    let downloadUrl = `https://www.youtube.com/watch?v=${v}`
    console.log(`Download URL: ${downloadUrl}`);
    sendURL(URLinput.value);
    URLinput.value = ""
}
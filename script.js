
// Ambil daftar file media dari media.json
let mediaFiles = [];

let currentIndex = 0;
const mediaContainer = document.getElementById('media-container');
const filenameDiv = document.getElementById('filename');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


function showMedia(index) {
    if (mediaFiles.length === 0) return;
    const file = mediaFiles[index];
    mediaContainer.innerHTML = '';
    filenameDiv.textContent = file;
    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const img = document.createElement('img');
        img.src = file;
        img.onload = () => setTimeout(nextMedia, 2000);
        mediaContainer.appendChild(img);
    } else if (file.match(/\.(mp4|webm)$/i)) {
        const video = document.createElement('video');
        video.src = file;
        video.controls = false;
        video.autoplay = true;
        video.onended = nextMedia;
        mediaContainer.appendChild(video);
    } else {
        mediaContainer.textContent = 'Format tidak didukung: ' + file;
    }
}

function nextMedia() {
    currentIndex = (currentIndex + 1) % mediaFiles.length;
    showMedia(currentIndex);
}

function prevMedia() {
    currentIndex = (currentIndex - 1 + mediaFiles.length) % mediaFiles.length;
    showMedia(currentIndex);
}

prevBtn.onclick = prevMedia;
nextBtn.onclick = nextMedia;


// Ambil media.json dan mulai
fetch('media.json')
    .then(res => res.json())
    .then(files => {
        mediaFiles = files;
        showMedia(currentIndex);
    });

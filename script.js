
// Cek apakah ini halaman media player atau bukan
const isMediaPlayerPage = document.getElementById('media-container') !== null;

if (isMediaPlayerPage) {
    // Kode untuk media player
    // Ambil daftar file media dari media.json
    let mediaFiles = [];

    let currentIndex = 0;
    const mediaContainer = document.getElementById('media-container');
    const filenameDiv = document.getElementById('filename');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');


    function showMedia(index) {
        if (mediaFiles.length === 0) return;
        if (!mediaContainer) {
            console.error('Element dengan id "media-container" tidak ditemukan');
            return;
        }
        
        const file = mediaFiles[index];
        mediaContainer.innerHTML = '';
        
        if (filenameDiv) {
            filenameDiv.textContent = file;
        }
        
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

    // Event handlers hanya jika elemen ada
    if (prevBtn) {
        prevBtn.onclick = prevMedia;
    }
    if (nextBtn) {
        nextBtn.onclick = nextMedia;
    }


    // Ambil media.json dan mulai
    fetch('media.json')
        .then(res => res.json())
        .then(files => {
            mediaFiles = files;
            if (mediaContainer) {
                showMedia(currentIndex);
            } else {
                console.error('HTML tidak memiliki element dengan id "media-container"');
            }
        })
        .catch(error => {
            console.error('Error loading media.json:', error);
        });
} else {
    // Halaman ini bukan media player, skip script ini
    console.log('Script media player tidak dijalankan - bukan halaman media player');
}

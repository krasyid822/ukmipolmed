
// Cek apakah ini halaman media player atau bukan
const isMediaPlayerPage = document.getElementById('media-container') !== null;

if (isMediaPlayerPage) {
    // Kode untuk media player
    let mediaFiles = [];
    let currentIndex = 0;
    let autoplayEnabled = true;
    let currentView = 'slide'; // 'slide' or 'grid'
    
    const mediaContainer = document.getElementById('media-container');
    const filenameDiv = document.getElementById('filename');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const slideContainer = document.getElementById('slide-container');
    const gridContainer = document.getElementById('grid-container');
    const gridView = document.getElementById('grid-view');

    function showMedia(index) {
        if (mediaFiles.length === 0) return;
        if (!mediaContainer) {
            console.error('Element dengan id "media-container" tidak ditemukan');
            return;
        }
        
        currentIndex = index;
        const file = mediaFiles[index];
        mediaContainer.innerHTML = '';
        
        if (filenameDiv) {
            filenameDiv.textContent = `${index + 1}/${mediaFiles.length} - ${file}`;
        }
        
        if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
            const img = document.createElement('img');
            img.src = file;
            img.onload = () => {
                if (autoplayEnabled) {
                    setTimeout(nextMedia, 3000);
                }
            };
            mediaContainer.appendChild(img);
        } else if (file.match(/\.(mp4|webm)$/i)) {
            const video = document.createElement('video');
            video.src = file;
            video.controls = true;
            video.autoplay = autoplayEnabled;
            video.onended = () => {
                if (autoplayEnabled) {
                    nextMedia();
                }
            };
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
    
    function populateGridView() {
        if (!gridView) return;
        
        gridView.innerHTML = '';
        mediaFiles.forEach((file, index) => {
            const gridItem = document.createElement('div');
            gridItem.className = 'grid-item';
            gridItem.onclick = () => {
                showSlideView();
                showMedia(index);
            };
            
            if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
                const img = document.createElement('img');
                img.src = file;
                img.loading = 'lazy';
                gridItem.appendChild(img);
            } else if (file.match(/\.(mp4|webm)$/i)) {
                const video = document.createElement('video');
                video.src = file;
                video.muted = true;
                video.loading = 'lazy';
                gridItem.appendChild(video);
            }
            
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.textContent = `${index + 1}. ${file.split('/').pop()}`;
            gridItem.appendChild(overlay);
            
            gridView.appendChild(gridItem);
        });
    }
    
    // View switching functions
    function showSlideView() {
        currentView = 'slide';
        slideContainer.style.display = 'block';
        gridContainer.style.display = 'none';
        
        // Update toggle buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.toggle-btn').classList.add('active');
    }
    
    function showGridView() {
        currentView = 'grid';
        slideContainer.style.display = 'none';
        gridContainer.style.display = 'block';
        populateGridView();
        
        // Update toggle buttons
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.toggle-btn')[1].classList.add('active');
    }
    
    // Floating controls functions
    function toggleAutoplay() {
        autoplayEnabled = !autoplayEnabled;
        const btn = document.querySelector('.floating-controls .floating-btn');
        btn.textContent = autoplayEnabled ? '⏸️ Auto' : '▶️ Manual';
    }
    
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    function shuffleMedia() {
        mediaFiles = mediaFiles.sort(() => Math.random() - 0.5);
        currentIndex = 0;
        if (currentView === 'slide') {
            showMedia(currentIndex);
        } else {
            populateGridView();
        }
    }
    
    // Make functions global so they can be called from HTML
    window.showSlideView = showSlideView;
    window.showGridView = showGridView;
    window.toggleAutoplay = toggleAutoplay;
    window.toggleFullscreen = toggleFullscreen;
    window.shuffleMedia = shuffleMedia;

    // Event handlers
    if (prevBtn) {
        prevBtn.onclick = prevMedia;
    }
    if (nextBtn) {
        nextBtn.onclick = nextMedia;
    }
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (currentView === 'slide') {
            switch(e.key) {
                case 'ArrowLeft':
                    prevMedia();
                    break;
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    nextMedia();
                    break;
                case 'f':
                    toggleFullscreen();
                    break;
                case 'g':
                    showGridView();
                    break;
                case 's':
                    showSlideView();
                    break;
            }
        } else if (currentView === 'grid' && e.key === 's') {
            showSlideView();
        }
    });

    // Ambil media.json dan mulai
    fetch('media.json')
        .then(res => res.json())
        .then(files => {
            mediaFiles = files;
            if (mediaContainer) {
                showMedia(currentIndex);
                populateGridView(); // Pre-populate grid for faster switching
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

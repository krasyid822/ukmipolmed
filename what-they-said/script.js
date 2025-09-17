
// Ambil data pesan dari messages.json agar input lebih mudah
fetch('what-they-said/messages.json')
  .then(res => res.json())
  .then(messages => {
    const carousel = document.getElementById('carousel');
    
    // Duplikasi pesan berulang kali untuk memastikan tidak ada tampilan kosong
    for (let i = 0; i < 10; i++) {
      messages.forEach(msg => {
        carousel.appendChild(createMessage(msg));
      });
    }
  });

function createMessage(msg) {
  const div = document.createElement('div');
  div.className = 'wa-message';

  // Avatar (di luar kotak pesan)
  const avatar = document.createElement('img');
  avatar.className = 'wa-avatar';
  avatar.src = msg.avatar;
  avatar.alt = msg.sender;
  div.appendChild(avatar);

  // Content container (kotak pesan)
  const content = document.createElement('div');
  content.className = 'wa-content';

  // Header dengan nama pengirim
  const header = document.createElement('div');
  header.className = 'wa-header';
  const sender = document.createElement('div');
  sender.className = 'wa-sender';
  sender.textContent = msg.sender;
  header.appendChild(sender);
  content.appendChild(header);

  // Media
  if (msg.media && msg.media.length > 0) {
    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'wa-media';
    msg.media.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      mediaDiv.appendChild(img);
    });
    content.appendChild(mediaDiv);
  }

  // Text
  const textDiv = document.createElement('div');
  textDiv.className = 'wa-text';
  textDiv.textContent = msg.text;
  content.appendChild(textDiv);

  div.appendChild(content);
  return div;
}

// Setel volume audio latar lebih rendah
    window.addEventListener('DOMContentLoaded', function() {
      var audio = document.getElementById('bg-audio');
      if(audio) audio.volume = 0.25;
    });


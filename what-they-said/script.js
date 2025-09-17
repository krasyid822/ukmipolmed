
// Ambil data pesan dari messages.json agar input lebih mudah
fetch('what-they-said/messages.json')
  .then(res => res.json())
  .then(messages => {
    const carousel = document.getElementById('carousel');
    messages.forEach(msg => {
      carousel.appendChild(createMessage(msg));
    });
    // Duplikasi pesan agar animasi berjalan terus
    messages.forEach(msg => {
      carousel.appendChild(createMessage(msg));
    });
  });

function createMessage(msg) {
  const div = document.createElement('div');
  div.className = 'wa-message';

  // Header
  const header = document.createElement('div');
  header.className = 'wa-header';
  const avatar = document.createElement('img');
  avatar.className = 'wa-avatar';
  avatar.src = msg.avatar;
  avatar.alt = msg.sender;
  header.appendChild(avatar);
  const sender = document.createElement('span');
  sender.className = 'wa-sender';
  sender.textContent = msg.sender;
  header.appendChild(sender);
  div.appendChild(header);

  // Media
  if (msg.media && msg.media.length > 0) {
    const mediaDiv = document.createElement('div');
    mediaDiv.className = 'wa-media';
    msg.media.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      mediaDiv.appendChild(img);
    });
    div.appendChild(mediaDiv);
  }

  // Text
  const textDiv = document.createElement('div');
  textDiv.className = 'wa-text';
  textDiv.textContent = msg.text;
  div.appendChild(textDiv);

  return div;
}

// Setel volume audio latar lebih rendah
    window.addEventListener('DOMContentLoaded', function() {
      var audio = document.getElementById('bg-audio');
      if(audio) audio.volume = 0.25;
    });


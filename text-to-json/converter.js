function convertText() {
  const inputText = document.getElementById('inputText').value.trim();
  const outputJson = document.getElementById('outputJson');
  
  if (!inputText) {
    outputJson.value = 'Silakan masukkan teks terlebih dahulu.';
    return;
  }
  
  try {
    const escapedText = parseWhatsAppText(inputText);
    outputJson.value = `"${escapedText}"`;
  } catch (error) {
    outputJson.value = `Error: ${error.message}`;
  }
}

function parseWhatsAppText(text) {
  if (!text.trim()) {
    throw new Error('Tidak ada teks yang valid ditemukan.');
  }
  
  // Konversi format WhatsApp ke format JSON/HTML yang dikenali
  let convertedText = text
    // WhatsApp formatting ke format yang dikenali JSON
    .replace(/\*([^*]+)\*/g, '<b>$1</b>')        // *bold* -> <b>bold</b>
    .replace(/_([^_]+)_/g, '<i>$1</i>')          // _italic_ -> <i>italic</i>
    .replace(/~([^~]+)~/g, '<s>$1</s>')          // ~strikethrough~ -> <s>strikethrough</s>
    .replace(/```([^`]+)```/g, '<pre>$1</pre>')  // ```code block``` -> <pre>code block</pre>
    .replace(/`([^`]+)`/g, '<code>$1</code>')    // `inline code` -> <code>inline code</code>
    // Escape quotes dan backslashes untuk JSON
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    // Escape newlines terakhir
    .replace(/\n/g, '\\n');
  
  return convertedText;
}

function copyToClipboard() {
  const outputJson = document.getElementById('outputJson');
  if (!outputJson.value || outputJson.value.startsWith('Error:')) {
    alert('Tidak ada teks valid untuk disalin.');
    return;
  }
  
  outputJson.select();
  outputJson.setSelectionRange(0, 99999); // Untuk mobile
  
  try {
    document.execCommand('copy');
    alert('Teks berhasil disalin ke clipboard!');
  } catch (err) {
    // Fallback untuk browser modern
    navigator.clipboard.writeText(outputJson.value).then(() => {
      alert('Teks berhasil disalin ke clipboard!');
    }).catch(() => {
      alert('Gagal menyalin. Silakan copy manual.');
    });
  }
}

// Auto-convert saat mengetik (dengan delay)
let convertTimeout;
document.getElementById('inputText').addEventListener('input', function() {
  clearTimeout(convertTimeout);
  convertTimeout = setTimeout(() => {
    if (this.value.trim()) {
      convertText();
    }
  }, 1000);
});

// Load contoh saat halaman dimuat
window.addEventListener('DOMContentLoaded', function() {
  const exampleText = `Bahwa *mentoring* adalah tentang _memulai perjalanan_ bersama..
~Berbagi~ suka dan \`duka\`..

*AYO IKUT MENTORING*

Langsung aja ya isi g-form pendaftaran nya..

https://forms.gle/e4e6egXHiRnyQVPV7

\`\`\`Gratis yg pasti...\`\`\``;
  
  document.getElementById('inputText').value = exampleText;
  convertText();
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Buat elemen audio (sesuai nama file di sidebar kamu)
    const audio = new Audio('./sinarengan.mp3.mp3'); 
    audio.loop = true; // Agar lagu mengulang otomatis jika habis

    // 2. Ambil detik terakhir lagu jika pengguna pindah halaman
    const savedTime = localStorage.getItem('bgm_time');
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // 3. Simpan detik lagu secara realtime setiap saat
    audio.addEventListener('timeupdate', () => {
        localStorage.setItem('bgm_time', audio.currentTime);
    });

    // 4. Fungsi pemutar lagu
    function playMusic() {
        audio.play().then(() => {
            localStorage.setItem('bgm_playing', 'true');
        }).catch(err => {
            console.log("Autoplay diblokir browser, menunggu interaksi pengguna.");
        });
    }

    // Cek apakah musik sebelumnya sudah dinyalakan
    if (localStorage.getItem('bgm_playing') === 'true') {
        playMusic();
    }

    // Lagu akan mulai menyala otomatis saat pengguna pertama kali mengeklik apa saja di layar.
    document.addEventListener('click', () => {
        if (audio.paused) {
            playMusic();
        }
    }, { once: true });
});
document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah elemen audio sudah pernah dibuat di sesi browser ini agar tidak duplikat
    let audio = window.sharedAudio;

    if (!audio) {
        audio = new Audio('./sinarengan.mp3.mp3');
        audio.loop = true;
        audio.preload = 'auto'; // Memuat file audio lebih awal di background
        window.sharedAudio = audio;

        // Ambil detik terakhir lagu jika pindah halaman
        const savedTime = localStorage.getItem('bgm_time');
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }
    }

    // Simpan detik lagu secara realtime
    audio.addEventListener('timeupdate', () => {
        localStorage.setItem('bgm_time', audio.currentTime);
    });

    function playMusic() {
        audio.play().then(() => {
            localStorage.setItem('bgm_playing', 'true');
        }).catch(err => {
            console.log("Autoplay diblokir browser, menunggu interaksi pengguna.");
        });
    }

    if (localStorage.getItem('bgm_playing') === 'true') {
        playMusic();
    }

    // Nyalakan musik otomatis saat ada interaksi klik pertama
    document.addEventListener('click', () => {
        if (audio.paused) {
            playMusic();
        }
    }, { once: true });
});
document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('./sinarengan.mp3.mp3');
    audio.loop = true;
    audio.preload = 'auto';

    const savedTime = localStorage.getItem('bgm_time');

    // 1. KUNCI PERBAIKAN: Setik lagu HANYA diatur setelah metadata/file audio siap
    audio.addEventListener('loadedmetadata', () => {
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }
    });

    // 2. Simpan waktu saat lagu berjalan
    audio.addEventListener('timeupdate', () => {
        localStorage.setItem('bgm_time', audio.currentTime);
    });

    // 3. Simpan detik paling akurat tepat sebelum pengguna meninggalkan halaman
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('bgm_time', audio.currentTime);
    });

    function playMusic() {
        audio.play().then(() => {
            localStorage.setItem('bgm_playing', 'true');
        }).catch(err => {
            console.log("Autoplay diblokir browser, menunggu interaksi pengguna.");
        });
    }

    // Putar lagu jika sesi sebelumnya statusnya sedang menyala
    if (localStorage.getItem('bgm_playing') === 'true') {
        playMusic();
    }

    // Jalankan musik saat pengguna mengeklik halaman jika autoplay terblokir
    document.addEventListener('click', () => {
        if (audio.paused) {
            playMusic();
        }
    }, { once: true });
});
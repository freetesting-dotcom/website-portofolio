document.addEventListener('DOMContentLoaded', () => {
    // 1. Daftar Pesan & GIF (Setiap pesan dipasangkan dengan file GIF/gambar)
    const reasons = [
        {
            text: "💖 Kamu adalah orang yang begitu baik dan luar biasa. 💖",
            gif: "./gif1.gif" // Ganti dengan nama file GIF kamu (misal: ./d1.gif atau link URL GIF)
        },
        {
            text: "🌸 Makasih ya udah selalu ada dan menghiasi hari-hariku.🌸",
            gif: "./gif2.gif"
        },
        {
            text: "✨ Setiap momen bareng kamu itu selalu berharga dan bikin bahagia.✨",
            gif: "./gif1.gif"
        },
        {
            text: "🥳 Semoga di usia yang baru ini, semua impianmu bisa terwujud!🥳",
            gif: "./gif2.gif"
        }
    ];

    const container = document.getElementById('reasons-container');
    const button = document.querySelector('.shuffle-button');
    const counter = document.querySelector('.reason-counter');
    const endingSection = document.querySelector('.ending-section');

    let currentIndex = 0;

    // Sembunyikan bagian penutup di awal
    if (endingSection) {
        endingSection.style.display = 'none';
    }

    // Fungsi untuk menampilkan pesan & GIF berdasarkan indeksnya
    function displayReason(index) {
        if (index < reasons.length) {
            const item = reasons[index];
            
            // Mengambil teks dan gif (mendukung format Object maupun String biasa)
            const textContent = typeof item === 'object' ? item.text : item;
            const gifSrc = typeof item === 'object' ? item.gif : null;

            // Tampilkan isi kartu (GIF di atas, Teks di bawah)
            container.innerHTML = `
                <div class="reason-card">
                    ${gifSrc ? `
                        <div class="gif-overlay">
                            <img src="${gifSrc}" alt="Cute GIF">
                        </div>
                    ` : ''}
                    <p class="reason-text">${textContent}</p>
                </div>
            `;

            // Animasi GSAP saat kartu berganti
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.reason-card', 
                    { scale: 0.8, opacity: 0, y: 15 },
                    { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
                );
            }

            // Update teks indikator (Pesan X dari Y)
            if (counter) {
                counter.textContent = `Pesan ${index + 1} dari ${reasons.length}`;
            }

            // Ubah teks tombol jika sudah di pesan terakhir
            if (index === reasons.length - 1) {
                button.textContent = "Lihat Penutup ❤️";
            } else {
                button.textContent = "Pesan Selanjutnya 💕";
            }
        } else {
            // Jika pesan sudah selesai semua
            container.style.display = 'none';
            button.style.display = 'none';
            if (counter) counter.style.display = 'none';

            // Tampilkan bagian penutup
            if (endingSection) {
                endingSection.style.display = 'block';
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(endingSection, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.8 }
                    );
                }
            }
        }
    }

    // --- LANGSUNG TAMPILKAN PESAN PERTAMA SAAT HALAMAN DIBUKA ---
    displayReason(currentIndex);

    // --- EVENT KLIK TOMBOL UNTUK PINDAH KE PESAN BERIKUTNYA ---
    if (button) {
        button.addEventListener('click', () => {
            currentIndex++;
            displayReason(currentIndex);
        });
    }
});
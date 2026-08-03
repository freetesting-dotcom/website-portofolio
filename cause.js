// Reasons database
const reasons = [
    { 
        text: "Kamu adalah orang yang begitu baik dan luar biasa. 💖", 
        emoji: "🌟",
        gif: "gif1.gif" // Pastikan nama file gif ini benar dan ada di folder yang sama
    },
    { 
        text: "Semoga harimu dipenuhi dengan cinta, tawa, dan kebahagiaan. 🌸 ", 
        emoji: "💗",
        gif: "gif2.gif" // Pastikan nama file gif ini benar dan ada di folder yang sama
    },
    { 
        text: "Semoga kebahagiaan dan segala hal yang didambakan selalu terwujud. ✨ ", 
        emoji: "💕",
        gif: "gif1.gif"
    },
    { 
        text: "Tetaplah menjadi sosok gadis yang luar biasa—yang selalu menebarkan energi positif di sekeliling kamu.  🥳 ", 
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;
let isStoryMode = false; // Tambahan penanda agar tombol tidak error saat ganti fungsi

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Memori Spesial">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    // Fitur khusus HP: Munculkan GIF saat kartu ditap/disentuh
    card.addEventListener('click', () => {
        // Hilangkan GIF di kartu lain jika ada, agar fokus ke 1 GIF
        document.querySelectorAll('.reason-card').forEach(c => {
            if(c !== card) c.classList.remove('active');
        });
        // Tampilkan/Sembunyikan GIF di kartu yang ditap
        card.classList.toggle('active');
    });
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Pesan ${currentReasonIndex + 1} dari ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    isStoryMode = true; // Mengaktifkan mode pindah halaman
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    // Jika tombol sudah berubah jadi 'Enter Our Storylane', pindah ke last.html
    if (isStoryMode) {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html'; 
            }
        });
        return; // Hentikan fungsi di sini agar tidak error
    }

    // Jika belum, lanjutkan memunculkan pesan baru
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Create initial floating elements
setInterval(createFloatingElement, 2000);
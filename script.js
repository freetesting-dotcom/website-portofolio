document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Following Effect
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    // 2. Typing Effect for Greeting
    const greetingText = "Hari ini adalah hari yang spesial, karena seseorang yang paling berarti bagiku sedang bertambah usia. 💖";
    const greetingElement = document.querySelector('.greeting');
    let charIndex = 0;

    function typeGreeting() {
        if (greetingElement && charIndex < greetingText.length) {
            greetingElement.textContent += greetingText.charAt(charIndex);
            charIndex++;
            setTimeout(typeGreeting, 80); // Kecepatan ketik yang pas
        }
    }

    // 3. Create Floating Elements (Emojis)
    const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
    
    function createFloating() {
        if (typeof gsap === 'undefined') return;

        const element = document.createElement('div');
        element.className = 'floating';
        element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
        
        // Inline styles untuk keamanan layout
        element.style.position = 'fixed';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '9999';
        element.style.left = Math.random() * 100 + 'vw';
        element.style.top = '100vh';
        element.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        document.body.appendChild(element);

        gsap.to(element, {
            y: -window.innerHeight - 100,
            x: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            duration: Math.random() * 4 + 5,
            opacity: 0.8,
            ease: "power1.out",
            onComplete: () => element.remove()
        });
    }

    // 4. Initialize Load Animations
    if (typeof gsap !== 'undefined') {
        // Title animation
        if (document.querySelector('h1')) {
            gsap.to('h1', {
                opacity: 1,
                duration: 1.2,
                y: 20,
                ease: "bounce.out"
            });
        }

        // Button animation
        if (document.querySelector('.cta-button')) {
            gsap.to('.cta-button', {
                opacity: 1,
                duration: 1,
                y: -10,
                ease: "back.out(1.7)"
            });
        }
    }

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);

    // 5. Hover & Click Effects for Buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(button, {
                    scale: 1.08,
                    duration: 0.3
                });
            }
        });

        button.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3
                });
            }
        });

        // Smooth page transition on click
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href') || 'cause.html';
            
            // Mencegah navigasi instan jika ini tag link <a>
            e.preventDefault();

            if (typeof gsap !== 'undefined') {
                gsap.to('body', {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.inOut",
                    onComplete: () => {
                        window.location.href = href;
                    }
                });
            } else {
                window.location.href = href;
            }
        });
    });
});
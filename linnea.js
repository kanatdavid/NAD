const skillbars = document.querySelectorAll('.skillbar');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.bar');
            const percent = parseInt(entry.target.getAttribute('data-percent'));
            bar.style.width = percent + '%';
            const span = bar.querySelector('.percent-text');
            // Starta stapel-animation
            bar.style.width = percent + '%';
            // Starta siffer-animation
            let current = 0;
            const duration = 3000; // 3 sekunder
            const steps = Math.floor(duration / 20); // hur många steg på 3 sek
            const increment = percent / steps;

            const counter = setInterval(() => {
                current += increment;
                if (current >= percent) {
                    current = percent;
                    clearInterval(counter);
                }
                if (span) {
                    span.textContent = Math.round(current) + '%';
                }
            }, 20);

            observer.unobserve(entry.target); // Kör bara en gång per element
        }
    });
}, {
    threshold: 0.5 // 50% av elementet synligt innan det triggas
});

skillbars.forEach(skillbar => observer.observe(skillbar));

const bilder = [
    'linnea-bildspel/entre.jpg',
    'linnea-bildspel/fotolj.jpg',
    'linnea-bildspel/pinnstol.jpg',
    'linnea-bildspel/kandelaber.jpg',
    'linnea-bildspel/matta.jpg',
    'linnea-bildspel/handfat.jpg',
    'linnea-bildspel/spabad.jpg',
    'linnea-bildspel/sang.jpg',
    'linnea-bildspel/spegel.jpg',
    'linnea-bildspel/lampa.jpg',
    'linnea-bildspel/soffa.jpg',
];

let currentIndex = 0;
const slideshowContainer = document.querySelector('.slideshow-container');
document.querySelector('button.prev').addEventListener('click', () => changeSlide(-1));
document.querySelector('button.next').addEventListener('click', () => changeSlide(1));

let currentImg = document.createElement('img');
currentImg.src = bilder[currentIndex];
currentImg.classList.add('active');
slideshowContainer.appendChild(currentImg);

let isAnimating = false;

function changeSlide(direction) {
    if (isAnimating) return;
    isAnimating = true;
    // direction = 1 (höger) eller -1 (vänster)
    const nextIndex = (currentIndex + direction + bilder.length) % bilder.length;
    const nextImg = document.createElement('img');
    nextImg.src = bilder[nextIndex];
    nextImg.classList.add('active');

    // Lägg till nästa bild i containern
    slideshowContainer.appendChild(nextImg);

    // Lägg på animationer beroende på riktning
    if (direction === 1) {
        // Bild går ut till höger, nästa bild in från vänster
        currentImg.classList.add('slide-out-right');
        nextImg.classList.add('slide-in-left');
    } else {
        // Bild går ut till vänster, nästa bild in från höger
        currentImg.classList.add('slide-out-left');
        nextImg.classList.add('slide-in-right');
    }

    // Lägg till en fallback-timeout om animationend inte triggas
    const timeout = setTimeout(() => {
        finishSlide();
    }, 1000); // 1 sekund, matcha med CSS-animationstid

    function finishSlide() {
        clearTimeout(timeout); // rensa timeout om animationen triggar
        slideshowContainer.removeChild(currentImg);
        currentImg = nextImg;
        currentIndex = nextIndex;
        isAnimating = false;
    }

    currentImg.addEventListener('animationend', finishSlide, { once: true });
}


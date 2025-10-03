const skillbars = document.querySelectorAll('.skillbar');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.bar');
            const percent = parseInt(entry.target.getAttribute('data-percent'));
            bar.style.width = percent + '%';
            const span = bar.querySelector('.percent-text');
            bar.style.width = percent + '%';
            let current = 0;
            const duration = 3000;
            const steps = Math.floor(duration / 20);
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

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
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
    const nextIndex = (currentIndex + direction + bilder.length) % bilder.length;
    const nextImg = document.createElement('img');
    nextImg.src = bilder[nextIndex];
    nextImg.classList.add('active');

    slideshowContainer.appendChild(nextImg);

    if (direction === 1) {
        currentImg.classList.add('slide-out-right');
        nextImg.classList.add('slide-in-left');
    } else {
        currentImg.classList.add('slide-out-left');
        nextImg.classList.add('slide-in-right');
    }

    const timeout = setTimeout(() => {
        finishSlide();
    }, 1000);

    function finishSlide() {
        clearTimeout(timeout);
        slideshowContainer.removeChild(currentImg);
        currentImg = nextImg;
        currentIndex = nextIndex;
        isAnimating = false;
    }

    currentImg.addEventListener('animationend', finishSlide, { once: true });
}


const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Setas
nextButton.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateCarousel();
    }
});

prevButton.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
});

// Suporte a toque
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX;
    const diff = startX - moveX;

    if (diff > 50 && currentSlide < slides.length - 1) {
        currentSlide++;
        updateCarousel();
        isDragging = false;
    }

    if (diff < -50 && currentSlide > 0) {
        currentSlide--;
        updateCarousel();
        isDragging = false;
    }
});

track.addEventListener('touchend', () => {
    isDragging = false;
});

window.addEventListener('resize', updateCarousel);
updateCarousel();

const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
const totalSlides = slides.length;
let autoPlayInterval;

function updateCarousel() {
  slides.forEach((slide, index) => {
    slide.classList.remove('active', 'prev', 'next');

    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentIndex + 1) % totalSlides;

    if (index === currentIndex) {
      slide.classList.add('active');
    } else if (index === prevIndex) {
      slide.classList.add('prev');
    } else if (index === nextIndex) {
      slide.classList.add('next');
    }
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 4000);
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay();
});

slides.forEach((slide, index) => {
  slide.addEventListener('click', () => {
    if (slide.classList.contains('prev')) {
      prevSlide();
      resetAutoPlay();
    } else if (slide.classList.contains('next')) {
      nextSlide();
      resetAutoPlay();
    }
  });
});

updateCarousel();
resetAutoPlay();
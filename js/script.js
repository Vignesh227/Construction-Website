
// class MinimalCarousel {
//             constructor(element) {
//                 this.carousel = element;
//                 this.track = this.carousel.querySelector('.carousel-track');
//                 this.slides = this.carousel.querySelectorAll('.carousel-slide');
//                 this.prevBtn = this.carousel.querySelector('.carousel-nav.prev');
//                 this.nextBtn = this.carousel.querySelector('.carousel-nav.next');
//                 this.indicators = this.carousel.querySelectorAll('.carousel-indicator');
//                 this.progressBar = this.carousel.querySelector('.carousel-progress-bar');
                
//                 this.currentSlide = 0;
//                 this.totalSlides = this.slides.length;
//                 this.autoplayInterval = null;
//                 this.progressInterval = null;
//                 this.autoplayDelay = 5000;
                
//                 this.init();
//             }
            
//             init() {
//                 this.setupEventListeners();
//                 this.startAutoplay();
//             }
            
//             setupEventListeners() {
//                 this.prevBtn.addEventListener('click', () => this.goToPrevSlide());
//                 this.nextBtn.addEventListener('click', () => this.goToNextSlide());
                
//                 this.indicators.forEach((indicator, index) => {
//                     indicator.addEventListener('click', () => this.goToSlide(index));
//                 });
                
//                 this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
//                 this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
//             }
            
//             goToSlide(index) {
//                 this.currentSlide = index;
//                 this.updateCarousel();
//                 this.resetAutoplay();
//             }
            
//             goToNextSlide() {
//                 this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
//                 this.updateCarousel();
//                 this.resetAutoplay();
//             }
            
//             goToPrevSlide() {
//                 this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
//                 this.updateCarousel();
//                 this.resetAutoplay();
//             }
            
//             updateCarousel() {
//                 const translateX = -this.currentSlide * 100;
//                 this.track.style.transform = `translateX(${translateX}%)`;
                
//                 this.indicators.forEach((indicator, index) => {
//                     indicator.classList.toggle('active', index === this.currentSlide);
//                 });
//             }
            
//             startAutoplay() {
//                 this.autoplayInterval = setInterval(() => {
//                     this.goToNextSlide();
//                 }, this.autoplayDelay);
                
//                 this.startProgressBar();
//             }
            
//             pauseAutoplay() {
//                 if (this.autoplayInterval) {
//                     clearInterval(this.autoplayInterval);
//                     this.autoplayInterval = null;
//                 }
                
//                 if (this.progressInterval) {
//                     clearInterval(this.progressInterval);
//                     this.progressInterval = null;
//                 }
                
//                 this.progressBar.style.width = '0%';
//             }
            
//             resetAutoplay() {
//                 this.pauseAutoplay();
//                 this.startAutoplay();
//             }
            
//             startProgressBar() {
//                 this.progressBar.style.width = '0%';
//                 let progress = 0;
//                 const increment = 100 / (this.autoplayDelay / 50);
                
//                 this.progressInterval = setInterval(() => {
//                     progress += increment;
//                     this.progressBar.style.width = `${Math.min(progress, 100)}%`;
                    
//                     if (progress >= 100) {
//                         clearInterval(this.progressInterval);
//                     }
//                 }, 50);
//             }
//         }
        
//         // Initialize all carousels
//         document.addEventListener('DOMContentLoaded', () => {
//             const carousels = document.querySelectorAll('.carousel');
//             carousels.forEach(carousel => new MinimalCarousel(carousel));
//         });


class MinimalCarousel {
    constructor(element) {
        this.carousel = element;
        this.track = this.carousel.querySelector('.carousel-track');
        this.slides = this.carousel.querySelectorAll('.carousel-slide');
        this.prevBtn = this.carousel.querySelector('.carousel-nav.prev');
        this.nextBtn = this.carousel.querySelector('.carousel-nav.next');
        this.indicators = this.carousel.querySelectorAll('.carousel-indicator');
        this.progressBar = this.carousel.querySelector('.carousel-progress-bar');

        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.progressInterval = null;
        this.autoplayDelay = 5000;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCarousel(); // Ensure correct initial state
        this.startAutoplay();
    }

    setupEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.goToPrevSlide());
        this.nextBtn?.addEventListener('click', () => this.goToNextSlide());

        this.indicators?.forEach((indicator) => {
            const index = parseInt(indicator.dataset.slide, 10);
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
        this.resetAutoplay();
    }

    goToNextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.resetAutoplay();
    }

    goToPrevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        this.resetAutoplay();
    }

    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;

        this.indicators?.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoplay() {
        if (this.autoplayInterval) return; // Prevent multiple intervals

        this.autoplayInterval = setInterval(() => {
            this.goToNextSlide();
        }, this.autoplayDelay);

        this.startProgressBar();
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }

        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }

        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }

    resetAutoplay() {
        this.pauseAutoplay();
        this.startAutoplay();
    }

    startProgressBar() {
        if (!this.progressBar) return;

        this.progressBar.style.width = '0%';
        let progress = 0;
        const increment = 100 / (this.autoplayDelay / 50);

        this.progressInterval = setInterval(() => {
            progress += increment;
            this.progressBar.style.width = `${Math.min(progress, 100)}%`;

            if (progress >= 100) {
                clearInterval(this.progressInterval);
            }
        }, 50);
    }
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => new MinimalCarousel(carousel));
            
            // Hamburger Menu Functionality
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            const mainContent = document.querySelector('.intro-section .main');

            // Store original margin-top of intro main (mobile)
            const originalMainMarginTop = mainContent ? parseFloat(window.getComputedStyle(mainContent).marginTop) || 0 : 0;
            
            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');

                    // Push intro section down when menu opens
                    if (mainContent) {
                        if (navMenu.classList.contains('active')) {
                            const extra = navMenu.scrollHeight + 16; // menu height + small gap
                            mainContent.style.marginTop = `${originalMainMarginTop + extra}px`;
                        } else {
                            mainContent.style.marginTop = `${originalMainMarginTop}px`;
                        }
                    }
                });
                
                // Close menu when clicking on a link
                const navLinks = navMenu.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        if (mainContent) mainContent.style.marginTop = `${originalMainMarginTop}px`;
                    });
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        if (mainContent) mainContent.style.marginTop = `${originalMainMarginTop}px`;
                    }
                });
            }
});

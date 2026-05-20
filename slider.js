class Slider {
  constructor(sliderContainer) {
    this.items = sliderContainer.querySelector('.slider-items');
    this.prevBtn = sliderContainer.querySelector('.prev');
    this.nextBtn = sliderContainer.querySelector('.next');
    this.totalItems = this.items.children.length;
    this.currentIndex = 0;
    this.scrollWidth = this.items.offsetWidth;

    // CSS transition for smooth movement
    this.items.style.transition = 'transform 0.5s ease, opacity 0.3s ease';

    // Add event listeners
    this.prevBtn.addEventListener('click', () => this.slide(-1));
    this.nextBtn.addEventListener('click', () => this.slide(1));

    // Optional: Auto-loop state
    this.autoLoop = true;
    this.loopInterval = setInterval(() => this.slide(1), 5000);
  }

  slide(direction) {
    const newIndex = (this.currentIndex + direction + this.totalItems) % this.totalItems;

    // Special handling for loop transition
    if (direction === 1 && newIndex === 0) {
      // Move to last item first
      this.items.style.transform = `translateX(-${this.totalItems * this.scrollWidth}px)`;
      this.items.style.opacity = 0.5; // Fade out slightly
      setTimeout(() => {
        // Then reset to first item
        this.currentIndex = 0;
        this.items.style.transform = `translateX(0px)`;
        this.items.style.opacity = 1; // Fade back in
      }, 500); // Match CSS transition duration
    } else {
      this.currentIndex = newIndex;
      this.items.style.transform = `translateX(-${newIndex * this.scrollWidth}px)`;
      this.items.style.opacity = 1; // Ensure opacity is reset
    }
  }

  // Optional: Add pause/resume for auto-loop
  pauseAutoLoop() {
    clearInterval(this.loopInterval);
  }

  resumeAutoLoop() {
    this.loopInterval = setInterval(() => this.slide(1), 5000);
  }
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slider-container').forEach(container => {
    new Slider(container);
  });
});
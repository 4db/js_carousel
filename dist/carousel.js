const CAROUSEL_CLASS = 'carousel-component';
const SELECTED_CONTENT_CLASS = 'selected-content';
const SELECTED_CLASS = 'selected';
const ARROW_LEFT_CLASS = 'arrow-left';
const ARROW_RIGHT_CLASS = 'arrow-right';
const CIRCLE_EMPTY_CLASS = 'circle-empty';
const CIRCLE_CLASS = '.circle';
const DISPLAY_CONTENT_CLASS = 'display-content';
const UN_FILL_CIRCLE = '○';
const FILL_CIRCLE = '●';

class CarouselComponent {
  constructor(imgs) {
    this.carouselComponent = this.setCarouselComponent(imgs);
  }

  setCarouselComponent(imgs) {
    const el = document.querySelector('.' + CAROUSEL_CLASS);
    el.carouselArrowLeft = el.querySelector('.' + ARROW_LEFT_CLASS);
    el.carouselArrowRight = el.querySelector('.' + ARROW_RIGHT_CLASS);
    el.carouselCircles = el.querySelectorAll('.' + CIRCLE_EMPTY_CLASS);
    el.carouselCirclesFilled = el.querySelectorAll(CIRCLE_CLASS);
    imgs.map((img, i) => {
      const child = document.createElement('div');
      child.classList.add(DISPLAY_CONTENT_CLASS);
      if (i === 0) {
        child.classList.add(SELECTED_CONTENT_CLASS);
      }
      child.style.backgroundImage = "url('" + img + "')";
      el.appendChild(child);
    });
    el.carouselContent = el.querySelectorAll('.' + DISPLAY_CONTENT_CLASS);

    el.addEventListener('click', function() {
      if (event.target.classList.contains(ARROW_LEFT_CLASS)) {
        this.changeSlideLeft();
      }
      if (event.target.classList.contains(ARROW_RIGHT_CLASS)) {
        this.changeSlideRight();
      }
      if (event.target.classList.contains(CIRCLE_EMPTY_CLASS)) {
        let obj = event.target;
        let i = 0;
        while( (obj = obj.previousElementSibling) !== null ) {
          i++;
        }
        this.changeSlide(i);
      }
    }.bind(this));
    return el;
  }

  removeContent(index) {
    this.carouselComponent.carouselContent[index].classList.remove(SELECTED_CONTENT_CLASS);
  }

  unfillCircle(index) {
    this.carouselComponent.carouselCirclesFilled[index].classList.remove(SELECTED_CLASS);
    this.carouselComponent.carouselCirclesFilled[index].textContent = UN_FILL_CIRCLE;
  }

  addContent(index) {
    this.carouselComponent.carouselContent[index].classList.add(SELECTED_CONTENT_CLASS);
  }

  fillCircle(index) {
    this.carouselComponent.carouselCirclesFilled[index].classList.add(SELECTED_CLASS);
    this.carouselComponent.carouselCirclesFilled[index].textContent = FILL_CIRCLE;
  }

  changeSlideLeft() {
    for (let i = 0; i < this.carouselComponent.carouselContent.length; i++) {
      if (this.carouselComponent.carouselContent[i].classList.contains(SELECTED_CONTENT_CLASS)) {
        this.removeContent(i);
        this.unfillCircle(i);
        if (i === 0) {
          i = this.carouselComponent.carouselContent.length - 1;
          this.addContent(i);
          this.fillCircle(i);
          continue;
        }
        i -= 1;
        this.addContent(i);
        this.fillCircle(i);
      }
    }
  }

  changeSlideRight() {
    for (let i = 0; i < this.carouselComponent.carouselContent.length; i++) {
      if (this.carouselComponent.carouselContent[i].classList.contains(SELECTED_CONTENT_CLASS)) {
        this.removeContent(i);
        this.unfillCircle(i);
        if (i === this.carouselComponent.carouselContent.length - 1) {
          i = 0;
          this.addContent(i);
          this.fillCircle(i);
          continue;
        }
        i += 1;
        this.addContent(i);
        this.fillCircle(i);
      }
    }
  }

  changeSlide(index) {
    for (let i = 0; i < this.carouselComponent.carouselContent.length; i++) {
      if (this.carouselComponent.carouselContent[i].classList.contains(SELECTED_CONTENT_CLASS)) {
        this.removeContent(i);
        this.unfillCircle(i);
      }
    }
    this.addContent(index);
    this.fillCircle(index);
  }
}
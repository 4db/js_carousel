const TEST_IMGS = [
  'img_1.jpg',
  'img_2.jpg',
  'img_3.jpg',
  'img_4.jpg',
];

const TEST_HTML = `
<div class="container"> 
  <div class="carousel-component">
    <div class="arrow-left">
      <
    </div>
    <div class="arrow-right">
      >
    </div>
    <div class="circles">
      <span class="circle-empty">○</span>
      <span class="circle-empty">○</span>
      <span class="circle-empty">○</span>
      <span class="circle-empty">○</span>
    </div>
    <div class="circles-filled">
      <span class="circle selected">●</span>
      <span class="circle">○</span>
      <span class="circle">○</span>
      <span class="circle">○</span>
    </div>
  </div> 
</div>
`
const createHtml = () => {
  const template = document.createElement('template');
  template.innerHTML = TEST_HTML.trim();
  return template.content.firstChild;
}

describe('CarouselComponent', function() {
  let element;

  beforeEach(() => {
    document.body.appendChild(createHtml());
    new CarouselComponent(TEST_IMGS);
    element = document.querySelector('.carousel-component');
  });

  it('Should load carousel component with 4 imgs', function() {
    expect(element.querySelector('.arrow-left').innerText).toBe('<');
    expect(element.querySelector('.arrow-right').innerText).toBe('>');
    expect(element.nodeName).toBe('DIV');
    expect(element.querySelectorAll('.display-content').length).toBe(TEST_IMGS.length);
  });

  it('Should render imgs in correct order', function() {
    const imgs = element.querySelectorAll('.display-content');
    let i = 0;
    for (let img of imgs) {
      expect(img.style.backgroundImage).toContain(TEST_IMGS[i]);
      i++;
    }
  });

  afterEach(() => {
    document.querySelector('.carousel-component').remove();
  });
});
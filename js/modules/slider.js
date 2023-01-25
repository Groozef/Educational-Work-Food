const slides = ({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) => {
    const slider = document.querySelector(container),
          sliderPrevBtn = document.querySelector(prevArrow),
          sliderNextBtn = document.querySelector(nextArrow),
          currentSlide = document.querySelector(currentCounter),
          totalSlides = document.querySelector(totalCounter),
          sliderWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          slides = document.querySelectorAll(slide);

    let slideIndex = 1,
        offset = 0;

    const sliderWrapperWidth = window.getComputedStyle(sliderWrapper).width;

    const currentSlideWidth = +sliderWrapperWidth.replace(/\D/g, ''),
    slidesCount = slides.length - 1;

    const deleteNotDigits = (str) => {
        +str.replace(/\D/g, '');
    };

    console.log(currentSlideWidth);

    // Indicators for my Slider:
    const indicatorsArr = []; // Массив с индикаторами
    
    const indicatorsWrapper = document.createElement('div');
    indicatorsWrapper.classList.add('offer__slider-indicator', 'indicator');
    slider.append(indicatorsWrapper);

    for (let i = 0; i < slides.length; i++ ) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator__item');
        indicator.setAttribute('data-slide-to', i + 1);
        indicatorsWrapper.append(indicator);
        indicatorsArr.push(indicator);

        i == 0 ? indicator.classList.add('indicator__item-active') : false
    }
    

    const setActiveClass = () => {
        indicatorsArr.forEach(indicator => indicator.classList.remove('indicator__item-active'));
        indicatorsArr[slideIndex - 1].classList.add('indicator__item-active');
    };

    indicatorsArr.forEach(indicator => {
        indicator.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = currentSlideWidth * (slideTo - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;

            setActiveClass();
            setIndex();
        });
    });


    sliderWrapper.style.cssText = // Cтили для обертки слайдеров
    `
        overflow: hidden;
        position: relative;
    `;

    slidesField.style.cssText = // поле
    `
        width: ${100 * slides.length}%;
        display: flex;
        transition: .5s;
    `;
    

    slides.forEach(slide => slide.style.width = sliderWrapperWidth );

    const setIndex = () => {
        slides.length < 10 ? totalSlides.textContent = `0${slides.length}` : totalSlides.textContent = slides.length;
        slideIndex < 10 ? currentSlide.textContent = `0${slideIndex}` : currentSlide.textContent = slideIndex;        
    };

    setIndex();


    sliderNextBtn.addEventListener('click', () => {
        offset == currentSlideWidth * slidesCount ? offset = 0 : offset += currentSlideWidth;
        slideIndex == slides.length ? slideIndex = 1 : slideIndex++;
        
        slidesField.style.transform = `translateX(-${offset}px)`;
        setIndex();
        setActiveClass();

    });

    sliderPrevBtn.addEventListener('click', () => {
        offset == 0 ? offset = currentSlideWidth * slidesCount : offset -= currentSlideWidth;
        slideIndex == 1 ? slideIndex = slides.length : slideIndex--;

        slidesField.style.transform = `translateX(-${offset}px)`;
        setIndex();
        setActiveClass();
    });
};

export default slides;
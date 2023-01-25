/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = () => {
    const calculatingResult = document.querySelector('.calculating__result span');

    let sex = 'female',
        height, weight, age,
        ratio = 1.375;

    !localStorage.getItem('sex')
        ? localStorage.setItem('sex', 'female')
        : sex = localStorage.getItem('sex');

    !localStorage.getItem('ratio')
        ? localStorage.setItem('ratio', 1.375)
        : ratio = +localStorage.getItem('ratio');

    const calcNormalRatio = () => {
        if (!sex || !height || !weight || !age || !ratio) {
            calculatingResult.textContent = '____';
            return;
        }

        sex == 'male'
            ? calculatingResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
            : calculatingResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    };

    calcNormalRatio();

    const initLocalData = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.classList.remove(activeClass);
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass);
            }
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    };

    initLocalData('.calculating__choose_big div', 'calculating__choose-item_active');
    initLocalData('#gender div', 'calculating__choose-item_active');


    const getStaticInformation = (selector, activeClass) => {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (event) => {
                const target = event.target;

                if (target.getAttribute('data-ratio')) {
                    localStorage.setItem('ratio', target.getAttribute('data-ratio'));
                    ratio = +localStorage.getItem('ratio');
                } else {
                    localStorage.setItem('sex', target.getAttribute('id'));
                    sex = localStorage.getItem('sex');
                }
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });

                target.classList.add(activeClass);

                calcNormalRatio();
            });
        });
    };

    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getStaticInformation('#gender div', 'calculating__choose-item_active');


    const getDynamicInformation = (selector) => {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/)) {
                input.style.border = '1px solid red';
                input.style.transition = '.3s';
            } else {
                input.style.border = 'none';
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcNormalRatio();
        });
    };

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, timerModalId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModalWindow)('.modal', timerModalId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModalWindow": () => (/* binding */ closeModalWindow),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModalWindow": () => (/* binding */ showModalWindow)
/* harmony export */ });
function showModalWindow(modalSelector, modalTimerId) { // *Function for showing modal windows
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModalWindow(modalSelector) { // *Function for closing modal windows
    const modalWindow = document.querySelector(modalSelector);
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
}

const modal = (triggerSelector, modalSelector, modalTimerId) => {
    const modalWindow = document.querySelector(modalSelector),
          modalContactUsBtn = document.querySelectorAll(triggerSelector);


    // *Opening modal windows
    modalContactUsBtn.forEach(item => {
        item.addEventListener('click', () => showModalWindow(modalSelector, modalTimerId));
    });

    // *Closing modal windows:

    modalWindow.addEventListener('click', (e) => { // *When clicking in an empty space
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModalWindow(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => { // *When you click on Escape
        if (event.code == 'Escape' && modalWindow.classList.contains('show')) {
            closeModalWindow(modalSelector);
        }
    });


    function showModalWindowByScroll() {
        const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight, // *Page Height
              clientVisiblity = document.documentElement.clientHeight || document.body.clientHeight, // *height of the client part
              currentPosition = document.documentElement.scrollTop || document.body.scrollTop; // *Current position

        // *If you add up the current position and the visible part for the client, you get the entire page size
        if (clientVisiblity + currentPosition >= documentHeight - 1) {
            showModalWindow(modalSelector, modalTimerId);
            removeEventListener('scroll', showModalWindowByScroll);
        }
    }

    window.addEventListener('scroll', showModalWindowByScroll);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slides);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabs = (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) => {
    const parentTabHeaderItems = document.querySelector(tabsParentSelector),
          tabHeaderItems = document.querySelectorAll(tabsSelector), 
          tabsContent = document.querySelectorAll(tabsContentSelector);


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add("hide");
        });
        tabHeaderItems.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(index = 0) {
        tabHeaderItems[index].classList.add(activeClass);
        tabsContent[index].classList.remove("hide");
    }

    hideTabContent();
    showTabContent();

    // *I use event delegation to the parent element of the headers:
    parentTabHeaderItems.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1)) && !target.classList.contains(activeClass)) {
            for (let i = 0; i < tabHeaderItems.length; i++) {
                if (tabHeaderItems[i] == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            }
        }
    });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const timer = (id, deadline) => {

    function getTimeRemaining(endTime) { // *Function for calculating time from milliseconds
        let days, hours, minutes, seconds;

        // *Calculating the total time, using the difference
        const totalTime = Date.parse(endTime) - Date.parse(new Date());

        // *If the total time is over, then we reset our timer
        if (totalTime <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
            hours = Math.floor(totalTime / (1000 * 60 * 60) % 24);
            minutes = Math.floor(totalTime / (1000 * 60) % 60);
            seconds = Math.floor((totalTime / 1000) % 60);
        }

        return { // * Return the converted time
            total: totalTime,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    // *A function to set zeros if we have a time less than zero. Like on a regular watch
    function setZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }


    // *Timer setting function
    function setClock(selector, endTime) {
        const returnRemainingTime = getTimeRemaining(endTime); // *calling a function to get an object

        // *Getting timer elements from a page
        const timerParentElement = document.querySelector(selector),
              daysElement = timerParentElement.querySelector('#days'),
              hoursElement = timerParentElement.querySelector('#hours'),
              minutesElement = timerParentElement.querySelector('#minutes'),
              secondsElement = timerParentElement.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000); // *We update our timer every second

        // *We add the received data from the received object, according to the elements. 
        // *Immediately call the setZero() function
        function updateClock() {
            const t = getTimeRemaining(endTime);

            daysElement.innerHTML = setZero(t.days);
            hoursElement.innerHTML = setZero(t.hours);
            minutesElement.innerHTML = setZero(t.minutes);
            secondsElement.innerHTML = setZero(t.seconds);

            // *If the total time is over, then we reset our timer
            if (returnRemainingTime.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock(id, deadline);
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");









window.addEventListener("DOMContentLoaded", () => {    
    const timerModalId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.showModalWindow)('.modal', timerModalId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', timerModalId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2023-02-11');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.slider__inner',
    });

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_6__["default"])('form', timerModalId);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
'use strict';
import tabs  from './modules/tabs';
import modal, { showModalWindow } from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import slides from './modules/slider';
import calc from './modules/calc';
import forms from './modules/forms';

window.addEventListener("DOMContentLoaded", () => {    
    const timerModalId = setTimeout(() => showModalWindow('.modal', timerModalId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', timerModalId);
    timer('.timer', '2023-02-11');
    cards();
    
    slides({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.slider__inner',
    });

    calc();
    forms('form', timerModalId);
});
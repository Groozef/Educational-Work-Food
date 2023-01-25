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

export default calc;
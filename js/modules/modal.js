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

export default modal;

export {closeModalWindow};
export {showModalWindow};
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

export default tabs;
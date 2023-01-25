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


export default timer;

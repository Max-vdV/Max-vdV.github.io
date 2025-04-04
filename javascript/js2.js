
/**
 * gets an elements and set the given value for the given attribute
 * @param {HTMLElement} element 
 * @param {string} attributeName 
 * @param {string} value 
 */
function setAttributeValue(element, attributeName, value) {
    if (element) {
        element.setAttribute(attributeName, value);
    }
}

/**
 * a function that returns the attribute of an element
 * @param {HTMLElement} element 
 * @param {string} attributeName 
 * @returns {string}
 */
function getAttributeValue(element, attributeName){
    if (element) {
        return element.getAttribute(attributeName) || "";
    }
    return "";
}

/**
 * @param {MouseEvent} activeDay
 * @param {NodeListOf<HTMLDivElement>} dayElements 
 */
function showLastActiveDay(event, dayElements) {
    const activeDay = getAttributeValue(event.target, 'data-day');
    const weekIndex = getAttributeValue(event.target, 'data-week');

    dayElements.forEach(day => {
        day.classList.add('display-none');

        const dayValue = getAttributeValue(day, 'data-day');
        const weekValue = getAttributeValue(day, 'data-week');

        const sameDay = isSame(dayValue, activeDay);
        const sameWeek = isSame(weekIndex, weekValue);
    
        if (sameDay && sameWeek) {
            day.classList.remove('display-none');
        } 
    })
}

/**
 * sets the attribute data-day value to store the last active day
 * @param {NodeListOf<HTMLButtonElement>} weekButtons 
 * @param {string} dayValue 
 */
function setActiveDay(weekButtons, dayValue) {
    weekButtons.forEach(button => setAttributeValue(button, 'data-day', dayValue));
}

/** 
 * handles the week button click.
 * sets the value for each day button to the clicked week
 * @param {MouseEvent} event 
 * @param {NodeListOf<HTMLButtonElement>} dayButtons 
 */
function handleWeekButtonClick(event, dayButtons) {
    const weekValue = getAttributeValue(event.target, "data-week");

    dayButtons.forEach(element => {
        setAttributeValue(element, 'data-week', weekValue);
    })
}

/**
 * handle the day button click
 * compares the dayElement and button values of data-week and data-day
 * if a match was found, displays the element.
 * @param {MouseEvent} event 
 * @param {NodeListOf<HTMLDivElement>} dayElementContainer 
 */
function handleDayButtonClick(event, dayElementContainer) {
    const weekValue = getAttributeValue(event.target, 'data-week');
    const dayValue = getAttributeValue(event.target, "data-day");

    dayElementContainer.forEach(day => {
        day.classList.add("display-none");

        const entryDay = getAttributeValue(day, 'data-day');
        const entryWeek = getAttributeValue(day, "data-week");

        const sameWeek = isSame(weekValue, entryWeek);
        const sameDay = isSame(dayValue, entryDay);

        if(sameWeek && sameDay) { 
            day.classList.remove("display-none");
        }
    })
}

function removeActiveState(dayButton) {
    dayButton.forEach(button => button.classList.remove('active'))
}


/**
 * compares two string values
 * @param {string} firstParam 
 * @param {string} secondParam 
 * @returns {boolean}
 */
function isSame(firstParam, secondParam) {
    return firstParam === secondParam;
}

/**
 * inits the logbook for the internship report
 */
function initInternshipLog() {
    const dayButtons = document.querySelectorAll("[data-type='dayButton']");
    const weekButtons = document.querySelectorAll("[data-type='weekButton']");
    const dayEntries = document.querySelectorAll("[data-type='dayEntry']");

    if (!dayButtons || !weekButtons || !dayEntries) return;

    weekButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            removeActiveState(weekButtons);
            handleWeekButtonClick(event, dayButtons);
            showLastActiveDay(event || "monday", dayEntries);
            event.target.classList.add('active')
        })
    })

    dayButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            removeActiveState(dayButtons)
            handleDayButtonClick(event, dayEntries);
            setActiveDay(weekButtons, getAttributeValue(event.target, 'data-day'));
            event.target.classList.add('active')
        })
    })
}



/**
 * inits the overall js
 */
function init() {
    // init modules
    initInternshipLog();
    // maybe other function for different tasks
}

init();
// depends on project
// window.addEventListener('DOMContendLoaded', () => init())

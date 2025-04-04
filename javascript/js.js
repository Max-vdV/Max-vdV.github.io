

const dayButtons = document.querySelectorAll("[data-type='dayButton']");
const weekButtons = document.querySelectorAll("[data-type='weekButton']");
const dayEntries = document.querySelectorAll("[data-type='dayEntry']");


weekButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const weekButton = event.target
        const weekValue = getAttributeValue(weekButton, "data-week")
        dayButtons.forEach(button => {
            setAttributeValue(button, 'data-week', weekValue)  
        })
    })
})


dayButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const dayButton = event.target
        const weekValue = getAttributeValue(dayButton, 'data-week')
        const dayValue = getAttributeValue(dayButton, "data-day")
        dayEntries.forEach(day => {
            const entryDay = getAttributeValue(day, 'data-day')
            const entryWeek = getAttributeValue(day, "data-week")
            day.classList.add("display-none")
            if(weekValue === entryWeek && dayValue === entryDay){ 
                day.classList.remove("display-none")
            }
        })
    })
})

/**
 * gets an elements and set the given value for the given attribute
 * @param {HTMLElement} element 
 * @param {string} attributeName 
 * @param {string} value 
 */
function setAttributeValue(element, attributeName, value) {
    element.setAttribute(attributeName, value)
}

function getAttributeValue(element, attributeName){
    return element.getAttribute(attributeName)
}

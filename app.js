const startDates = [
    Date.now() + (3000*60),
    Date.now() + (3000*60),
    Date.now() + (6000*60),
    Date.now() + (6000*60),
]




const timer = (htmlEl, startTime) => {
   const intervalId = setInterval(() => {
        const timeNow = Date.now();

        const distanceInMinutes = Math.floor((+new Date(startTime) - timeNow) / (60 * 1000));
        
        if (distanceInMinutes <= 10 && distanceInMinutes >= 1) {
            htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
        } else if (distanceInMinutes < 1) {
            htmlEl.innerHTML = "Trwa";
            clearInterval(intervalId)
        }
    }, 1000)
};
// window.onload = timer
// setInterval(timer(startDate), 60000)

[...document.getElementsByClassName("col-header-timer")].forEach((el, index) => {
    timer(el, startDates[index])
})


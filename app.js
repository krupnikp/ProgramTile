const startDate = +new Date('2019-07-05 14:55:30')

const timer = (htmlEl, startTime) => {
    setInterval(() => {
        const timeNow = Date.now();

        const distanceInMinutes = Math.floor((startTime - timeNow) / (60 * 1000));
        
        if (distanceInMinutes <= 10 && distanceInMinutes >= 1) {
            htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
        } else if (distanceInMinutes < 1) {
            htmlEl.innerHTML = "Trwa";
        }
    }, 1000)
    clearInterval(timer)
};
// window.onload = timer
// setInterval(timer(startDate), 60000)

[...document.getElementsByClassName("col-header-timer")].forEach(el => {
    timer(el, startDate)
})


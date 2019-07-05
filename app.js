const startDate = +new Date('2019-07-05 11:30:30');
const startDate2 = +new Date('2019-07-04 18:55:30');


const timer = (htmlEl, startTime) => {
    const timeNow = Date.now();

    const distanceInMinutes = Math.floor((startTime - timeNow) / (60 * 1000));
    
    if (distanceInMinutes <= 10 && distanceInMinutes >= 1) {
        htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
    } else if (distanceInMinutes < 1) {
        htmlEl.innerHTML = "Trwa";
    }
};
window.onload = timer
setInterval(timer(startDate), 1000)
// setInterval(timer(startDate2), 1000)

document.getElementsByClassName("col-header-timer")[0]
document.getElementsByClassName("col-header-timer")[0]


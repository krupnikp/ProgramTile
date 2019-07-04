const startDate = +new Date('2019-07-04 16:25:30');


const timer = (start) => {
    const now = Date.now();

    const distance = Math.floor((startDate - now) / (60 * 1000));
    
    const minutes = distance % (1000 * 60);

    if (distance <= 10 && distance >= 1) {
        Array.from(document.getElementsByClassName("col-header-timer"), 
        e => e.innerHTML = `Start za ${minutes} min`)
    } else if (distance < 1) {
        clearInterval(timer);
        Array.from(document.getElementsByClassName("col-header-timer"),
        e => e.innerHTML = "Trwa");
    }
};
window.onload = timer
setInterval(timer, 60000)


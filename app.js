const countDownTime = new Date('2019-07-04 12:08:30').getTime();
console.log(countDownTime)


const timer = () => {
    const now = new Date().getTime();

    const distance = countDownTime - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // console.log(`${minutes}:${seconds}`)
    // console.log(distance)

    switch (true) {
        case (distance <= 600000 && distance >= 60000):
        document.getElementsByClassName("col-header-timer")[0].innerHTML = `Start za: ${minutes}min`;
        break;
        case (distance < 60000):
        clearInterval(timer);
        document.getElementsByClassName("col-header-timer")[0].innerHTML = "Trwa";
        break;
    }
};
window.onload = timer
setInterval(timer, 60000)

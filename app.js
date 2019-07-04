const countDownTime = new Date('2019-07-04 11:40:30').getTime();
console.log(countDownTime)


const timer = setInterval(function(){
    const now = new Date().getTime();

    const distance = countDownTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    console.log(`${minutes}:${seconds}`)
    // document.getElementsByClassName("col-header-timer")[0].innerHTML = `${hours}:${minutes}:${seconds}`
    console.log(distance)
    switch (true) {
        case (distance <= 600000 && distance >= 1):
        document.getElementsByClassName("col-header-timer")[0].innerHTML = `Start za: ${minutes}min`;
        break;
        case (distance < 0):
        clearInterval(timer);
        document.getElementsByClassName("col-header-timer")[0].innerHTML = "Trwa";
        break;
    }
},1000);

// if (distance <= 1800) { //od 30min
//     document.getElementsByClassName("col-header-timer")[0].innerHTML = `Start za: ${minutes}:${seconds}min`
// } else if (distance < 0) {
//     clearInterval(timer);
//     document.getElementsByClassName("col-header-timer")[0].innerHTML = "Trwa";
// }
    
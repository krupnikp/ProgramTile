const countDownTime = new Date('2019-07-05 16:45:30').getTime();
console.log(countDownTime)


const timer = setInterval(function(){
    const now = new Date().getTime();

    const distance = countDownTime - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    console.log(`${minutes}:${seconds}`)
    document.getElementsByClassName("col-header-timer")[0].innerHTML = `${hours}:${minutes}:${seconds}`

  if (distance < 0) {
    clearInterval(timer);
    document.getElementsByClassName("col-header-timer")[0].innerHTML = "Trwa";
  }

},1000);

// if (distance < 1800) { //od 30min
//     document.getElementsByClassName("col-header-timer")[0].innerHTML = `${hours}:${minutes}:${seconds}`
// } else if (distance < 0) {
//     clearInterval(timer);
//     document.getElementsByClassName("col-header-timer")[0].innerHTML = "Trwa";
// }
    
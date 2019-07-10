const MINUTE = 60 * 1000;
const TIME_NOW = Date.now();

const channelsList = [{
    title: 'Megalotnisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: TIME_NOW + (11*MINUTE),
    endTime: TIME_NOW + (20*MINUTE),
},
{
    title: 'Mega schronisko w Dubaju',
    category: 'Sport',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: TIME_NOW + (2*MINUTE),
    endTime: TIME_NOW + (30*MINUTE),
},
{
    title: 'Megalotnisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: TIME_NOW - (5*MINUTE),
    endTime: TIME_NOW + (15*MINUTE),
},
{
    title: 'Mega schronisko w Dubaju',
    category: 'Sport',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: TIME_NOW - (20*MINUTE),
    endTime: TIME_NOW + (61*MINUTE),
}];


const programTimer = (htmlEl, startTime, endTime) => {

    const timeToStart = startTime - Date.now() - 10*MINUTE;
    // console.log(startTime, +new Date(startTime), timeToStart)
    setTimeout(renderTimer, timeToStart);

    function renderTimer() {
        const intervalId = setInterval(() => {
            const timeNow = Date.now();
            const distanceInMinutes = Math.ceil((startTime - timeNow) / MINUTE);
            // console.log(endTime - timeNow)
            if (distanceInMinutes >= 1) {
                htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
            } else if (endTime >= timeNow) {
                htmlEl.innerHTML = 'Trwa';
            } else {
                htmlEl.innerHTML = '';
                clearInterval(intervalId);  
            }
        }, 1000)      
    }  
};

const progressBar = (htmlEl, startTime, endTime) => {

    const intervalId = setInterval(() => {
   
        const totalTime = endTime - startTime;
        const pastTime = +new Date() - startTime;
        const pastPercent = Math.floor(pastTime / totalTime * 100);
        // console.log (pastTime, totalTime, pastPercent)
        
        if (pastPercent > 100) {
            clearInterval(intervalId);
        } else {
            htmlEl.style.width = pastPercent + '%';
        }
    }, 1000)
};


function chanelRender(channelsList, dateConverter){ 

    let channels = '';
    for(let channel of channelsList){
        channels +=  `
        <div class="col">
        <div class="col-header">
            <img class="col-header-img" src='https://via.placeholder.com/250x150'>
            <div class="loader"><span class="loader-bar"></span></div>
            <div class="col-header-timer"></div>
        </div>
        <div class="col-text">
            <img class="col-text-img" src='${channel.imgURL}'>  
            <div>
                <h4 class="col-text-title">${channel.title}</h4>
                <p class="col-text-channel">National geographic HD 
                    <span class="col-channel-time">${dateConverter(channel.startTime)} - ${dateConverter(channel.endTime)} </span> 
                </p>
                <p class="col-text-category">${channel.category}</p>
            </div>
        </div>      
        </div>`;
    }
    return channels;
};

document.querySelector('.col-list').innerHTML = chanelRender(channelsList, dateConverter);

[...document.getElementsByClassName('col-header-timer')].forEach((el, index) => {
    programTimer(el, channelsList[index].startTime, channelsList[index].endTime);
});

[...document.getElementsByClassName('loader-bar')].forEach((el, index) => {
    progressBar(el, channelsList[index].startTime, channelsList[index].endTime);
});
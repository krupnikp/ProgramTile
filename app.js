const MINUTE = 60 * 1000;
const TIMENOW = Date.now();

const channelsList = [{
    title: 'Megalotnisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: TIMENOW + (12*MINUTE),
    endTime: TIMENOW + (2*MINUTE),
},
{
    title: 'Mega schronisko w Dubaju',
    category: 'Sport',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: TIMENOW + (2*MINUTE),
    endTime: TIMENOW + (30*MINUTE),
},
{
    title: 'Megalotnisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: TIMENOW - (5*MINUTE),
    endTime: TIMENOW + (15*MINUTE),
},
{
    title: 'Mega schronisko w Dubaju',
    category: 'Sport',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: TIMENOW - (20*MINUTE),
    endTime: TIMENOW + (61*MINUTE),
}];


const programTimer = (htmlEl, startTime, endTime) => {
    let timeNow = Date.now();
    let distanceInMinutes = Math.floor((+new Date(startTime) - timeNow) / (MINUTE));

    setTimeout(test, distanceInMinutes);

    function test() {
        const intervalId = setInterval(() => {
            timeNow = Date.now();
            distanceInMinutes = Math.floor((+new Date(startTime) - timeNow) / (MINUTE));
            // console.log(endTime - timeNow)
            if (distanceInMinutes <= 10 && distanceInMinutes >= 1) {
                htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
            } else if (distanceInMinutes < 1 && endTime >= timeNow) {
                htmlEl.innerHTML = 'Trwa';
            } else if (endTime < timeNow) {
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
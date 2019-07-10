const MINUTE = 60 * 1000;

const channelsList = [{
    title: 'Megalotnisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: Date.now() - (11*MINUTE),
    endTime: Date.now() + (1*MINUTE),
},
{
    title: 'Mega schronisko w Dubaju',
    category: 'Sport',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: Date.now() + (2*MINUTE),
    endTime: Date.now() + (30*MINUTE),
},
{
    title: 'Megalotnisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: Date.now() + (5*MINUTE),
    endTime: Date.now() + (15*MINUTE),
},
{
    title: 'Mega schronisko w Dubaju',
    category: 'Sport',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: Date.now() - (20*MINUTE),
    endTime: Date.now() + (61*MINUTE),
}
]


const programTimer = (htmlEl, startTime, endTime) => {

    const intervalId = setInterval(() => {
        const timeNow = Date.now();
        const distanceInMinutes = Math.floor((+new Date(startTime) - timeNow) / (MINUTE));
        
        // console.log(endTime - timeNow)
        if (distanceInMinutes <= 10 && distanceInMinutes >= 1) {
            htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
        } else if (distanceInMinutes < 1) {
            htmlEl.innerHTML = 'Trwa';
        } else if (endTime < timeNow) {
            htmlEl.innerHTML = 'Koniec';
            clearInterval(intervalId)   
        }
    }, 1000)
};

const progresBar = (htmlEl, startTime, endTime) => {
   
    const totalTime = endTime - startTime;
    const pastTime = +new Date() - startTime;
    const pastPercent = Math.floor(pastTime / totalTime * 100)
    console.log (pastTime, totalTime, pastPercent)
   
    if (pastPercent >= 100) {
        clearInterval(progresBar)
    } else {
        htmlEl.style.width = pastPercent + '%';
    }
}


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
}

document.querySelector('.col-list').innerHTML = chanelRender(channelsList, dateConverter);

[...document.getElementsByClassName('col-header-timer')].forEach((el, index) => {
    programTimer(el, channelsList[index].startTime, channelsList[index].endTime);
});

[...document.getElementsByClassName('loader-bar')].forEach((el, index) =>{
    setInterval(progresBar, 1000, el, channelsList[index].startTime, channelsList[index].endTime)
});
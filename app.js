const MINUTE = 60 * 1000;

const chanelList = [{
    title: 'Megalotnisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: Date.now() - (1*MINUTE),
    endTime: Date.now() + (3*MINUTE),
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
    startTime: Date.now() + (1*MINUTE),
    endTime: Date.now() + (5*MINUTE),
},
{
    title: 'Mega schronisko w Dubaju',
    category: 'Sport',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: Date.now() - (1*MINUTE),
    endTime: Date.now() + (61*MINUTE),
}
]


const programTimer = (htmlEl, startTime) => {
   const intervalId = setInterval(() => {
        const timeNow = Date.now();

        const distanceInMinutes = Math.floor((+new Date(startTime) - timeNow) / (MINUTE));
        
        if (distanceInMinutes <= 10 && distanceInMinutes >= 1) {
            htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
        } else if (distanceInMinutes < 1) {
            htmlEl.innerHTML = "Trwa";
            clearInterval(intervalId)

        }
    }, 1000)
};


const progresBar = (htmlEl, startTime, endTime) => {
    const totalTime = endTime - startTime;
    const pastTime = +new Date() - startTime;
    const pastPercent = pastTime / totalTime * 100
    // console.log (pastTime, totalTime, pastPercent)
    let width = 1;
    let animationTime = setInterval(frame, 1000)
    htmlEl.style.width = pastPercent + '%'; 
    if(pastTime < 0) {
        htmlEl.style.width = 0; 
    }
    function frame() {
        if (width >= 100) {
          clearInterval(animationTime);
        } else {
            const pastTime = +new Date() - startTime;
            if(pastTime < 0) {
                htmlEl.style.width = 0; 
                return
            }
            const pastPercent = pastTime / totalTime * 100
            width = pastPercent;
            htmlEl.style.width = pastPercent + '%';
        }
    } 
}


function chanelRender(chanelList){ 

    function convertDate(timeInMs) {
        const hour = new Date(timeInMs).getHours();
        const minutes = new Date(timeInMs).getMinutes();

        if (minutes)//s?t:f

        return  `${hour}:${(minutes) ?}`
    }
    
    let chanel = '';
    for(i=0; i < chanelList.length; i++){
        chanel +=  `
        <div class="col">
        <div class="col-header">
            <img class="col-header-img" src='https://via.placeholder.com/250x150'>
            <div class="loader"><span class="loader-bar"></span></div>
            <div class="col-header-timer"></div>
        </div>
        <div class="col-text">
            <img class="col-text-img" src='${chanelList[i].imgURL}'>  
            <div>
                <h4 class='col-text-title'>${chanelList[i].title}</h4>
                <p class='col-text-chanel'>National geographic HD 
                    <span class="col-chanel-time">${convertDate(chanelList[i].startTime)}: - ${convertDate(chanelList[i].endTime)} </span> 
                </p>
                <p class='col-text-category'>${chanelList[i].category}</p>
            </div>
        </div>      
        </div>`;
    }
    return chanel
}

document.querySelector('.col-list').innerHTML = chanelRender(chanelList);

[...document.getElementsByClassName("col-header-timer")].forEach((el, index) => {
    programTimer(el, chanelList[index].startTime);
});

[...document.getElementsByClassName('loader-bar')].forEach((el, index) =>{
    progresBar(el, chanelList[index].startTime, chanelList[index].endTime)
});
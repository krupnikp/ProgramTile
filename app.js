// const chanelList = [
//     Date.now() + (3000*60),
//     Date.now() + (3000*60),
//     Date.now() + (6000*60),
//     Date.now() + (6000*60),
// ]
const chanelList = [{
    title: 'Megalotnisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: Date.now() + (3000*60),
    endTime: Date.now() + (31000*60),
},
{
    title: 'Mega schronisko w Dubaju',
    category: 'Serial dokumentalny',
    imgURL: 'https://via.placeholder.com/250x150',
    startTime: Date.now() + (6000*60),
    endTime: Date.now() + (31000*60),
}]


const timer = (htmlEl, startTime) => {
   const intervalId = setInterval(() => {
        const timeNow = Date.now();

        const distanceInMinutes = Math.floor((+new Date(startTime) - timeNow) / (60 * 1000));
        
        if (distanceInMinutes <= 10 && distanceInMinutes >= 1) {
            htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
        } else if (distanceInMinutes < 1) {
            htmlEl.innerHTML = "Trwa";
            clearInterval(intervalId)
        }
    }, 1000)
};

// const progressBar = (htmlEl, startTime, endTime) => {
//     if (distanceInMinutes < 1) {

//     }
// }
// a += 1     === a = a + 1

function chanelRender(chanelList){ 
    
    let chanelPushToThe = '';
    for(i=0; i < chanelList.length; i++){
        chanelPushToThe +=  `
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
                <p class='col-text-chanel'>National geographic HD <span class="col-chanel-time">20:05 - 21:15</span></p>
                <p class='col-text-category'>${chanelList[i].category}</p>
            </div>
        </div>      
        </div>`;
    }
    return chanelPushToThe
}

document.querySelector('.col-list').innerHTML = chanelRender(chanelList);

[...document.getElementsByClassName("col-header-timer")].forEach((el, index) => {
    timer(el, chanelList[index].startTime);
})

// [...document.getElementsByClassName('col')].forEach((el, index) => {
    
// }

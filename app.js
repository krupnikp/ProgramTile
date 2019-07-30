const programTimer = (htmlEl, startTime, endTime) => {

    const timeToStart = startTime - Date.now() - 10 * MINUTE;

    let intervalId;

    function renderInterval() {
        intervalId = setInterval(renderTimer, 1000);
    }

    renderTimer();
    setTimeout(renderInterval, timeToStart);

    function renderTimer() {
        const timeNow = Date.now();
        const distanceInMinutes = Math.ceil((startTime - timeNow) / MINUTE);

        if (distanceInMinutes >= 1 && distanceInMinutes <= 10) {
            htmlEl.innerHTML = `Start za ${distanceInMinutes} min`;
        } else if (endTime >= timeNow && distanceInMinutes <= 10) {
            htmlEl.innerHTML = 'Trwa';
        } else {
            htmlEl.innerHTML = '';
            clearInterval(intervalId);
        }
    }
};

const progressBar = (htmlEl, startTime, endTime) => {

    const timeStart = startTime - Date.now();
    const onePercenteTime = (endTime - startTime) / 100;
    let intervalId;

    function renderInterval() {
        intervalId = setInterval(renderBar, onePercenteTime)
    }

    renderBar();
    setTimeout(renderInterval, timeStart);

    function renderBar() {
        const totalTime = endTime - startTime;
        const pastTime = +new Date() - startTime;
        const pastPercent = Math.floor(pastTime / totalTime * 100);

        if (pastPercent > 100) {
            clearInterval(intervalId);
            htmlEl.innerHTML = '';
        } else if (pastPercent >= 0) {
            if (htmlEl.style.display = 'none') {
                htmlEl.style.display = 'initial';
            }
            htmlEl.children[1].style.width = pastPercent + '%';
        }
    }
};


function channelRender(channelsList, dateConverter) {
    return channelsList.reduce((acc, channel) => {
        return acc += `
        <li class="col" draggable='true' id='${channel.id}'> 
            <div class="over-top"'><div class="${SELECTORS.OVER_TOP_TARGET}"></div></div>
            <div class="col-header">
                <img class="col-header-img" src='${channel.imgURL}'>
                <div class="col-header-timer"></div>
                <svg class="loader" width='100%' height='2' display='none'>
                    <rect class="" width='100%' height='100%' fill='white'></rect> 
                    <rect class="loader-bar" width='0%' height='100%' fill='red'></rect>
                </svg>
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
            <div class="over-bottom"><div class="${SELECTORS.OVER_BOTTOM_TARGET}"></div></div>   
        </li>`;
    }, '');
};

document.querySelector('.col-list').innerHTML = channelRender(channelsList, dateConverter);

[...document.getElementsByClassName('col-header-timer')].forEach((el, index) => {
    programTimer(el, channelsList[index].startTime, channelsList[index].endTime);
});

[...document.getElementsByClassName('loader')].forEach((el, index) => {
    progressBar(el, channelsList[index].startTime, channelsList[index].endTime);
});

const dnd = new DnD();

[...document.getElementsByClassName('col')].forEach((el) => {
    dnd.initDragAndDrop(el)
});

dnd.initDragCursor();
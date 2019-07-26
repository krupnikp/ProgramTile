const sizeTopTargetShow = '300px';
const sizeBottomTargetShow = '300px';
const sizeTargetInitial = '80px';

const sizeTopViewShow = '211px';
const sizeBottomViewShow = '211px';
const sizeViewInitial = '0px';

const dragBottomTargets = document.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`);
const dragTopTargets = document.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`);
const draggableCursor = document.getElementById('draggableCursor');

let targetTop = null;
let targetBottom = null;

let draggableElement = null;
let dropFailed = false;
let catchedTargetLi = null;

let nextElement = null;
let previousElement = null;

let offsetX = null;
let offsetY = null;

function handleDragStart(event) {
    dropFailed = true;
    draggableElement = event.target;

    offsetX = event.offsetX;
    offsetY = event.offsetY;

    nextElement = draggableElement.nextElementSibling;
    previousElement = draggableElement.previousElementSibling;

    draggableElement.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).style.display = 'none';
    draggableElement.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).style.display = 'none';

    draggableCursor.style.display = '';

    closestTargetHide(previousElement, nextElement)
    this.style.opacity = '0.3';
}

function handleDragCursor(event) {

    draggableCursor.style.top = (event.clientY - offsetY + 1) + 'px';
    draggableCursor.style.left = (event.clientX - offsetX + 1) + 'px';
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDragEnter(event) {
    event.preventDefault();
    targetTop = this.closest('.over-top');
    targetBottom = this.closest('.over-bottom');

    if (targetTop) {
        this.style.height = sizeTopViewShow;
        this.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).style.height = sizeTopTargetShow;

    } else if (targetBottom) {
        this.style.height = sizeBottomViewShow;
        this.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).style.height = sizeBottomTargetShow;
    }
}

function handleDragLeave(event) {
    event.preventDefault();

    this.parentElement.style.height = sizeViewInitial;
    this.style.height = sizeTargetInitial;
}

function handleDrop(event) {
    event.preventDefault();
    catchedTargetLi = event.target.closest('li');
    dropFailed = false;
    draggableElement.classList.add('animationDrop');
    removeClass('animationDrop', 800)

    if (event.target.closest('.over-top')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi);
        targetTop.style.height = sizeViewInitial;
        targetTop.children[0].style.height = sizeTargetInitial;
    } else if (event.target.closest('.over-bottom')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi.nextElementSibling)
        targetBottom.style.height = sizeViewInitial;
        targetBottom.children[0].style.height = sizeTargetInitial;
    }
}

function handleDragEnd() {
    if (dropFailed) {
        draggableElement.classList.add('animationDropFail');
        removeClass('animationDropFail', 600)
    }
    this.style.opacity = '1';
    draggableElement.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).style.display = 'initial';
    draggableElement.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).style.display = 'initial';

    draggableCursor.style.display = 'none';

    closestTargetHide(previousElement, nextElement)
}

function removeClass(className, timeout) {
    setTimeout(() => draggableElement.classList.remove(className), timeout);
}

function closestTargetHide(previousElement, nextElement) {
    if (previousElement) {
        const prevElBottomTarget = previousElement.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`)
        prevElBottomTarget.style.display = prevElBottomTarget.style.display === 'none' ? 'initial' : 'none';
    }
    if (nextElement) {
        const prevElTopTarget = nextElement.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`)
        prevElTopTarget.style.display = prevElTopTarget.style.display === 'none' ? 'initial' : 'none';
    }
}


function dragAndDrop(el) {
    el.addEventListener('dragstart', handleDragStart);
    el.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).addEventListener('dragover', handleDragOver);
    el.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).addEventListener('dragover', handleDragOver);
    el.querySelector('.over-top').addEventListener('dragenter', handleDragEnter);
    el.querySelector('.over-bottom').addEventListener('dragenter', handleDragEnter);
    el.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).addEventListener('dragleave', handleDragLeave);
    el.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).addEventListener('dragleave', handleDragLeave);
    el.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).addEventListener('drop', handleDrop);
    el.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).addEventListener('drop', handleDrop);
    el.addEventListener('dragend', handleDragEnd);
}

document.body.addEventListener('dragover', handleDragCursor);
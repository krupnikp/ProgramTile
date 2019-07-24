const sizeTopTargetShow = '300px';
const sizeBottomTargetShow = '300px';
const sizeTargetInitial = '80px';

const sizeTopViewShow = '211px';
const sizeBottomViewShow = '211px';
const sizeViewInitial = '0px';

const dragBottomTargets = document.querySelector('.over-bottom-target');
const dragTopTargets = document.querySelector('.over-top-target');

let targetTop = null;
let targetBottom = null;

let draggableElement = null;
let dropFailed = false;
let catchedTargetLi = null;

let nextElement = null;
let previousElement = null;

function handleDragStart(event) {
    dropFailed = true;
    draggableElement = event.target;

    nextElement = draggableElement.nextElementSibling;
    previousElement = draggableElement.previousElementSibling

    draggableElement.querySelector('.over-top-target').style.display = 'none';
    draggableElement.querySelector('.over-bottom-target').style.display = 'none';

    closestTargetHide(previousElement, nextElement)
    this.style.opacity = '0.3';
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
        this.querySelector('.over-top-target').style.height = sizeTopTargetShow;

    } else if (targetBottom) {
        this.style.height = sizeBottomViewShow;
        this.querySelector('.over-bottom-target').style.height = sizeBottomTargetShow;
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
    if(dropFailed){
        draggableElement.classList.add('animationDropFail');
        removeClass('animationDropFail', 600)
    }
    this.style.opacity = '1';
    draggableElement.querySelector('.over-top-target').style.display = 'initial';
    draggableElement.querySelector('.over-bottom-target').style.display = 'initial';

    closestTargetHide(previousElement, nextElement)
}

function removeClass(className, timeout){
    setTimeout(() => draggableElement.classList.remove(className), timeout);
}

function closestTargetHide(previousElement, nextElement) {
    if (previousElement) {
        const prevElBottomTarget = previousElement.querySelector('.over-bottom-target')
        prevElBottomTarget.style.display = prevElBottomTarget.style.display === 'none' ? 'initial' : 'none';
    }
    if (nextElement) {
        const prevElTopTarget = nextElement.querySelector('.over-top-target')
        prevElTopTarget.style.display = prevElTopTarget.style.display === 'none' ? 'initial' : 'none';
    }
}


function dragAndDrop(el) {
    el.addEventListener('dragstart', handleDragStart);
    el.querySelector('.over-top-target').addEventListener('dragover', handleDragOver);
    el.querySelector('.over-bottom-target').addEventListener('dragover', handleDragOver);
    el.querySelector('.over-top').addEventListener('dragenter', handleDragEnter);
    el.querySelector('.over-bottom').addEventListener('dragenter', handleDragEnter);
    el.querySelector('.over-top-target').addEventListener('dragleave', handleDragLeave);
    el.querySelector('.over-bottom-target').addEventListener('dragleave', handleDragLeave);
    el.querySelector('.over-top-target').addEventListener('drop', handleDrop);
    el.querySelector('.over-bottom-target').addEventListener('drop', handleDrop);
    el.addEventListener('dragend', handleDragEnd);
}
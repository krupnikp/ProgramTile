const sizeTopTargetShow = '300px';
const sizeBottomTargetShow = '300px';

const sizeTopViewShow = '211px';
const sizeBottomViewShow = '211px';

const dragBottomTargets = document.querySelector('.over-bottom-target');
const dragTopTargets = document.querySelector('.over-top-target');

let targetTop = null;
let targetBottom = null;

let draggableElement = null;
let catchedTargetLi = null;

let nextElement = null;
let previousElemen = null;

function handleDragStart(event) {
    draggableElement = event.target;

    nextElement = draggableElement.nextElementSibling;
    previousElement = draggableElement.previousElementSibling

    draggableElement.querySelector('.over-top-target').style.display = 'none';
    draggableElement.querySelector('.over-bottom-target').style.display = 'none';

    if (previousElement) {
        previousElement.querySelector('.over-bottom-target').style.display = 'none';
    }
    if (nextElement) {
        nextElement.querySelector('.over-top-target').style.display = 'none';
    }
    this.style.opacity = '0.3';
}

function handleDragOver(event){
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

    this.parentElement.style.height = '0px';
    this.style.height = '80px';

    this.parentElement.style.height = '0px';
    this.style.height = '80px';
}

function handleDrop(event) {
    event.preventDefault();
    catchedTargetLi = event.target.closest('li');

    if (event.target.closest('.over-top')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi)
        targetTop.style.height = '0px';
        targetTop.children[0].style.height = '80px';
    } else if (event.target.closest('.over-bottom')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi.nextElementSibling)
        targetBottom.style.height = '0px';
        targetBottom.children[0].style.height = '80px';
    }
}

function handleDragEnd() {
    this.style.opacity = '1';
    draggableElement.querySelector('.over-top-target').style.display = 'initial';
    draggableElement.querySelector('.over-bottom-target').style.display = 'initial';

    if (previousElement) {
        previousElement.querySelector('.over-bottom-target').style.display = 'initial';
    }
    if (nextElement) {
        nextElement.querySelector('.over-top-target').style.display = 'initial';
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
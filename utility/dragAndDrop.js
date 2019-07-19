const sizeTopTargetShow = '300px';
const sizeBottomTargetShow = '300px';

const sizeTopViewShow = '211px';
const sizeBottomViewShow = '211px';

const dragBottomTargets =  document.getElementsByClassName('over-bottom-target');
const dragTopTargets =  document.getElementsByClassName('over-top-target');

let targetTop = null;
let targetBottom = null;

let draggableElement = null;
let catchedTargetLi = null;

function resetTargets() {
    Array.from(dragBottomTargets).forEach(element => {
       element.style.display = 'initial';
    });

    Array.from(dragTopTargets).forEach(element => {
        element.style.display = 'initial';
    });
}

function handleDragStart(event) {
    resetTargets();
    draggableElement = event.target;

    const nextElement = draggableElement.nextElementSibling;
    const previousElement = draggableElement.previousElementSibling

    if (previousElement){
        previousElement.querySelector('.over-bottom-target').style.display = 'none';
    } 
    if (nextElement){
        nextElement.querySelector('.over-top-target').style.display = 'none';    
    } 
    this.style.opacity = '0.3'; 
}

function handleDragOver(event) {
    event.preventDefault();
    targetTop = event.target.closest('.over-top');
    targetBottom = event.target.closest('.over-bottom');
    
    if (draggableElement !== this) {
        if (targetTop && draggableElement.querySelector('.over-top') !== targetTop){
            targetTop.style.height = sizeTopViewShow;
            targetTop.querySelector('.over-top-target').style.height = sizeTopTargetShow;
         
        } else if(targetBottom && draggableElement.querySelector('.over-bottom') !== targetBottom) {
            targetBottom.style.height = sizeBottomViewShow;
            targetBottom.querySelector('.over-bottom-target').style.height = sizeBottomTargetShow;
        }
    }
}

function handleDragLeave(event) {
    event.preventDefault();
    targetTop = this.querySelector('.over-top');
    targetBottom = this.querySelector('.over-bottom');

    targetTop.style.height = '0px';
    targetTop.children[0].style.height = '80px'; 

    targetBottom.style.height = '0px';
    targetBottom.children[0].style.height = '80px'; 
  
}

function handleDrop(event) {
    catchedTargetLi = event.target.closest('li');

    targetTop = this.querySelector('.over-top');
    targetBottom = this.querySelector('.over-bottom');

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
}

function dnd(el) {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
}

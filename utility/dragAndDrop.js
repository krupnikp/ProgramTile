let draggableElement = null;
let catchedTargetLi = null;

function handleDragStart(event) {

    draggableElement = event.target;  // or ... = this
    this.style.opacity = '0.3'; 
}

function handleDragOver(event) {
    event.preventDefault();
    catchedTargetLi = event.target.closest('li');

    if (draggableElement !== catchedTargetLi && draggableElement.previousElementSibling !== catchedTargetLi ) {
        catchedTargetLi.lastChild.style.display = 'block';
        catchedTargetLi.lastChild.classList.add('over') // animation run
    }
}

function handleDragLeave(event) {
    catchedTargetLi = event.target.closest('li');
    catchedTargetLi.lastChild.style.display = 'none';
}

function handleDrop(event) {
    catchedTargetLi = event.target.closest('li');
   
    catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi.nextElementSibling)
    catchedTargetLi.lastChild.style.display = 'none';
}


function handleDragEnd(event) {
    this.style.opacity = '1'; 
    
    catchedTargetLi = event.target.closest('li');
    catchedTargetLi.lastChild.style.display = 'none';
}

function dnd(el) {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
}

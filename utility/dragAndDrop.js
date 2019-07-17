let draggableElement = null;
let catchedTargetLi = null;

function handleDragStart(event) {

    draggableElement = event.target;  // or ... = this
    this.style.opacity = '0.3'; 
}

function handleDragOver(event) {
    event.preventDefault();
    // const targetTopLi = event.target.closest('.col-header');
    // const targetBottomLi = event.target.closest('.col-text');
    catchedTargetLi = event.target.closest('li');
    // console.log(catchedTargetLi.children[3])
    if (event.target.closest('.col-header') && draggableElement.children[1] !== event.target.closest('.col-header')) {
        catchedTargetLi.children[0].style.display = 'block'; // zmiana style w inline nie działa
        // console.log('TOP',targetTopLi.parentElement, targetTopLi)
        // console.log('BOTTOM',targetBottomLi.parentElement, targetBottomLi)
    } else if (event.target.closest('.col-text') && draggableElement.children[2] !== event.target.closest('.col-text')) {
        catchedTargetLi.children[3].style.display = 'block'; // lastChild i firstChild łapie element jako "TEXT"
        // catchedTargetLi.lastChild.classList.add('over-bottom') // animation run
    } 
}

function handleDragLeave(event) {
    // catchedTargetLi = event.target.closest('li');

    // catchedTargetLi.children[0].style.display = 'none';
    // catchedTargetLi.children[3].style.display = 'none';
}

function handleDragExit(event) {
    // catchedTargetLi = event.target.closest('li');

    // catchedTargetLi.children[0].style.display = 'none';
    // catchedTargetLi.children[3].style.display = 'none';
}

function handleDrop(event) {
    catchedTargetLi = event.target.closest('li');
   
    
    if (event.target.closest('.col-header')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi)
        catchedTargetLi.children[0].style.display = 'none';
    } else if (event.target.closest('.col-text')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi.nextElementSibling)
        catchedTargetLi.children[3].style.display = 'none';
    }

}


function handleDragEnd(event) {
    this.style.opacity = '1'; 
    
    catchedTargetLi = event.target.closest('li');
    // catchedTargetLi.lastChild.style.display = 'none';
}

function dnd(el) {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('dragexit', handleDragExit, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
}

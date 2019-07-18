let draggableElement = null;
let catchedTargetLi = null;

function handleDragStart(event) {

    draggableElement = event.target;  // or ... = this
    this.style.opacity = '0.3'; 
}

function handleDragOver(event) {
    event.preventDefault();
    // const targetTop = event.target.closest('.col-header');
    // const targetBottom = event.target.closest('.col-text');
    catchedTargetLi = event.target.closest('li');
    // console.log( 'TOOOOO' ,event)
    // console.log(draggableElement.previousElementSibling.children[3], catchedTargetLi.previousElementSibling.children[3]) // ??????????
    if ((event.target.closest('.over-top')) 
    && (draggableElement.children[0] !== event.target.closest('.over-top')) 
    // && (draggableElement.parentElement.children[3] !== this.children[3]) //?????????????????????????
    ){
        event.target.closest('.over-top').style.height = '111px';
        event.target.closest('.over-top').firstChild.style.height = '200px'; 
     
    } else if(event.target.closest('.over-bottom') && draggableElement.children[3] !== event.target.closest('.over-bottom')) {
        event.target.closest('.over-bottom').style.height = '111px';
        event.target.closest('.over-bottom').firstChild.style.height = '200px';
    }
}

function handleDragLeave(event) {
    event.preventDefault();
    catchedTargetLi = event.target.closest('li');
    // console.log('LEAVE', event.target.closest('li').children[0].children[0])

    catchedTargetLi.children[0].style.height = '0px';
    catchedTargetLi.children[0].children[0].style.height = '80px'; 

    catchedTargetLi.children[3].style.height = '0px';
    catchedTargetLi.children[3].children[0].style.height = '80px'; 
  
}

function handleDrop(event) {
    catchedTargetLi = event.target.closest('li');
   
    if (event.target.closest('.over-top')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi)
        catchedTargetLi.children[0].style.height = '0px';
        catchedTargetLi.children[0].children[0].style.height = '80px'; 
    } else if (event.target.closest('.over-bottom')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi.nextElementSibling)
        catchedTargetLi.children[3].style.height = '0px';
        catchedTargetLi.children[3].children[0].style.height = '80px'; 
    }
}


function handleDragEnd(event) {
    this.style.opacity = '1'; 
    
    catchedTargetLi = event.target.closest('li');   
}

function dnd(el) {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
}

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
    // catchedTargetLi = event.target.closest('li');
    // console.log( 'TOOOOO' ,event)
    // console.log(draggableElement.previousElementSibling.children[2], catchedTargetLi.children[2]) // ??????????
    if (event.target.closest('.over-top') && draggableElement.children[0] !== event.target.closest('.over-top')) {
        event.target.closest('.over-top').style.height = '111px';
        event.target.closest('.over-top').firstChild.style.height = '200px'; 
     
    } else if(event.target.closest('.over-bottom') && draggableElement.children[3] !== event.target.closest('.over-bottom')) {
        event.target.closest('.over-bottom').style.height = '111px';
        event.target.closest('.over-bottom').firstChild.style.height = '200px';
    }
    


    // if (event.target.closest('.col-header') 
    //     && draggableElement.children[1] !== event.target.closest('.col-header') 
    //     && draggableElement.previousElementSibling.children[2] !== catchedTargetLi.children[2]) { /// ?????????????????????

    //     catchedTargetLi.children[0].style.display = 'block'; // zmiana style w inline nie działa
    //     // console.log('TOP',targetTopLi.parentElement, targetTopLi)
    //     // console.log('BOTTOM',targetBottomLi.parentElement, targetBottomLi)
    // } else if (event.target.closest('.col-text') 
    //     && draggableElement.children[2] !== event.target.closest('.col-text')) {
        
    //     catchedTargetLi.children[3].style.height = '111px'; // lastChild i firstChild łapie element jako "TEXT"
    //     // catchedTargetLi.lastChild.classList.add('over-bottom') // animation run
    // } 
}

function handleDragLeave(event) {
    event.preventDefault();
    catchedTargetLi = event.target.closest('li');
    console.log('LEAVE', event.target.closest('li').children[0].children[0])

    catchedTargetLi.children[0].style.height = '0px';
    catchedTargetLi.children[0].children[0].style.height = '100px'; 

    catchedTargetLi.children[3].style.height = '0px';
    catchedTargetLi.children[3].children[0].style.height = '100px'; 
  
}

function handleDragExit(event) {
    // catchedTargetLi = event.target.closest('li');

    // catchedTargetLi.children[0].style.display = 'none';
    // catchedTargetLi.children[3].style.display = 'none';
}

function handleDrop(event) {
    catchedTargetLi = event.target.closest('li');
   
    if (event.target.closest('.over-top')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi)
        catchedTargetLi.children[0].style.height = '0px';
    } else if (event.target.closest('.over-bottom')) {
        catchedTargetLi.parentElement.insertBefore(draggableElement, catchedTargetLi.nextElementSibling)
        catchedTargetLi.children[3].style.height = '0px';
    }
}


function handleDragEnd(event) {
    this.style.opacity = '1'; 
    
    catchedTargetLi = event.target.closest('li');
    // catchedTargetLi.lastChild.style.display = 'none';
}

function dnd(el) {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragenter', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('dragexit', handleDragExit, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
}

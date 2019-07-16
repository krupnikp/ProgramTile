let draggableElement = null;

function handleDragStart(event) {
    console.log(event, 'dragstart');
    draggableElement = event.target.outerHTML;  // albo ... = this

}

function handleDragOver(event) {
    event.preventDefault();
    // console.log(event.target.outerHTML)
    // console.log(this)
    this.classList.add('over')

    // console.log('OVER',event, document.querySelector('.col-list'));
}


function handleDragEnter(event) {
    event.preventDefault();

}

// function handleDragLeave(e) {
// }

function handleDrop(event) {
    this.insertAdjacentHTML('afterend', draggableElement);
    // event.target.parentElement.removeChild(event.target);
    console.log('DROP',event)
}


// function handleDragEnd(event) {

//     // event.target.parentElement.appendChild(this) = draggableElement;
    
//     // event.target.parentElement.removeChild(event.target);

   
//     console.log('dragEND',event);
// }

function dnd(el) {
    const parentEl = el.parentElement
    el.addEventListener('dragstart', handleDragStart, false);
    // parentEl.addEventListener('dragenter', handleDragEnter, false);
    el.addEventListener('dragover', handleDragOver, false);
    // el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    // el.addEventListener('dragend', handleDragEnd, false);
}

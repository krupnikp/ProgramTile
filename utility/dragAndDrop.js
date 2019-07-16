let draggableElement = null;
let targetElementHigherParent = null;

function handleDragStart(event) {
    console.log(event, 'dragstart');
    draggableElement = event.target;  // albo ... = this
    // console.log(event.target)
    // event.dataTransfer.setData('text/html', event.target.outerHTML);
    this.children[0].style.opacity = '0.5'; 
    this.children[1].style.opacity = '0.5';
}

function handleDragOver(event) {
    event.preventDefault();

    targetElementHigherParent = event.target.closest('li');
    targetElementHigherParent.lastChild.style.display = 'block';
    // console.log('OVER',event, document.querySelector('.col-list'));
}


function handleDragEnter(event) {
    event.preventDefault();

    // this.insertAdjacentHTML('afterend', targetElement);
    
}

function handleDragLeave(event) {
    targetElementHigherParent = event.target.closest('li');
    // targetElementHigherParent.lastChild.style.display = 'none';
}

function handleDrop(event) {
    targetElementHigherParent = event.target.closest('li');
    // let dropedData = event.dataTransfer.getData('text/html');
    // this.insertAdjacentHTML('afterend', draggableElement);
    targetElementHigherParent.parentElement.insertBefore(draggableElement, targetElementHigherParent.nextElementSibling)
    // this.parentElement.replaceChild(draggableElement, event.target)
    // event.target.parentElement.removeChild(draggableElement);
    console.log('DROP',targetElementHigherParent.parentElement)
    targetElementHigherParent.lastChild.style.display = 'none';

}


function handleDragEnd(event) {
    this.children[0].style.opacity = '1'; 
    this.children[1].style.opacity = '1';
    
    targetElementHigherParent = event.target.closest('li');
    targetElementHigherParent.lastChild.style.display = 'none';


    // event.target.parentElement.appendChild(this) = draggableElement;
    
    // event.target.parentElement.removeChild(event.target);

   
    console.log('dragEND',event);
}

function dnd(el) {
    el.addEventListener('dragstart', handleDragStart, false);
    el.addEventListener('dragenter', handleDragEnter, false);
    el.addEventListener('dragover', handleDragOver, false);
    el.addEventListener('dragleave', handleDragLeave, false);
    el.addEventListener('drop', handleDrop, false);
    el.addEventListener('dragend', handleDragEnd, false);
}

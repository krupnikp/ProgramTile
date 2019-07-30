class DnD {
    constructor() {
        this.sizeTopTargetShow = '300px';
        this.sizeBottomTargetShow = '300px';
        this.sizeTargetInitial = '80px';
        this.sizeViewInitial = '0px';
        // this.handleDragEnter = this.handleDragEnter.bind(this)

        this.dropFailed = false;
        this.draggableElement = null;
        this.sizeViewShow = null;
        this.offsetX = null;
        this.offsetY = null;
        this.nextElement = null;
        this.previousElement = null;
        this.targetTop = null;
        this.targetBottom = null;
        this.catchedTargetLi = null;

        this.dragBottomTargets = document.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`);
        this.dragTopTargets = document.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`);
        this.draggableCursor = document.getElementById('draggableCursor');
    }

    handleDragStart = (event) => {
        this.dropFailed = true;
        this.draggableElement = event.target;

        this.sizeViewShow = event.srcElement.clientHeight;
        this.offsetX = event.offsetX;
        this.offsetY = event.offsetY;

        this.nextElement = this.draggableElement.nextElementSibling;
        this.previousElement = this.draggableElement.previousElementSibling;

        this.draggableElement.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).classList.add('hidden');
        this.draggableElement.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).classList.add('hidden');

        this.draggableCursor.classList.remove('hidden');

        this.closestTargetHide(this.previousElement, this.nextElement);
        this.draggableElement.style.opacity = '0.3';
    }

    handleDragCursor = (event) => {

        this.draggableCursor.style.top = (event.clientY - this.offsetY + 1) + 'px';
        this.draggableCursor.style.left = (event.clientX - this.offsetX + 1) + 'px';
    }

    closestTargetHide(previousElement, nextElement) {
        if (previousElement) {
            const prevElBottomTarget = previousElement.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`)
            prevElBottomTarget.classList.contains('hidden') ? prevElBottomTarget.classList.remove('hidden') : prevElBottomTarget.classList.add('hidden');
        }
        if (nextElement) {
            const prevElTopTarget = nextElement.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`)
            prevElTopTarget.classList.contains('hidden') ? prevElTopTarget.classList.remove('hidden') : prevElTopTarget.classList.add('hidden');
        }
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDragEnter = (event) => {
        event.preventDefault();
        this.targetTop = event.target.closest('.over-top');
        this.targetBottom = event.target.closest('.over-bottom');

        if (this.targetTop) {
            event.target.parentElement.style.height = this.sizeViewShow + 'px';
            event.target.style.height = this.sizeTopTargetShow;

        } else if (this.targetBottom) {
            event.target.parentElement.style.height = this.sizeViewShow + 'px';
            event.target.style.height = this.sizeBottomTargetShow;
        }
    }

    handleDragLeave = (event) => {
        event.preventDefault();

        event.target.parentElement.style.height = this.sizeViewInitial;
        event.target.style.height = this.sizeTargetInitial;
    }

    handleDrop = (event) => {
        event.preventDefault();
        this.catchedTargetLi = event.target.closest('li');
        this.dropFailed = false;
        this.draggableElement.classList.add('animationDrop');
        this.removeClass('animationDrop', 800)

        if (event.target.closest('.over-top')) {
            this.catchedTargetLi.parentElement.insertBefore(this.draggableElement, this.catchedTargetLi);
            this.targetTop.style.height = this.sizeViewInitial;
            this.targetTop.children[0].style.height = this.sizeTargetInitial;
        } else if (event.target.closest('.over-bottom')) {
            this.catchedTargetLi.parentElement.insertBefore(this.draggableElement, this.catchedTargetLi.nextElementSibling)
            this.targetBottom.style.height = this.sizeViewInitial;
            this.targetBottom.children[0].style.height = this.sizeTargetInitial;
        }
    }

    handleDragEnd = () => {
        if (this.dropFailed) {
            this.draggableElement.classList.add('animationDropFail');
            this.removeClass('animationDropFail', 600)
        }
        this.draggableElement.style.opacity = '1';
        this.draggableElement.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).classList.remove('hidden');
        this.draggableElement.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).classList.remove('hidden');

        this.draggableCursor.classList.add('hidden');

        this.closestTargetHide(this.previousElement, this.nextElement)
    }

    removeClass(className, timeout) {
        setTimeout(() => this.draggableElement.classList.remove(className), timeout);
    }

    initDragAndDrop = (el) => {
        el.addEventListener('dragstart', this.handleDragStart);
        el.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).addEventListener('dragover', this.handleDragOver);
        el.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).addEventListener('dragover', this.handleDragOver);
        el.querySelector('.over-top').addEventListener('dragenter', this.handleDragEnter);
        el.querySelector('.over-bottom').addEventListener('dragenter', this.handleDragEnter);
        el.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).addEventListener('dragleave', this.handleDragLeave);
        el.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).addEventListener('dragleave', this.handleDragLeave);
        el.querySelector(`.${SELECTORS.OVER_TOP_TARGET}`).addEventListener('drop', this.handleDrop);
        el.querySelector(`.${SELECTORS.OVER_BOTTOM_TARGET}`).addEventListener('drop', this.handleDrop);
        el.addEventListener('dragend', this.handleDragEnd);
    }

    initDragCursor() {
        document.body.addEventListener('dragover', this.handleDragCursor);
    }
}
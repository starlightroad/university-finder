class View {
    appElement = document.querySelector('#app');

    _clear(element) {
        element.innerHTML = '';
    }

    _clearInput(element) {
        element.value = '';
    }

    createElement(selector, targetElement = null) {
        return (targetElement || this.appElement).querySelector(selector);
    }

    createElements(selector, targetElement = null) {
        return (targetElement || this.appElement).querySelectorAll(selector);
    }

    removeElement(element) {
        element.remove();
    }

    setParentElement(selector, targetElement = null) {
        this.parentElement = this.createElement(selector, targetElement);
    }

    toggleClass(className, targetElement) {
        targetElement.classList.toggle(className);
    }
}

export default View;

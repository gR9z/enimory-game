const displayMessage = (element, message, classe) => {
    element.classList.add(classe);
    element.textContent = message;
};

const removeMessage = (element, classe) => {
    element.classList.remove(classe);
    element.textContent = '';
};

export { displayMessage, removeMessage };

const createElement = (tagName, classes = [], attributes = {}) => {
    const element = document.createElement(tagName);

    if (classes.length) element.classList.add(...classes);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'textContent') {
            element.textContent = value;
        } else {
            element.setAttribute(key, value);
        }
    }

    return element;
};

export default createElement;

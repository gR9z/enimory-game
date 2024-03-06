import { isAuthenticated } from './auth-services.js';

const authMenuHandler = () => {
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');

    const liElement = document.createElement('li');
    const linkElement = document.createElement('a');

    linkElement.classList.add('nav__link', 'nav__link--logout');
    linkElement.textContent = 'Logout';
    liElement.appendChild(linkElement);

    if (isAuthenticated()) {
        for (const navLink of navLinks) {
            if (navLink.getAttribute('href') === 'user-auth.html') {
                navLink.parentElement.remove();
            }
        }

        navList.appendChild(liElement);
    } else {
        document
            .querySelector('li a[href="settings.html"]')
            .parentNode.remove();
    }
};

export default authMenuHandler;

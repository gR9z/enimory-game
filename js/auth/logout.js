import { isAuthenticated } from './auth-services.js';

const logout = () => {
    const logoutLink = document.querySelector('.nav__link--logout');

    if (!logoutLink) return;

    logoutLink.addEventListener('click', () => {
        if (isAuthenticated()) {
            localStorage.removeItem('userProfileInfo');
            window.location.href = '/';
        }
    });
};

export default logout;

import getUserInfo from './get-user-info.js';

const displayUserInfo = () => {
    const usernameElement = document.querySelector('#username');
    const emailElement = document.querySelector('#email');

    const { username, email } = getUserInfo();

    usernameElement.textContent = username;
    emailElement.textContent = email;
};

displayUserInfo();

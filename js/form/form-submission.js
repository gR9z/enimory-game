import hash from '../utils/hash.js';
import { displayMessage, removeMessage } from '../common/message-handler.js';
import passwordStrength from './password-strength.js';

const formLogin = document.querySelector('#auth__form-login');
const formRegister = document.querySelector('#auth__form-register');

const formLoginMessage = document.querySelector('.auth-form__message--login');
const formRegisterMessage = document.querySelector(
    '.auth-form__message--register'
);
const password = document.querySelector('#password-register');

const usersInLocalStorage = localStorage.getItem('users');
const usersParse = new Map(JSON.parse(usersInLocalStorage));

/* ======================================= */
/* ======== LOGIN FORM SUBMISSION ======== */
/* ======================================= */
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(formLogin));

    const users = [...usersParse.values()];
    const user = users.find((user) => user.email === data.email);

    if (user && user.password === (await hash(data.password))) {
        window.location.href = 'enimory.html';
    } else {
        displayMessage(formLoginMessage, 'Credentials are not good!', 'error');
    }
});

/* ========================================== */
/* ======== REGISTER FORM SUBMISSION ======== */
/* ========================================== */
formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(formRegister));

    const users = [...usersParse.values()];

    const user = users.find((user) => user.email === data.email);
    if (user) {
        displayMessage(
            formRegisterMessage,
            'This email address already exist!',
            'error'
        );
        return;
    }

    if (data.username.length < 3) {
        displayMessage(
            formRegisterMessage,
            'Username must have at least 3 characters!',
            'error'
        );
        return;
    }

    if (data.password.length < 6) {
        displayMessage(
            formRegisterMessage,
            'Password must have at least 6 characters!',
            'error'
        );
        return;
    }

    if (data.password !== data.passwordConfirm) {
        displayMessage(formRegisterMessage, "Passwords don't match!", 'error');
        return;
    }

    data.password = await hash(data.password);
    delete data.passwordConfirm;

    usersParse.set(await hash(data.email), data);

    const userStringify = JSON.stringify(Array.from(usersParse.entries()));

    localStorage.setItem('users', userStringify);
    window.location.href = 'settings.html';
});

formRegister.addEventListener('reset', async (e) => {
    e.preventDefault();
    removeMessage(formRegisterMessage, 'error');
});

formRegister.addEventListener('input', () => passwordStrength(password.value));

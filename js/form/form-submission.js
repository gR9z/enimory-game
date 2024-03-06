import hash from '../utils/hash.js';
import { displayMessage, removeMessage } from '../common/message-handler.js';
import {
    passwordStrength,
    passwordStrengthIndicator,
} from './password-strength.js';
import showPassword from './show-password.js';
import validateRegistrationData from './validate-registration-data.js';
import {
    getUserByEmail,
    setUserInfoInLocalStorage,
} from '../auth/auth-services.js';

const formLogin = document.querySelector('#auth__form-login');
const formRegister = document.querySelector('#auth__form-register');

const formLoginMessage = document.querySelector('.auth-form__message--login');
const formRegisterMessage = document.querySelector(
    '.auth-form__message--register'
);

const password = document.querySelector('#password-register');
const authFormIcon = document.querySelector('#auth-form__icon');

const usersInLocalStorage = localStorage.getItem('users');
const parsedUsers = new Map(JSON.parse(usersInLocalStorage));

/* ======================================= */
/* ======== LOGIN FORM SUBMISSION ======== */
/* ======================================= */
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(formLogin));
    const user = getUserByEmail(data.email);

    if (user && user.password === (await hash(data.password))) {
        setUserInfoInLocalStorage(data.email, user.username);
        window.location.href = 'enimory.html';
    } else {
        displayMessage(
            formLoginMessage,
            "Oops! We couldn't log you in with those details. Double-check your email and password.",
            'error'
        );
    }
});

/* ========================================== */
/* ======== REGISTER FORM SUBMISSION ======== */
/* ========================================== */
formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(formRegister));
    const validationError = validateRegistrationData(data);

    if (validationError) {
        displayMessage(formRegisterMessage, validationError, 'error');
        return;
    }

    data.password = await hash(data.password);
    delete data.passwordConfirm;

    parsedUsers.set(await hash(data.email), data);
    const userStringify = JSON.stringify(Array.from(parsedUsers.entries()));

    localStorage.setItem('users', userStringify);
    setUserInfoInLocalStorage(data.email, data.username);

    window.location.href = 'settings.html';
});

formRegister.addEventListener('reset', async (e) => {
    e.preventDefault();
    removeMessage(formRegisterMessage, 'error');
});

formRegister.addEventListener('input', () => passwordStrength(password.value));

password.addEventListener('input', (e) => passwordStrengthIndicator(e));

authFormIcon.addEventListener('click', () =>
    showPassword(authFormIcon, password)
);

import hash from '../utils/hash.js';
import { displayMessage, removeMessage } from '../common/message-handler.js';
import { passwordStrengthIndicator } from './password-strength.js';
import showPassword from './show-password.js';
import validateRegistrationData from './validate-registration-data.js';
import {
    getUserByEmail,
    updateUserInLocalStorage,
} from '../auth/auth-services.js';
import registerUser from '../auth/user-registration.js';

const formLogin = document.querySelector('#auth__form-login');
const formRegister = document.querySelector('#auth__form-register');

const formLoginMessage = document.querySelector('.auth-form__message--login');
const formRegisterMessage = document.querySelector(
    '.auth-form__message--register'
);

const password = document.querySelector('#password-register');
const authFormIcon = document.querySelector('#auth-form__icon');

/* ======================================= */
/* ======== LOGIN FORM SUBMISSION ======== */
/* ======================================= */
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(formLogin));
    const user = getUserByEmail(data.email);

    if (user && user.password === (await hash(data.password))) {
        updateUserInLocalStorage({
            email: user.email,
            username: user.username,
        });

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
    const emailHash = await hash(data.email);
    const validationError = validateRegistrationData(data);

    if (validationError) {
        displayMessage(formRegisterMessage, validationError, 'error');
        return;
    }

    data.password = await hash(data.password);
    delete data.passwordConfirm;

    registerUser(emailHash, data);
    window.location.href = 'settings.html';
});

formRegister.addEventListener('reset', async (e) => {
    e.preventDefault();
    removeMessage(formRegisterMessage, 'error');
});

password.addEventListener('input', (e) => passwordStrengthIndicator(e));

authFormIcon.addEventListener('click', () =>
    showPassword(authFormIcon, password)
);

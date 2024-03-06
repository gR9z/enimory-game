import { updateUserInLocalStorage } from '../auth/auth-services.js';

const optionForm = document.querySelector('#settings-form');

const setUserOptionInLocalStorage = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(optionForm));
    updateUserInLocalStorage(data);
};

optionForm.addEventListener('submit', setUserOptionInLocalStorage);

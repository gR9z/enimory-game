import { updateUserInLocalStorage } from '../auth/auth-services.js';
import showToast from '../common/show-toast.js';

const optionForm = document.querySelector('#settings-form');

const setUserOptionInLocalStorage = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(optionForm));
    updateUserInLocalStorage(data);
    showToast();
};

optionForm.addEventListener('submit', setUserOptionInLocalStorage);

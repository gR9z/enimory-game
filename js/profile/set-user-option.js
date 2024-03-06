import { getUserInfo } from './display-user-info.js';
const optionForm = document.querySelector('#settings-form');

const setUserOptionInLocalStorage = (e) => {
    e.preventDefault();

    const userInfo = getUserInfo();
    console.log('userInfo', userInfo);

    const data = Object.fromEntries(new FormData(optionForm));
    console.log('data', data);
};

optionForm.addEventListener('submit', setUserOptionInLocalStorage);

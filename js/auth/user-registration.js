import { updateUserInLocalStorage } from './auth-services.js';

const registerUser = (emailHash, data) => {
    const usersInLocalStorage = localStorage.getItem('users');
    const parsedUsers = new Map(JSON.parse(usersInLocalStorage));

    parsedUsers.set(emailHash, data);
    const userStringify = JSON.stringify(Array.from(parsedUsers.entries()));

    localStorage.setItem('users', userStringify);
    updateUserInLocalStorage({ email: data.email, username: data.username });
};

export default registerUser;

const getParsedUsers = () => {
    const usersInLocalStorage = localStorage.getItem('users');
    const parsedUsers = usersInLocalStorage
        ? new Map(JSON.parse(usersInLocalStorage))
        : new Map();

    return [...parsedUsers.values()];
};

const isUserRegistered = (email) => {
    const users = getParsedUsers();
    return users.some((user) => user.email === email);
};

const getUserByEmail = (email) => {
    const users = getParsedUsers();
    return users.find((user) => user.email === email);
};

const setUserInfoInLocalStorage = (email, username) => {
    localStorage.setItem('userProfileInfo', JSON.stringify([email, username]));
};

export { isUserRegistered, getUserByEmail, setUserInfoInLocalStorage };

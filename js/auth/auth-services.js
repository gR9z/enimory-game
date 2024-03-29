const isAuthenticated = () => {
    if (!localStorage.getItem('userProfileInfo')) return false;
    return true;
};

const getParsedUsers = () => {
    const usersInLocalStorage = localStorage.getItem('users');
    const parsedUsers = usersInLocalStorage
        ? new Map(JSON.parse(usersInLocalStorage))
        : new Map();

    return [...parsedUsers.values()];
};

const checkUserEmailRegistration = (email) => {
    const users = getParsedUsers();
    return users.some((user) => user.email === email);
};

const getUserByEmail = (email) => {
    const users = getParsedUsers();
    return users.find((user) => user.email === email);
};

const updateUserInLocalStorage = (newUserData) => {
    const key = 'userProfileInfo';
    const existingData = localStorage.getItem(key);

    let userData = existingData ? JSON.parse(existingData) : {};
    userData = { ...userData, ...newUserData };

    localStorage.setItem(key, JSON.stringify(userData));
};

export {
    isAuthenticated,
    getParsedUsers,
    checkUserEmailRegistration,
    getUserByEmail,
    updateUserInLocalStorage,
};

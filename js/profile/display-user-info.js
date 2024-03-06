const getUserInfo = () => {
    const userProfileInfo = localStorage.getItem('userProfileInfo');

    if (userProfileInfo) {
        const parsedUserInfo = JSON.parse(userProfileInfo);
        const [email, username] = parsedUserInfo;

        return { username, email };
    } else {
        return {
            username: 'Stranger',
            email: 'im-not-supposed-to-be@here.com',
        };
    }
};

const displayUserInfo = () => {
    const usernameElement = document.querySelector('#username');
    const emailElement = document.querySelector('#email');

    const { username, email } = getUserInfo();

    usernameElement.textContent = username;
    emailElement.textContent = email;
};

displayUserInfo();

export { getUserInfo };

const getUserInfo = () => {
    const userProfileInfo = localStorage.getItem('userProfileInfo');

    if (userProfileInfo) {
        const parsedUserInfo = JSON.parse(userProfileInfo);
        const { email, username } = parsedUserInfo;

        return { username, email };
    } else {
        return {
            username: 'Stranger',
            email: 'im-not-supposed-to-be@here.com',
        };
    }
};

export default getUserInfo;

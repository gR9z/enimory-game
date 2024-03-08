const getUserInfo = () => {
    const userProfileInfo = localStorage.getItem('userProfileInfo');

    if (userProfileInfo) {
        const parsedUserInfo = JSON.parse(userProfileInfo);
        const {
            email,
            username,
            scores,
            theme = 'pets',
            difficulty = 16,
        } = parsedUserInfo;

        return { username, email, scores, theme, difficulty };
    } else {
        return {
            username: 'Stranger',
            email: 'im-not-supposed-to-be@here.com',
            scores: [],
            theme: 'pets',
            difficulty: '16',
        };
    }
};

export default getUserInfo;

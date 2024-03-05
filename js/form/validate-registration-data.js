import { isUserRegistered } from '../utils/auth-services.js';

const validateRegistrationData = (data) => {
    if (data.email && isUserRegistered(data.email)) {
        return "Looks like you're already with us! Try signing in instead.";
    }

    if (data.username.length < 3) {
        return 'Usernames need to be at least 3 characters long. Please choose a longer one.';
    }

    if (data.password.length < 6) {
        return 'For a stronger password, please use at least 6 characters.';
    }

    if (data.password !== data.passwordConfirm) {
        return 'Oops! Your passwords didn’t match. Try typing them again.';
    }

    return null;
};

export default validateRegistrationData;

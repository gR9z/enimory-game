const passwordStrength = (password) => {
    let strength = 0;

    if (password.length >= 6) strength += 1;
    if (
        password.length > 7 &&
        (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password))
    )
        strength += 1;
    if (
        password.length > 9 &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    )
        strength += 1;

    if (strength === 1) return (1 / 3).toFixed(2);
    if (strength === 2) return (2 / 3).toFixed(2);
    if (strength === 3) return 1;
    return 0;
};

export default passwordStrength;

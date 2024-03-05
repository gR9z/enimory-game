const bar = document.querySelector('#strength-bar');

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

    if (strength === 1) return 0.33;
    if (strength === 2) return 0.66;
    if (strength === 3) return 1;
    return 0;
};

const passwordStrengthIndicator = (event) => {
    const strength = passwordStrength(event.target.value);
    if (event.target.value) {
        bar.parentElement.style.setProperty('display', 'flex');
    } else {
        bar.parentElement.style.setProperty('display', 'none');
    }

    const width = strength * 100;
    bar.style.width = `${width}%`;

    if (strength === 0) bar.style.backgroundColor = 'var(--text)';
    if (strength === 0.33) bar.style.backgroundColor = 'var(--error)';
    if (strength === 0.66)
        bar.style.backgroundColor = 'var(--secondarycontrast)';
    if (strength === 1) bar.style.backgroundColor = 'var(--textcontrast)';
};

export { passwordStrength, passwordStrengthIndicator };

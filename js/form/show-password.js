const showPassword = (element, input) => {
    const isPassword = input.getAttribute('type') === 'password';
    input.setAttribute('type', isPassword ? 'text' : 'password');

    element.classList.toggle('ri-eye-line', !isPassword);
    element.classList.toggle('ri-eye-off-line', isPassword);
};

export default showPassword;

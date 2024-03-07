const showToast = () => {
    const toast = document.querySelector('#toast');

    toast.textContent = 'Your changes have been saved.';
    toast.style.bottom = 'var(--space-5)';

    setTimeout(() => {
        toast.style.bottom = '-10%';
    }, 2500);
};

export default showToast;

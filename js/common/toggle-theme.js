const toggleTheme = () => {
    const themeToggle = document.querySelector('#theme-toggle');

    const updateThemeAndIcon = () => {
        const htmlElement = document.querySelector('html');
        const logoElement = document.querySelector('.logo img');
        const currentTheme = htmlElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            themeToggle.className = 'ri-moon-line';
            logoElement.src = './assets/images/logo-light.svg';
        }

        if (currentTheme === 'light') {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggle.className = 'ri-sun-line';
            logoElement.src = './assets/images/logo-dark.svg';
        }

        localStorage.setItem('theme', htmlElement.getAttribute('data-theme'));
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.querySelector('html').setAttribute('data-theme', savedTheme);
    themeToggle.className =
        savedTheme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';

    const logoElement = document.querySelector('.logo img'); //
    logoElement.src =
        savedTheme === 'dark'
            ? './assets/images/logo-dark.svg'
            : './assets/images/logo-light.svg';

    themeToggle.addEventListener('click', updateThemeAndIcon);
};

export default toggleTheme;

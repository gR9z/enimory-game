const adjustNavTop = () => {
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;

    document.documentElement.style.setProperty(
        '--header-height',
        `${headerHeight}px`
    );
};

window.addEventListener('resize', adjustNavTop);

export default adjustNavTop;

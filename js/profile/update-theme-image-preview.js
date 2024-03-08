const themeSelectElement = document.querySelector('#theme');

const updateThemeImagePreview = (theme) => {
    const themeImagePreview = document.querySelector(
        '#settings-form__theme-preview-img img'
    );

    const imagePath = `./assets/images/tiles/${theme}/${theme}-theme.jpg`;

    themeImagePreview.src = imagePath;
};

themeSelectElement.addEventListener('change', (e) => {
    updateThemeImagePreview(e.target.value);
});

export default updateThemeImagePreview;

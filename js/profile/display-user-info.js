import createElement from '../utils/create-element.js';
import getUserInfo from './get-user-info.js';
import updateThemeImagePreview from './update-theme-image-preview.js';

const displayUserInfo = () => {
    const usernameElement = document.querySelector('#username');
    const emailElement = document.querySelector('#email');
    const scoresElement = document.querySelector('#scores__list');
    const themeSelectElement = document.querySelector('#theme');
    const difficultySelectElement = document.querySelector('#difficulty');

    const { username, email, scores = [], theme, difficulty } = getUserInfo();
    console.log(difficulty);
    usernameElement.textContent = username;
    emailElement.textContent = email;

    [...themeSelectElement.options].forEach((option) => {
        option.selected = option.value === theme;
    });

    updateThemeImagePreview(theme);

    [...difficultySelectElement.options].forEach((option) => {
        option.selected = option.value === difficulty.toString();
    });

    if (Array.isArray(scores) && scores.length) {
        for (const { date, theme, difficulty, score } of scores) {
            const listItem = createElement('li', ['scores__item']);
            const dateObj = new Date(date);

            const formattedDate = dateObj.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });

            const difficultyMap = {
                4: 'Very easy',
                12: 'Easy',
                16: 'Medium',
                20: 'Hard',
            };

            let difficultyDescription = difficultyMap[difficulty] || 'Unknown';

            listItem.textContent = `Date: ${formattedDate} | Theme: ${theme} | Difficulty: ${difficultyDescription} | Score: ${score}`;
            scoresElement.appendChild(listItem);
        }
    } else {
        const noScoresItem = createElement('li', ['scores__item']);
        noScoresItem.textContent = 'No score recorded.';
        scoresElement.appendChild(noScoresItem);
    }
};

displayUserInfo();

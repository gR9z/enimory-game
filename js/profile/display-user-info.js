import createElement from '../utils/create-element.js';
import getUserInfo from './get-user-info.js';

const displayUserInfo = () => {
    const usernameElement = document.querySelector('#username');
    const emailElement = document.querySelector('#email');
    const scoresElement = document.querySelector('#scores__list');

    const { username, email, scores = [] } = getUserInfo();
    usernameElement.textContent = username;
    emailElement.textContent = email;

    if (Array.isArray(scores) && scores.length) {
        for (const { date, theme, difficulty, score } of scores) {
            const listItem = createElement('li', ['scores__item']);
            const dateObj = new Date(date);

            const formattedDate = dateObj.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            });

            listItem.textContent = `Date: ${formattedDate}, Theme: ${theme}, Difficulty: ${difficulty}, Score: ${score}`;
            scoresElement.appendChild(listItem);
        }
    } else {
        const noScoresItem = createElement('li', ['scores__item']);
        noScoresItem.textContent = 'No score recorded.';
        scoresElement.appendChild(noScoresItem);
    }
};

displayUserInfo();

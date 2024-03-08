import getUserInfo from '../profile/get-user-info.js';
import Board from './game/Board.js';
import GameManager from './game/GameManager.js';

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load(
    'particles-js',
    './../assets/particles/particles.json',
    function () {}
);

const userInfo = getUserInfo();
const board = new Board(userInfo.difficulty, userInfo.theme);
const gameManager = new GameManager(board);

gameManager.initGame();

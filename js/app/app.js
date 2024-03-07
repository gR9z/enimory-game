import Board from './game/Board.js';
import GameManager from './game/GameManager.js';

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load(
    'particles-js',
    './../assets/particles/particles.json',
    function () {}
);

const board = new Board();
const gameManager = new GameManager(board);

gameManager.initGame();

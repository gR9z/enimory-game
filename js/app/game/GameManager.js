import getUserInfo from '../../profile/get-user-info.js';
import { updateUserInLocalStorage } from '../../auth/auth-services.js';
export default class GameManager {
    #board;
    #firstSelectedTile;
    #secondSelectedTile;
    #isProcessing;
    #matchPairs;
    #score;
    #victoryMessage;

    constructor(board) {
        this.#board = board;
        this.#firstSelectedTile = null;
        this.#secondSelectedTile = null;
        this.#isProcessing = false;
        this.#matchPairs = 0;
        this.#score = 0;
        this.#victoryMessage = document.querySelector('#victoryMessage');
    }

    initGame() {
        this.#board.render();
        this.#attachTileClickListeners();

        document
            .querySelector('#resetButton')
            .addEventListener('click', () => this.#restartGame());
    }

    #restartGame() {
        this.#matchPairs = 0;
        this.#score = 0;
        this.#firstSelectedTile = null;
        this.#secondSelectedTile = null;
        this.#isProcessing = false;
        this.#hideVictoryMessage();
        this.#board.initializeTiles();
        this.#board.render();
    }

    #resetTiles() {
        this.#firstSelectedTile = null;
        this.#secondSelectedTile = null;
        this.#isProcessing = false;
    }

    #checkWin() {
        if (this.#board.getSize() / 2 === this.#matchPairs) {
            this.#showVictoryMessage();
            this.#updateUserProfileInfo();
            return true;
        }
    }

    #updateUserProfileInfo() {
        const victoryData = {
            date: new Date().toISOString(),
            theme: this.#board.getTheme(),
            difficulty: this.#board.getSize(),
            score: this.#score,
        };

        const key = 'userProfileInfo';
        const existingData = localStorage.getItem(key);
        let userProfileInfo = existingData ? JSON.parse(existingData) : {};

        if (!Array.isArray(userProfileInfo.scores)) {
            userProfileInfo.scores = [];
        }

        userProfileInfo.scores.unshift(victoryData);
        userProfileInfo.scores = userProfileInfo.scores.slice(0, 10);

        updateUserInLocalStorage(userProfileInfo);
    }

    #showVictoryMessage() {
        document.querySelector('#score').textContent = this.#score;

        setTimeout(() => {
            this.#victoryMessage.classList.remove('hidden');
            this.#victoryMessage.classList.add('visible');
        }, 300);
    }

    #hideVictoryMessage() {
        setTimeout(() => {
            this.#victoryMessage.classList.remove('visible');
            this.#victoryMessage.classList.add('hidden');
        }, 300);
    }

    #attachTileClickListeners() {
        const gameContainer = this.#board.getContainer();
        gameContainer.addEventListener('click', (e) => {
            const tileElement = e.target.closest('.tile');

            if (tileElement) {
                const clickedTileIndex = Number(tileElement.dataset.index);
                this.#handleTileClick(clickedTileIndex);
            }
        });
    }

    #handleTileClick(clickedTileIndex) {
        if (
            this.#isProcessing ||
            this.#board.getTile(clickedTileIndex).isTileFlipped()
        )
            return;

        const clickedTile = this.#board.getTile(clickedTileIndex);
        clickedTile.flip();
        this.#board.flipTile(clickedTileIndex);

        if (!this.#firstSelectedTile) {
            this.#firstSelectedTile = clickedTile;
        } else {
            this.#secondSelectedTile = clickedTile;
            this.#isProcessing = true;

            if (
                this.#firstSelectedTile.getId() ===
                this.#secondSelectedTile.getId()
            ) {
                this.#score++;
                this.#matchPairs++;
                this.#resetTiles();
                this.#checkWin();
            } else {
                this.#score++;

                setTimeout(() => {
                    this.#firstSelectedTile.flip();
                    this.#board.flipTile(
                        this.#board.getTiles().indexOf(this.#firstSelectedTile)
                    );

                    this.#secondSelectedTile.flip();
                    this.#board.flipTile(
                        this.#board.getTiles().indexOf(this.#secondSelectedTile)
                    );

                    this.#resetTiles();
                }, 1500);
            }
        }
    }
}

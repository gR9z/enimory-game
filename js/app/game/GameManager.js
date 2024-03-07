export default class GameManager {
    #board;
    #firstSelectedTile;
    #secondSelectedTile;
    #isProcessing;
    #matchPairs;
    #score;

    constructor(board) {
        this.#board = board;
        this.#firstSelectedTile = null;
        this.#secondSelectedTile = null;
        this.#isProcessing = false;
        this.#matchPairs = 0;
        this.#score = 0;
    }

    initGame() {
        this.#board.render();
        this.#attachTileClickListeners();

        document
            .querySelector('#resetButton')
            .addEventListener('click', () => this.#restartGame());
    }

    #restartGame() {
        //FIXME
        // console.log(this.#board.getContainer().tile);
        // this.#board.getContainer().remove();
        this.#matchPairs = 0;
        this.#firstSelectedTile = null;
        this.#secondSelectedTile = null;
        this.#isProcessing = false;
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
            return true;
        }
    }

    #showVictoryMessage() {
        const victoryMessage = document.querySelector('#victoryMessage');
        const score = document.querySelector('#score');
        score.textContent = this.#score;

        setTimeout(() => {
            victoryMessage.style.bottom = '50%';
        }, 750);
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

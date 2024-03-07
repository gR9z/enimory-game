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
    }

    #resetTiles() {
        this.#firstSelectedTile = null;
        this.#secondSelectedTile = null;

        this.#isProcessing = false;
    }

    #checkWin() {
        if (this.#board.getSize() / 2 === this.#matchPairs) return true;
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
                this.#matchPairs++;
                this.#score++;
                this.#resetTiles();
                this.#checkWin();
            } else {
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

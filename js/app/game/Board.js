import Tile from './Tile.js';

export default class Board {
    #size;
    #theme;
    #tiles;
    #container;

    constructor(size = 20, theme = 'pets') {
        this.#size = size;
        this.#theme = theme;
        this.#tiles = [];
        this.#container = document.querySelector('#game');
        this.#initializeTiles();
    }

    #initializeTiles() {
        const themeImagesPath = this.#getImagesPath(this.#theme);
        const shuffledImages = this.#shuffle(themeImagesPath).slice(
            0,
            this.#size / 2
        );

        let tempTiles = [];

        for (const [index, imagePath] of shuffledImages.entries()) {
            tempTiles.push(new Tile(index, imagePath));
            tempTiles.push(new Tile(index, imagePath));
        }

        this.#tiles = this.#shuffle(tempTiles);
    }

    #getImagesPath(theme) {
        const totalImages = 20;
        let images = [];
        for (let i = 1; i <= totalImages; i++) {
            const imagePath = `${theme}/${i}.jpg`;
            images.push(imagePath);
        }
        return images;
    }

    // Algorithm: Fisher–Yates shuffle
    // Info: https://en.wikipedia.org/wiki/Fisher-Yates_shuffle
    #shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    getContainer() {
        return this.#container;
    }

    getTiles() {
        return this.#tiles;
    }

    getTile(tileIndex) {
        return this.#tiles[tileIndex];
    }

    flipTile(tileIndex) {
        const tile = this.getTile(tileIndex);
        const imgTileElement = this.#container.querySelector(
            `[data-index="${tileIndex}"] img`
        );

        imgTileElement.setAttribute(
            'src',
            `./assets/images/tiles/${tile.getImage()}`
        );

        imgTileElement.setAttribute('alt', `${this.#theme}`);
    }

    render() {
        const mysteryImagePath = './assets/images/tiles/mystery.jpg';

        for (let i = 0; i < this.#size; i++) {
            const tileElement = document.createElement('div');
            tileElement.className = 'game__tile';
            tileElement.dataset.index = i;
            tileElement.innerHTML = `<img src=${mysteryImagePath} alt="Mystery tile" width="256" height="256" />`;
            this.#container.appendChild(tileElement);
        }
    }
}

import Tile from './Tile.js';
import createElement from '../../utils/create-element.js';

export default class Board {
    #size;
    #theme;
    #tiles;
    #container;

    constructor(size = 4, theme = 'pets') {
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

    getSize() {
        return this.#size;
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
        const tileElement = document.querySelector(
            `[data-index="${tileIndex}"]`
        );
        const tileInner = tileElement.querySelector('.tile__inner');

        tileElement.classList.toggle('flipped');

        const tile = this.getTile(tileIndex);
        const imgFront = tileInner.querySelector('.tile__front img');

        if (tile.isTileFlipped()) {
            imgFront.src = `./assets/images/tiles/${tile.getImage()}`;
            imgFront.alt = `${this.#theme}`;
        } else {
            setTimeout(() => {
                imgFront.removeAttribute('src');
                imgFront.removeAttribute('alt');
            }, 600);
        }
    }

    render() {
        const mysteryImagePath = './assets/images/tiles/mystery.jpg';

        for (let i = 0; i < this.#size; i++) {
            const tileElement = createElement('div', ['tile'], {
                'data-index': i,
            });
            const tileInner = createElement('div', ['tile__inner']);

            const tileFront = createElement('div', ['tile__front']);
            const tileBack = createElement('div', ['tile__back']);

            const imgFront = createElement('img', [], {});
            const imgBack = createElement('img', [], {
                src: mysteryImagePath,
            });

            tileFront.appendChild(imgFront);
            tileBack.appendChild(imgBack);
            tileInner.appendChild(tileFront);
            tileInner.appendChild(tileBack);
            tileElement.appendChild(tileInner);

            this.#container.appendChild(tileElement);
        }
    }
}

class Tile {
    #id;
    #image;
    #isFlipped;

    constructor(id, image) {
        this.#id = id;
        this.#image = image;
        this.#isFlipped = false;
    }

    flip() {
        this.#isFlipped = !this.#isFlipped;
    }

    isTileFlipped() {
        return this.#isFlipped;
    }

    getId() {
        return this.#id;
    }

    getImage() {
        return this.#image;
    }

    setImage(newImage) {
        this.#image = newImage;
    }
}

export default Tile;

class Hipolabs {
    constructor(url) {
        this.url = url;
    }

    fetch() {
        this.url = `${this.url}/search?country=united+states`;
        return fetch(this.url);
    }
}

export default Hipolabs;

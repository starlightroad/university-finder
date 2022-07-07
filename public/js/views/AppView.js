import View from './View.js';

class AppView extends View {
    async addHandlerRender(handler) {
        await handler();
    }

    addHandlerClick(handler) {
        this.appElement.addEventListener('click', (e) => {
            const iconTheme = e.target.closest('.moon');

            if (iconTheme) handler(iconTheme);
        });
    }

    addHandlerError(handler, error) {
        handler(error);
    }

    render() {
        const markup = this._generateMarkup();

        this.appElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderReload() {
        const markup = this._generateContentMarkup();
        const wrapper = this.createElement('.wrapper');

        this._clear(wrapper);

        wrapper.insertAdjacentHTML('afterbegin', markup);
    }

    renderError(message) {
        const markup = `
            <div class="error">
                <div>${message}</div>
                <button class="button">Reload</button>
            </div>
        `;
        const wrapper = this.createElement('.wrapper');

        this._clear(wrapper);

        wrapper.insertAdjacentHTML('afterbegin', markup);
    }

    toggleClassFixed() {
        this.toggleClass('fixed', this.appElement);
    }

    setTheme(theme) {
        const htmlElement = this.createElement('html', document);

        htmlElement.dataset.theme = theme;
    }

    _generateContentMarkup() {
        return `
            <div class="content">
                <div id="map-container">
                    <div id="map" class="loading-placeholder"></div>
                </div>

                <div class="cards-container">
                    <div class="cards">
                        <ul class="cards-list">
                            <li class="loading-placeholder loading-placeholder-card cards-list-card"></li>
                            <li class="loading-placeholder loading-placeholder-card cards-list-card"></li>
                            <li class="loading-placeholder loading-placeholder-card cards-list-card"></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    _generateMarkup() {
        return `
            <div class="header-container">
                <header class="header">
                    <form action="/" class="form search" method="post" autocomplete="off" onsubmit="event.preventDefault()">

                        <div class="search-input-container">
                            <svg class="feather search">
                                <use href="images/icons/feather-sprite.svg#search">
                            </svg>
                            <input type="search" name="q" id="search" class="search-input" placeholder="Search for a university">
                        </div>

                        <div class="search-results-container">
                            <ul class="search-results"></ul>
                        </div>
                    </form>
                    <svg class="feather header-icon moon">
                        <use href="images/icons/feather-sprite.svg#moon">
                    </svg>
                </header>
            </div>

            <div class="wrapper">

                <div class="content">
                    <div id="map-container">
                        <div id="map" class="loading-placeholder"></div>
                    </div>

                    <div class="cards-container">
                        <div class="cards">
                            <ul class="cards-list">
                                <li class="loading-placeholder loading-placeholder-card cards-list-card"></li>
                                <li class="loading-placeholder loading-placeholder-card cards-list-card"></li>
                                <li class="loading-placeholder loading-placeholder-card cards-list-card"></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }
}

export default new AppView();

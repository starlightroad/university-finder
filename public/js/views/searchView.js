import View from './View.js';

class SearchView extends View {
    addHandlerSearch(handler) {
        this.parentElement.addEventListener('keyup', (e) => {
            const value = e.target.value.trim().toLowerCase();
            handler(value);
        });
    }

    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', (e) => {
            const el = e.target.closest('.search-results-item');

            if (!el) return;

            handler({ location: el.innerText });
        });
    }

    addHandlerSubmit(handler) {
        this.parentElement.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputElement = this.createElement('.search-input', e.target);
            const value = inputElement.value.trim().toLowerCase();

            handler({ location: value });
        });
    }

    render(data = null) {
        const searchResults = this.createElement('.search-results');

        this._clear(searchResults);

        if (!data) return;

        data.forEach((university) => {
            const markup = `<li class="search-results-item">${university}</li>`;
            searchResults.insertAdjacentHTML('afterbegin', markup);
        });
    }

    renderError() {
        const message = 'Failed to fetch content.';
        const markup = `
            <div class="error-banner">
                <p class="error-banner-message">${message}</p>
            </div>
        `;

        this.appElement.insertAdjacentHTML('afterbegin', markup);

        setTimeout(() => {
            const errorBanner = this.createElement('.error-banner');
            this.removeElement(errorBanner);
        }, 3000);
    }

    clearAll() {
        const searchResults = this.createElement('.search-results');
        const searchInput = this.createElement('.search-input');

        this._clearInput(searchInput);
        this._clear(searchResults);
    }

    setParent() {
        this.setParentElement('.search');
    }
}

export default new SearchView();

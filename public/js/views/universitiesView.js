import View from './View.js';
import Rating from '../helpers/Rating.js';

class UniversitiesView extends View {
    addHandlerClick(handler) {
        this.createElement('.cards-list').addEventListener('click', (e) => {
            const cardElement = e.target.closest('.cards-list-card');
            const reviewsLink = e.target.closest('.cards-list-card-ratings-link');

            if (cardElement || reviewsLink) {
                e.preventDefault();
                handler(cardElement.dataset.id, `${reviewsLink ? 'reviewsLink' : null}`);
            }
        });
    }

    async addHandlerRender(handler) {
        await handler();
    }

    render(data) {
        const markup = this._generateMarkup(data);
        const cards = this.createElement('.cards');

        this._clear(cards);

        cards.insertAdjacentHTML('afterbegin', markup);
    }

    _generateMarkup(data) {
        return `
            <ul class="cards-list">
                ${data.map((university) => this._generateCard(university)).join('')}
            </ul>
        `;
    }

    _generateCard(university) {
        const universityName =
            university.name.length > 40 ? `${university.name.slice(0, 40).trim()}...` : university.name;
        const { webPage } = university;
        const linkText = webPage?.replace('https://', '') || '';
        const ratingClass = new Rating();

        return `
        <li class="card cards-list-card" data-id=${university.id}>
            <header class="cards-list-card-header">
                <div class="cards-list-card-circle">
                    <p class="cards-list-card-circle-title">${university.name[0].toUpperCase()}</p>
                </div>
                <h3 class="cards-list-card-title">${universityName}</h3>
            </header>
            <div class="cards-list-card-ratings">
                <div class="cards-list-card-ratings-stars">
                    ${ratingClass._generateRatingsMarkup(university.rating)}
                </div>
                <a href="/" class="link cards-list-card-ratings-link">See reviews</a>
            </div>
            <div class="cards-list-card-info">
                <p class="cards-list-card-info-text">${university.location.city}, ${university.location.state}</p>
                <p class="cards-list-card-info-text">${university.display_phone}</p>
                <p class="cards-list-card-info-text">
                    <a href="${webPage}" class="link cards-list-card-info-link" target="_blank" rel="noopener noreferrer">${linkText}</a>
                </p>
            </div>
        </li>
        `;
    }

    selectCard(id) {
        const cards = this.createElements('.cards-list-card');

        cards.forEach((card) => {
            card.classList.remove('cards-list-card-selected');

            if (card.dataset.id === id) card.classList.add('cards-list-card-selected');
        });
    }

    deselectCard() {
        const cards = this.createElements('.cards-list-card');
        const selector = 'card-selected';

        for (let card = 0; card < cards.length; card += 1) {
            if (cards[card].classList.contains(selector)) {
                cards[card].classList.remove(selector);
                break;
            }
        }
    }

    scrollTo(id) {
        const cardsList = this.createElement('.cards-list');
        const targetElement = this.createElement(`[data-id="${id}"`, cardsList);

        targetElement.scrollIntoView({ behavior: 'smooth' });
    }

    renderMessage() {
        const message =
            'No universities to display. You can search for a university using the search bar to display results.';
        const markup = `<p class="cards-no-content">${message}</p>`;
        const cards = this.createElement('.cards');

        this._clear(cards);

        this.createElement('.cards').insertAdjacentHTML('afterbegin', markup);
    }
}

export default new UniversitiesView();

import View from './View.js';
import time from '../helpers/time.js';
import Rating from '../helpers/rating.js';

class ReviewsView extends View {
    addHandlerRender(handler) {
        handler();
    }

    addHandlerClick(handler) {
        this.parentElement = document.querySelector('.reviews-container');
        this.parentElement.addEventListener('click', (e) => {
            const btnClose = e.target.closest('.reviews-header-close');
            const btnSort = e.target.closest('.button-sort');
            const dropdownOption = e.target.closest('.button-dropdown-list-item');
            const dropdown = this.createElement('.button-dropdown');

            if (btnSort) handler({ sort: true });

            if (btnClose) handler({ close: true });

            if (dropdownOption) handler({ option: dropdownOption.dataset.option });

            if (dropdown.classList.contains('dropdown-visible') && !btnSort) this.toggleSortDropdown();
        });
    }

    render(data) {
        const markup = this._generateMarkup(data);
        const el = document.querySelector('.wrapper');

        el.insertAdjacentHTML('beforeend', markup);
    }

    renderReviews(data) {
        const markup = this._generateReviewsMarkup(data);
        const targetElement = this.createElement('.reviewers');

        this._clear(targetElement);

        targetElement.insertAdjacentHTML('afterbegin', markup);
    }

    toggleSortDropdown() {
        this.createElement('.button-dropdown').classList.toggle('dropdown-visible');
    }

    remove() {
        this.removeElement(this.parentElement);
    }

    _generateMarkup(data) {
        const { reviews, university } = data;
        const universityRating = `${university.rating}`.includes('.') ? university.rating : `${university.rating}.0`;
        const ratingClass = new Rating();

        return `
            <div class="reviews-container">
                <div class="reviews">
                    <header class="reviews-header">
                        <div class="reviews-header-close">
                            <svg class="feather reviews-header-close-icon">
                                <use href="images/icons/feather-sprite.svg#x">
                            </svg>
                        </div>

                        <p class="reviews-subtitle">Reviews for</p>
                        <h2 class="reviews-title">${university.name}</h2>
                        
                        <div class="ratings">
                            <p class="ratings-rating">${universityRating}</p>
                            <div id="stars" class="reviewers-ratings-stars">
                                ${ratingClass._generateRatingsMarkup(universityRating)}
                            </div>
                            
                        </div>

                        <div class="reviews-divider"></div>
                    </header>

                    <div class="button-container">
                        <button class="button button-sort">
                            <svg class="feather sort">
                                <use href="images/icons/feather-sprite.svg#bar-chart">
                            </svg>
                            Sort
                        </button>

                        <div class="button-dropdown">
                            <ul class="button-dropdown-list">
                                <li class="button-dropdown-list-item" data-option="recent">Most recent</li>
                                <li class="button-dropdown-list-item" data-option="highest">Highest rating</li>
                                <li class="button-dropdown-list-item" data-option="lowest">Lowest rating</li>
                            </ul>
                        </div>
                    </div>
                    
                    <ul class="reviewers">
                        ${this._generateReviewsMarkup(reviews)}
                    </ul>
                </div>
            </div>
        `;
    }

    _generateReviewsMarkup(reviews) {
        const defaultProfileImage = `
            <svg class="feather user">
                <use href="images/icons/feather-sprite.svg#user">
            </svg>
        `;
        const ratingClass = new Rating();

        return `
            ${reviews.data.reviews
                .map(
                    (review) => `
                <li class="card reviewers-card">
                    <header class="reviewers-header">
                        <div class="reviewers-header-image" ${
                            review.user.image_url ? `style="background-image: url(${review.user.image_url});"` : ''
                        }">${review.user.image_url ? '' : defaultProfileImage}</div>
                        <p class="reviewers-header-user">
                            ${review.user.name}
                        </p>
                    </header>

                    <div class="reviewers-ratings">
                        <div id="stars" class="reviewers-ratings-stars">
                            ${ratingClass._generateRatingsMarkup(review.rating)}
                        </div>
                        
                        <p class="reviewers-ratings-time">${time.getReviewTimestamp(review.time_created)}</p>
                    </div>

                    <p class="reviewers-text">
                        ${review.text}
                    </p>
                </li>
            `
                )
                .join('')}
        `;
    }
}

export default new ReviewsView();

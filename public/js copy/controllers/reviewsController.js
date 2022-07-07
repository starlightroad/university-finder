import searchModel from '../models/searchModel.js';
import reviewsModel from '../models/reviewsModel.js';
import appView from '../views/appView.js';
import reviewsView from '../views/reviewsView.js';

export const removeReviews = () => {
    reviewsView.remove();

    appView.toggleClassFixed();
};

export const showReviews = async (id) => {
    const university = searchModel.find({ id });
    const data = await fetch(`/universities/${id}/reviews`);
    const reviews = await data.json();

    reviewsModel.set(reviews);

    reviewsView.render({ reviews, university });

    appView.toggleClassFixed();
};

export const toggleReviewState = () => {
    reviewsModel.state.isReviewsViewVisible = !reviewsModel.state.isReviewsViewVisible;
};

export const performEvent = (options) => {
    if (options.sort) reviewsView.toggleSortDropdown();

    if (options.close) removeReviews();

    if (options.option) {
        const sortedData = reviewsModel.sort(options.option);
        const data = {
            option: options.option,
            data: {
                reviews: sortedData
            }
        };

        reviewsView.renderReviews(data);
    }
};

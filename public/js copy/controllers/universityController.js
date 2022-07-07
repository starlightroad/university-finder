import reviewsModel from '../models/reviewsModel.js';
import reviewsView from '../views/reviewsView.js';
import universitiesView from '../views/universitiesView.js';
import mapView from '../views/mapView.js';
import * as reviewsController from './reviewsController.js';

const selectUniversity = async (id, type) => {
    if (type === 'reviewsLink') {
        await reviewsController.showReviews(id);

        reviewsView.addHandlerClick(reviewsController.performEvent);

        reviewsController.toggleReviewState();
    }

    universitiesView.selectCard(id);

    universitiesView.scrollTo(id);

    mapView.flyTo(id);

    reviewsModel.saveLastId(id);
};

export { selectUniversity };

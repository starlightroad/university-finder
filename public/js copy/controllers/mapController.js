import reviewsModel from '../models/reviewsModel.js';
import mapView from '../views/mapView.js';
import reviewsView from '../views/reviewsView.js';
import universitiesView from '../views/universitiesView.js';
import * as reviewsController from './reviewsController.js';
import appModel from '../models/appModel.js';

export const loadMap = async () => {
    try {
        mapView.currentTheme = appModel.state.theme;

        await mapView.render(appModel.state.userLocation);
    } catch (err) {
        if (err.message) throw err;
    }
};

export const selectUniversity = (id = null) => {
    if (reviewsModel.state.isReviewsViewVisible && id !== reviewsModel.state.lastReviewId) {
        reviewsView.remove();

        reviewsController.toggleReviewState();
    }

    if (!id) {
        universitiesView.deselectCard();
        return;
    }

    universitiesView.selectCard(id);

    universitiesView.scrollTo(id);

    mapView.flyTo(id);

    reviewsModel.saveLastId(id);
};

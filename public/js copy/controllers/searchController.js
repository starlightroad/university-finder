import University from '../models/universityModel.js';
import appModel from '../models/appModel.js';
import searchModel from '../models/searchModel.js';
import searchView from '../views/searchView.js';
import universitiesView from '../views/universitiesView.js';
import mapView from '../views/mapView.js';
import * as universityController from './universityController.js';
import * as mapController from './mapController.js';

export const showUniversities = async (str) => {
    const universities = University.find({ query: str });

    searchView.render(universities);
};

export const showSearchResults = async (data) => {
    try {
        if (!appModel.state.userLocation && !data) {
            universitiesView.renderMessage();
            return;
        }

        if (data?.location) {
            searchView.clearAll();

            const university = data.location.trim().toLowerCase().replaceAll(' ', '+');

            const yelp = await fetch(`/search/university/${university}`);

            const yelpData = await yelp.json();

            if (yelpData.data.error) {
                throw yelpData.data.error;
            }

            searchModel.state.searchResults = yelpData;
        }

        if (!data?.location) {
            const { latitude, longitude } = appModel.state.userLocation;
            const yelpData = await fetch(`/search/coordinates/${latitude}/${longitude}`);

            searchModel.set(await yelpData.json());
        }

        universitiesView.render(searchModel.state.searchResults.data.businesses);

        mapView.update(searchModel.getDataForMap);

        universitiesView.addHandlerClick(universityController.selectUniversity);

        mapView.addHandlerClick(mapController.selectUniversity);
    } catch (err) {
        searchView.renderError();
    }
};

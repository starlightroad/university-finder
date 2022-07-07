import AppView from './views/AppView.js';
import searchView from './views/searchView.js';
import mapView from './views/mapView.js';
import universitiesView from './views/universitiesView.js';
import * as appController from './controllers/appController.js';
import * as searchController from './controllers/searchController.js';
import * as mapController from './controllers/mapController.js';

const app = async () => {
    try {
        await AppView.addHandlerRender(
            appController.loadPreferences,
            appController.getUniversities,
            appController.getUserLocation
        );

        mapView.addHandlerRender(mapController.loadMap);

        await universitiesView.addHandlerRender(searchController.showSearchResults);

        searchView.addHandlerSearch(searchController.showUniversities);

        searchView.addHandlerClick(searchController.showSearchResults);

        searchView.addHandlerSubmit(searchController.showSearchResults);

        AppView.addHandlerClick(appController.setTheme);
    } catch (err) {
        AppView.addHandlerError(appController.getError, err);
    }
};

app();

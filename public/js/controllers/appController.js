import University from '../models/universityModel.js';
import appModel from '../models/appModel.js';
import appView from '../views/AppView.js';
import AppError from '../helpers/error.js';
import searchView from '../views/searchView.js';
import mapView from '../views/mapView.js';
import searchModel from '../models/searchModel.js';

const getGeolocation = () =>
    new Promise((resolve, reject) => {
        const err = 'Geolocation is not supported';

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => resolve(pos.coords),
                () => reject(err)
            );
        }

        if (!navigator.geolocation) throw reject(err);
    });

export const getUserLocation = async () => {
    try {
        const userLocation = await getGeolocation();
        const { latitude, longitude } = userLocation;

        appModel.state.userLocation = { latitude, longitude };
    } catch (err) {
        appModel.state.userLocation = null;
    }
};

export const getUniversities = async () => {
    appView.render();

    searchView.setParent();

    try {
        const data = await fetch('/universities');
        const universities = await data.json();

        University.set(universities.data.universities);
    } catch (err) {
        throw new AppError('It looks like an error has occurred.');
    }
};

export const loadPreferences = () => {
    const preferences = appModel.get('preferences');

    appModel.state.theme = preferences.theme;

    appView.setTheme(appModel.state.theme);
};

export const setTheme = () => {
    appModel.set('theme');

    loadPreferences();

    mapView.currentTheme = appModel.state.theme;

    mapView.setStyle();

    mapView.update(searchModel.getDataForMap, false);
};

export const getError = (error) => {
    appView.renderError(error.message);
};

export const init = async () => {
    loadPreferences();
    await getUniversities();
    await getUserLocation();
};

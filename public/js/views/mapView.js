import View from './View.js';
import AppError from '../helpers/error.js';

class MapView extends View {
    styles = ['streets-v11', 'light-v10', 'dark-v10', 'satellite-v9'];

    styleUrl = `mapbox://styles/mapbox`;

    markers = [];

    popups = [];

    parentElement;

    map;

    currentTheme;

    async addHandlerRender(handler) {
        await handler();
    }

    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', (e) => {
            const marker = e.target.closest('.mapboxgl-marker');

            if (marker) handler(marker.dataset.id);
            if (!marker) handler();
        });
    }

    async render(userLocation = null) {
        this.parentElement = this.createElement('#map');

        try {
            const data = await fetch('/mapbox/api/v1/token');
            const {
                data: { token }
            } = await data.json();

            mapboxgl.accessToken = token;

            const options = {
                container: `${this.parentElement.id}`,
                style: `${this.styleUrl}/${this.currentTheme === 'light' ? this.styles[0] : this.styles[2]}`,
                center: (userLocation && [userLocation.longitude, userLocation.latitude]) || [-74.5, 40.2],
                zoom: 7
            };

            this.map = await new mapboxgl.Map(options);
        } catch (err) {
            throw new AppError('Failed to load map.');
        }
    }

    renderMarkers(data) {
        data.forEach((item) => {
            const options = {
                marker: {
                    color: this.currentTheme === 'light' ? '#454545' : '#396afc'
                },
                popup: {
                    closeOnMove: false,
                    closeButton: false
                }
            };

            const coords = [item.coordinates.longitude, item.coordinates.latitude];
            const html = `<p class="map-marker">${item.name}</p>`;
            const marker = new mapboxgl.Marker(options.marker).setLngLat(coords);

            marker._element.dataset.id = item.id;

            const popup = new mapboxgl.Popup(options.popup).setHTML(html);

            marker.setPopup(popup).addTo(this.map);

            this.markers.push(marker);
            this.popups.push(popup);
        });
    }

    togglePopup(marker) {
        marker.togglePopup();
    }

    removePopups() {
        this.popups.forEach((popup) => popup.remove());
    }

    removeMarkers() {
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];
    }

    flyTo(id) {
        const targetMarker = this.markers.find((marker) => marker._element.dataset.id === id);

        this.removePopups();

        this.togglePopup(targetMarker);

        const coords = targetMarker.getLngLat();

        this.map.flyTo({
            center: coords,
            zoom: 13,
            speed: 2
        });
    }

    createCustomCoordinate(data) {
        let lng = 0;
        let lat = 0;

        data.forEach((d) => {
            lng += d.coordinates.longitude;
            lat += d.coordinates.latitude;
        });

        return [lng / data.length, lat / data.length];
    }

    centerMap(data) {
        const coordinates = this.createCustomCoordinate(data);

        this.map.flyTo({
            center: coordinates,
            zoom: 8,
            speed: 2
        });
    }

    update(data, center = true) {
        this.removeMarkers();

        this.renderMarkers(data);

        if (!center) return;

        this.centerMap(data);
    }

    setStyle() {
        const targetStyle = this.currentTheme === 'light' ? this.styles[0] : this.styles[2];
        const style = `${this.styleUrl}/${targetStyle}`;

        this.map.setStyle(style);
    }
}

export default new MapView();

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LEAFLET_TOKEN = 'pk.eyJ1IjoiYW5kcmV3LWFicmFtb3YiLCJhIjoiY2o1eTdkY3V4MGFtdzMycXBmd291OXV2ZCJ9.GHLJyltLWeHbKn0EwDvpOw';

class Map {
    constructor () {
        this.map = L.map('map', {
            center: [37.505, 50.09],
            zoom: 3,
            minZoom: 3
        });

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            id: 'mapbox.satellite',
            accessToken: LEAFLET_TOKEN
        }).addTo(this.map);
    }

    renderPosts (posts) {
        posts.forEach((item) => {
            const {
                url
            } = item.images.thumbnail;
            const imageIcon = L.icon({
                iconUrl: url,
                iconSize: [50, 50],
                className: 'my-icon'
            });

            L.marker([item.location.latitude, item.location.longitude], {icon : imageIcon}).addTo(this.map);
        });
    }
}

export default Map;
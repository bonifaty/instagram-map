import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';

const LEAFLET_TOKEN = 'pk.eyJ1IjoiYW5kcmV3LWFicmFtb3YiLCJhIjoiY2o1eTdkY3V4MGFtdzMycXBmd291OXV2ZCJ9.GHLJyltLWeHbKn0EwDvpOw';

class Map {
    constructor () {
        this.map = L.map('map', {
            center: [37.505, 50.09],
            zoom: 3,
            minZoom: 3
        });


        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
            accessToken: LEAFLET_TOKEN
        }).addTo(this.map);
    }

    _handleMarkerClick (e) {
        console.log(e.target.options.data);
    }

    renderPosts (posts) {
        const markers = L.markerClusterGroup({
            showCoverageOnHover: false,
            iconCreateFunction: function(cluster) {
                const firstMarker = cluster.getAllChildMarkers()[0];
                if (firstMarker) {
                    const {
                        url
                    } = firstMarker.options.data.images.thumbnail;

                    return L.divIcon({
                        iconSize: [70, 70],
                        className: '',
                        html: `<div class="my-icon my-icon_cluster">
                            <div class="my-icon__image" style="background-image: url(${url})">
                                <div class="my-icon__count">${cluster.getChildCount()}</div>
                            </div>
                        </div>`
                    });
                }
            }
        });

        posts.forEach((item) => {
            const {
                url
            } = item.images.thumbnail;
            const icon = L.divIcon({
                iconSize: [70, 70],
                className: '',
                html: `<div class="my-icon">
                    <div class="my-icon__image" style="background-image: url(${url})"></div>
                </div>`
            });

            const marker = L.marker([item.location.latitude, item.location.longitude], {
                icon : icon,
                data: item
            });
            marker.on('click', this._handleMarkerClick);
            markers.addLayer(marker);
        });
        this.map.addLayer(markers);
    }
}

export default Map;
import L from 'leaflet';
import './map.styl';

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
        this.markers = null;


        L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
            accessToken: LEAFLET_TOKEN
        }).addTo(this.map);
    }

    _handleMarkerClick (e) {
        console.log(e.target.options.data);
    }

    renderPosts (posts) {
        if (this.markers) {
            this.map.removeLayer(this.markers);
        }
        this.markers = L.markerClusterGroup({
            showCoverageOnHover: false,
            iconCreateFunction: function(cluster) {
                const firstMarker = cluster.getAllChildMarkers()[0];
                if (firstMarker) {
                    const {
                        url
                    } = firstMarker.options.data.children[0].images.thumbnail;

                    return L.divIcon({
                        iconSize: [70, 70],
                        iconAnchor: [35, 35],
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
            } = item.children[0].images.thumbnail;

            const html = `<div class="my-icon">
                <div class="my-icon__image" style="background-image: url(${url})"></div>
                <div class="my-icon__info">
                    <div class="my-icon__info-title">
                        ${item.location.name}
                    </div>
                    ${(() => {
                        let list = '<div class="my-icon__info-pictures">';
                        for (let i = 1; i < item.children.length; i ++) {
                            list += `<img class="my-icon__info-picture-item" src="${item.children[i].images.thumbnail.url}" />`;
                        }
                        return item.children.length > 1 ? list + '</div>' : '';
                    })()}
                </div>
            </div>`;

            const icon = L.divIcon({
                iconSize: [70, 70],
                iconAnchor: [35, 35],
                className: '',
                html: html
            });

            const marker = L.marker([item.location.latitude, item.location.longitude], {
                icon : icon,
                data: item
            });
            marker.on('click', this._handleMarkerClick);
            marker.on('mouseover', (e) => {
                e.target.setZIndexOffset(40);
            });
            marker.on('mouseout', (e) => {
                e.target.setZIndexOffset(30);
            });
            this.markers.addLayer(marker);
        });
        this.map.addLayer(this.markers);
    }
}

export default Map;
import './my-component.styl';
import { h, Component } from 'preact';
const b = require('b_').with('my-component');

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

class MyComponent extends Component {
    componentDidMount() {
        const map = L.map('map', {
            center: [51.505, -0.09],
            zoom: 13
        });
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            id: 'mapbox.satellite',
            accessToken: 'pk.eyJ1IjoiYW5kcmV3LWFicmFtb3YiLCJhIjoiY2o1eTdkY3V4MGFtdzMycXBmd291OXV2ZCJ9.GHLJyltLWeHbKn0EwDvpOw'
        }).addTo(map);
    }

    render(props, state) {
        return <div className={b()}>
            <div id="map" />
        </div>
    }
}

export default MyComponent;
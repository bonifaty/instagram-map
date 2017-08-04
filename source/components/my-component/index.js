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
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        }).addTo(map);
    }

    render(props, state) {
        return <div className={b()}>
            <div id="map" />
        </div>
    }
}

export default MyComponent;
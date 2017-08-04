import './my-component.styl';
import { h, Component } from 'preact';
const b = require('b_').with('my-component');

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const accessToken = '1307823163.cf0a846.3772542ff2a2498d96d4153efb9e6203';

function jsonp(url, callback) {
    const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
    };

    const script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
}

class MyComponent extends Component {
    componentDidMount() {
        const map = L.map('map', {
            center: [37.505, 50.09],
            zoom: 3
        });

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            id: 'mapbox.satellite',
            accessToken: 'pk.eyJ1IjoiYW5kcmV3LWFicmFtb3YiLCJhIjoiY2o1eTdkY3V4MGFtdzMycXBmd291OXV2ZCJ9.GHLJyltLWeHbKn0EwDvpOw'
        }).addTo(map);

        jsonp(`https://api.instagram.com/v1/users/1307823163/media/recent/?access_token=${accessToken}`, function({ data }) {
            data
                .filter((item) => {
                    return !!item.location;
                })
                .forEach((item) => {
                    const {
                        url,
                        width,
                        height
                    } = item.images.thumbnail;
                    const imageIcon = L.icon({
                        iconUrl: url,
                        iconSize: [width / 3, height / 3],
                        className: 'my-icon'
                    });

                    L.marker([item.location.latitude, item.location.longitude], {icon : imageIcon}).addTo(map);
                });
        });
    }

    render(props, state) {
        return <div className={b()}>
            <div id="map" />
        </div>
    }
}

export default MyComponent;
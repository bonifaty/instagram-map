import './my-component.styl';
import { h, Component } from 'preact';
const b = require('b_').with('my-component');

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import InstagramAPI from '../../instagram-api';

class MyComponent extends Component {
    constructor (props) {
        super();
        this.instagramApi = new InstagramAPI(props.token);
    }

    componentDidMount() {
        const map = L.map('map', {
            center: [37.505, 50.09],
            zoom: 3
        });

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            id: 'mapbox.satellite',
            accessToken: 'pk.eyJ1IjoiYW5kcmV3LWFicmFtb3YiLCJhIjoiY2o1eTdkY3V4MGFtdzMycXBmd291OXV2ZCJ9.GHLJyltLWeHbKn0EwDvpOw'
        }).addTo(map);

        const accessToken = this.props.token;
        this.instagramApi.requestSelfPosts().then((response) => {
            console.log(response);

            response.data
                .filter((item) => {
                    return !!item.location;
                })
                .forEach((item) => {
                    const {
                        url
                    } = item.images.thumbnail;
                    const imageIcon = L.icon({
                        iconUrl: url,
                        iconSize: [50, 50],
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
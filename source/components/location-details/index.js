import './location-details.styl';
import { h, Component } from 'preact';

const b = require('b_').with('location-details');

class LocationDetails extends Component {
    constructor () {
        super();
        this.state = {
            visible: true
        }
    }

    render () {
        return <div className={b()}></div>
    }
}

export default LocationDetails;
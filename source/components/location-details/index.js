import './location-details.styl';
import { h, Component } from 'preact';

const b = require('b_').with('location-details');

class LocationDetails extends Component {
    constructor () {
        super();
    }

    getTime (timeStamp) {
        const date = new Date(timeStamp*1000);
        const day = date.getDay();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();
        return `${day} ${month} ${year} ${hours}` + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }

    render (props, state) {
        const {
            location,
            children
        } = props.details;
        console.log(props)
        return <div className={b()}>
            <div>{location ? location.name : ''}</div>
            <div>
                {children ? children.map((post, index) => {
                    return <div>
                        <div>{this.getTime(post.created_time)}</div>
                        <img src={post.images.low_resolution.url} alt=""/>
                    </div>;
                }) : ''}
            </div>
        </div>
    }
}

export default LocationDetails;
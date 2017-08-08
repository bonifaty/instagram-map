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
        return <div className={b({'visible': props.visible})}>
            <div className={b('close')} onClick={props.onCloseClick}>&times;</div>
            <div className={b('title')}>{location ? location.name : ''}</div>
            <div className={b('list')}>
                {children ? children.map((post, index) => {
                    return <div className={b('item')}>
                        <div className={b('item-image')} style={{backgroundImage: `url(${post.images.low_resolution.url})`}} />
                        <div className={b('item-date')}>{this.getTime(post.created_time)}</div>
                    </div>;
                }) : ''}
            </div>
        </div>
    }
}

export default LocationDetails;
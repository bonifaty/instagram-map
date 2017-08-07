import './my-component.styl';
import { h, Component } from 'preact';
const b = require('b_').with('my-component');

import Map from '../map';
import InstagramAPI from '../../instagram-api';
import UsersSearch from '../users-search';
import LocationDetails from '../location-details';

class MyComponent extends Component {
    constructor (props) {
        super();
        this.instagramApi = new InstagramAPI(props.token);
        this.map = new Map(this.handleMarkerClick.bind(this));
        this.state = {
            showDetails: false,
            detailsObj: {}
        };

        this.showSelfPosts();
    }

    handleMarkerClick (data) {
        this.setState({
            showDetails: true,
            detailsObj: data
        })
    }

    showSelfPosts () {
        this.instagramApi.requestSelfPosts().then((response) => {
            if (response && response.data) {
                this.map.renderPosts(this.postsToLocations(response.data));
            }
        });
    }

    showUserPosts (id) {
        this.instagramApi.requestPostsById(id).then((response) => {
            if (response && response.data) {
                this.map.renderPosts(this.postsToLocations(response.data));
            }
        });
    }

    postsToLocations (data) {
        let obj = {};
        const posts = data
            .filter((item) => {
                return !!item.location;
            });

        posts.sort((a, b) => {
            return a.created_time - b.created_time
        });

        const counter = posts.reduce((acc, item) => {
            acc[item.location.id] = 0;
            return acc;
        }, {});

        posts.forEach((item, index, array) => {
            if (array[index + 1] && item.location.id !== array[index+1].location.id) {
                const nextLocationId = array[index+1].location.id;
                counter[nextLocationId]++;
            }
            let locationId = item.location.id + '_' + counter[item.location.id];
            if (!obj[locationId]) {
                obj[locationId] = {
                    location: item.location,
                    children: []
                };
            }
            obj[locationId].children.push(item)
        });

        return Array.from(Object.values(obj));
    }

    renderUser (id) {
        this.showUserPosts(id);
    }

    render(props, state) {
        return <div className={b()}>
            <UsersSearch
                searchByName={this.instagramApi.searchUsersByName.bind(this.instagramApi)}
                renderUser={this.renderUser.bind(this)}/>
            <LocationDetails details={state.detailsObj} />
        </div>
    }
}

export default MyComponent;
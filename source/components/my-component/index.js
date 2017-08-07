import './my-component.styl';
import { h, Component } from 'preact';
const b = require('b_').with('my-component');

import Map from '../map';
import InstagramAPI from '../../instagram-api';
import UsersSearch from '../users-search';

class MyComponent extends Component {
    constructor (props) {
        super();
        this.instagramApi = new InstagramAPI(props.token);
        this.map = new Map();

        this.showSelfPosts();
    }

    showSelfPosts () {
        this.instagramApi.requestSelfPosts().then((response) => {
            if (response && response.data) {
                let obj = {};
                const posts = response.data
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
                const locationPosts = Array.from(Object.values(obj));
                this.map.renderPosts(locationPosts);
            }
        });
    }

    render(props, state) {
        return <div className={b()}>
            <UsersSearch searchByName={this.instagramApi.searchUsersByName.bind(this.instagramApi)} />
        </div>
    }
}

export default MyComponent;
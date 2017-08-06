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
    }

    componentDidMount() {
        this.instagramApi.requestSelfPosts().then((response) => {
            if (response && response.data) {
                const posts = response.data.filter((item) => {
                    return !!item.location;
                });
                this.map.renderPosts(posts);
            }
        });
    }

    render(props, state) {
        return <div className={b()}>
            <UsersSearch searchByName={this.instagramApi.searchUsersByName} />
        </div>
    }
}

export default MyComponent;
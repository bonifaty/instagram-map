import './my-component.styl';
import { h, Component } from 'preact';
const b = require('b_').with('my-component');

import Map from '../map';
import InstagramAPI from '../../instagram-api';

class MyComponent extends Component {
    constructor (props) {
        super();
        this.instagramApi = new InstagramAPI(props.token);
        this.map = new Map();
    }

    componentDidMount() {
        this.instagramApi.requestSelfPosts().then((response) => {
            const posts = response.data.filter((item) => {
                return !!item.location;
            });
            this.map.renderPosts(posts);
        });

        this.instagramApi.requestFollows().then((response) => {
            console.log('users:', response);
        });
    }

    render(props, state) {
        return <div className={b()}>
            Here comes my app interface
        </div>
    }
}

export default MyComponent;
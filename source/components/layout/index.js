import './layout.styl';
import { h, Component } from 'preact';
const b = require('b_').with('layout');

import Map from '../map';
import InstagramAPI from '../../instagram-api';
import UsersSearch from '../users-search';
import LocationDetails from '../location-details';

class Layout extends Component {
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
        this.instagramApi.requestSelfPosts().then((posts) => {
            this.map.renderPosts(posts);
        });
    }

    showUserPosts (id) {
        this.instagramApi.requestPostsById(id).then((posts) => {
            this.map.renderPosts(posts);
        });
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

export default Layout;
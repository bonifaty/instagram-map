const API_LINK = 'https://api.instagram.com/v1';

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

function json(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://cors-anywhere.herokuapp.com/' + url);
    xhr.onreadystatechange = () => {
        let status;
        if (xhr.readyState === 4) {
            status = xhr.status;
            if (status === 200) {
                const data = JSON.parse(xhr.responseText);
                callback(data);
            }
        }
    };
    xhr.send();
}

class InstagramAPI {
    constructor (accessToken) {
        this.accessToken = accessToken;
    }

    requestSelfPosts () {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/self/media/recent/?access_token=${this.accessToken}`, function(response) {
                resolve(response);
            });
        });
    }

    requestPostsById (id) {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/${id}/media/recent/?access_token=${this.accessToken}`, function(response) {
                resolve(response);
            });
        });
    }

    requestFollows () {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/self/follows?access_token=${this.accessToken}`, function(response) {
                resolve(response);
            });
        });
    }

    searchUsersByNameOfficial (q) {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/search?q=${q}&access_token=${this.accessToken}`, function(response) {
                resolve(response);
            });
        });
    }

    searchUsersByName (q) {
        return new Promise((resolve, reject) => {
            json(`https://www.instagram.com/web/search/topsearch/?count=20&query=${q}`, function(response) {
                resolve(response.users);
            });
        });
    }

    searchPostsByLocationId () {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/locations/278608830/media/recent/?access_token=${this.accessToken}`, function(response) {
                resolve(response);
            });
        });
    }
}

// Search by tag https://www.instagram.com/explore/tags/test/?__a=1
// Search by username https://www.instagram.com/web/search/topsearch/?query=name
// Search by location id https://www.instagram.com/explore/locations/278608830/?__a=1


export default InstagramAPI;
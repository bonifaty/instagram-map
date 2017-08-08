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

function postsToLocations (data) {
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

class InstagramAPI {
    constructor (accessToken) {
        this.accessToken = accessToken;
    }

    requestSelfPosts () {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/self/media/recent/?access_token=${this.accessToken}`, function(response) {
                resolve(postsToLocations(response.data));
            });
        });
    }

    requestPostsById (id) {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/${id}/media/recent/?access_token=${this.accessToken}`, function(response) {
                resolve(postsToLocations(response.data));
            });
        });
    }

    requestPostsByName (name) {
        return new Promise((resolve, reject) => {
            json(`https://www.instagram.com/${name}/?__a=1`, function(response) {
                resolve(response.user.media.nodes);
            });
        });
    }

    requestFollows () {
        console.log(this);
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/self/follows?access_token=${this.accessToken}`, function(response) {
                resolve(response);
            });
        });
    }

    searchUsersByName (q) {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/search?q=${q}&access_token=${this.accessToken}`, function(response) {
                resolve(postsToLocations(response.data));
            });
        });
    }

    searchUsersByNameUnOfficial (q) {
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


// User info https://www.instagram.com/kevin/?__a=1
// Search by tag https://www.instagram.com/explore/tags/test/?__a=1
// Search by username https://www.instagram.com/web/search/topsearch/?query=name
// Search by location id https://www.instagram.com/explore/locations/278608830/?__a=1


export default InstagramAPI;
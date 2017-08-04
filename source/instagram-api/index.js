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

    requestFollows () {
        return new Promise((resolve, reject) => {
            jsonp(`${API_LINK}/users/self/follows?access_token=${this.accessToken}`, function(response) {
                resolve(response);
            });
        });
    }
}


export default InstagramAPI;
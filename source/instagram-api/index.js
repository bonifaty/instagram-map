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
            jsonp(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${this.accessToken}`, function(response) {
                resolve(response);
            });
        });
    }
}


export default InstagramAPI;
import { h, render } from 'preact';

require('file-loader?name=[name].[ext]!./index.html');
require('reset-css/reset.css');

import MyComponent from './components/my-component';

const clientId = 'cf0a8460eaa7464091678414ee1c1525';
const clientSecret = '16cf86bd38df43cbb39ace4d0bd88e8e';
const url = `${location.protocol}//${location.host}${location.pathname ? location.pathname : ''}`;

function renderApplication(token) {
    render((
        <div>
            <MyComponent token={token} />
        </div>
    ), document.body);
}

const code = location.search.split('=')[1];
if (code) {
    history.pushState({}, '', '/');
    const formData = new FormData();
    formData.append("client_id", clientId);
    formData.append("client_secret", clientSecret);
    formData.append("grant_type", 'authorization_code');
    formData.append("redirect_uri", url);
    formData.append("code", code);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://cors-anywhere.herokuapp.com/https://api.instagram.com/oauth/access_token");
    xhr.onreadystatechange = () => {
        let status;
        if (xhr.readyState === 4) {
            status = xhr.status;
            if (status === 200) {
                let data = JSON.parse(xhr.responseText);
                renderApplication(data.access_token);
            }
        }
    };
    xhr.send(formData);
} else {
    location.href = `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${url}&response_type=code`;
}
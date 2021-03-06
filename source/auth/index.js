const clientId = 'cf0a8460eaa7464091678414ee1c1525';
const clientSecret = '16cf86bd38df43cbb39ace4d0bd88e8e';
const url = `${location.protocol}//${location.host}${location.pathname}`;

export default new Promise((resolve, reject) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        // TOOD: add token validation
        // check token -> if (works) -> resolve
        // else requestToken
        resolve(token);
    } else {
        const code = location.search.split('=')[1];
        if (code) {
            history.pushState({}, '', location.pathname);
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
                        const data = JSON.parse(xhr.responseText);
                        const token = data.access_token;
                        window.localStorage.setItem('token', token);
                        resolve(token);
                    }
                }
            };
            xhr.send(formData);
        } else {
            location.href = `https://api.instagram.com/oauth/authorize/?client_id=${clientId}&redirect_uri=${url}&scope=follower_list+public_content&response_type=code`;
        }
    }
});
import { h, render } from 'preact';
import auth from './auth';

require('file-loader?name=[name].[ext]!./index.html');
require('reset-css/reset.css');

import MyComponent from './components/my-component';

auth.then((token) => {
    render((
        <div>
            <MyComponent token={token}/>
        </div>
    ), document.body);
});


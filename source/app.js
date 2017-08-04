import { h, render } from 'preact';

require('file-loader?name=[name].[ext]!./index.html');
require('reset-css/reset.css');

import MyComponent from './components/my-component';

render((
    <div>
        <MyComponent />
    </div>
), document.body);
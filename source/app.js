import { h, render } from 'preact';
import auth from './auth';

require('file-loader?name=[name].[ext]!./index.html');

import './app.styl';

import Layout from './components/layout';

auth.then((token) => {
    render((
        <div>
            <Layout token={token}/>
        </div>
    ), document.getElementById('app'));
});


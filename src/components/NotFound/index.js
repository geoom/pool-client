// @flow

import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () =>
    <div style={{ margin: '2 rem auto', textAlign: 'center'}}>
        <p>Page not found :p</p>
        <p><Link to='/'> Go to the home page</Link></p>
    </div>;

export default NotFound;
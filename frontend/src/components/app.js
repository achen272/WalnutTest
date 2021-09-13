import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

import HomePage from './home/home_page';

const App = () => (
    <Switch>
        <AuthRoute exact path="/" component={Home} />
    </Switch>
)

export default App;
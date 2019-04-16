// @flow
import React, { Component } from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from 'react-router-dom';

import Home from '../Home';
import Signin from '../Signin';
import Signup from '../Signup';
import NotFound from '../../components/NotFound';

class App extends Component {
    render(){
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signin" component={Signin} />
                        <Route exact path="/signup" component={Signup} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
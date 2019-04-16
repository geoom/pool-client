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

import { authenticate } from '../../actions/session';

type Props = {
    authenticate: () => void,
}

class App extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
    
        if (token) {
          this.props.authenticate();
        }
    }

    props: Props

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

export default connect(
    null,
    { authenticate }
)(App);
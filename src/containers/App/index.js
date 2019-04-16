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
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';

import { authenticate, unauthenticate } from '../../actions/session';

type Props = {
    authenticate: () => void,
    unauthenticate: () => void,
    isAuthenticated: boolean,
    willAuthenticate: boolean,
}

class App extends Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
    
        if (token) {
            this.props.authenticate();
        } else {
            this.props.unauthenticate();
        }
    }

    props: Props

    render(){
        const { isAuthenticated, willAuthenticate } = this.props;
        const authProps = { isAuthenticated, willAuthenticate };

        return (
            <Router>
                <div style={{ display: 'flex', flex: '1' }}>
                    <Switch>
                        <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
                        <RedirectAuthenticated pattern="/signin" component={Signin} {...authProps} />
                        <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default connect(
    state => ({
        isAuthenticated: state.session.isAuthenticated,
        willAuthenticate: state.session.willAuthenticate,
    }),
    { authenticate, unauthenticate }
)(App);
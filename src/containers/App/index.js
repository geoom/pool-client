// @flow
import React, { Component } from 'react';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch 
} from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../Home';
import Signin from '../Signin';
import Signup from '../Signup';
import NotFound from '../../components/NotFound';
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';
import Sidebar from '../../components/Sidebar';
import Room from '../Room';

import { authenticate, unauthenticate, signout } from '../../actions/session';

type Props = {
    authenticate: () => void,
    unauthenticate: () => void,
    isAuthenticated: boolean,
    willAuthenticate: boolean,
    signout: () => void,
    currentUserRooms: Array,
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

    handleSignout = router => this.props.signout(router);

    render(){
        const { isAuthenticated, willAuthenticate } = this.props;
        const authProps = { isAuthenticated, willAuthenticate };

        return (
            <Router>
                {({router}) => (
                    <div style={{ display: 'flex', flex: '1' }}>
                        {
                            isAuthenticated &&
                            <Sidebar 
                                router={router}
                                rooms={currentUserRooms}
                                onSignoutClick={this.handleSignout}
                            />
                        }
                        <Switch>
                            <MatchAuthenticated exactly pattern="/" component={Home} {...authProps} />
                            <RedirectAuthenticated pattern="/signin" component={Signin} {...authProps} />
                            <RedirectAuthenticated pattern="/signup" component={Signup} {...authProps} />
                            <MatchAuthenticated exactly pattern="/r/:id" component={Room} {...authProps} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                )}
            </Router>
        )
    }
}

export default connect(
    state => ({
        isAuthenticated: state.session.isAuthenticated,
        willAuthenticate: state.session.willAuthenticate,
        currentUserRooms: state.rooms.currentUserRooms,
    }),
    { authenticate, unauthenticate, signout }
)(App);
// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SigninForm from '../../components/SigninForm';
import Navbar from '../../components/Navbar';

type Props = {
    signin: () => void,
}

class Signin extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    props: Props

    handleSignin = data => this.props.signin(data, this.context.router)

    render(){
        return (
            <div style={{flex: '1'}}>
                <Navbar />
                <SigninForm onSubmit={this.handleSignin} />
            </div>
        )
    }
}

export default connect(null, { signin })(Signin)
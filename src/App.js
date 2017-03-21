import React, { Component } from 'react';
import { Link } from 'react-router';
import { HiddenOnlyAuth, VisibleOnlyAuth } from './util/wrappers.js';
import {connect} from 'react-redux';

import {Grid, Col, Row, Alert} from 'react-bootstrap';

// UI Components
import LoginButtonContainer from './user/ui/loginbutton/LoginButtonContainer';
import LogoutButtonContainer from './user/ui/logoutbutton/LogoutButtonContainer';

import Header from './components/header';

import { fetchAccountsAndBalances, 
    fetchCurrentBlockNumber,
    fetchCurrentNetwork } from './actions/userActions';

// Styles
import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        console.log(this.props);
        dispatch(fetchAccountsAndBalances());
        dispatch(fetchCurrentBlockNumber());
        dispatch(fetchCurrentNetwork());
    }

    getNetworkStatusAlert(networkId, currentBlock) {
        let alertStyle = "info";
        let networkDisplayName = "network";

        switch (networkId) {
            case "1":
                alertStyle = "danger";
                networkDisplayName = "Mainnet";
                break;
            case "2":
                alertStyle = "warning";
                networkDisplayName = "Morden";
                break;
            case "42":
                alertStyle = "info";
                networkDisplayName = "Kovan";
                break;
            case "3":
                alertStyle = "info";
                networkDisplayName = "Ropsten";
                break;
            default:
                break;
        }

        return (
            <Alert bsStyle={alertStyle}>
                <strong>Currently on {networkDisplayName} ({networkId})</strong> The current block is {currentBlock}.
            </Alert>
        );
    }

    render() {
        const { user } = this.props;

        let currentUser = {};
        if (user.accounts.length > 0) {
            currentUser = user.accounts[user.selectedAccount];
        }

        let currentBlockNum = this.props.currentBlock;
        let network = this.props.network;

        let content = (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={12}>
                            {this.getNetworkStatusAlert(network, currentBlockNum)}
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        )

        return (
            <div>
                <Header user={user}></Header>
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentBlock: state.user.currentBlock,
        network: state.user.network,
        user: state.user,
    }
}

export default connect(mapStateToProps)(App);

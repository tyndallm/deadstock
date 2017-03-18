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

    render() {
        const { user } = this.props;

        let currentUser = {};
        if (user.accounts.length > 0) {
            currentUser = user.accounts[user.selectedAccount];
        }

        let content = (
            <div>
                <Grid>
                    <Row>
                        <Col xs={12} md={12}>
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

  // render() {
  //   const OnlyAuthLinks = VisibleOnlyAuth(() =>
  //     <span>
  //       <li className="pure-menu-item">
  //         <Link to="/dashboard" className="pure-menu-link">Dashboard</Link>
  //       </li>
  //       <li className="pure-menu-item">
  //         <Link to="/profile" className="pure-menu-link">Profile</Link>
  //       </li>
  //       <LogoutButtonContainer />
  //     </span>
  //   )

  //   const OnlyGuestLinks = HiddenOnlyAuth(() =>
  //     <span>
  //       <li className="pure-menu-item">
  //         <Link to="/signup" className="pure-menu-link">Sign Up</Link>
  //       </li>
  //       <LoginButtonContainer />
  //     </span>
  //   )

  //   return (
  //     <div className="App">
  //       <nav className="navbar pure-menu pure-menu-horizontal">
  //         <Link to="/" className="pure-menu-heading pure-menu-link">Truffle Box</Link>
  //         <ul className="pure-menu-list navbar-right">
  //           <OnlyGuestLinks />
  //           <OnlyAuthLinks />
  //         </ul>
  //       </nav>

  //       {this.props.children}
  //     </div>
  //   );
  // }
}

function mapStateToProps(state) {
    return {
        currentBlock: state.user.currentBlock,
        network: state.user.network,
        user: state.user,
    }
}

export default connect(mapStateToProps)(App);

import React from 'react';
import {connect} from 'react-redux';

import * as Web3Api from '../api/web3api.js'; // temporary

import {Jumbotron, Button, Alert} from 'react-bootstrap';

import ListingsTable from '../components/listingsTable';

import { fetchListings } from '../actions/marketplaceActions';

var _this;

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchListings());
    }

    handleCreateListingBtnClicked() {
        console.log("Create lisiting clicked");
        const {user} = _this.props;
        let currentUser = {};
        if (user.accounts.length > 0) {
            currentUser = user.accounts[user.selectedAccount];
            Web3Api.createListing("Test listing", Web3Api.toWei(10), 38117, currentUser.address);
        }
        
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <Jumbotron>
                    <h1>Welcome to 0xD3ADST0CK</h1>
                    <p>Checkout the listings below or create your own.</p>
                    <p><Button bsStyle="primary" onClick={_this.handleCreateListingBtnClicked}>Create a listing</Button></p>
                </Jumbotron>
                <ListingsTable/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        marketplace: state.marketplace,
        currentBlock: state.user.currentBlock,
        user: state.user
    }
}

export default connect(mapStateToProps)(HomeContainer);
import React from 'react';
import {connect} from 'react-redux';

import * as Web3Api from '../api/web3api.js'; // temporary

import {Jumbotron, Button, Alert} from 'react-bootstrap';

import ListingsTable from '../components/listingsTable';

import { fetchListings, createListing } from '../actions/marketplaceActions';

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
        const {dispatch, user} = _this.props;
        let currentUser = {};
        if (user.accounts.length > 0) {
            currentUser = user.accounts[user.selectedAccount];

            let listingInfo = {
                title: "Dunk Hight TRD QS Reese Forbes Denim", 
                price: Web3Api.toWei(4.76), 
                deadline: 38117, 
                creator: currentUser.address,
                brand: "Nike",
                size: "12",
                style: "881758-441",
                color: "Midnight Navy",
                imageUrl: "https://cdn.shopify.com/s/files/1/0563/1361/products/2-14-17ReeseForbesDenim1.jpg?v=1487360842",
                condition: "deadstock",
                description: "descript goes here"};

            dispatch(createListing(listingInfo));
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
                <ListingsTable listings={this.props.marketplace.listings}/>
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
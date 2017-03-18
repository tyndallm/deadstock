import React from 'react';
import {connect} from 'react-redux';

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
    }

    render() {
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
        currentBlock: state.user.currentBlock
    }
}

export default connect(mapStateToProps)(HomeContainer);
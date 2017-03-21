import React from 'react';
import {connect} from 'react-redux';
import {fetchListing, fetchItemDetails} from '../actions/listingActions';
import {fetchCurrentBlockNumber} from '../actions/userActions';
import {Grid, Row, Col, Jumbotron, Button, Panel, ListGroup, ListGroupItem, Breadcrumb} from 'react-bootstrap';
import {getEtherscanLink} from '../util/utils';
import {fromWei} from '../api/web3api.js';

var _this;

class ListingContainer extends React.Component {
    constructor(props) {
        super(props);
        _this = this;
    }

    componentDidMount() {
        const {dispatch, params} = this.props;
        dispatch(fetchListing(params.address));
        // dispatch(fetchItemDetails(params.address));
    }

    render() {
        console.log(this.props);
        const {listing} = this.props;

        let details = {};
        return (
            <Row>
                <Col xs={12} md={12}>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">
                            Listings
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            {listing.address}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col xs={12} md={7}>
                    <img src={""} className="img-responsive"/>
                </Col>
                <Col xs={12} md={5}>
                    <Panel>
                        <ListGroup fill>
                            <ListGroupItem><h3>{listing.title}</h3></ListGroupItem>
                            <ListGroupItem>Brand: {details.brand}</ListGroupItem>
                            <ListGroupItem>Color: {details.color}</ListGroupItem>
                            <ListGroupItem>Style: {details.style}</ListGroupItem>
                            <ListGroupItem>Size: {details.size}</ListGroupItem>
                            <ListGroupItem>Condition: {details.condition}</ListGroupItem>
                            <ListGroupItem>Remaining blocks: {listing.deadline - this.props.currentBlock}</ListGroupItem>
                            <ListGroupItem>Price: <h3>{fromWei(listing.price) + " ETH"}</h3></ListGroupItem>
                            <ListGroupItem><Button bsStyle={"success"}>Purchase</Button></ListGroupItem>
                        </ListGroup>
                    </Panel>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        listing: state.listing.listing,
        details: state.details,
        currentBlock: state.user.currentBlock,
        user: state.user
    }
}

export default connect(mapStateToProps)(ListingContainer);
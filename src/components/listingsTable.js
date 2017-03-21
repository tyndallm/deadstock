import React from 'react';
import {Table} from 'react-bootstrap';
import {fromWei} from '../api/web3api';
import {getEtherscanLink} from '../util/utils';

class ListingsTable extends React.Component {
    render() {
        return(
            <Table responsive>
                <thead>
                    <tr>
                        <th>Listing</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Creator</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.listings.map(listing =>
                        <tr className={"listingRow"} key={listing.address}>
                            <td><a href={"/listing/" + listing.address}>{listing.title}</a></td>
                            <td>{"status"}</td>
                            <td>{fromWei(listing.price)} ETH</td>
                            <td><a href={getEtherscanLink(listing.creator)}>{listing.creator}</a></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }
}

export default ListingsTable;
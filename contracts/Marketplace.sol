pragma solidity ^0.4.4;

import './zeppelin/lifecycle/Killable.sol';
import './Listing.sol';

contract Marketplace is Killable{
    
    address public owner;
    uint public numOfListings;

    mapping (uint => address) public listings;

    event LogFailure(string message);

    function Markeplace() {
        owner = msg.sender;
        numOfListings = 0;
    }

    /**
    * Create a new Listing contract
    * [0] -> new Listing contract address
    */
    function createListing(uint _price, 
                           uint _deadline, 
                           string _title, 
                           string _brand,
                           string _size,
                           string _style,
                           string _color,
                           string _imageUrl,
                           string _condition,
                           string _description) payable returns (Listing listingAddress) {

        if (_price <= 0) {
            LogFailure("Listing price must be greater than 0");
            throw;
        }

        Listing l = new Listing(_price, 
                                _deadline, 
                                _title, 
                                msg.sender,
                                _brand,
                                _size,
                                _style,
                                _color,
                                _imageUrl,
                                _condition,
                                _description);
        listings[numOfListings] = l;
        numOfListings++;
        return l;
    }

    /**
    * Don't allow Ether to be sent blindly to this contract
    */
    function() {
        throw;
    }

}
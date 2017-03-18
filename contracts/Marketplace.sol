pragma solidity ^0.4.4;

import './zeppelin/lifecycle/Killable.sol';
import './Listing.sol';

contract Marketplace is Killable{
    
    address public owner;
    uint numOfListings;

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
    function createListing(uint _price, uint _deadline, string _title) payable returns (Listing listingAddress) {

        if (_price <= 0) {
            LogFailure("Listing price must be greater than 0");
            throw;
        }

        Listing l = new Listing(_price, _deadline, _title, msg.sender);
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
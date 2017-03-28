/*
This file is part of 0xDeadstock.
*/

/*
A factory contract used for the generation and registration of 0xDeadstock
standard listing contracts.
*/

pragma solidity ^0.4.4;

import "./weifund/PrivateServiceRegistry.sol";
import "./StandardListing.sol";


/// @title Standard Listing Factory - used to generate and register standard listings
/// @author Matt Tyndall <matt@tyndl.me>
contract StandardListingFactory is PrivateServiceRegistry {
  function createStandardListing(string _name,
    string _description,
    uint256 _expiry,
    uint256 _price,
    address _beneficiary) public returns (address listingAddress) {
    // create the new enhanced standard listing
    listingAddress = address(new StandardListing(_name,
      _description,
      _expiry,
      _price,
      _beneficiary,
      msg.sender));

    // register the campaign address
    register(listingAddress);
  }
}
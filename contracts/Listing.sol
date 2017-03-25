/*
This file is part of 0xDeadstock
*/

/*
The core listing contract interface. used across all 0xDeadstock standard listing contracts.
*/

pragma solidity ^0.4.4;

/// @title Listing contract interface for 0xDeadstock standard listings
/// @author Matt Tyndall <matt@tyndl.me>
contract Listing {

    function owner() public constant returns(address) {}

    function version() public constant returns(string) {}

    function name() public constant returns(string) {}

    function paymentMethodABI() public constant returns(string) {}

    function payoutMethodABI() public constant returns(string) {}

    function seller() public constant returns(address) {}

    function expiry() public constant returns(uint256 blockNumber) {}

    function price() public constant returns(uint256 price) {}

    function created() public constant returns(uint256 timestamp) {}

    /// @notice the current stage the listing is interface
    /// @return the listing stage the listing is in with uint256
    function stage() public constant returns(uint256);

    // Listing events
    event PaymentMade (address _buyer);
    event SellerPaymentClaimed (address _paymentDestination);
}
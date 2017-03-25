pragma solidity ^0.4.4;

import "./zeppelin/lifecycle/Killable.sol";

contract ListingRegistryInterface {
    
    function register(address _listing, address _interface) public returns (uint256 listingId);

    function idOf(address _listing) constant public returns (uint256 listingId);

    function abiOf(uint256 _listingId) constant public returns (address abi);

    function registeredAt(uint256 _listingId) constant public returns (uint256 registered);

    function addressOf(uint256 _listingId) constant public returns (address listing);

    function numListings() constant public returns (uint256 count);
}

contract ListingRegistry is ListingRegistryInterface {

    modifier validRegistration(address _listing) {
        // listing owner is sender
        if (Ownable(_listing).owner() != msg.sender) {
            throw;
        }

        // prevent double registrations
        if (listings.length > 0 && listings[ids[_listing]].addr == _listing) {
            throw;
        }

        _;
    }

    function register(address _listing, address _interface)
        validRegistration(_listing)
        public
        returns (uint256 listingId) {

        listingId = listings.length++;

        // store listingId
        ids[_listing] = listingId;

        // create new listing, storing the listing address, interface (if any)
        // and the time of registration
        listings[listingId] = Listing({
            addr: _listing,
            abi: _interface,
            registered: now
        });

        ListingRegistered(_listing, _interface, listingId);
    }

    function idOf(address _listing) constant public returns (uint256 listingId) {
        return ids[_listing];
    }

    function abiOf(uint256 _listingId) constant public returns (address abi) {
        return listings[_listingId].abi;
    }

    function registeredAt(uint256 _listingId) constant public returns (uint256 registered) {
        return listings[_listingId].registered;
    }

    function addressOf(uint256 _listingId) constant public returns (address listing) {
        return listings[_listingId].addr;
    }

    function numListings() constant public returns (uint256 count) {
        return uint256(listings.length);
    }

    struct Listing {
        // the address of the listing contract
        address addr;

        // the address pf the interface contract
        address abi;

        // the UNIX block timestamp of when the campaign was registered
        uint256 registered;
    }

    Listing[] public listings;
    mapping(address => uint) public ids;

    event ListingRegistered(address _listing, address _interface, uint256 _listingId);
}
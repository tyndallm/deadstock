pragma solidity ^0.4.4;

contract Listing {

    uint public price;
    uint public deadline;
    string title;
    address creator;

    address public marketplace;

    modifier onlyMarketplace {
        if (marketplace != msg.sender) throw;
        _;
    }

    function Listing(uint _price, uint _deadline, string _title, address _creator) {

        marketplace = msg.sender;

        price = _price;
        deadline = _deadline;
        title = _title;
        creator = _creator;
    }

    /**
    * Listing return values are indexed in the following order:
    * [0] -> title
    * [1] -> price
    * [2] -> deadline
    * [3] -> creator
    * [4] -> parent marketplace address
    * [5] -> Listing (address)
    */
    function getListing() returns (string, uint, uint, address, address, address) {
        return (title,
                price,
                deadline,
                creator,
                marketplace,
                address(this));
    }

    function kill() public onlyMarketplace {
        selfdestruct(marketplace);
    } 

    /**
    * Don't allow Ether to be sent blindly to this contract
    */
    function() {
        throw;
    }
    
}
pragma solidity ^0.4.4;

contract Listing {

    struct ItemDetails {
        string brand;
        string size;
        string style;
        string color;
        string condition;
        string description;
        string imageUrl;
    }

    // struct ShippingInfo {
    //     string name;
    //     string street;
    //     string aptNum;
    //     string city;
    //     string state;
    //     string zipcode;
    // }

    // TODO: see if its possible to encrypt buyer details with the sellers public key
    struct Buyer {
        address buyerAddr;
        uint salePrice;
        string note;
    }

    struct Seller {
        address sellerAddr;
        uint insurancePrice;
    }

    uint public price;
    uint public deadline;
    string public title;
    string public status;

    Buyer public buyer;
    Seller public seller;
    ItemDetails public itemDetails;
    // ShippingInfo public shippingInfo;

    address public marketplace;

    modifier onlyMarketplace {
        if (marketplace != msg.sender) throw;
        _;
    }

    function Listing(uint _price, 
                     uint _deadline, 
                     string _title, 
                     address _creator,
                     string _brand,
                     string _size,
                     string _style,
                     string _color,
                     string _imageUrl,
                     string _condition,
                     string _description) {

        marketplace = msg.sender;

        itemDetails = ItemDetails({
            brand: _brand,
            size: _size,
            style: _style,
            color: _color,
            condition: _condition,
            description: _description,
            imageUrl: _imageUrl

        });

        seller = Seller({
            sellerAddr: _creator,
            insurancePrice: _price
        });

        price = _price;
        deadline = _deadline;
        title = _title;  
    }

    /**
    * Listing return values are indexed in the following order:
    * [0] -> title
    * [1] -> price
    * [2] -> deadline
    * [3] -> creator
    * [4] -> parent marketplace address
    * [5] -> Listing (address)
    * [6] -> brand
    * [7] -> size
    * [8] -> style
    * [9] -> color
    * [10] -> imageUrl
    * [11] -> condition
    */
    function getListing() returns (string, 
                                   uint, 
                                   uint, 
                                   address, 
                                   address) {
        return (title,
                price,
                deadline,
                marketplace,
                address(this));
    }

    function getDetails() returns (string,
                                   string,
                                   string,
                                   string,
                                   string,
                                   string,
                                   string) {
        return (itemDetails.brand,
                itemDetails.size,
                itemDetails.style,
                itemDetails.color,
                itemDetails.condition,
                itemDetails.description,
                itemDetails.imageUrl);
    }

    function getSeller() returns (address,
                                  uint) {
        return (seller.sellerAddr,
                seller.insurancePrice);
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
/*
This file is part of 0xDeadstock
*/

/*
Standard listing for Deadstock. A generic marketplace for buying and selling items
*/

pragma solidity ^0.4.4;

/*
Interfaces
*/
import "./Listing.sol";

/*
Specified Contracts
*/
import "./zeppelin/lifecycle/Killable.sol";


/// @title Standard Listing -- enables generic item listings for sellers which can be purchase with Ethereum
// @author Matt Tyndall <matt@tyndl.me>
contract StandardListing is Killable, Listing {
    // the three possible stages
    enum Stages {
        ListingActive,
        ListingExpired,
        ListingSuccessful
    }

    // the listing state machine enforcement
    modifier atStage(Stages _expectedStage) {
        // if the current state does not equal the expected one, throw
        if (stage() != uint256(_expectedStage)) {
            throw;
        } else {
            // contine with state changing operations
            _;
        }
    }

    modifier validPayment() {
        // if the msg value is zero or below the listing price, throw
        if (msg.value == 0 || msg.value < price) {
            throw;
        } else {
            // carry on with state changing operations
            _;
        }
    }

    // only the beneficiary can use the method with this modifier
    modifier onlyBeneficiary() {
        if (msg.sender != beneficiary) {
            throw;
        } else {
            _;
        }
    }

    // allow for fallback function to be used to make payment
    function () public payable {
        payMsgValue(defaultAmounts);
    }

    //the current listing stage
    function stage() public constant returns(uint256) {
        // if current time is less than the expiry, the listing is active
        if (block.number < expiry && amountReceived < price) {
            return uint256(Stages.ListingActive);
        } else if(block.number >= expiry && amountReceived < price) {
            return uint256(Stages.ListingExpired);
        } else if(amountReceived >= price) {
            return uint256(Stages.ListingSuccessful);
        }
    }

    // pay message value if the payment is valid and the listing is
    // in Active stage
    function payMsgValue(uint256[] _amounts)
        public
        payable
        atStage(Stages.ListingActive)
        validPayment()
        returns (uint256 paymentId) {
        
        paymentId = payments.length++;

        payments[paymentId] = Payment({
            sender: msg.sender,
            value: msg.value,
            created: block.number
        });

        // add the paymentId to that senders address
        paymentsBySender[msg.sender].push(paymentId);

        // increase the amount received by the message value
        amountReceived += msg.value;

        PaymentMade(msg.sender);
    }

    function payoutToBeneficiary() public onlyBeneficiary() {
        // send funds to the beneficiary
        if (!beneficiary.call.value(this.balance)()) {
            throw;
        } else {
            SellerPaymentClaimed(beneficiary);
        }
    }

    function totalPayments() public constant returns (uint256 amount) {
        return uint256(payments.length);
    }

    function totalPaymentBySender(address _sender) 
        public
        constant
        returns (uint256 amount) {
            return uint256(paymentsBySender[_sender].length);
    }

    // the contract constructor
    function StandardListing(string _name,
        string _description,
        uint256 _expiry,
        uint256 _price,
        address _beneficiary,
        address _owner) public {

        // set the listing _name
        name = _name;

        description = _description;

        // the listing expiry in blocks
        expiry = _expiry;

        // the price in wei
        price = _price;

        // the beneficiary address
        beneficiary = _beneficiary;

        // the owner or operator of the listing
        owner = _owner;

        // the time the listing was created
        created = block.number;
    }

    // the payment data structure
    struct Payment {
        // the buyer address
        address sender;

        // the value of the payment
        uint256 value;

        // the time the payment was made
        uint256 created;
    }

    // default amounts used TODO: not sure what this is exactly
    // I think this is an array of default contribution amounts
    // so it may not be applicable here...
    uint256[] defaultAmounts;

    address public owner;

    uint256 public price;

    uint256 public amountReceived;

    uint256 public expiry;

    uint256 public created;

    address public beneficiary;

    Payment[] public payments;

    // all payment ID's of a specific sender
    mapping(address => uint256[]) public paymentsBySender;

    string public name;

    string public description;

    // string constant public version = "0.1.0";

    // // the payment method ABI as a string, written in standard solidity
    // // ABI format, this is generally used so that UI's can understand the listing
    // string constant public paymentMethodABI = "payMsgValue(uint256[]):(uint256)";

    // // the payout to beneficiary ABI, written in standard solidity ABI format
    // string constant public payoutMethodABI = "payoutToBeneficiary(bool)";
}

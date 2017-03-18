import Web3 from 'web3'

import {getExtendedWeb3Provider} from '../util/utils.js';
import MarketplaceContract from '../../build/contracts/Marketplace.json';
import ListingContract from '../../build/contracts/Listing.json';

const contract = require('truffle-contract');

let web3Provided;

let marketplaceInstance;
let listingInstance;

function initializeWeb3() {
    /*eslint-disable */
    if (typeof web3 !== 'undefined') {
        web3Provided = new Web3(web3.currentProvider);
    } else {
        web3Provided = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }    
    /*eslint-enable */

    marketplaceInstance = contract(MarketplaceContract);
    listingInstance = contract(ListingContract);

    marketplaceInstance.setProvider(web3Provided);
    listingInstance.setProvider(web3Provided);

    return getExtendedWeb3Provider(web3Provided);
}

function web3Client() {
    if (web3Provided) {
        return web3Provided;
    } else {
        return initializeWeb3();
    }
}

export function getAccounts() {
    return new Promise((resolve, reject) => {
        web3Client().eth.getAccounts(function (err, accts) {
            if (err != null) {
                console.log("Web3Api Error: ", err);
                reject();
            }

            if (accts.length === 0) {
                console.log("Web3Api Error: couldn't get any accounts");
                reject();
            }

            let accountsAndBalances = accts.map((address => {
                return getAccountBalance(address).then((balance) => { return { address, balance} });
            }));

            Promise.all(accountsAndBalances).then((accountsAndBalances) => {
                resolve(accountsAndBalances);
            });

        });
    
    });
}

export function getAccountBalance(account) {
    return new Promise((resolve, reject) => {
        web3Client().eth.getBalance(account, function(err, value) {
            resolve(value.valueOf());
        });
    });
}

export function getListings() {
    return new Promise((resolve, reject) => {
        let marketplace = marketplaceInstance.deployed();
        marketplace.numOfListings.call().then(function(num) {
            let listingCount = num.valueOf();

            let array = Array.apply(null, {length: listingCount}).map(Number.call, Number);
            let listingPromises = array.map((id => {
                return getListingAddress(id);
            }));

            Promise.all(listingPromises).then((listingAddresses) => {
                let listingDetailPromises = listingAddresses.map((address => {
                    return getListingDetails(address);
                }));

                Promise.all(listingDetailPromises).then((listings) => {
                    resolve(listings);
                });
            });
        });
    });
}

export function getListingDetails(address) {
    return new Promise((resolve, reject) => {
        let listing = listingInstance.at(address);
        listing.getListing.call().then(function(listingDetails) {
            resolve({
                title: listingDetails[0],
                price: listingDetails[1].toNumber(),
                deadline: listingDetails[2].toNumber(),
                creator: listingDetails[3],
                marketplace: listingDetails[4],
                address: listingDetails[5],
            })
        })
    });
}

function getListingAddress(id) {
    return new Promise((resolve, reject) => {
        let marketplace = marketplaceInstance.deployed();
        marketplace.listings.call(id).then(function(address) {
            resolve(address);
        });
    });
}

export function getCurrentBlockNumber() {
    return new Promise((resolve, reject) => {
        web3Client().eth.getBlockNumber(function (err, blockNum) {
            if (err) {
                reject();
            }
            resolve(blockNum);
        });
    });
}

export function getNetwork() {
    return new Promise((resolve, reject) => {
        web3Client().version.getNetwork(function (err, network) {
            if (err) {
                reject();
            }
            resolve(network);
        })
    })
}

export function toWei(ethValue) {
    return web3Client().toWei(ethValue, "ether");
}

export function fromWei(weiValue) {
    return web3Client().fromWei(weiValue, "ether");
}

export function getMarketplaceAddress() {
    let address = marketplaceInstance.deployed().address;
    console.log(address);
    return address;
}



import Web3 from 'web3'

import {getExtendedWeb3Provider} from '../util/utils.js';
import ListingContract from '../../build/contracts/Listing.json';
import AuthenticationContract from '../../build/contracts/Authentication.json';
import StandardListingFactoryContract from '../../build/contracts/StandardListingFactory.json';
import ListingRegistryContract from '../../build/contracts/ListingRegistry.json';

const contract = require('truffle-contract');

let web3Provided;

var listingInstance, authenticationInstance;

// const marketplace = contract(MarketplaceContract);
// marketplace.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

const listingRegistry = contract(ListingRegistryContract);
listingRegistry.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

const listing = contract(ListingContract);
listing.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

const listingFactory = contract(StandardListingFactoryContract);
listingFactory.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));


function initializeWeb3() {
    /*eslint-disable */
    if (typeof web3 !== 'undefined') {
        web3Provided = new Web3(web3.currentProvider);
    } else {
        web3Provided = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }    
    /*eslint-enable */

    authenticationInstance = contract(AuthenticationContract);
    authenticationInstance.setProvider(web3Provided);

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

export function login(userAddress) {
    return new Promise((resolve, reject) => {
        let authentication = authenticationInstance.deployed();
        authentication.login.call({from: userAddress}).then(function(result) {
            let userName = web3Client().toUtf8(result);
            resolve(userName);
        }).catch(function(result) {
            console.log("There was an error logging in: ", result);
            reject(result);
        });
    });
}

export function signUp(username, userAddress) {
    return new Promise((resolve, reject) => {
        let authentication = authenticationInstance.deployed();
        authentication.signup.call(username, {from: userAddress}).then(function(result) {
            resolve(result);
        }).catch(function(result) {
            console.log("There was an error signing up: ", result);
            reject(result);
        });
    });
}

// export function getListings() {
//     return new Promise((resolve, reject) => {
//         let marketplaceInstance;
//         marketplace.deployed().then(function(instance) {
//             marketplaceInstance = instance;
//             return instance.numOfListings.call();
//         }).then(function(result) {
//             let listingsCount = result.valueOf();
//             console.log("[web3Api.marketplace.getListings] number of listings: ", listingsCount);
            
//             let array = Array.apply(null, {length: listingsCount}).map(Number.call, Number);
//             let listingsPromises = array.map((id => {
//                 return getListingAddress(id);
//             }));

//             Promise.all(listingsPromises).then((listingAddresses) => {
//                 let listingDetailPromises = listingAddresses.map((address => {
//                     return getListing(address);
//                 }));

//                 Promise.all(listingDetailPromises).then((listings) => {
//                     resolve(listings);
//                 });
//             });
//         });    
//     });
// }

export function getListings() {
    return new Promise((resolve, reject) => {
        let listingRegistryInstance;
        listingRegistry.deployed().then(function(instance) {
            listingRegistryInstance = instance;
            return listingRegistryInstance.numListings.call();
        }).then(function(result) {
            let listingsCount = result.valueOf();
            console.log("numListings: ", listingsCount);
            resolve(listingsCount);
        });
    })
}

function getListingAddress(id) {
    return new Promise((resolve, reject) => {
        // marketplace.deployed().then(function(instance) {
        //     return instance.listings.call(id);
        // })
        // .then(function(address) {
        //     console.log("address: ", address);
        //     resolve(address);
        // });
    });
}

export function getListing(_address) {
    return new Promise((resolve, reject) => {
        listing.at(_address).then(function(instance) {
            instance.getListing.call().then(function(listingDetails) {
                resolve({
                    title: listingDetails[0],
                    price: listingDetails[1].toNumber(),
                    deadline: listingDetails[2].toNumber(),
                    address: listingDetails[4],
                });
            });
        });
    });
}

export function getItemDetails(address) {
    return new Promise((resolve, reject) => {
        listing.at(address).then(function(instance) {
            instance.getDetails.call().then(function(itemDetails) {
                resolve({
                    brand: itemDetails[0],
                    size: itemDetails[1],
                    style: itemDetails[2],
                    color: itemDetails[3],
                    condition: itemDetails[4],
                    description: itemDetails[5],
                    imageUrl: itemDetails[6] 
                });
            });
        });
    });
}

export function getSeller(address) {
    return new Promise((resolve, reject) => {
        listing.at(address).then(function(instance) {
            instance.getSeller.call().then(function(seller) {
                resolve({
                    sellerAddress: seller[0],
                    insurancePrice: seller[1]
                });
            });
        });
    });
}

export function createListing(listingInfo) {
    return new Promise((resolve, reject) => {
        let marketplaceInstance;
        // marketplace.deployed().then(function(instance) {
        //     marketplaceInstance = instance;
        //     marketplaceInstance.createListing(listingInfo.price, 
        //                                       listingInfo.deadline, 
        //                                       listingInfo.title, 
        //                                       listingInfo.brand,
        //                                       listingInfo.size,
        //                                       listingInfo.style,
        //                                       listingInfo.color,
        //                                       listingInfo.imageUrl,
        //                                       listingInfo.condition,
        //                                       { from: listingInfo.creator, gas: 1000000 })
        //         .then(function(tx) {
        //             console.log("create listing tx: ", tx);
        //             return Promise.all([
        //                 web3Client().eth.getTransactionReceiptMined(tx)
        //             ]);
        //         })
        //         .then(function(receipt) {
        //             console.log("[web3Api.marketplace.createListing] transaction mined: ", receipt);
        //             return marketplaceInstance.listings.call(0);
        //         })
        //         .then(function(contractAddr) {
        //             console.log("[web3Api.marketplace.createListing] new listing address: ", contractAddr);
        //             resolve(contractAddr);
        //         });
        // });
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
    return new Promise((resolve, reject) => {
        // marketplace.deployed().then(function(instance) {
        //     console.log("markeplace address: ", instance.address);
        //     resolve(instance.address);
        // })
    });
}



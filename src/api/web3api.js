import Web3 from 'web3';

import truffleConfig from '../../../truffle.js';
import {getExtendedWeb3Provider} from '../util/utils.js';
import MarketplaceContract from '../../build/contracts/Marketplace.json';
import ListingContract from '../../build/contracts/Listing.json';

const contract = require('truffle-contract');

let web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
let web3Provided;

let marketplaceInstance;

function initializeWeb3() {
    if (typeof web3 !== 'undefined') {
        web3Provided = new Web3(web3.currentProvider);
    } else {
        web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location));
    }    

    marketplaceInstance = contract(MarketplaceContract);
    marketplaceInstance.setProvider(web3Provided);

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
                return getProjectAddress(id);
            }));

            Promise.all(projectPromises).then((projectAddresses) => {
                let projectDetailPromises = projectAddresses.map((address => {
                    return getProjectDetails(address);
                }));

                Promise.all(projectDetailPromises).then((projects) => {
                    resolve(projects);
                });
            });
        });
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



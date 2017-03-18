import * as Web3Api from '../api/web3api.js';
import {createAction} from 'redux-actions';

export const fetchAccountsRequest = "@@user/FETCH_ACCOUNTS_REQUEST";
export const fetchAccountsSuccess = "@@user/FETCH_ACCOUNTS_SUCCESS";
export const fetchAccountsFailure = "@@user/FETCH_ACCOUNTS_FAILURE";
export const fetchBlockRequest = "@@user/FETCH_BLOCK_REQUEST";
export const fetchBlockSuccess = "@@user/FETCH_BLOCK_SUCCESS";
export const fetchBlockFailure = "@@user/FETCH_BLOCK_FAILURE";
export const fetchNetworkRequest = "@@user/FETCH_NETWORK_REQUEST";
export const fetchNetworkSuccess = "@@user/FETCH_NETWORK_SUCCESS";
export const fetchNetworkFailure = "@@user/FETCH_NETWORK_FAILURE";
export const selectAccount = "@@user/SELECT_ACCOUNT";

export function fetchAccountsAndBalances() {
    return {
        types: [
            fetchAccountsRequest,
            fetchAccountsSuccess,
            fetchAccountsFailure,
        ],
        callApi: () => Web3Api.getAccounts(),
        payload: {}
    };
}

export function fetchCurrentBlockNumber() {
    return {
        types: [
            fetchBlockRequest,
            fetchBlockSuccess,
            fetchBlockFailure,
        ],
        callApi: () => Web3Api.getCurrentBlockNumber(),
        payload: {}
    }
}

export function fetchCurrentNetwork() {
    return {
        types: [
            fetchNetworkRequest,
            fetchNetworkSuccess,
            fetchNetworkFailure,
        ],
        callApi: () => Web3Api.getNetwork(),
        payload: {}
    }
}

export const setSelectedAccount = createAction(selectAccount);
import * as Web3Api from '../api/web3api.js';
import {createAction} from 'redux-actions';

export const fetchListingsRequest = "@@marketplace/FETCH_LISTINGS_REQUEST";
export const fetchListingsSuccess = "@@marketplace/FETCH_LISTINGS_SUCCESS";
export const fetchListingsFailure = "@@marketplace/FETCH_LISTINGS_FAILURE";

export function fetchListings() {
    return {
        types: [
            fetchListingsRequest,
            fetchListingsSuccess,
            fetchListingsFailure,
        ],
        callApi: () => Web3Api.getListings(),
        payload: {}
    };
}
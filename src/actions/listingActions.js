import * as Web3Api from '../api/web3api.js';
import {createAction} from 'redux-actions';

export const fetchListingRequest = "@@listing/FETCH_LISTING_REQUEST";
export const fetchListingSuccess = "@@listing/FETCH_LISTING_SUCCESS";
export const fetchListingFailure = "@@listing/FETCH_LISTING_FAILURE";
export const fetchItemDetailsRequest = "@@listing/FETCH_ITEM_DETAILS_REQUEST";
export const fetchItemDetailsSuccess = "@@listing/FETCH_ITEM_DETAILS_SUCCESS";
export const fetchItemDetailsFailure = "@@listing/FETCH_ITEM_DETAILS_FAILURE";

export function fetchListing(address) {
    return {
        types: [
            fetchListingRequest,
            fetchListingSuccess,
            fetchListingFailure,
        ],
        callApi: () => Web3Api.getListing(address),
        payload: {}
    };
}

export function fetchItemDetails(address) {
    return {
        types: [
            fetchItemDetailsRequest,
            fetchItemDetailsSuccess,
            fetchItemDetailsFailure,
        ],
        callApi: () => Web3Api.getItemDetails(address),
        payload: {}
    };
}

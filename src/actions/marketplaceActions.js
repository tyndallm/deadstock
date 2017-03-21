import * as Web3Api from '../api/web3api.js';
import {createAction} from 'redux-actions';

export const fetchListingsRequest = "@@marketplace/FETCH_LISTINGS_REQUEST";
export const fetchListingsSuccess = "@@marketplace/FETCH_LISTINGS_SUCCESS";
export const fetchListingsFailure = "@@marketplace/FETCH_LISTINGS_FAILURE";

export const createListingRequest = "@@marketplace/CREATE_LISTING_REQUEST";
export const createListingSuccess = "@@marketplace/CREATE_LISTING_SUCCESS";
export const createListingFailure = "@@marketplace/CREATE_LISTING_FAILURE";

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

export function createListing(listingInfo) {
    return {
        types: [
            createListingRequest,
            createListingSuccess,
            createListingFailure,
        ],
        callApi: () => Web3Api.createListing(listingInfo.title, 
                                             listingInfo.price, 
                                             listingInfo.deadline, 
                                             listingInfo.creator,
                                             listingInfo.brand,
                                             listingInfo.size,
                                             listingInfo.style,
                                             listingInfo.color,
                                             listingInfo.imageUrl,
                                             listingInfo.condition,
                                             listingInfo.description),
        payload: {}
    };
}
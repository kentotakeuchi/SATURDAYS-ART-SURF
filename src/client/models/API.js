import $ from 'jquery';
import { proxy } from '../config';

let token = localStorage.getItem(`token`);

var port = location.hostname === 'localhost' ? ':3000' : '';
var saturdays_art_baseURL = 'http://' + location.hostname + port + '/api';
console.log(`saturdays_art_baseURL`, saturdays_art_baseURL);

export default class API {

    constructor() {}

    // MEMO: Can access only data I have.
    // Get an item's data from "db" for "popupItemModal".
    getItemDB(id) {

        // console.log(`token`, token);

        return $.ajax({
            method: "GET",
            url: `${saturdays_art_baseURL}/item/${id}`,
            headers: { 'x-access-token': token }
        });
    }

    // MEMO: Can access whole data.
    // Get an item's data from "api" for "popupItemModal".
    getItemAPI(id) {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        });
    }

    // Get items data from db for "main page".
    getItems() {

        token = localStorage.getItem(`token`);

        return $.ajax({
            method: "GET",
            url: `${saturdays_art_baseURL}/item/main`,
            headers: { 'x-access-token': token }
        });
    }

    // MEMO: Since data is small, I call api on the client side.
    // Get my collection.
    getCollection(el) {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`
        });
    }
};

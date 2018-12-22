import $ from 'jquery';
import { proxy } from '../config';

const token = localStorage.getItem(`token`);

export default class API {

    constructor() {}

    // MEMO: Can access only data I have.
    // Get an item's data from "db" for "popupItemModal".
    getItemDB(id) {

        return $.ajax({
            method: "GET",
            url: `http://localhost:3000/item/${id}`,
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

        return $.ajax({
            method: "GET",
            url: `http://localhost:3000/item/main`,
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



    ///////////////////////////////////////////////
    /// BEFORE CHANGE

    /*
    // Get today's id of items.
    getIds() {

        const date = formatDate(new Date());

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects?metadataDate=${date}`
        });
    }

    // Get whole ids.
    getIds2() {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects`
        });
    }
    */

    // Get an item's data at random.
    // getItems(ids) {

    //     const index = Math.floor(Math.random() * ids.length);

    //     const id = ids[index];

    //     return $.ajax({
    //         method: "GET",
    //         url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    //     });
    // }

    /*
    // Get an item's data.
    getItem(id) {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        });
    }
    */

    /*
    // TODO: probably, I can reuse "getItem(id)".
    // Get my collection.
    getCollection(el) {

        return $.ajax({
            method: "GET",
            url: `${proxy}https://collectionapi.metmuseum.org/public/collection/v1/objects/${el}`
        });
    }
    */
};

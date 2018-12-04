import $ from 'jquery';

export default class API {
    constructor() {
    }

    getResults() {
        const randomID = Math.floor(Math.random() * 473108);
        console.log('randomID', randomID);

        $.ajax({
            method: "GET",
            url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomID}`,
            success: function(data) {
                console.log('data', data);
                console.log('data.primaryImage', data.primaryImage);
                $(`.image`).attr(`src`, data.primaryImage);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }
};
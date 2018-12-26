import $ from 'jquery';
import { els } from '../view/base';

export default class Bg {

    constructor() {}

    getImg() {

        return $.ajax({
            method: "GET",
            url: `http://localhost:3000/item`
        });
    }
};
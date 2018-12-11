import $ from 'jquery';
import { els } from './base';


export const toggleLikeBtn = isLiked => {

    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.likes__icon use').setAttribute('href', `./asset/img/icons.svg#${iconString}`);
    // icons.svg#icon-heart-outlined
};
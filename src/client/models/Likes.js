import $ from 'jquery';


export default class Likes {

    constructor() {
        this.likes = [];
    }

    addLike(id) {
        this.likes.push(id);

        // Persist data in localStorage
        this.persistData();
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id ===id);
        this.likes.splice(index, 1);

        // Persist data in localStorage
        this.persistData();
    }

    isLiked(id) {
        console.log(`this.likes`, this.likes);
        console.log(`this.likes.findIndex(el => parseInt(el) === id) === id)`, this.likes.findIndex(el => parseInt(el) === id));

        this.likes.findIndex(el => {
            console.log(`id`, id);
            console.log(`el`, el);
            console.log(`parseInt(el)`, parseInt(el));

            if(parseInt(el) === id) {
                return true;
            } else {
                return false;
            }
        });
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // Restoring likes from the localStorage
        if (storage) this.likes = storage;

        return storage;
    }
};
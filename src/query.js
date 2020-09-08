"use strict"

const fields = require("./fields.js");

class Query
{
    /**
     * @param collection {String}
     * @param data {Array}
     */
    constructor(collection, data){
        this.collection = collection;
        this.data       = data;
    }

    /**
     * @param where {Object}
     * @returns {Array|null|boolean}
     */
    find(where) {
        if (typeof where !== "object") {
            console.warn("The find() function call uses an object as an argument");
            return false;
        }

        if (this.data.length === 0) {
            return null;
        }

        for (let key in where) {
            for (let id in this.data) {
                if (this.data[id][key] !== undefined && this.data[id][key] === where[key]) {
                    return this.data[id];
                }
            }
        }

        return null;
    }

    /**
     * @param object {Object}
     * @returns {Object|boolean}
     */
    insert(object) {
        if (typeof object !== "object") {
            console.warn("The insert() function call uses an object as an argument")
            return false;
        }

        try {
            this.data.push(object);
        } catch (e) {
            console.error(e);
        }

        db.sync();

        object[fields.AUTO_INCREMENT] = this.data.length - 1;
        return object;
    }
}

module.exports = Query;
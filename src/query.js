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
     * @returns {Array|undefined|boolean}
     */
    find(where) {
        if (typeof where !== "object") {
            console.warn("The find() function call uses an object as an argument");
            return false;
        }

        if (this.data.length === 0) {
            return undefined;
        }

        let findRow = this.data.filter(function (row) {
            let obj = {};
            for (let key in where) {
                if (row[key] !== undefined) {
                    obj[key] = row[key];
                }
            }
            return JSON.stringify(where) === JSON.stringify(obj)
        });

        if(findRow.length > 0) {
            return findRow;
        }

        return undefined;
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
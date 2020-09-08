"use strict"

const fields = require("./fields.js");

class Query
{
    constructor(collection, data){
        this.collection = collection;
        this.data       = data;
    }

    find(where) {
        if (typeof where !== "object") {
            console.warn("The find() function call uses an object as an argument");
            return;
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

    insert(object) {
        if (typeof object !== "object") {
            console.warn("The insert() function call uses an object as an argument")
            return;
        }

        try {
            this.data.push(object);
        } catch (e) {
            console.error(e);
        }

        db.sync();

        object[fields.AUTO_INCREMENT] = this.data.length;
        return object;
    }
}

module.exports = Query;
"use strict"

class Query
{
    constructor(collection, data){
        this.collection = collection;
        this.data       = data;
    }

    find(where) {
        if (typeof where !== "object") {
            console.warn("The find() function call uses an object as an argument")
            return;
        }

        if (this.data.length === 0) {
            console.warn("Collection is empty");
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
}

module.exports = Query;
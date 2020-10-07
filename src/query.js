"use strict"

const fields = require("./fields.js");
const Find = require("./query/find.js");

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

        let objFind = new Find;
        let object = objFind.getRowsByObject(where, this.data);

        return object.length > 0 ? object : undefined;
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

        db.sync(this.collection, this.data);

        object[fields.AUTO_INCREMENT] = this.data.length - 1;
        return object;
    }

    /**
     * @param where object
     * @param object object
     * @returns boolean|[]
     */
    update(where, object) {
        if (typeof object !== "object" || typeof where !== "object") {
            console.warn("The update() function call uses an object as an argument")
            return false;
        }

        let rows = this.find(where);
        let updatedObjects = [];
        rows.forEach(row => {
            this.data[row[fields.AUTO_INCREMENT]] = Object.assign(this.data[row[fields.AUTO_INCREMENT]], object);
        });

        db.sync(this.collection, this.data);

        return updatedObjects;
    }

    /**
     * @param where
     */
    delete(where) {
        if (typeof where !== "object") {
            console.warn("The delete() function call uses an object as an argument")
            return false;
        }

        let rows = this.find(where);
        rows.forEach(row => {
            this.data[row[fields.AUTO_INCREMENT]] = null;
        });

        db.sync(this.collection, this.data);
    }
}

module.exports = Query;
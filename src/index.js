"use strict"

import fields from "./fields.js";
import Query from "./query.js";

class cliJoin {
    constructor() {
        this.load();
    }

    /**
     * Initialization framework
     * @returns boolean
     */
    load() {
        this.database = this.importDB();

        if (this.database.collections === undefined || typeof this.database.collections !== "object") {
            console.error("Collections cannot be loaded");
            return false;
        }

        for (let collection in this.database.collections) {
             this[collection] = new Query(
                 collection,
                 this.database.collections[collection]
             );
        }

        return true;
    }

    /**
     * Synchronization of variables in memory with localStorage
     */
    sync() {
        localStorage.setItem(fields.STORE_DB, JSON.stringify(this.database));
    }

    /**
     * Import data to variables
     *
     * @returns {Array}
     */
    importDB() {
        let json = localStorage.getItem(fields.STORE_DB);

        if (json === null) {
            return [];
        }

        try {
            return JSON.parse(json);
        } catch (e) {
            return [];
        }
    }

}

global.db = new cliJoin();
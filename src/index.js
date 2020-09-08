"use strict"

import fields from "./fields.js";
import Query from "./query.js";

class cliJoin {
    constructor() {
        this.load();
    }

    load() {
        this.database = this.importDB();

        if (this.database.collections === undefined || typeof this.database.collections !== "object") {
            console.error("Collections cannot be loaded");
            return;
        }

        for (let collection in this.database.collections) {
             this[collection] = new Query(
                 collection,
                 this.database.collections[collection]
             );
        }
    }

    importDB() {
        let json = localStorage.getItem(fields.NAME_STORE_DB);

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
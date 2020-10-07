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
            this.createDataBase();
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
     * create data base
     */
    createDataBase() {
        let databaseStructure = {collections:{}};
        localStorage.setItem(fields.STORE_DB, JSON.stringify(databaseStructure));
        this.database = this.importDB();
    }

    /**
     * Synchronization of variables in memory with localStorage
     *
     * @param collection string
     * @param data array
     */
    sync(collection, data) {
        if (collection !== undefined && typeof data === 'object') {
           this.database.collections[collection] = data;
        }
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

    /**
     * @param nameCollection string
     */
    create(nameCollection) {
        this[nameCollection] = new Query(nameCollection,[]);
        this.sync();
    }

    /**
     * @param nameCollection tring
     */
    drop(nameCollection) {
        delete this[nameCollection];
        this.sync();
    }

}

global.db = new cliJoin();

"use strict"

const fields = require("../fields.js");

class Find {
    getRowsByObject(where, data) {
        let object = [];

        if (where[fields.AUTO_INCREMENT] !== undefined) {
            object.push(this.getRowByIndex(where[fields.AUTO_INCREMENT], data));
            return object;
        }

        for (let key in data) {
            if (this.checkRow(data[key], where) === true) {
                data[key][fields.AUTO_INCREMENT] = key;
                object.push(data[key]);
            }
        }

        return object;
    }

    checkRow(row, where) {
        return this.select(row, where) === true;
    }

    select(row, where) {
        const comparisonRegex = /^\>$|^\>\=$|^\<$|^\<\=$/gm;
        let amountOfNotSatisfaction = 0;
        let comparison = '=';

        for (let key in where) {
            let valueWhere = where[key];

            if (typeof valueWhere !== "object") {
                let valueRow = row !== null ? row[key] : null;
                if (this.reconciliation(key, comparison, valueWhere, valueRow) === false) {
                    amountOfNotSatisfaction++;
                }
            } else {
                let partObjRow = row !== null ? row[key] : null;

                if (typeof partObjRow !== "object") {
                    comparison = Object.keys(valueWhere)[0];
                    if (comparisonRegex.test(comparison) === true) {
                        let valueRow = row !== null ? row[key] : null;
                        valueWhere = valueWhere[comparison];
                        if (this.reconciliation(key, comparison, valueWhere, valueRow) === false) {
                            amountOfNotSatisfaction++;
                        }
                    } else {
                        amountOfNotSatisfaction++;
                    }
                } else {
                    if (Array.isArray(partObjRow) === true){
                        let atLeastOneMatches = false;

                        partObjRow.forEach(elementPartObjRow => {
                            if (this.select(elementPartObjRow, valueWhere) === true) {
                                atLeastOneMatches = true;
                            }
                        });

                        if (atLeastOneMatches === false) {
                            amountOfNotSatisfaction++;
                        }
                    } else {
                        if (this.select(partObjRow, valueWhere) == false) {
                            amountOfNotSatisfaction++;
                        }
                    }
                }
            }
        }

        return amountOfNotSatisfaction <= 0;
    }

    getRowByIndex(index, data) {
        if (data[index] !== undefined) {
            return data[index];
        }
        return undefined;
    }

    reconciliation(key, comparison, value, valueRow) {
        switch (comparison) {
            case '=':
                if (valueRow === value) {
                    return true;
                }
                break;
            case '>':
                if (valueRow > value) {
                    return true;
                }
                break;
            case '>=':
                if (valueRow >= value) {
                    return true;
                }
                break;
            case '<':
                if (valueRow < value) {
                    return true;
                }
                break;
            case '<=':
                if (valueRow <= value) {
                    return true;
                }
                break;
        }

        return false;
    }
}

module.exports = Find;
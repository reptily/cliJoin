!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports={STORE_DB:"$___cliJoin_DB",AUTO_INCREMENT:"$id"}},function(t,e,n){"use strict";const r=n(0),o=n(4);t.exports=class{constructor(t,e){this.collection=t,this.data=e}find(t){if("object"!=typeof t)return console.warn("The find() function call uses an object as an argument"),!1;if(0===this.data.length)return;let e=(new o).getRowsByObject(t,this.data);return e.length>0?e:void 0}insert(t){if("object"!=typeof t)return console.warn("The insert() function call uses an object as an argument"),!1;try{this.data.push(t)}catch(t){console.error(t)}return db.sync(this.collection,this.data),t[r.AUTO_INCREMENT]=this.data.length-1,t}update(t,e){if("object"!=typeof e||"object"!=typeof t)return console.warn("The update() function call uses an object as an argument"),!1;return this.find(t).forEach(t=>{this.data[t[r.AUTO_INCREMENT]]=Object.assign(this.data[t[r.AUTO_INCREMENT]],e)}),db.sync(this.collection,this.data),[]}delete(t){if("object"!=typeof t)return console.warn("The delete() function call uses an object as an argument"),!1;this.find(t).forEach(t=>{this.data[t[r.AUTO_INCREMENT]]=null}),db.sync(this.collection,this.data)}}},function(t,e,n){"use strict";n.r(e),function(t){var e=n(0),r=n.n(e),o=n(1),i=n.n(o);t.db=new class{constructor(){this.load()}load(){this.database=this.importDB(),void 0!==this.database.collections&&"object"==typeof this.database.collections||this.createDataBase();for(let t in this.database.collections)this[t]=new i.a(t,this.database.collections[t]);return!0}createDataBase(){localStorage.setItem(r.a.STORE_DB,JSON.stringify({collections:{}})),this.database=this.importDB()}sync(t,e){void 0!==t&&"object"==typeof e&&(this.database.collections[t]=e),localStorage.setItem(r.a.STORE_DB,JSON.stringify(this.database))}importDB(){let t=localStorage.getItem(r.a.STORE_DB);if(null===t)return[];try{return JSON.parse(t)}catch(t){return[]}}create(t){this[t]=new i.a(t,[]),this.sync()}drop(t){delete this[t],this.sync()}}}.call(this,n(3))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";const r=n(0);t.exports=class{getRowsByObject(t,e){let n=[];if(void 0!==t[r.AUTO_INCREMENT])return n.push(this.getRowByIndex(t[r.AUTO_INCREMENT],e)),n;for(let o in e)!0===this.checkRow(e[o],t)&&(e[o][r.AUTO_INCREMENT]=parseInt(o),n.push(e[o]));return n}checkRow(t,e){return!0===this.select(t,e)}select(t,e){const n=/^\>$|^\>\=$|^\<$|^\<\=$/gm;let r=0,o="=";for(let i in e){let s=e[i];if("object"!=typeof s){let e=null!==t?t[i]:null;!1===this.reconciliation(o,s,e)&&r++}else{let e=null!==t?t[i]:null;if("object"!=typeof e)if(o=Object.keys(s)[0],!0===n.test(o)){let e=null!==t?t[i]:null;s=s[o],!1===this.reconciliation(o,s,e)&&r++}else r++;else if(!0===Array.isArray(e)){let t=!1;e.forEach(e=>{!0===this.select(e,s)&&(t=!0)}),!1===t&&r++}else!1===this.select(e,s)&&r++}}return r<=0}getRowByIndex(t,e){if(void 0!==e[t])return e[t]}reconciliation(t,e,n){switch(t){case"=":if(n===e)return!0;break;case">":if(n>e)return!0;break;case">=":if(n>=e)return!0;break;case"<":if(n<e)return!0;break;case"<=":if(n<=e)return!0}return!1}}}]);
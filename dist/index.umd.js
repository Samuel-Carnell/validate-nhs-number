!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e="undefined"!=typeof globalThis?globalThis:e||self)["validate-nhs-number"]=n()}(this,(function(){"use strict";function e(e){if(Array.isArray(e)&&10===e.length&&e.every((e=>(e=>"number"==typeof e&&!isNaN(e)&&isFinite(e)&&e<10&&e>=0)(e))))return e;if("string"!=typeof e)return null;const n=e.replace(/\s/g,"");if(10!==n.length)return null;const t=n.split("").map((e=>parseInt(e)));return t.some((e=>isNaN(e)))?null:t}return function(n){const t=e(n);if(null===t)return!1;const r=t[9],i=function(e){const n=e.slice(0,9).map(((e,n)=>e*(11-(n+1)))).reduce(((e,n)=>e+n))%11;return n>0?11-n:0}(t);return 10!==i&&r===i}}));
//# sourceMappingURL=index.umd.js.map
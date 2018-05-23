import {IDENTITY_TRUE} from './identity';

if (!Array.prototype.hasOwnProperty("isEmpty")) {
    Object.defineProperty(Array.prototype, 'isEmpty', {
        enumerable: false,
        configurable: false,
        get: function () {
            return !this.some(IDENTITY_TRUE);
        }
    });
}

if (!Array.prototype.hasOwnProperty("firstElement")) {
    Object.defineProperty(Array.prototype, 'firstElement', {
        enumerable: false,
        configurable: false,
        get: function () {
            if (this.isEmpty) {
                return null;
            }
            return this[0];
        }
    });
}

if (!Array.prototype.hasOwnProperty("lastElement")) {
    Object.defineProperty(Array.prototype, 'lastElement', {
        enumerable: false,
        configurable: false,
        get: function () {
            if (this.isEmpty) {
                return null;
            }
            return this[this.length - 1];
        }
    });
}

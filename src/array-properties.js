import {IDENTITY_TRUE} from './identity';


if (!Object.prototype.hasOwnProperty.call(Array.prototype, "isEmpty")) {
    Object.defineProperty(Array.prototype, 'isEmpty', {
        enumerable: false,
        configurable: false,
        get: function () {
            return !this.some(IDENTITY_TRUE);
        }
    });
}

if (!Object.prototype.hasOwnProperty.call(Array.prototype, "isNotEmpty")) {
    Object.defineProperty(Array.prototype, 'isNotEmpty', {
        enumerable: false,
        configurable: false,
        get: function () {
            return this.some(IDENTITY_TRUE);
        }
    });
}

if (!Object.prototype.hasOwnProperty.call(Array.prototype, "firstElement")) {
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

if (!Object.prototype.hasOwnProperty.call(Array.prototype, "lastElement")) {
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

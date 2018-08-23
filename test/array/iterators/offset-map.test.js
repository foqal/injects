import assert from 'assert';
import '../../../src';
import {IDENTITY} from '../../../src/identity';


describe('offsetMap', () => {

    [IDENTITY, null].forEach(handler => {
        const hasHandler = handler ? " w/handler" : " no handler";
        it('empty' + hasHandler, () => {
            const items = [].offsetMap();
            assert.deepEqual(items, []);
        });

        it('only start' + hasHandler, () => {
            const items = [1, 2, 3, 4, 5].offsetMap(1, null, handler);
            assert.deepEqual(items, [2, 3, 4, 5]);
        });

        it('only end' + hasHandler, () => {
            const items = [1, 2, 3, 4, 5].offsetMap(null, 3, handler);
            assert.deepEqual(items, [1, 2, 3]);
        });

        it('subset' + hasHandler, () => {
            const items = [1, 2, 3, 4, 5].offsetMap(1, 2, handler);
            assert.deepEqual(items, [2, 3]);
        });

    });

    it('has objects', () => {
        [1, 2, 3, 4, 5].offsetMap(1, 2, obj => assert.ok(obj != null));
    });

    it('has index', () => {
        [1, 2, 3, 4, 5].offsetMap(1, 2, (obj, index) => assert.ok(index != null));
    });

    it('mapped', () => {
        const items = [1, 2, 3, 4, 5].offsetMap(3, null, (item, index) => `[${index}]: ${item}`);
        assert.deepEqual(items, ["[3]: 4", "[4]: 5"]);
    });

});

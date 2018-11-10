import assert from 'assert';
import {SortDirection} from '../../../src';


describe('sortBy', () => {
    describe('Single Key', () => {

        it('Empty list', () => {
            const items = [].sortBy();
            assert.deepEqual(items, []);
        });

        it('default id already sorted', () => {
            const items = [{id: 1}, {id: 2}, {id: 3}].sortBy();
            assert.deepEqual(items, [{id: 1}, {id: 2}, {id: 3}]);
        });

        it('default id', () => {
            const items = [{id: 3}, {id: 2}, {id: 1}].sortBy();
            assert.deepEqual(items, [{id: 1}, {id: 2}, {id: 3}]);
        });

        it('default id repeating', () => {
            const items = [{id: 3}, {id: 3}, {id: 2}, {id: 1}].sortBy();
            assert.deepEqual(items, [{id: 1}, {id: 2}, {id: 3}, {id: 3}]);
        });

        it('default id repeating in place', () => {
            const items = [
                {id: 3, key: 1},
                {id: 3, key: 2},
                {id: 2},
                {id: 1}
            ].sortBy();
            assert.deepEqual(items, [{id: 1}, {id: 2}, {id: 3, key: 1}, {id: 3, key: 2}]);
        });


        it('Empty list custom key', () => {
            const items = [].sortBy("key");
            assert.deepEqual(items, []);
        });

        it('custom invalid key', () => {
             const items = [
                {id: 3},
                {id: 2},
                {id: 1}
            ].sortBy("key");
            assert.deepEqual(items, [{id: 3}, {id: 2}, {id: 1}]);
        });

        it('custom key already sorted', () => {
             const items = [
                {id: 3, key: 1},
                {id: 2, key: 2},
                {id: 1, key: 3}
            ].sortBy("key");
            assert.deepEqual(items, [{id: 3, key: 1}, {id: 2, key: 2}, {id: 1, key: 3}]);
        });

        it('custom key sort', () => {
            const items = [
                {id: 3, key: 3},
                {id: 2, key: 2},
                {id: 1, key: 1}
            ].sortBy("key");
            assert.deepEqual(items, [{id: 1, key: 1}, {id: 2, key: 2}, {id: 3, key: 3}]);
        });

        it('customer key repeating in place', () => {
            const items = [
                {id: 3, key: 3},
                {id: 4, key: 3},
                {id: 2, key: 2},
                {id: 1, key: 1}
            ].sortBy("key");
            assert.deepEqual(items, [{id: 1, key: 1}, {id: 2, key: 2}, {id: 3, key: 3}, {id: 4, key: 3}]);
        });


        it('Empty list handler', () => {
            [].sortBy(() => {
                throw new Error("Should not be called");
            });
        });

        it('custom invalid handler', () => {
             const items = [
                {id: 3},
                {id: 2},
                {id: 1}
            ].sortBy(item => item.key);
            assert.deepEqual(items, [{id: 3}, {id: 2}, {id: 1}]);
        });

        it('custom handler already sorted', () => {
             const items = [
                {id: 3, key: 1},
                {id: 2, key: 2},
                {id: 1, key: 3}
            ].sortBy(item => item.key);
            assert.deepEqual(items, [{id: 3, key: 1}, {id: 2, key: 2}, {id: 1, key: 3}]);
        });

        it('custom handler sort', () => {
            const items = [
                {id: 3, key: 3},
                {id: 2, key: 2},
                {id: 1, key: 1}
            ].sortBy(item => item.key);
            assert.deepEqual(items, [{id: 1, key: 1}, {id: 2, key: 2}, {id: 3, key: 3}]);
        });

        it('custom handler repeating in place', () => {
            const items = [
                {id: 3, key: 3},
                {id: 4, key: 3},
                {id: 2, key: 2},
                {id: 1, key: 1}
            ].sortBy(item => item.key);
            assert.deepEqual(items, [{id: 1, key: 1}, {id: 2, key: 2}, {id: 3, key: 3}, {id: 4, key: 3}]);
        });

        it('custom handler', () => {
            const items = [
                {id: 4, key: 3},
                {id: 3, key: 3},
                {id: 2, key: 2},
                {id: 1, key: 1}
            ].sortBy(item => item.key * 100 + item.id);
            assert.deepEqual(items, [{id: 1, key: 1}, {id: 2, key: 2}, {id: 3, key: 3}, {id: 4, key: 3}]);
        });
    });


    describe('Many Keys', () => {

        it('simple already sorted', () => {
            const items = [
                {id: 1, key: 1},
                {id: 2, key: 1},
                {id: 3, key: 2},
                {id: 4, key: 2}
            ].sortBy("key", "id");
            assert.deepEqual(items, [{id: 1, key: 1}, {id: 2, key: 1}, {id: 3, key: 2}, {id: 4, key: 2}]);
        });

        it('simple not sorted', () => {
            const items = [
                {id: 4, key: 2},
                {id: 3, key: 2},
                {id: 2, key: 1},
                {id: 1, key: 1}
            ].sortBy("key", "id");
            assert.deepEqual(items, [{id: 1, key: 1}, {id: 2, key: 1}, {id: 3, key: 2}, {id: 4, key: 2}]);
        });

        it('key order - 2', () => {
            const items = [
                {id: 4, key: 1},
                {id: 3, key: 2},
                {id: 2, key: 3},
                {id: 1, key: 4}
            ].sortBy("id", "key");
            assert.deepEqual(items, [{id: 1, key: 4}, {id: 2, key: 3}, {id: 3, key: 2}, {id: 4, key: 1}]);
        });

        it('key order - 3', () => {
            const items = [
                {id: 4, key: 2, count: 10},
                {id: 3, key: 2, count: 10},
                {id: 2, key: 3, count: 10},
                {id: 1, key: 4, count: 1}
            ].sortBy("count", "key", "id");
            assert.deepEqual(items, [{id: 1, key: 4, count: 1}, {id: 3, key: 2, count: 10}, {id: 4, key: 2, count: 10}, {id: 2, key: 3, count: 10}]);
        });

        it('key order - descending/ascending default', () => {
            const items = [
                {id: 4, key: 2, count: 10},
                {id: 3, key: 2, count: 10},
                {id: 2, key: 3, count: 10},
                {id: 1, key: 4, count: 1}
            ].sortBy(
                {key: "count", direction: SortDirection.DESCENDING},
                "key",
                "id",
            );
            assert.deepEqual(items, [{id: 3, key: 2, count: 10}, {id: 4, key: 2, count: 10}, {id: 2, key: 3, count: 10}, {id: 1, key: 4, count: 1}]);
        });

        it('key order - descending/ascending', () => {
            const items = [
                {id: 4, key: 2, count: 10},
                {id: 3, key: 2, count: 10},
                {id: 2, key: 3, count: 10},
                {id: 1, key: 4, count: 1}
            ].sortBy(
                {key: "count", direction: SortDirection.DESCENDING},
                {key: "key", direction: SortDirection.ASCENDING},
                {key: "id", direction: SortDirection.ASCENDING},
            );
            assert.deepEqual(items, [{id: 3, key: 2, count: 10}, {id: 4, key: 2, count: 10}, {id: 2, key: 3, count: 10}, {id: 1, key: 4, count: 1}]);
        });

        it('key order - descending/ascending handlers', () => {
            const items = [
                {id: 4, key: 2, count: 10},
                {id: 3, key: 2, count: 10},
                {id: 2, key: 3, count: 10},
                {id: 1, key: 4, count: 1}
            ].sortBy(
                {key: i => i.count, direction: SortDirection.DESCENDING},
                i => i.key,
                i => i.id,
            );
            assert.deepEqual(items, [{id: 3, key: 2, count: 10}, {id: 4, key: 2, count: 10}, {id: 2, key: 3, count: 10}, {id: 1, key: 4, count: 1}]);
        });

    });

});

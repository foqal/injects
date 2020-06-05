import assert from 'assert';
import '../../../src';
import {TestObject} from "./test-object";


describe('toIdMap', () => {

    it('default tests', () => {
        const map = [{id: 1}, {id: 2}, {id: 3}].toIdMap();
        assert.deepEqual(map, {1: {id: 1}, 2: {id: 2}, 3: {id: 3}});
    });

    it('string key', () => {
        const map = [{key: 1}, {key: 2}, {key: 3}].toIdMap("key");
        assert.deepEqual(map, {1: {key: 1}, 2: {key: 2}, 3: {key: 3}});
    });

    it('object key', () => {
        const first = new TestObject(1);
        const second = new TestObject(2);
        const map = [first, second].toIdMap(a => a);
        assert.deepEqual(map, {1: first, 2: second});
    });


    it('object poiting key', () => {
        const first = new TestObject(1);
        const second = new TestObject(2);
        const map = [{key: first}, {key: second}].toIdMap("key");
        assert.deepEqual(map, {1: {key: first}, 2: {key: second}});
    });

    it('function key', () => {
        const map = [
            {key: 1, value: "hello1"},
            {key: 2, value: "hello2"},
            {key: 3, value: "hello3"}
        ].toIdMap(key => key.key + key.value);

        assert.deepEqual(map, {
            "1hello1": {key: 1, value: "hello1"},
            "2hello2": {key: 2, value: "hello2"},
            "3hello3": {key: 3, value: "hello3"}
        });
    });

    it('function key index', () => {
        const map = [
            {key: 4, value: "hello1"},
            {key: 5, value: "hello2"},
            {key: 6, value: "hello3"}
        ].toIdMap((_, index) => index);

        assert.deepEqual(map, {
            0: {key: 4, value: "hello1"},
            1: {key: 5, value: "hello2"},
            2: {key: 6, value: "hello3"}
        });
    });

    it('string value', () => {
        const map = [{id: 1}, {id: 2}, {id: 3}].toIdMap(null, "id");
        assert.deepEqual(map, {1: 1, 2: 2, 3: 3});
    });

    it('function value', () => {
        const map = [
            {id: 1, value: "hello1"},
            {id: 2, value: "hello2"},
            {id: 3, value: "hello3"}
        ].toIdMap(null, value => value.id + value.value);

        assert.deepEqual(map, {
            1: "1hello1",
            2: "2hello2",
            3: "3hello3"
        });
    });

    it('function value index', () => {
        const map = [
            {id: 4, value: "hello1"},
            {id: 5, value: "hello2"},
            {id: 6, value: "hello3"}
        ].toIdMap(null, (value, current, index) => index);

        assert.deepEqual(map, {
            4: 0,
            5: 1,
            6: 2
        });
    });

    it('function value collide', () => {
        const map = [
            {id: 1, value: 100},
            {id: 1, value: 200},
            {id: 2, value: 300}
        ].toIdMap(null, (value, current) => {
            if (current) {
                current.push(value.value);
                return current;
            } else {
                return [value.value];
            }
        });

        assert.deepEqual(map, {
            1: [100, 200],
            2: [300]
        });
    });

    it('string key and value', () => {
        const map = [
            {key: 1, value: "hello1"},
            {key: 2, value: "hello2"},
            {key: 3, value: "hello3"}
        ].toIdMap("key", "value");
        assert.deepEqual(map, {1: "hello1", 2: "hello2", 3: "hello3"});
    });

    it('function key and value', () => {
        const map = [
            {id: 1, value: "hello1"},
            {id: 2, value: "hello2"},
            {id: 3, value: "hello3"}
        ].toIdMap(null, value => value.id + value.value);

        assert.deepEqual(map, {
            1: "1hello1",
            2: "2hello2",
            3: "3hello3"
        });
    });

});

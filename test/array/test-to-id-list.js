import assert from 'assert';
import '../../src';

describe('toIdList', () => {

    it('default tests', () => {
        const map = [{id: 1}, {id: 2}, {id: 3}].toIdList();
        assert.deepEqual(map, [1, 2, 3]);
    });

    it('string key', () => {
        const map = [{key: 1}, {key: 2}, {key: 3}].toIdList("key");
        assert.deepEqual(map, [1, 2, 3]);
    });

    it('function key', () => {
        const map = [
            {key: 1, value: "hello1"},
            {key: 2, value: "hello2"},
            {key: 3, value: "hello3"}
        ].toIdList(key => key.key + key.value);

        assert.deepEqual(map, ["1hello1", "2hello2", "3hello3"]);
    });

    it('function key index', () => {
        const map = [
            {key: 4, value: "hello1"},
            {key: 5, value: "hello2"},
            {key: 6, value: "hello3"}
        ].toIdList((_, index) => index);

        assert.deepEqual(map, [0, 1, 2]);
    });

});

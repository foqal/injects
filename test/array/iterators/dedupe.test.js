import assert from 'assert';
import '../../../src';


describe('dedupe', () => {
    // it('empty - no handler', () => {
    //     assert.deepEqual([].dedupe(), []);
    // });

    // it('default handler', () => {
    //     assert.deepEqual([1, 2, 3, 1, 2, 3].dedupe(), [1,2,3]);
    // });

    // it('default handler all same', () => {
    //     assert.deepEqual([1, 1, 1, 1, 1, 1].dedupe(), [1]);
    // });

    // it('extractor called', () => {
    //     let called = false;
    //     [1].dedupe(value => {
    //         called = true;
    //         return value;
    //     });
    //     assert.ok(called);
    // });

    // it('extractor', () => {
    //     assert.deepEqual([{v: 1}, {v: 2}, {v:1}].dedupe(value => value.v), [{v: 1}, {v: 2}]);
    // });

    // it('extractor keeps first', () => {
    //     assert.deepEqual([{v: 1, a: 1}, {v: 2, a: 2}, {v:1, a: 3}].dedupe(value => value.v), [{v: 1, a: 1}, {v: 2, a: 2}]);
    // });

    // it('combiner not called when no duplicates', () => {
    //     let called = false;
    //     [1].dedupe(null, value => {
    //         called = true;
    //         return value;
    //     });
    //     assert.ok(!called);
    // });

    // it('combiner called', () => {
    //     let called = false;
    //     [1, 1].dedupe(null, (previous) => {
    //         called = true;
    //         return previous;
    //     });
    //     assert.ok(called);
    // });

    // it('custom assigner picks previous', () => {
    //     const result = [{v: 1, a: 1}, {v: 2, a: 2}, {v:1, a: 3}].dedupe(value => value.v, (prev) => prev);
    //     assert.deepEqual(result, [{v: 1, a: 1}, {v: 2, a: 2}]);
    // });

    // it('custom assigner picks new', () => {
    //     const result = [{v: 1, a: 1}, {v: 2, a: 2}, {v:1, a: 3}].dedupe(value => value.v, (prev, current) => current);
    //     assert.deepEqual(result, [{v: 1, a: 3}, {v: 2, a: 2}]);
    // });

    // it('custom assigner picks new many times', () => {
    //     const result = [{v: 1, a: 1}, {v: 1, a: 2}, {v:1, a: 3}, {v:1, a: 4}].dedupe(value => value.v, (prev, current) => current);
    //     assert.deepEqual(result, [{v: 1, a: 4}]);
    // });

    // it('custom assigner picks new many times odd', () => {
    //     const result = [{v: 1, a: 1}, {v: 1, a: 2}, {v:1, a: 3}].dedupe(value => value.v, (prev, current) => current);
    //     assert.deepEqual(result, [{v: 1, a: 3}]);
    // });

    // it('custom assigner picks old one many times', () => {
    //     const result = [{v: 1, a: 1}, {v: 1, a: 2}, {v:1, a: 3}, {v:1, a: 4}].dedupe(value => value.v, prev => prev);
    //     assert.deepEqual(result, [{v: 1, a: 1}]);
    // });

    // it('custom assigner picks old one many times - odd', () => {
    //     const result = [{v: 1, a: 1}, {v: 1, a: 2}, {v:1, a: 3}].dedupe(value => value.v, prev => prev);
    //     assert.deepEqual(result, [{v: 1, a: 1}]);
    // });

    // it('multiple sets', () => {
    //     const rows = [
    //         {v: 1, a: 1},
    //         {v: 1, a: 2},
    //         {v: 2, a: 1},
    //         {v: 2, a: 2},
    //     ];
    //     const result = rows.dedupe(row => row.v, (current, next) => next);
    //     assert.deepEqual(result, [{v: 1, a: 2}, {v: 2, a: 2}]);
    // });

    // it('multiple sets interlaced', () => {
    //     const rows = [
    //         {v: 1, a: 1},
    //         {v: 1, a: 2},
    //         {v: 2, a: 1},
    //         {v: 2, a: 2},
    //         {v: 1, a: 3},
    //         {v: 2, a: 3},
    //     ];
    //     const result = rows.dedupe(row => row.v, (current, next) => next);
    //     assert.deepEqual(result, [{v: 1, a: 3}, {v: 2, a: 3}]);
    // });

    it('real example', () => {
        const rows = [
            {"key":"issu","words":"have an issue"},
            {"key":"issu","words":"an issue"},
            {"key":"issu","words":"issue"},
            {"key":"ingress","words":"get my ingress"},
            {"key":"ingress","words":"my ingress"},
            {"key":"ingress","words":"ingress"},
            {"key":"work","words":"work"},
            {"key":"ssl","words":"with ssl"},
            {"key":"ssl","words":"ssl"},
            {"key":"404","words":"an 404"},
            {"key":"404","words":"404"},
            {"key":"502 error","words":"a 502 error"},
            {"key":"502","words":"a 502"},
            {"key":"502 error","words":"502 error"},
            {"key":"502","words":"502"},
            {"key":"error","words":"error"},
            {"key":"idea","words":"have no idea"},
            {"key":"idea","words":"no idea"},
            {"key":"idea","words":"idea"},
            {"key":"miss","words":"missing at this"},
            {"key":"miss","words":"missing at"},
            {"key":"miss","words":"missing"},
            {"key":"point","words":"at this point"},
            {"key":"point","words":"this point"},
            {"key":"point","words":"point"},
            {"key":"iv","words":"iv"},
            {"key":"googl","words":"googled"},
            {"key":"hour","words":"for hours"},
            {"key":"hour","words":"hours"}
        ];
        const result = rows.dedupe(row => row.key, (current, next) => {
            return current.words.length < next.words.length ? current : next;
        });
        assert.deepEqual(result, [
            { key: 'issu', words: 'issue' },
            { key: 'ingress', words: 'ingress' },
            { key: 'work', words: 'work' },
            { key: 'ssl', words: 'ssl' },
            { key: '404', words: '404' },
            { key: '502 error', words: '502 error' },
            { key: '502', words: '502' },
            { key: 'error', words: 'error' },
            { key: 'idea', words: 'idea' },
            { key: 'miss', words: 'missing' },
            { key: 'point', words: 'point' },
            { key: 'iv', words: 'iv' },
            { key: 'googl', words: 'googled' },
            { key: 'hour', words: 'hours' }
        ]);
    });




});

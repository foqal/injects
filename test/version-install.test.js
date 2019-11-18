import assert from 'assert';
import {shouldSetup} from '../src';
describe('Should setup', () => {
    [
        {name: "major same",        current: "0.0.0", installed: "0.0.0", expected: false},
        {name: "major larger",      current: "1.0.0", installed: "0.0.0", expected: true},
        {name: "major larger",      current: "10.0.0", installed: "0.0.0", expected: true},

        {name: "major smaller",     current: "0.0.0", installed: "1.0.0", expected: false},
        {name: "major smaller",     current: "0.0.0", installed: "10.0.0", expected: false},
        {name: "major smaller",     current: "0.10.0", installed: "10.0.0", expected: false},


        {name: "major same",        current: "0.0.0", installed: "0.0.0", expected: false},
        {name: "minor larger",      current: "0.1.0", installed: "0.0.0", expected: true},
        {name: "minor larger",      current: "0.10.1", installed: "0.0.0", expected: true},
        {name: "minor smaller",     current: "0.0.0", installed: "0.1.0", expected: false},


        {name: "patch same",        current: "0.0.0", installed: "0.0.0", expected: false},
        {name: "patch larger",      current: "0.0.1", installed: "0.0.0", expected: true},
        {name: "patch larger",      current: "0.0.10", installed: "0.0.0", expected: true},
        {name: "patch smaller",     current: "0.0.0", installed: "0.0.1", expected: false},
        {name: "patch smaller",     current: "0.0.0", installed: "0.0.10", expected: false},


        {name: "build same",        current: "0.0.0+1", installed: "0.0.0+1", expected: false},
        {name: "build none lg",     current: "0.0.0+1", installed: "0.0.0", expected: true},
        {name: "build larger",      current: "0.0.0+1", installed: "0.0.0+0", expected: true},

        {name: "build none sm",     current: "0.0.0", installed: "0.0.0+1", expected: false},
        {name: "build smaller",     current: "0.0.0+0", installed: "0.0.0+1", expected: false},

        {name: "Prerelease",        current: "1.0.0-alpha", installed: "1.0.0", expected: false},
        {name: "Prerelease",        current: "1.0.0", installed: "1.0.0-alpha", expected: true},
        {name: "Prerelease both",   current: "1.0.0-alpha", installed: "1.0.0-alpha", expected: false},



    ].forEach(({name, current, installed, expected}) => {
        it(`${name}: ${current}=>${installed}`, () => {
            assert.strictEqual(shouldSetup(installed, current), expected);
        });
    });


});

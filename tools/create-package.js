import fs from 'fs';
import path from 'path';

const oldPackage = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json")));

const newPackage = {};
["name", "version", "private", "dependencies", "repository", "bugs", "main"].forEach(key => {
    newPackage[key] = oldPackage[key];
});

const split = newPackage.version.split(/\./g);
newPackage.version = `${split[0]}.${split[1]}.${(process.env.CIRCLE_BUILD_NUM || split[2])}`;

fs.writeFileSync(path.resolve(__dirname, "../build/native-injects/package.json"), JSON.stringify(newPackage, 0, 4));

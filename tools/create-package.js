import fs from 'fs';
import path from 'path';

const oldPackage = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json")));

const newPackage = {};
["name", "version", "private", "dependencies", "repository", "bugs", "main", "files"].forEach(key => {
    newPackage[key] = oldPackage[key];
});

fs.writeFileSync(path.resolve(__dirname, "../build/native-injects/package.json"), JSON.stringify(newPackage, 0, 4));

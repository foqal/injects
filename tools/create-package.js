import fs from 'fs';
import path from 'path';

const oldPackage = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json")));

const newPackage = {
    "name": oldPackage.name,
    "version": oldPackage.version,
    "private": oldPackage.private,
    "dependencies": oldPackage.dependencies,
    "main": "src/index.js"
};


fs.writeFileSync(path.resolve(__dirname, "../build/injects/package.json"), JSON.stringify(newPackage, 0, 4));

import {VERSION} from "./version";

const VERSION_REG = /(?<major>[0-9]+)(\.(?<minor>[0-9]+))?(\.(?<patch>[0-9]+))?(-(?<preRelease>([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*)))?(\+(?<build>.*))?/;

function parseVersion(versionRaw) {
    const versionMatch = versionRaw.match(VERSION_REG);
    if (!versionMatch || !versionMatch.groups) {
        return;
    }

    const version = versionMatch.groups;

    return {
        major: parseInt(version.major),
        minor: parseInt(version.minor || "0"),
        patch: parseInt(version.patch || "0"),
        preRelease: version.preRelease,
        build: version.build ? parseInt(version.build) : 0
  };
}

function shouldSetup(installedVersion, currentVersion) {
    if (!installedVersion) {
        return true;
    }
    const installed = parseVersion(installedVersion);
    const current = parseVersion(currentVersion);


    if (installed.major != current.major) {
        return installed.major < current.major;
    } else if (installed.minor != current.minor) {
        return installed.minor < current.minor;
    } else if (installed.patch != current.patch) {
        return installed.patch < current.patch;
    } else if (installed.build != current.build) {
        return installed.build < current.build;
    } else if (installed.preRelease && !current.preRelease) {
        return true;
    } else {
        return false; //Same version - no need to install again
    }
}

function setup(installed, current) {

    if (!shouldSetup(installed, current)) {
        return;
    }

    const exportObj = {setup, shouldSetup};
    require('./array-properties');
    const arrayIterators = require('./array-iterators');
    exportObj.SortDirection = arrayIterators.SortDirection;
    require('./array-math');
    require('./array-promise');
    require('./array-diffs');
    require('./string');
    require('./date');
    return exportObj;
}

const parent = (global || window);
const setupExport = setup(parent.NATIVE_INJECTS_VERSION, VERSION);
parent.NATIVE_INJECTS_VERSION = VERSION;

if (setupExport) {
    Object.entries(setupExport).forEach(([key, value]) => {
        exports[key] = value;
    });
}
exports.setup = setup;
exports.shouldSetup = shouldSetup;

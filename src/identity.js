const IDENTITY = item => item;
const IDENTITY_TRUE = () => true;
const IDENTITY_NOT_NULL = item => item != null && item != undefined;

exports.IDENTITY = IDENTITY;
exports.IDENTITY_TRUE = IDENTITY_TRUE;
exports.IDENTITY_NOT_NULL = IDENTITY_NOT_NULL;

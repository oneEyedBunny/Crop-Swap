"use strict";

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/crop-swap';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-crop-swap';
exports.PORT = process.env.PORT || 8080;

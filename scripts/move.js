'use strict';

const shell = require('shelljs');
const buildPath = 'node-server/public/build';
const path = require('path');

shell.rm('-rf', `${path.relative(__dirname, buildPath)}`);
shell.mkdir('-p', `${path.relative(__dirname, buildPath)}`);
shell.mv('build/*', `${path.relative(__dirname, buildPath)}`);
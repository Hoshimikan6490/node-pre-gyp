'use strict';

const nodeGlobals = {
	Buffer: 'readonly',
	clearImmediate: 'readonly',
	clearInterval: 'readonly',
	clearTimeout: 'readonly',
	console: 'readonly',
	global: 'readonly',
	process: 'readonly',
	require: 'readonly',
	setImmediate: 'readonly',
	setInterval: 'readonly',
	setTimeout: 'readonly',
	__dirname: 'readonly',
	__filename: 'readonly',
	module: 'readonly',
	exports: 'readonly',
};

module.exports = [
	{
		ignores: ['**/node_modules/**'],
	},
	{
		files: ['**/*.js', 'bin/node-pre-gyp'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'commonjs',
			globals: nodeGlobals,
		},
	},
];

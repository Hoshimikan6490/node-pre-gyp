'use strict';

const fs = require('fs');

function ensureDir(dir) {
	if (fs.promises && typeof fs.promises.mkdir === 'function') {
		return fs.promises.mkdir(dir, { recursive: true }).then(() => dir);
	}
	return new Promise((resolve, reject) => {
		fs.mkdir(dir, { recursive: true }, (err) => {
			if (err) return reject(err);
			return resolve(dir);
		});
	});
}

function removePath(target, callback) {
	const done = (err) => {
		if (err && err.code !== 'ENOENT') {
			return callback(err);
		}
		return callback();
	};

	if (typeof fs.rm === 'function') {
		return fs.rm(target, { recursive: true, force: true }, done);
	}

	return fs.rmdir(target, { recursive: true }, done);
}

function removePathSync(target) {
	try {
		if (typeof fs.rmSync === 'function') {
			fs.rmSync(target, { recursive: true, force: true });
		} else {
			fs.rmdirSync(target, { recursive: true });
		}
	} catch (err) {
		if (err && err.code !== 'ENOENT') {
			throw err;
		}
	}
}

module.exports = {
	ensureDir,
	removePath,
	removePathSync,
};

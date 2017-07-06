"use strict";
var nodeMajor = +process.versions.node.split('.')[0];
if (nodeMajor < 4) {
	console.error('node < 4  is not supported!');
	process.exit(1);
} else {
	if (nodeMajor < 6) {
		console.info('Loading Babel transpiler for Oldish node!');
		require('babel-register')();
	}
}
var prompt = require('prompt');
console.info('Welcome to Misterbit Simple REST Server!');
// console.info('Notice: Only Mongo based server also has websocket support');
var schema = {
	properties: {
		engine: {
			pattern: /m|f/,
			description: 'Which storage should I use mongodb (m) or file system (f)?',
			message: 'Must select an engine!',
			required: true
		}
	}
};
prompt.start();
prompt.get(schema, function (err, result) {
	switch (result.engine) {
		case "m":
			require('./server-full');
			break;
		case "f":
			require('./server-load-from-files');
	}
});

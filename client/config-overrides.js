const fs = require('fs');
const path = require('path');
const {
	override,
	removeModuleScopePlugin,
	babelInclude,
	addWebpackAlias,
} = require('customize-cra');

const coreSymlinkedPackageJson = fs
	.readFileSync(
		path.join(__dirname, 'node_modules', '@alibaba-clone/core', 'package.json')
	)
	.toString();
const coreUIWebSymlinkedPackageJson = fs
	.readFileSync(
		path.join(
			__dirname,
			'node_modules',
			'@alibaba-clone/core-ui-web',
			'package.json'
		)
	)
	.toString();
const { peerDependencies: corePeerDependencies } = JSON.parse(
	coreSymlinkedPackageJson
);
const { peerDependencies: coreUIWebPeerDependencies } = JSON.parse(
	coreUIWebSymlinkedPackageJson
);

const aliases = Object.keys({
	...corePeerDependencies,
	...coreUIWebPeerDependencies,
}).reduce((acc, cur) => {
	acc[cur] = fs.realpathSync(path.join(__dirname, 'node_modules', cur));

	return acc;
}, {});

module.exports = override(
	removeModuleScopePlugin(),
	babelInclude([
		path.resolve(path.join(__dirname, 'src')),
		fs.realpathSync(
			path.join(__dirname, 'node_modules/@alibaba-clone/core/src')
		),
		fs.realpathSync(
			path.join(__dirname, 'node_modules/@alibaba-clone/core-ui-web/src')
		),
	]),
	addWebpackAlias({
		...aliases,
	})
);

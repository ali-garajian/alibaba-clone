const fs = require('fs');
const path = require('path');
const {
	override,
	removeModuleScopePlugin,
	babelInclude,
	addWebpackAlias,
} = require('customize-cra');

const symlinkedPackageJson = fs
	.readFileSync(
		path.join(__dirname, 'node_modules', '@alibaba-clone/core', 'package.json')
	)
	.toString();
const { peerDependencies } = JSON.parse(symlinkedPackageJson);

const aliases = Object.keys(peerDependencies).reduce((acc, cur) => {
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
	]),
	addWebpackAlias({
		...aliases,
	})
);

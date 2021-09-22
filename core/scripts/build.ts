import fse from 'fs-extra'

fse.copySync('build/src', 'build/lib')

// fse.copySync('.npmrc', 'build/.npmrc')

fse.copySync('package.json', 'build/package.json')

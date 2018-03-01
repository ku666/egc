'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const fs = require('fs')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      fs.exists('dist/BuildSuccess.txt', (exists) => {
        if (exists) {
          fs.unlinkSync('dist/BuildSuccess.txt')
          console.log('delete dist/BuildSuccess.txt')
        }
      })
      console.log(chalk.red('  Build failed with errors.\n'))
      fs.writeFile('dist/BuildError.txt', 'BuildError', (err) => {
        if (err) throw err
        console.log('Build Error dist/BuildError.txt')
      })
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
    fs.exists('dist/BuildError.txt', (exists) => {
      if (exists) {
        fs.unlinkSync('dist/BuildError.txt')
        console.log('delete dist/BuildError.txt')
      }
    })
    fs.writeFile('dist/BuildSuccess.txt', 'BuildSuccess', (err) => {
      if (err) throw err
      console.log('Build complete dist/BuildSuccess.txt')
    })

  })
})

require('dotenv').config({
    path: process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env',
    override: process.env.TEST_ENV ? true : false,
});
require('fs-extra').ensureDir('./test-results/reports');
require('fs-extra').remove('./test-results/screenshots');
require('fs-extra').remove('./test-results/videos');

let options = [
    '--require-module ts-node/register',
    '--require **/steps/*.ts',
    '--require ./src/support/config/hooks.ts',
    '--format summary',
    '--format rerun:@rerun.txt',
    '--format json:./test-results/reports/cucumber.json',
    '--publish-quiet true',
    `--parallel=${process.env.PARALLEL_THREAD}`,
    `--format-options '{"snippetInterface":"async-await"}'`,
    `--retry=${process.env.RETRIES}`,
    `--tags "not @ignore"`,
].join(' ');

let runner = [
    './features/',
    options,
].join(' ');

let rerun = [
    '@rerun.txt',
    options,
].join(' ');

module.exports = { runner, rerun }

const commitReleaseRules = require('./commit-release-rules');
const path = require('path');
const fs = require('fs');

const commitParserOptions = {
	headerPattern: /^(\w*)(?:\(([\w\$\.\-\* ]*)\))?(\!)?\: (.*)$/,
	headerCorrespondence: ['type', 'scope', 'exclamation', 'subject'],
	noteKeywords: ['BREAKING CHANGE'],
	revertPattern: /^(?:Revert|revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
	revertCorrespondence: ['header', 'hash'],
};

module.exports = {
	branches: ['main'],
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				releaseRules: commitReleaseRules,
				parserOpts: commitParserOptions,
			},
		],
		[
			'@semantic-release/npm',
			{
				pkgRoot: 'dist',
			},
		],
		[
			'@semantic-release/exec',
			{
				prepareCmd: './copy-version.sh',
			},
		],
		[
			'@semantic-release/git',
			{
				assets: ['dist/**', 'package.json'],
				message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
			},
		],
	],
};

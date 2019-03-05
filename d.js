
const path = require("path");
const tool = require('./tool');
const root = path.join(__dirname)

const key = process.argv[2];
tool.run(root, key || 'love', false);

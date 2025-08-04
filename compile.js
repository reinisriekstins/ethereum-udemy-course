// compile code will go here
const path = require('node:path');
const fs = require('node:fs');
const solc = require('solc');

const sourceCode = fs.readFileSync(path.join(__dirname, './contracts/Inbox.sol'), 'utf8');

module.exports = solc.compile(sourceCode, 1).contracts[':Inbox'];

// console.log('Inbox Path:', inboxPath);
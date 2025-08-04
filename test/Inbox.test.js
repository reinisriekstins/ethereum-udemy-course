const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');

const { interface, bytecode } = require('../compile.js'); // Adjust the path as necessary

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const MSG_ARG = 'Hi there!';

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  const deployerAccount = accounts[0];

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [MSG_ARG] })
    .send({ from: deployerAccount, gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, MSG_ARG);
  });

  it('can change the message', async () => {
    const newMessage = 'New message!';
    await inbox.methods.setMessage(newMessage).send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, newMessage);
  });
});

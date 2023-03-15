const HDWalletProvider = require("@truffle/hdwallet-provider");
const  Web3  = require("web3");
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider (
    'live mountain flat misery tribe luggage mouse version math snake',
    'https://goerli.infura.io/v3/3780996b803540c99e77da0'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts =  await web3.eth.getAccounts();
    console.log('atempting  to deploy contract from', accounts[0]);

   const result =  await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi There']})
    .send({gas: '1000000', from: accounts[0]});

    console.log('contract deploy to', result.options.address);
    provider.engine.stop();
};

deploy();

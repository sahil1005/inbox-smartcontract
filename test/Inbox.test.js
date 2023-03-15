const assert = require('assert');
const ganache = require('ganache-cli');
const { it } = require('mocha');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');


// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive(){
//         return 'vroom';
//     }
// }

// let car;

// beforeEach( () => {
//      car = new Car();
// })

// describe('Car', () => {
//     it('can park', () => {
        
//         assert.equal(car.park(), 'stopped'); 
//     });

//     it('can drive', () => {
        
//         assert.equal(car.drive(), 'vroom');
//     });
// });


let accounts;
let inbox;
const INITIAL_SRING = 'Hi There!'


beforeEach(async () => {
   accounts = await web3.eth.getAccounts();

   inbox = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({ data: bytecode, arguments: ['Hi There!']})
   .send({from: accounts[0], gas: '1000000'})
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a defult message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi There!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye')
    });
});
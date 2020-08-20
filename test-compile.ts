import * as solc from 'solc';

// TODO figure out how to get the bytecode and deploy it to ganache with ethers
// TODO figure out how to do imports
// TODO figure out how multiple contracts work
const output = JSON.parse(solc.compile(JSON.stringify({
    language: 'Solidity',
    sources: {
        'test-contract.sol': {
            content: `
                contract TestContract {
                    uint256 public number = 5;
                }
            `
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
})));

console.log(output.contracts['test-contract.sol']);
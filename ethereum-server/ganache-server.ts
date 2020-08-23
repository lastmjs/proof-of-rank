import {
    MockProvider
} from 'ethereum-waffle';
import ganache from 'ganache-core';
import { deployContracts } from '../utilities/utilities';
import {
    ethers,
    Wallet
} from 'ethers';

// TODO the naming of all of this is a bit messy...probably will want to change the file and directory names
const server = ganache.server({
    gasLimit: 12000000,
    accounts: [
        {
            secretKey: '0x29f3edee0ad3abf8e2699402e0e28cd6492c9be7eaab00d732a791c33552f797',
            balance: '1000000000000000000'
        },
        {
            secretKey: '0x5c8b9227cd5065c7e3f6b73826b8b42e198c4497f6688e3085d5ab3a6d520e74',
            balance: '1000000000000000000'
        }
    ]
});

server.listen(8545, async () => {
    // linkTokenOwner address: 0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff
    // linkTokenOwner private key: 0x29f3edee0ad3abf8e2699402e0e28cd6492c9be7eaab00d732a791c33552f797

    // proofOfRankOwner address: 0x63FC2aD3d021a4D7e64323529a55a9442C444dA0
    // proofOfRankOwner private key: 0x5c8b9227cd5065c7e3f6b73826b8b42e198c4497f6688e3085d5ab3a6d520e74

    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

    // console.log(accounts);

    // const provider = new MockProvider({
    //     ganacheOptions: {
    //         port: 8545, // TODO the thing I am not yet sure of is if this mock provider is deploying to the ganache server I started
    //         gasLimit: 12000000, // TODO is this an incorrect gas limit?
    //         accounts: [
    //             {
    //                 secretKey: '0x29f3edee0ad3abf8e2699402e0e28cd6492c9be7eaab00d732a791c33552f797',
    //                 balance: '1000000000000000000'
    //             },
    //             {
    //                 secretKey: '0x5c8b9227cd5065c7e3f6b73826b8b42e198c4497f6688e3085d5ab3a6d520e74',
    //                 balance: '1000000000000000000'
    //             }
    //         ]
    //     }
    // });

    // server.provider.

    const linkTokenOwner = provider.getSigner(0);
    const proofOfRankOwner = provider.getSigner(1);

    const {
        linkToken,
        proofOfRank
    } = await deployContracts(linkTokenOwner as unknown as Wallet, proofOfRankOwner as unknown as Wallet);

    console.log('linkToken.address', linkToken.address);
    console.log('proofOfRank.address', proofOfRank.address);

    console.log('ganache listening on port 8545');

    // TODO now attempting to interact with the deployed contracts on the front end...
});
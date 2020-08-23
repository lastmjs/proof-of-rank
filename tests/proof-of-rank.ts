import {
    deployContract,
    MockProvider,
    solidity
} from 'ethereum-waffle';
import {
    Contract,
    Wallet,
    BigNumber
} from 'ethers';
import {
    expect,
    use
} from 'chai';
import * as fc from 'fast-check';
import 'mocha';
import { deployContracts } from '../utilities/utilities';

use(solidity);

// TODO seems like ethers can do a lot of this for me...even the deploy contracts is working, using just the deployContract from waffle
// TODO consider if I need the mock provider I suppose...I wonder if I could just use ganache and an ethers jsonrpc provider
describe('ProofOfRank', () => {
    const provider = new MockProvider({
        ganacheOptions: {
            gasLimit: 12000000 // TODO is this an incorrect gas limit?
        }
    });

    // TODO instead lets just call create empty wallet inside of an arbitrary
    const wallets = provider.getWallets();

    it('Creates the owner', async () => {
        // TODO I would love to figure out how to exhaustively move through the arbitrary array
        await fc.assert(fc.asyncProperty(fc.constantFrom(...wallets), fc.constantFrom(...wallets), async (linkOwner: Wallet, proofOfRankOwner: Wallet) => {        
            const {
                proofOfRank
            } = await deployContracts(linkOwner, proofOfRankOwner);
        
            expect(proofOfRankOwner.address).to.equal(await proofOfRank.owner());
        }), {
            numRuns: wallets.length
        });
    });

    it('Initializes prankConfigs', async () => {
        await fc.assert(fc.asyncProperty(fc.constantFrom(...wallets), fc.constantFrom(...wallets), async (linkOwner: Wallet, proofOfRankOwner: Wallet) => {
            const { proofOfRank } = await deployContracts(linkOwner, proofOfRankOwner);
    
            const prankConfig0 = await proofOfRank.prankConfigs(0);

            expect(prankConfig0.rank).to.equal('Private');
            expect(prankConfig0.linkRequirement.toString()).to.equal('1000000000000000000');
            expect(prankConfig0.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig0.tokenURI).to.equal('https://proofofrank.link/token-uris/private.json');

            const prankConfig1 = await proofOfRank.prankConfigs(1);

            expect(prankConfig1.rank).to.equal('Specialist');
            expect(prankConfig1.linkRequirement.toString()).to.equal('501000000000000000000');
            expect(prankConfig1.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig1.tokenURI).to.equal('https://proofofrank.link/token-uris/specialist.json');

            const prankConfig2 = await proofOfRank.prankConfigs(2);

            expect(prankConfig2.rank).to.equal('Corporal');
            expect(prankConfig2.linkRequirement.toString()).to.equal('1501000000000000000000');
            expect(prankConfig2.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig2.tokenURI).to.equal('https://proofofrank.link/token-uris/corporal.json');

            // const prankConfig2 = await proofOfRank.prankConfigs(2);
            // const prankConfig3 = await proofOfRank.prankConfigs(3);
            // const prankConfig4 = await proofOfRank.prankConfigs(4);
            // const prankConfig5 = await proofOfRank.prankConfigs(5);
            // const prankConfig6 = await proofOfRank.prankConfigs(6);
            // const prankConfig7 = await proofOfRank.prankConfigs(7);
            // const prankConfig8 = await proofOfRank.prankConfigs(8);
            // const prankConfig9 = await proofOfRank.prankConfigs(9);
            // const prankConfig10 = await proofOfRank.prankConfigs(10);
            // const prankConfig11 = await proofOfRank.prankConfigs(11);
            // const prankConfig12 = await proofOfRank.prankConfigs(12);
            // const prankConfig13 = await proofOfRank.prankConfigs(13);
            // const prankConfig14 = await proofOfRank.prankConfigs(14);
            // const prankConfig15 = await proofOfRank.prankConfigs(15);
            // const prankConfig16 = await proofOfRank.prankConfigs(16);
            // const prankConfig17 = await proofOfRank.prankConfigs(17);
            // const prankConfig18 = await proofOfRank.prankConfigs(18);
        }), {
            numRuns: wallets.length
        });
    });

    // TODO should I test trying to transfer negative numbers?
    it('Allows the owner to withdraw', async () => {
        // TODO figure out how to always include certain values
        // TODO for example, I always want to have 0 tried for the transferAmount here
        // TODO I would like to always ensure that transferring to the owner wallet works
        await fc.assert(fc.asyncProperty(fc.constantFrom(...wallets), fc.constantFrom(...wallets), fc.nat(1000000000), async (linkOwner: Wallet, proofOfRankOwner: Wallet, transferAmount: number) => {
            const {
                linkToken,
                proofOfRank
            } = await deployContracts(linkOwner, proofOfRankOwner);
            const withdrawee = provider.createEmptyWallet();

            await linkToken.transfer(proofOfRank.address, BigNumber.from(`${transferAmount}000000000000000000`));
            await proofOfRank.withdraw(withdrawee.address, BigNumber.from(`${transferAmount}000000000000000000`));

            const proofOfRankBalance = await linkToken.balanceOf(proofOfRank.address);
            const withdraweeBalance = await linkToken.balanceOf(withdrawee.address);

            expect(proofOfRankBalance.toString()).to.equal('0');
            expect(withdraweeBalance.toString()).to.equal(transferAmount === 0 ? '0' : `${transferAmount}000000000000000000`);
        }), {
            numRuns: 10
        });
    });

    it('Does not allow non-owners to withdraw', async () => {
        await fc.assert(fc.asyncProperty(fc.constantFrom(...wallets), fc.constantFrom(...wallets), fc.nat(1000000000), async (linkOwner: Wallet, proofOfRankOwner: Wallet, transferAmount: number) => {
            const {
                linkToken,
                proofOfRank
            } = await deployContracts(linkOwner, proofOfRankOwner);
            const withdrawee = provider.createEmptyWallet();

            await linkToken.transfer(proofOfRank.address, BigNumber.from(`${transferAmount}000000000000000000`));
            
            await expect(proofOfRank.connect(withdrawee).withdraw(withdrawee.address, BigNumber.from(`${transferAmount}000000000000000000`))).to.be.revertedWith('Only the owner can withdraw funds');
        }), {
            numRuns: 10
        });
    });

    // TODO should I test that I can withdraw any amount up to my balance if I am the owner?
    // it('Allo')

    // TODO test withdraw
    // TODO test changeLinkRequirement
    // TODO test changePrice
    // TODO test changeTokenURI
    // TODO test changeLinkAddress
    // TODO test changeOwner 
    // TODO test changeGeneralOfChainlink

    // TODO test onTokenTransfer

    // TODO consider if we need to do all of the other tests for ERC721...
    // TODO strictly review the open zeppelin erc721 code and review my code
});
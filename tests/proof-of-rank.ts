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

            const prankConfig3 = await proofOfRank.prankConfigs(3);

            expect(prankConfig3.rank).to.equal('Sergeant');
            expect(prankConfig3.linkRequirement.toString()).to.equal('3501000000000000000000');
            expect(prankConfig3.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig3.tokenURI).to.equal('https://proofofrank.link/token-uris/sergeant.json');

            const prankConfig4 = await proofOfRank.prankConfigs(4);

            expect(prankConfig4.rank).to.equal('Staff Sergeant');
            expect(prankConfig4.linkRequirement.toString()).to.equal('5001000000000000000000');
            expect(prankConfig4.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig4.tokenURI).to.equal('https://proofofrank.link/token-uris/staff-sergeant.json');

            const prankConfig5 = await proofOfRank.prankConfigs(5);

            expect(prankConfig5.rank).to.equal('Sergeant First Class');
            expect(prankConfig5.linkRequirement.toString()).to.equal('7501000000000000000000');
            expect(prankConfig5.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig5.tokenURI).to.equal('https://proofofrank.link/token-uris/sergeant-first-class.json');

            const prankConfig6 = await proofOfRank.prankConfigs(6);

            expect(prankConfig6.rank).to.equal('Master Sergeant');
            expect(prankConfig6.linkRequirement.toString()).to.equal('9001000000000000000000');
            expect(prankConfig6.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig6.tokenURI).to.equal('https://proofofrank.link/token-uris/master-sergeant.json');

            const prankConfig7 = await proofOfRank.prankConfigs(7);

            expect(prankConfig7.rank).to.equal('Sergeant Major');
            expect(prankConfig7.linkRequirement.toString()).to.equal('10001000000000000000000');
            expect(prankConfig7.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig7.tokenURI).to.equal('https://proofofrank.link/token-uris/sergeant-major.json');

            const prankConfig8 = await proofOfRank.prankConfigs(8);

            expect(prankConfig8.rank).to.equal('Second Lieutenant');
            expect(prankConfig8.linkRequirement.toString()).to.equal('15001000000000000000000');
            expect(prankConfig8.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig8.tokenURI).to.equal('https://proofofrank.link/token-uris/second-lieutenant.json');

            const prankConfig9 = await proofOfRank.prankConfigs(9);

            expect(prankConfig9.rank).to.equal('First Lieutenant');
            expect(prankConfig9.linkRequirement.toString()).to.equal('20001000000000000000000');
            expect(prankConfig9.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig9.tokenURI).to.equal('https://proofofrank.link/token-uris/first-lieutenant.json');

            const prankConfig10 = await proofOfRank.prankConfigs(10);

            expect(prankConfig10.rank).to.equal('Captain');
            expect(prankConfig10.linkRequirement.toString()).to.equal('25001000000000000000000');
            expect(prankConfig10.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig10.tokenURI).to.equal('https://proofofrank.link/token-uris/captain.json');

            const prankConfig11 = await proofOfRank.prankConfigs(11);

            expect(prankConfig11.rank).to.equal('Major');
            expect(prankConfig11.linkRequirement.toString()).to.equal('35001000000000000000000');
            expect(prankConfig11.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig11.tokenURI).to.equal('https://proofofrank.link/token-uris/major.json');

            const prankConfig12 = await proofOfRank.prankConfigs(12);

            expect(prankConfig12.rank).to.equal('Lieutenant Colonel');
            expect(prankConfig12.linkRequirement.toString()).to.equal('50001000000000000000000');
            expect(prankConfig12.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig12.tokenURI).to.equal('https://proofofrank.link/token-uris/lieutenant-colonel.json');

            const prankConfig13 = await proofOfRank.prankConfigs(13);

            expect(prankConfig13.rank).to.equal('Colonel');
            expect(prankConfig13.linkRequirement.toString()).to.equal('75001000000000000000000');
            expect(prankConfig13.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig13.tokenURI).to.equal('https://proofofrank.link/token-uris/colonel.json');

            const prankConfig14 = await proofOfRank.prankConfigs(14);

            expect(prankConfig14.rank).to.equal('Brigadier General');
            expect(prankConfig14.linkRequirement.toString()).to.equal('125001000000000000000000');
            expect(prankConfig14.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig14.tokenURI).to.equal('https://proofofrank.link/token-uris/brigadier-general.json');

            const prankConfig15 = await proofOfRank.prankConfigs(15);

            expect(prankConfig15.rank).to.equal('Major General');
            expect(prankConfig15.linkRequirement.toString()).to.equal('175001000000000000000000');
            expect(prankConfig15.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig15.tokenURI).to.equal('https://proofofrank.link/token-uris/major-general.json');

            const prankConfig16 = await proofOfRank.prankConfigs(16);

            expect(prankConfig16.rank).to.equal('Lieutenant General');
            expect(prankConfig16.linkRequirement.toString()).to.equal('2500001000000000000000000');
            expect(prankConfig16.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig16.tokenURI).to.equal('https://proofofrank.link/token-uris/lieutenant-general.json');

            const prankConfig17 = await proofOfRank.prankConfigs(17);

            expect(prankConfig17.rank).to.equal('General');
            expect(prankConfig17.linkRequirement.toString()).to.equal('500001000000000000000000');
            expect(prankConfig17.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig17.tokenURI).to.equal('https://proofofrank.link/token-uris/general.json');

            const prankConfig18 = await proofOfRank.prankConfigs(18);

            expect(prankConfig18.rank).to.equal('General of Chainlink');
            expect(prankConfig18.linkRequirement.toString()).to.equal('0');
            expect(prankConfig18.price.toString()).to.equal('1000000000000000000');
            expect(prankConfig18.tokenURI).to.equal('https://proofofrank.link/token-uris/general-of-chainlink.json');
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

    // TODO instead of using the already-instantiated wallets, it would be nice to generate new ones each time
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
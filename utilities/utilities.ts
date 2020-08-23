import {
    deployContract
} from 'ethereum-waffle';
import {
    Wallet,
    Contract
} from 'ethers';
import ProofOfRank from '../build/ProofOfRank.json';
import LinkToken from '../build/LinkToken.json';

export async function deployContracts(linkOwner: Wallet, proofOfRankOwner: Wallet): Promise<{
    linkToken: Contract,
    proofOfRank: Contract
}> {
    const linkToken: Contract = await deployContract(linkOwner, LinkToken, [], {
        gasLimit: 10000000
    });
    const proofOfRank: Contract = await deployContract(proofOfRankOwner, ProofOfRank, [linkToken.address], {
        gasLimit: 10000000
    });

    return {
        linkToken,
        proofOfRank
    };
}
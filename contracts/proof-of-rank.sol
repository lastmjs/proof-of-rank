// Based heavily on the Open Zeppelin ERC721 contracts, license included below
// The MIT License (MIT)

// Copyright (c) 2016-2020 zOS Global Limited

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

pragma solidity ^0.6.6;

// TODO use the correct abbreviations: https://marineparents.com/marinecorps/ranks.asp
// Proof of Rank - Private, PRANK-PRIV
// Proof of Rank - Specialist, PRANK-SPEC
// Proof of Rank - Corporal, PRANK-CPL
// Proof of Rank - Sergeant, PRANK-SGT
// Proof of Rank - Staff Sergeant, PRANK-SSGT
// Proof of Rank - Sergeant First Class, PRANK-SGTFC
// Proof of Rank - Master Sergeant, PRANK-MSGT
// Proof of Rank - Sergeant Major, PRANK-SGTM
// Proof of Rank - Second Lieutenant, PRANK-2LT
// Proof of Rank - First Lieutenant, PRANK-1LT
// Proof of Rank - Captain, PRANK-CAPT
// Proof of Rank - Major, PRANK-MAJOR
// Proof of Rank - Lieutenant Colonel, PRANK-LTCOL
// Proof of Rank - Colonel, PRANK-COL
// Proof of Rank - Brigadier General, PRANK-BGEN
// Proof of Rank - Major General, PRANK-MAGEN
// Proof of Rank - Lieutenant General, PRANK-LTGEN
// Proof of Rank - General, PRANK-GEN
// Proof of Rank - General of Chainlink - PRANK-GENC

// TODO heavily comment, use the jsdoc format
// TODO there should be an easy way to see how many of each rank exist...this would be great for a dashboard
// TODO start creating front-end
// TODO creating property-based tests for all custom functions
// TODO study solidity security
// TODO find premade audits and things

import { ERC721 } from 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol';
import { Counters } from 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol';
// import { LinkToken } from 'https://github.com/smartcontractkit/LinkToken/blob/master/contracts/LinkToken.sol';

contract ProofOfRank is ERC721 {
    
    address public owner; // TODO should I keep this public or private?
    address public generalOfChainlink; // TODO make sure we do not have weird 0 address problems
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address public linkAddress = 0x20fE562d797A42Dcb3399062AE9546cd06f63280;
    // address public constant linkAddress = 0x514910771AF9Ca656af840dff83E8264EcF986CA; // TODO this is the main network link address
    
    struct PrankConfig {
        string rank; // TODO should we use an enum for the rank?
        uint256 linkRequirement;
        uint256 price;
        string tokenURI;
        mapping (address => bool) marines; // TODO it would be great if this were somehow an array or something with a length so that we could easily see how many of each rank there were
    }
    
    mapping (uint256 => uint256) public prankConfigIndexForTokens;
    
    PrankConfig[] public prankConfigs; // TODO should this be an array or a mapping?
    
    constructor() ERC721('Proof of Rank', 'PRANK') public {
        owner = msg.sender;
        
        prankConfigs.push(PrankConfig({
            rank: 'Private',
            linkRequirement: 1e18,
            price: 1e18,
            tokenURI: 'https://proofofrank.link/token-uris/private.json'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Specialist',
            linkRequirement: 501e18,
            price: 1e18,
            tokenURI: 'https://proofofrank.link/token-uris/specialist.json'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Corporal',
            linkRequirement: 1501e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Sergeant',
            linkRequirement: 3501e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Staff Sergeant',
            linkRequirement: 5001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Sergeant First Class',
            linkRequirement: 7501e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Master Sergeant',
            linkRequirement: 9001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Sergeant Major',
            linkRequirement: 10001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Second Lieutenant',
            linkRequirement: 15001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'First Lieutenant',
            linkRequirement: 20001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Captain',
            linkRequirement: 25001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Major',
            linkRequirement: 35001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Lieutenant Colonel',
            linkRequirement: 50001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Colonel',
            linkRequirement: 75001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Brigadier General',
            linkRequirement: 125001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Major General',
            linkRequirement: 175001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'Lieutenant General',
            linkRequirement: 2500001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'General',
            linkRequirement: 500001e18,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        prankConfigs.push(PrankConfig({
            rank: 'General of Chainlink',
            linkRequirement: 0,
            price: 1e18,
            tokenURI: 'https://upload.wikimedia.org/wikipedia/commons/1/17/USMC-E2.svg'
        }));
        
        // TODO I am not sure what to do with the general of chainlink token...only one person can ever own it
    }
    
    function onTokenTransfer(address from, uint256 amount, bytes memory data) public returns (bool success) {
        
        // TODO ensure that from will never by the 0 address
        
        PrankConfig storage prankConfig = prankConfigs[data.length];
        
        uint256 price = prankConfig.price;
        uint256 linkRequirement = prankConfig.linkRequirement;
        string memory tokenURI = prankConfig.tokenURI;
        
        // You must pay at least the price required
        require(amount >= price); // TODO should I allow amounts larger than the price? This could be a mistake...UIs would have to warn against this
        
        // You must not have already received this rank
        require(prankConfig.marines[from] == false, 'An Ethereum account can only have one of these tokens');
        
        // This function can only be called by the LINK contract (otherwise it could be faked)
        require(msg.sender == linkAddress);
        
        LinkToken linkToken = LinkToken(linkAddress);
        
        // You must have had at least the rank requirement amount of LINK before purchasing the proof of rank
        require(linkToken.balanceOf(from) + amount >= linkRequirement); // TODO double-check this
        
        // Only the General of Chainlink can receive the General of Chainlink PRANK NFT
        // The General of Chainlink address is manually set by the owner of the contract
        require(data.length == 18 ? from == generalOfChainlink : true, 'You are not the General of Chainlink');
        
        _tokenIds.increment();
        
        uint256 newItemId = _tokenIds.current();
        _mint(from, newItemId);
        _setTokenURI(newItemId, tokenURI);
        
        prankConfigIndexForTokens[newItemId] = data.length;
        prankConfig.marines[from] = true;
        
        return true;
    }
    
    function withdraw(address to, uint256 amount) public returns (bool success) {
        require(msg.sender == owner);
        
        LinkToken linkToken = LinkToken(linkAddress);
        
        linkToken.transfer(to, amount);
        
        return true;
    }
    
    // TODO rethink how many of these things we should be able to change...seems an NFT should be more set in stone
    function changeLinkRequirement(uint256 prankConfigIndex, uint256 newLinkRequirement)  public returns (bool success) {
        require(msg.sender == owner);
        
        PrankConfig storage prankConfig = prankConfigs[prankConfigIndex];
        
        prankConfig.linkRequirement = newLinkRequirement;
        
        return true;
    }
    
    function changePrice(uint256 prankConfigIndex, uint256 newPrice) public returns (bool success) {
        require(msg.sender == owner);
        
        PrankConfig storage prankConfig = prankConfigs[prankConfigIndex];
        
        prankConfig.price = newPrice;
        
        return true;
    }
    
    // TODO we would need to somehow update all of the token uris for all tokens of this type...rethink this
    // TODO look into the base uri information in the open zeppelin contract
    // TODO we want to unify our approach here
    function changeTokenURI(uint256 prankConfigIndex, string memory newTokenURI) public returns (bool success) {
        require(msg.sender == owner);
        
        PrankConfig storage prankConfig = prankConfigs[prankConfigIndex];
        
        prankConfig.tokenURI = newTokenURI;
        
        return true;
    }
    
    function changeLinkAddress(address newLinkAddress) public returns (bool success) {
        require(msg.sender == owner);
        
        linkAddress = newLinkAddress;
        
        return true;
    }
    
    function changeOwner(address newOwner) public returns (bool success) {
        require(msg.sender == owner);
        
        owner = newOwner;
        
        return true;
    }
    
    function changeGeneralOfChainlink(address newGeneralOfChainlink) public returns (bool success) {
        
        require(msg.sender == owner);
        
        // the General of Chainlink address can only be set once
        // TODO ensure that this assumption holds
        require(generalOfChainlink == address(0));
        
        generalOfChainlink = newGeneralOfChainlink;
        
        return true;
    }
}

interface LinkToken {
    function balanceOf(address account) external view returns (uint);
    function transfer(address to, uint256 value) external returns (bool success);
    function transferAndCall(address to, uint256 value, bytes memory data) external returns (bool success); // TODO this is just here so that I can easily call this from remix
}
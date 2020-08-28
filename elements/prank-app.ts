import { ethers } from 'ethers';
import {
    html,
    render as litRender,
    TemplateResult
} from 'lit-html';
import { createObjectStore } from 'reduxular';
import './prank-hexagon';

type Rank = 'Private' | 'Specialist';
type Address = string;

type State = {
    readonly linkTokenAddress: Address;
    readonly proofOfRankAddress: Address;
    readonly ownerAddress: Address;
    readonly provider: Readonly<ethers.providers.Web3Provider> | 'NOT_SET';
    readonly pranks: {
        'Private': {
            readonly rank: 'Private';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '1 – 500 LINK';
        };
        'Specialist': {
            readonly rank: 'Specialist';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '501 – 1500 LINK';
        };
        'Corporal': {
            readonly rank: 'Corporal';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '1501 – 3500 LINK';
        };
        'Sergeant': {
            readonly rank: 'Sergeant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '3501 – 5000 LINK';
        };
        'Staff Sergeant': {
            readonly rank: 'Staff Sergeant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '5001 – 7500 LINK';
        };
        'Sergeant First Class': {
            readonly rank: 'Sergeant First Class';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '7501 – 9000 LINK';
        };
        'Master Sergeant': {
            readonly rank: 'Master Sergeant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '9001 – 10000 LINK';
        };
        'Sergeant Major': {
            readonly rank: 'Sergeant Major';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '10001 – 15000 LINK';
        };
        'Second Lieutenant': {
            readonly rank: 'Second Lieutenant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '15001 – 20000 LINK';
        };
        'First Lieutenant': {
            readonly rank: 'First Lieutenant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '20001 – 25000 LINK';
        };
        'Captain': {
            readonly rank: 'Captain';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '25001 – 35000 LINK';
        };
        'Major': {
            readonly rank: 'Major';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '35001 – 50000 LINK';
        };
        'Lieutenant Colonel': {
            readonly rank: 'Lieutenant Colonel';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '50001 – 75000 LINK';
        };
        'Colonel': {
            readonly rank: 'Colonel';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '75001 – 125000 LINK';
        };
        'Brigadier General': {
            readonly rank: 'Brigadier General';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '125001 – 175000 LINK';
        };
        'Major General': {
            readonly rank: 'Major General';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '175001 – 250000 LINK';
        };
        'Lieutenant General': {
            readonly rank: 'Lieutenant General';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '2500001 – 500000 LINK';
        };
        'General': {
            readonly rank: 'General';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: '500001 + LINK';
        };
        'General of Chainlink': {
            readonly rank: 'General of Chainlink';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
            readonly linkRange: 'NOT_SET';
        };
    };
};

const InitialState: Readonly<State> = {
    linkTokenAddress: '0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA',
    proofOfRankAddress: '0x54421e7a0325cCbf6b8F3A28F9c176C77343b7db',
    ownerAddress: '',
    provider: (window as any).ethereum ? new ethers.providers.Web3Provider((window as any).ethereum) : 'NOT_SET', // TODO should we check to make sure that window.ethereum is defined? Yes, yes we should. We do not want this to break on browsers that do not have metamask installed, instead we want to help them to get MetaMask installed
    pranks: {
        'Private': {
            rank: 'Private',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '1 – 500 LINK'
        },
        'Specialist': {
            rank: 'Specialist',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '501 – 1500 LINK'
        },
        'Corporal': {
            rank: 'Corporal',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '1501 – 3500 LINK'
        },
        'Sergeant': {
            rank: 'Sergeant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '3501 – 5000 LINK'
        },
        'Staff Sergeant': {
            rank: 'Staff Sergeant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '5001 – 7500 LINK'
        },
        'Sergeant First Class': {
            rank: 'Sergeant First Class',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '7501 – 9000 LINK'
        },
        'Master Sergeant': {
            rank: 'Master Sergeant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '9001 – 10000 LINK'
        },
        'Sergeant Major': {
            rank: 'Sergeant Major',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '10001 – 15000 LINK'
        },
        'Second Lieutenant': {
            rank: 'Second Lieutenant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '15001 – 20000 LINK'
        },
        'First Lieutenant': {
            rank: 'First Lieutenant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '20001 – 25000 LINK'
        },
        'Captain': {
            rank: 'Captain',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '25001 – 35000 LINK'
        },
        'Major': {
            rank: 'Major',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '35001 – 50000 LINK'
        },
        'Lieutenant Colonel': {
            rank: 'Lieutenant Colonel',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '50001 – 75000 LINK'
        },
        'Colonel': {
            rank: 'Colonel',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '75001 – 125000 LINK'
        },
        'Brigadier General': {
            rank: 'Brigadier General',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '125001 – 175000 LINK'
        },
        'Major General': {
            rank: 'Major General',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '175001 – 250000 LINK'
        },
        'Lieutenant General': {
            rank: 'Lieutenant General',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '2500001 – 500000 LINK'
        },
        'General': {
            rank: 'General',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: '500001 + LINK'
        },
        'General of Chainlink': {
            rank: 'General of Chainlink',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET',
            linkRange: 'NOT_SET'
        }
    },
};

class PRANKApp extends HTMLElement {
    
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    constructor() {
        super();

        this.store.ownerAddress = (window as any).ethereum?.selectedAddress === null || (window as any).ethereum?.selectedAddress === undefined ? '' : (window as any).ethereum.selectedAddress;

        if (this.store.ownerAddress !== '') {
            this.getPranks();
        }
    }

    // TODO get the pranks for this user
    // TODO make sure to update the pranks one at a time, since we'll have to do quite a few requests to get everything
    async getPranks() {

    }

    async connectToMetaMask() {

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            this.store.ownerAddress = window.ethereum.selectedAddress;
            await this.getPranks();
        }
        catch(error) {
            console.log(error);
            alert('You have failed to connect to MetaMask. You must connect to MetaMask to view and obtain Proof of Rank tokens');
        }
    }

    async hexagonClick(prank: Prank) {
        if (prank.tokenId === 'NOT_SET') {
            const confirmed = confirm(`You are about to obtain 1 PRANK token. The cost is 1 LINK.`);
            // TODO do a metamask transaction
        }
        else {
            // TODO show large image suitable for sharing on social media
        }
    }

    render(state: Readonly<State>): Readonly<TemplateResult> {
        console.log(state);
        return html`
            <style>
                html {
                    margin: 0;
                }

                body {
                    margin: 0;
                }

                .prank-app-main-hexagon-column {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .prank-app-hexagon-row {
                    display: flex;
                }
            </style>

            <button @click=${() => this.connectToMetaMask()} ?hidden=${state.ownerAddress !== ''}>Connect to MetaMask</button>

            <div class="prank-app-main-hexagon-column">
                <div class="prank-app-hexagon-row">
                    <prank-hexagon
                        .rank=${state.pranks['General of Chainlink'].rank}
                        .tokenId=${state.pranks['General of Chainlink'].tokenId}
                        .linkRange=${state.pranks['General of Chainlink'].linkRange}
                    ></prank-hexagon>
                </div>

                <div class="prank-app-hexagon-row">
                    <prank-hexagon
                        .rank=${state.pranks['Brigadier General'].rank}
                        .tokenId=${state.pranks['Brigadier General'].tokenId}
                        .linkRange=${state.pranks['Brigadier General'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Major General'].rank}
                        .tokenId=${state.pranks['Major General'].tokenId}
                        .linkRange=${state.pranks['Major General'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Lieutenant General'].rank}
                        .tokenId=${state.pranks['Lieutenant General'].tokenId}
                        .linkRange=${state.pranks['Lieutenant General'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['General'].rank}
                        .tokenId=${state.pranks['General'].tokenId}
                        .linkRange=${state.pranks['General'].linkRange}
                    ></prank-hexagon>
                </div>

                <div class="prank-app-hexagon-row">
                    <prank-hexagon
                        .rank=${state.pranks['Major'].rank}
                        .tokenId=${state.pranks['Major'].tokenId}
                        .linkRange=${state.pranks['Major'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Lieutenant Colonel'].rank}
                        .tokenId=${state.pranks['Lieutenant Colonel'].tokenId}
                        .linkRange=${state.pranks['Lieutenant Colonel'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Colonel'].rank}
                        .tokenId=${state.pranks['Colonel'].tokenId}
                        .linkRange=${state.pranks['Colonel'].linkRange}
                    ></prank-hexagon>
                </div>

                <div class="prank-app-hexagon-row">
                    <prank-hexagon
                        .rank=${state.pranks['Sergeant Major'].rank}
                        .tokenId=${state.pranks['Sergeant Major'].tokenId}
                        .linkRange=${state.pranks['Sergeant Major'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Second Lieutenant'].rank}
                        .tokenId=${state.pranks['Second Lieutenant'].tokenId}
                        .linkRange=${state.pranks['Second Lieutenant'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['First Lieutenant'].rank}
                        .tokenId=${state.pranks['First Lieutenant'].tokenId}
                        .linkRange=${state.pranks['First Lieutenant'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Captain'].rank}
                        .tokenId=${state.pranks['Captain'].tokenId}
                        .linkRange=${state.pranks['Captain'].linkRange}
                    ></prank-hexagon>
                </div>

                <div class="prank-app-hexagon-row">
                    <prank-hexagon
                        .rank=${state.pranks['Staff Sergeant'].rank}
                        .tokenId=${state.pranks['Staff Sergeant'].tokenId}
                        .linkRange=${state.pranks['Staff Sergeant'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Sergeant First Class'].rank}
                        .tokenId=${state.pranks['Sergeant First Class'].tokenId}
                        .linkRange=${state.pranks['Sergeant First Class'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Master Sergeant'].rank}
                        .tokenId=${state.pranks['Master Sergeant'].tokenId}
                        .linkRange=${state.pranks['Master Sergeant'].linkRange}
                    ></prank-hexagon>
                </div>

                <div class="prank-app-hexagon-row">
                    <prank-hexagon
                        .rank=${state.pranks['Private'].rank}
                        .tokenId=${state.pranks['Private'].tokenId}
                        .linkRange=${state.pranks['Private'].linkRange}
                        @hexagon-click=${() => this.hexagonClick(state.pranks['Private'])}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Specialist'].rank}
                        .tokenId=${state.pranks['Specialist'].tokenId}
                        .linkRange=${state.pranks['Specialist'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Corporal'].rank}
                        .tokenId=${state.pranks['Corporal'].tokenId}
                        .linkRange=${state.pranks['Corporal'].linkRange}
                    ></prank-hexagon>

                    <prank-hexagon
                        .rank=${state.pranks['Sergeant'].rank}
                        .tokenId=${state.pranks['Sergeant'].tokenId}
                        .linkRange=${state.pranks['Sergeant'].linkRange}
                    ></prank-hexagon>
                </div>
            </div>
        `;
    }
}

window.customElements.define('prank-app', PRANKApp);

// (async () => {
//     const provider: Readonly<ethers.providers.BaseProvider> = new ethers.providers.JsonRpcProvider('http://localhost:8545');

//     const linkToken = new ethers.Contract('0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA', [
//         'function totalSupply() public view returns (uint256)',
//         'function balanceOf(address) public view returns (uint256)'
//     ], provider);

//     const totalSupply = await linkToken.totalSupply();

//     console.log('totalSupply', totalSupply.toString());

//     const result = await linkToken.balanceOf('0x54421e7a0325cCbf6b8F3A28F9c176C77343b7db')


//     console.log(result.toString())
// })();
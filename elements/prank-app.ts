import { ethers } from 'ethers';
import {
    html,
    render as litRender,
    TemplateResult
} from 'lit-html';
import { createObjectStore } from 'reduxular';

type Rank = 'Private' | 'Specialist';
type Address = string;

type State = {
    readonly linkTokenAddress: Address;
    readonly proofOfRankAddress: Address;
    readonly ownerAddress: Address;
    readonly provider: Readonly<ethers.providers.Web3Provider>;
    readonly pranks: {
        'Private': {
            readonly rank: 'Private';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Specialist': {
            readonly rank: 'Specialist';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Corporal': {
            readonly rank: 'Corporal';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Sergeant': {
            readonly rank: 'Sergeant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Staff Sergeant': {
            readonly rank: 'Staff Sergeant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Sergeant First Class': {
            readonly rank: 'Sergeant First Class';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Master Sergeant': {
            readonly rank: 'Master Sergeant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Sergeant Major': {
            readonly rank: 'Sergeant Major';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Second Lieutenant': {
            readonly rank: 'Second Lieutenant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'First Lieutenant': {
            readonly rank: 'First Lieutenant';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Captain': {
            readonly rank: 'Captain';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Major': {
            readonly rank: 'Major';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Lieutenant Colonel': {
            readonly rank: 'Lieutenant Colonel';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Colonel': {
            readonly rank: 'Colonel';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Brigadier General': {
            readonly rank: 'Brigadier General';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Major General': {
            readonly rank: 'Major General';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'Lieutenant General': {
            readonly rank: 'Lieutenant General';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'General': {
            readonly rank: 'General';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
        'General of Chainlink': {
            readonly rank: 'General of Chainlink';
            readonly tokenURI: string | 'NOT_SET';
            readonly tokenId: number | 'NOT_SET';
        };
    };
};

const InitialState: Readonly<State> = {
    linkTokenAddress: '0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA',
    proofOfRankAddress: '0x54421e7a0325cCbf6b8F3A28F9c176C77343b7db',
    ownerAddress: '',
    provider: new ethers.providers.Web3Provider(window.ethereum),
    pranks: {
        'Private': {
            rank: 'Private',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Specialist': {
            rank: 'Specialist',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Corporal': {
            rank: 'Corporal',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Sergeant': {
            rank: 'Sergeant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Staff Sergeant': {
            rank: 'Staff Sergeant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Sergeant First Class': {
            rank: 'Sergeant First Class',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Master Sergeant': {
            rank: 'Master Sergeant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Sergeant Major': {
            rank: 'Sergeant Major',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Second Lieutenant': {
            rank: 'Second Lieutenant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'First Lieutenant': {
            rank: 'First Lieutenant',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Captain': {
            rank: 'Captain',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Major': {
            rank: 'Major',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Lieutenant Colonel': {
            rank: 'Lieutenant Colonel',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Colonel': {
            rank: 'Colonel',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Brigadier General': {
            rank: 'Brigadier General',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Major General': {
            rank: 'Major General',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'Lieutenant General': {
            rank: 'Lieutenant General',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'General': {
            rank: 'General',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        },
        'General of Chainlink': {
            rank: 'General of Chainlink',
            tokenURI: 'NOT_SET',
            tokenId: 'NOT_SET'
        }
    },
};

class PRANKApp extends HTMLElement {
    
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    constructor() {
        super();

        this.store.ownerAddress = window.ethereum.selectedAddress === null ? '' : window.ethereum.selectedAddress;

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

                .prank-app-hexagon-container {
                    font-size: 300px;
                    color: grey;
                    position: relative;
                    font-family: monospace;
                    line-height: 225px;
                    cursor: pointer;
                }

                .prank-app-hexagon-text-container {
                    line-height: normal;
                    font-size: 25px;
                    position: absolute;
                    text-shadow: none;
                    text-align: center;
                    top: 50%;
                    transform: translateY(-50%);
                    word-spacing: 100vw;
                    left: 0px;
                    right: 0px;
                }

                .prank-app-hexagon-rank-text {
                    margin-bottom: 15px;
                }

                .prank-app-hexagon-link-text {
                    font-size: 15px;
                    word-spacing: 0px;
                }

                .prank-app-proof-text-color {
                    color: white;
                }

                .prank-app-no-proof-text-color {
                    color: rgba(191, 191, 191, 1);
                }

                .prank-app-proof-hexagon-text-shadow {
                    text-shadow: 2px 2px 8px blue;
                }

                .prank-app-no-proof-hexagon-text-shadow {
                    text-shadow: 2px 2px 8px black;
                }
            </style>

            <button @click=${() => this.connectToMetaMask()} ?hidden=${state.ownerAddress !== ''}>Connect to MetaMask</button>

            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center">
                <div style="display: flex">
                    <div class="prank-app-hexagon-container ${state.pranks['General of Chainlink'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['General of Chainlink'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div>General of Chainlink</div>
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container ${state.pranks['Brigadier General'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Brigadier General'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Brigadier General</div>
                            <div class="prank-app-hexagon-link-text">125001 – 175000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Major General'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Major General'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Major General</div>
                            <div class="prank-app-hexagon-link-text">175001 – 250000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Lieutenant General'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Lieutenant General'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Lieutenant General</div>
                            <div class="prank-app-hexagon-link-text">2500001 – 500000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['General'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['General'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">General</div>
                            <div class="prank-app-hexagon-link-text">500001 + LINK</div>
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container ${state.pranks['Major'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Major'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Major</div>
                            <div class="prank-app-hexagon-link-text">35001 – 50000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Lieutenant Colonel'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Lieutenant Colonel'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Lieutenant Colonel</div>
                            <div class="prank-app-hexagon-link-text">50001 – 75000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Colonel'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Colonel'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Colonel</div>
                            <div class="prank-app-hexagon-link-text">75001 – 125000 LINK</div>
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container ${state.pranks['Sergeant Major'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Sergeant Major'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Sergeant Major</div>
                            <div class="prank-app-hexagon-link-text">10001 – 15000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Second Lieutenant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Second Lieutenant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Second Lieutenant</div>
                            <div class="prank-app-hexagon-link-text">15001 – 20000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['First Lieutenant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['First Lieutenant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">First Lieutenant</div>
                            <div class="prank-app-hexagon-link-text">20001 – 25000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Captain'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Captain'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Captain</div>
                            <div class="prank-app-hexagon-link-text">25001 – 35000 LINK</div>
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container ${state.pranks['Staff Sergeant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Staff Sergeant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Staff Sergeant</div>
                            <div class="prank-app-hexagon-link-text">5001 – 7500 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Sergeant First Class'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Sergeant First Class'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Sergeant First Class</div>
                            <div class="prank-app-hexagon-link-text">7501 – 9000 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Master Sergeant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Master Sergeant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Master Sergeant</div>
                            <div class="prank-app-hexagon-link-text">9001 – 10000 LINK</div>
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container ${state.pranks['Private'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Private'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Private</div>
                            <div class="prank-app-hexagon-link-text">1 – 500 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Specialist'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Specialist'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Specialist</div>
                            <div class="prank-app-hexagon-link-text">501 – 1500 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Corporal'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Corporal'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Corporal</div>
                            <div class="prank-app-hexagon-link-text">1501 – 3500 LINK</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container ${state.pranks['Sergeant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-hexagon-text-shadow' : 'prank-app-proof-hexagon-text-shadow'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.pranks['Sergeant'].tokenId === 'NOT_SET' ? 'prank-app-no-proof-text-color' : 'prank-app-proof-text-color'}">
                            <div class="prank-app-hexagon-rank-text">Sergeant</div>
                            <div class="prank-app-hexagon-link-text">3501 – 5000 LINK</div>
                        </div>
                    </div>
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
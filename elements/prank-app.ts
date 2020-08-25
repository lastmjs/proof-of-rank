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
                    text-shadow: 2px 2px 8px black;
                    cursor: pointer;
                }

                .prank-app-hexagon-text {
                    line-height: normal;
                    color: white;
                    font-size: 25px;
                    position: absolute;
                    text-shadow: none;
                    text-align: center;
                    top: 55px;
                    word-spacing: 100vw;
                    left: 0px;
                    right: 0px;
                }
            </style>

            <button @click=${() => this.connectToMetaMask()} ?hidden=${state.ownerAddress !== ''}>Connect to MetaMask</button>

            <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center">
                <div style="display: flex">
                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            General of Chainlink
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Brigadier General
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Major General
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Lieutenant General
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            General
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Major
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Lieutenant Colonel
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Colonel
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Sergeant Major
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Second Lieutenant
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            First Lieutenant
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Captain
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Staff Sergeant
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Sergeant First Class
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Master Sergeant
                        </div>
                    </div>
                </div>

                <div style="display: flex">
                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Private
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Specialist
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Corporal
                        </div>
                    </div>

                    <div class="prank-app-hexagon-container">
                        &#x2B22;
                        <div class="prank-app-hexagon-text">
                            Sergeant
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
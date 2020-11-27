import {
    html,
    render as litRender,
    TemplateResult
} from 'lit-html';
import { createObjectStore } from 'reduxular';
import './prank-modal';
import { Rank } from '../types/index.d';

type State = {
    readonly rank: Rank | 'NOT_SET';
    readonly tokenId: number | 'NOT_SET';
    readonly linkRange: string | 'NOT_SET';
    readonly flipped: boolean;
    readonly selected: boolean;
    readonly anotherPrankIsSelected: boolean;
};

const InitialState: Readonly<State> = {
    rank: 'NOT_SET',
    tokenId: 'NOT_SET',
    linkRange: 'NOT_SET',
    flipped: false,
    selected: false,
    anotherPrankIsSelected: false
};

// TODO put in loading
class PRANKHexagon extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    set selected(selected: boolean) {
        this.store.selected = selected;

        if (this.store.selected === true) {

            setTimeout(() => {
                this.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 500);

        }
    }

    render(state: Readonly<State>): Readonly<TemplateResult> {
        return html`
            <style>
                .prank-app-hexagon-scene {
                    width: 346px;
                    height: 400px;
                    transition: width .5s linear;
                    transition: height .5s linear;
                    perspective: 1000px;
                    cursor: default;
                    font-family: sans-serif;
                    transition: opacity .25s ease-in-out;
                }

                .prank-app-hexagon-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transition: transform 1s;
                    transform-style: preserve-3d;
                }

                .prank-app-hexagon-container-flipped {
                    transform: rotateY(180deg);
                }

                .prank-app-hexagon-front {
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="346" height="400"><polyline fill="grey" points="173,0 346,100 346,300 173,400 0,300 0,100 173,0" /></svg>');
                }

                .prank-app-hexagon-front-proof {
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="346" height="400"><polyline fill="%23375bd2" points="173,0 346,100 346,300 173,400 0,300 0,100 173,0" /></svg>');
                }

                .prank-app-hexagon-back {
                    color: black;
                    transform: rotateY(180deg);
                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="346" height="400"><polyline fill="black" points="173,0 346,100 346,300 173,400 0,300 0,100 173,0" /></svg>');
                }

                .prank-app-hexagon-text-container {
                    font-size: 25px;
                    word-spacing: 100vw;
                    text-shadow: none;
                    color: rgba(191, 191, 191, 1);
                    backface-visibility: hidden;
                }

                .prank-app-proof-hexagon-text {
                    color: white;
                    font-weight: bold;
                }

                .prank-app-hexagon-rank-text {
                    margin-bottom: 15px;
                }

                .prank-app-hexagon-link-text {
                    font-size: 15px;
                    word-spacing: 0px;
                }

                .prank-app-hexagon-button {
                    cursor: pointer;
                    font-size: 20px;
                    background-color: black;
                    color: white;
                    border: solid 1px white;
                    border-radius: 5px;
                    padding: 5px;
                }

                .prank-app-hexagon {
                    backface-visibility: hidden;
                    position: absolute;
                    text-align: center;
                    width: 346px;
                    height: 400px;
                    background-size: 346px 400px;
                    filter: drop-shadow(0px 0px .2rem black);
                    transition: width .25s ease-in-out;
                    transition: height .25s ease-in-out;
                }

                .prank-app-hexagon-selected {
                    background: none;
                    background-color: black;
                    width: 500px;
                    height: 500px;
                }
            </style>

            <div
                class="prank-app-hexagon-scene"
                style="opacity: ${state.anotherPrankIsSelected === true ? '0' : '1'}"
                @mouseover=${() => {
                    if (this.store.selected === false) {
                        this.store.flipped = true;
                    }
                }}
                @mouseout=${() => {
                    if (this.store.selected === false) {
                        this.store.flipped = false;
                    }
                }}
            >
                <div
                    class="prank-app-hexagon-container ${state.flipped ? 'prank-app-hexagon-container-flipped' : ''}"
                >
                    <div
                        class="prank-app-hexagon prank-app-hexagon-front ${state.tokenId === 'NOT_SET' ? '' : 'prank-app-hexagon-front-proof'}"
                    >
                        <div
                            class="prank-app-hexagon-text-container ${state.tokenId === 'NOT_SET' ? '' : 'prank-app-proof-hexagon-text'}"
                            style="width: 346px; height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center"
                        >
                            <div
                                class="prank-app-hexagon-rank-text"
                            >
                                ${state.rank}
                            </div>

                            <div
                                class="prank-app-hexagon-link-text"
                            >
                                ${state.linkRange === 'NOT_SET' ? '' : state.linkRange}
                            </div>
                        </div>
                    </div>

                    <div
                        class="prank-app-hexagon prank-app-hexagon-back ${state.selected === true ? 'prank-app-hexagon-selected' : ''}"
                    >
                        <div
                            class="prank-app-hexagon-text-container ${state.tokenId === 'NOT_SET' ? '' : 'prank-app-proof-hexagon-text'}"
                            style="width: ${state.selected === true ? '500px' : '346px'}; height: ${state.selected === true ? '500px': '400px'}; display: flex; flex-direction: column; align-items: center; ${state.selected === true ? '' : 'justify-content: center'}"
                        >
                            <div ?hidden=${state.selected}>
                                <button
                                    class="prank-app-hexagon-button"
                                    @click=${() => this.dispatchEvent(new CustomEvent('hexagon-click'))}
                                >
                                    ${state.tokenId === 'NOT_SET' ? 'Prove' : 'View'} Rank
                                </button>
                            </div>

                            <div ?hidden=${!state.selected} style="word-spacing: 0; padding: 5rem; overflow-y: scroll">
                                <button class="prank-app-hexagon-button" style="position: absolute; top: 1rem; left: 1rem" @click=${() => this.dispatchEvent(new CustomEvent('hexagon-click'))}>cancel</button>
                            
                                <div style="padding-bottom: 1rem">You are about to obtain your Proof of Rank in the Brotherhood of LINK Marines</div>
                                
                                <hr>

                                <div style="padding-top: 1rem; padding-bottom: 1rem">Please certify the following:</div>
                                
                                <div style="padding-bottom: 1rem">
                                    <input type="checkbox"> ${state.rank === 'General of Chainlink' ? 'I am the General of Chainlink' : `I own between ${state.linkRange} inclusive`}
                                </div>

                                <div style="padding-bottom: 1rem">
                                    <input type="checkbox"> I am purchasing 1 PRANK token for the price of 1 LINK token
                                </div>

                                <div style="padding-bottom: 1rem">
                                    <input type="checkbox"> The Proof of Rank website and PRANK tokens are offered to me under the terms of the <a href="https://github.com/lastmjs/proof-of-rank/blob/master/LICENSE" target="_blank">MIT license</a>. There is no warranty of any kind. I am using this software at my own risk
                                </div>

                                <div style="padding-bottom: 3rem">
                                    <input type="checkbox"> I am not in a country nor am I a person that is sanctioned by the United States
                                </div>
                                
                                <div style="padding-bottom: 1rem">
                                    <button class="prank-app-hexagon-button" style="font-size: 1.5rem; padding: 1rem" @click=${() => this.dispatchEvent(new CustomEvent('advanceclicked', { 
                                        detail: state.rank
                                    }))}>Advance to ${state.rank}</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('prank-hexagon', PRANKHexagon);
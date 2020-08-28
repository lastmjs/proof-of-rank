import {
    html,
    render as litRender,
    TemplateResult
} from 'lit-html';
import { createObjectStore } from 'reduxular';

type State = {
    readonly rank: string | 'NOT_SET';
    readonly tokenId: number | 'NOT_SET';
    readonly linkRange: string | 'NOT_SET';
    readonly flipped: boolean;
};

const InitialState: Readonly<State> = {
    rank: 'NOT_SET',
    tokenId: 'NOT_SET',
    linkRange: 'NOT_SET',
    flipped: false
};

// TODO put in loading
class PRANKHexagon extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    render(state: Readonly<State>): Readonly<TemplateResult> {
        return html`
            <style>
                .prank-app-hexagon-scene {
                    width: 250px;
                    height: 250px;
                    perspective: 1000px;
                    cursor: default;
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

                .prank-app-hexagon {
                    position: absolute;
                    font-size: 300px;
                    font-family: monospace;
                    backface-visibility: hidden;
                }

                .prank-app-hexagon-front {
                    color: grey;
                    text-shadow: 2px 2px 8px black;
                    transform: rotateY(0deg);
                }

                .prank-app-hexagon-front-proof {
                    color: #375bd2;
                }

                .prank-app-hexagon-back {
                    color: black;
                    transform: rotateY(180deg);
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
                    color: rgba(191, 191, 191, 1);
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
            </style>

            <div class="prank-app-hexagon-scene" @mouseover=${() => this.store.flipped = true} @mouseout=${() => this.store.flipped = false}>
                <div class="prank-app-hexagon-container ${state.flipped ? 'prank-app-hexagon-container-flipped' : ''}">
                    <div class="prank-app-hexagon prank-app-hexagon-front ${state.tokenId === 'NOT_SET' ? '' : 'prank-app-hexagon-front-proof'}">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container ${state.tokenId === 'NOT_SET' ? '' : 'prank-app-proof-hexagon-text'}">
                            <div class="prank-app-hexagon-rank-text">${state.rank}</div>
                            <div class="prank-app-hexagon-link-text">${state.linkRange === 'NOT_SET' ? '' : state.linkRange}</div>
                        </div>
                    </div>

                    <div class="prank-app-hexagon prank-app-hexagon-back">
                        &#x2B22;
                        <div class="prank-app-hexagon-text-container">
                            <button class="prank-app-hexagon-button" @click=${() => this.dispatchEvent(new CustomEvent('hexagon-click'))}>${state.tokenId === 'NOT_SET' ? 'Prove' : 'View'} Rank</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('prank-hexagon', PRANKHexagon);
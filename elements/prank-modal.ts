import {
    html,
    render as litRender,
    TemplateResult
} from 'lit-html';
import { createObjectStore } from 'reduxular';

type State = {
};

const InitialState: Readonly<State> = {
};

class PRANKModal extends HTMLElement {
    readonly store = createObjectStore(InitialState, (state: Readonly<State>) => litRender(this.render(state), this), this);

    // TODO try using an inline svg to create the hexagon, and set it as the background image of a box that we can control the width and height of
    // TODO this should make perfect centering of the text much easier (maybe even flex will work on it)
    // TODO play around here and try to get the text and centering and everything to be much better
    render(state: Readonly<State>): Readonly<TemplateResult> {
        return html`
            <style>
                .prank-modal-main-container {
                    position: fixed;
                    height: 100%;
                    width: 100%;
                    background-color: rgba(0, 0, 0, .75);
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .prank-modal-hexagon {
                    font-size: 1000px;
                    color: #375bd2;
                    /* color: white; */
                    text-shadow: 2px 2px 8px black;
                    /* width: 50%; */
                    /* height: 50%; */
                }

                .prank-modal-hexagon-text-container {
                    position: absolute;
                    font-size: 25px;
                    /* word-spacing: 100vw; */
                    text-shadow: none;
                    /* color: rgba(191, 191, 191, 1); */
                    /* backface-visibility:hidden; */
                    text-align: center;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 0px;
                    right: 0px;
                    color: white;
                    /* width: 500px; */
                    /* height: 500px; */
                }
            </style>

            <div class="prank-modal-main-container">
                <div class="prank-modal-hexagon">
                    &#x2B22;
                    <div class="prank-modal-hexagon-text-container">
                        <div>You are about to obtain your Proof of Rank in the Brotherhood of LINK Marines</div>

                        <div>
                            <input type="checkbox"> You
                        </div>

                        <div>
                            <input type="checkbox"> Anda sdf asdf asdf asdf 
                        </div>

                        <div>
                            <button>Prove Rank</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

window.customElements.define('prank-modal', PRANKModal);
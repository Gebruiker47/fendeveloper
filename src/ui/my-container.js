import { LitElement, html, css } from "lit";

export class MyContainer extends LitElement {
  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }

  static get styles() {
    return css`
      div {
        margin: 10% auto auto;
        width: 50%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
      }
      ::slotted(*) {
        text-align: center;
      }

      @media only screen and (min-width: 0px) and (max-width: 640px) {
        div {
          width: 85%;
        }
      }
    `;
  }
}
window.customElements.define("my-container", MyContainer);

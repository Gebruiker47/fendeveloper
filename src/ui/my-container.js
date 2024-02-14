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
        margin: auto;
        width: 50%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        padding: 20px;
      }
      ::slotted(*) {
        text-align: center;
      }
    `;
  }
}
window.customElements.define("my-container", MyContainer);

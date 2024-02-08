import { LitElement, html, css } from "lit-element";

export class MyHeader extends LitElement {
  static get properties() {
    return {
      title: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.title = "Give a title";
  }
  static styles = css`
    :host {
      background-color: #e8f5d8;
      text-align: center;
    }

    div {
      background: #8bc34ab0;
      font-eight: bold;
      padding: 20px;
      color: #333;
    }
  `;

  render() {
    return html`
      <h1>${this.title}</h1>
      <slot></slot>
    `;
  }
}
customElements.define("my-header", MyHeader);

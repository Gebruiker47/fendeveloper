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

    #headerContainer {
      background: #8bc34ab0;
      padding: 5px;
      color: #333;
    }
  `;

  render() {
    return html`
      <div id="headerContainer">
        <h1>${this.title}</h1>
        <slot></slot>
      </div>
    `;
  }
}
customElements.define("my-header", MyHeader);

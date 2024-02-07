import { LitElement, html, css } from "lit-element";

export class UserLogin extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html` <my-router-menu></my-router-menu> `;
  }
}
customElements.define("user-login", UserLogin);

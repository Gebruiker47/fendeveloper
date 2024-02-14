import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

export class UserLogout extends LitElement {
  static get styles() {
    return {
      userID: { type: String },
    };
  }

  constructor() {
    super();
    this.userID = localStorage.getItem("userid");
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  logout() {
    localStorage.removeItem("name");
    Router.go("/");
  }
  render() {
    return html`
      <custom-button
        label="Logout"
        @custom-click="${this.logout}"
      ></custom-button>
    `;
  }
}
customElements.define("user-logout", UserLogout);

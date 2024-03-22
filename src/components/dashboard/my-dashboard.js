import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

export class MyDashboard extends LitElement {
  static get properties() {
    return {
      myStoredUsers: { type: Array, reflect: true },
      username: { type: String, reflect: true },
      coin_name: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.myStoredUsers = JSON.parse(localStorage.getItem("storedUsers"));
    this.username = localStorage.getItem("name");
  }

  connectedCallback() {
    super.connectedCallback();
    this.getSubArrayLength();
    this.render(); // voor het zichtbaar maken van de wijzigingen.
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.getSubArrayLength();
  }

  static get styles() {
    return css`
      .center {
        text-align: center;
      }
    `;
  }

  getSubArrayLength() {
    this.myStoredUsers.map((user) => {
      if (user.name == this.username) {
        return (this.coin_name = user.coins.map((item) => item.coinName));
      }
    });
  }
  renderDashboard() {
    return this.coin_name.length
      ? html` <my-chart chartType="bar"></my-chart> `
      : html``;
  }

  redirectToAdd() {
    Router.go("/add");
  }
  renderMyAssets() {
    return this.coin_name.length
      ? html` <my-assets title="My Assets"></my-assets> `
      : html`
          <div class="center">
            <h1>No data available</h1>
            <custom-button
              label="Add"
              @custom-click="${this.redirectToAdd}"
            ></custom-button>
            your first crypto coin
          </div>
        `;
  }

  render() {
    return html`
      <my-router-menu></my-router-menu>
      <my-header title="My Cryptodashboard"></my-header>
      ${this.renderDashboard()} ${this.renderMyAssets()}
    `;
  }
}

window.customElements.define("my-dashboard", MyDashboard);

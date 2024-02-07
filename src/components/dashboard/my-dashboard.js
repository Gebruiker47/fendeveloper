import { LitElement, html, css } from "lit";

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
      h1,
      p {
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
      ? html` <my-chart chartType="pie"></my-chart> `
      : html``;
  }

  renderMyAssets() {
    return this.coin_name.length
      ? html` <my-assets title="My Assets"></my-assets> `
      : html`
          <h1>No data available</h1>
          <p><a href="/addCoin">Add</a> your first crypto coin.</p>
        `;
  }

  render() {
    return html`
      <my-header title="My Cryptodashboard"></my-header>
      <my-router-menu></my-router-menu>
      ${this.renderDashboard()} ${this.renderMyAssets()}
    `;
  }
}

window.customElements.define("my-dashboard", MyDashboard);

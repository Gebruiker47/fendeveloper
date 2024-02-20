import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

export class AddCrypto extends LitElement {
  static get properties() {
    return {
      myStoredUsers: { type: Array, reflect: true },
      selectedCrypto: { type: String, reflect: true },
      username: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.selectedCrypto = "";
  }
  static styles = css``;

  get _cryptoInput() {
    return this.renderRoot?.querySelector("#cryptoInput") ?? null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  // Composition templates
  renderAddInput() {
    return html`
      <custom-text-input
        input_type="number"
        id="cryptoInput"
        placeholder="Enter crypto amount"
      >
      </custom-text-input>
    `;
  }

  renderSelectOption() {
    return html`
      <my-select-option
        id="customOption"
        size="6"
        label="Kies een crypto coin"
        @change-value="${this.changeMyCrypto}"
      >
      </my-select-option>
    `;
  }

  // Functions

  changeMyCrypto(e) {
    this.selectedCrypto = e.detail;
  }

  addCrypto() {
    this.username = localStorage.getItem("name");
    this.myStoredUsers = JSON.parse(localStorage.getItem("storedUsers"));
    this.myStoredUsers.map((user) => {
      if (user.name == this.username) {
        let promise = new Promise((resolve, reject) => {
          // if (this._cryptoInput.value) {
          if (this._cryptoInput.value && this.selectedCrypto) {
            resolve(
              user.coins.push({
                id: Math.floor(Math.random() * 10000),
                coin_name: this.selectedCrypto,
                price: this._cryptoInput.value,
              })
            );
          }
          localStorage.setItem(
            "storedUsers",
            JSON.stringify(this.myStoredUsers)
          );
          this._cryptoInput.value = "";
        });
        promise
          .then((message) => {
            message = this.myStoredUsers;
          })
          .catch((message) => {
            console.log(message);
          });
      }
    });
  }
  renderButton() {
    return html`
      <custom-button
        label="Add"
        @custom-click="${this.addCrypto}"
      ></custom-button>
    `;
  }

  render() {
    return html`
      <my-header title="Add Your Crypto"></my-header>
      <my-router-menu></my-router-menu>
      ${this.renderAddInput()} ${this.renderSelectOption()}
      ${this.renderButton()}
    `;
  }
}
customElements.define("add-crypto", AddCrypto);

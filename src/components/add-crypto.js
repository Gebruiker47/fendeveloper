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
  static styles = css`
    .container {
      margin: auto;
      width: 50%;
      --inputWidth: 100%;
      --btn-secundary: #00256a;
    }

    .last-td-child {
      vertical-align: bottom;
    }

    .btn-second {
      background: white;
    }
  `;

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
        placeholder="Amount"
      >
      </custom-text-input>
    `;
  }

  renderButton() {
    return html`
      <custom-button
        label="Add"
        @custom-click="${this.addCrypto}"
      ></custom-button>

      <custom-button
        label="Cancel"
        @custom-click="${this.cancel}"
      ></custom-button>
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

  cancel() {
    Router.go("/dashboard");
  }
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

  render() {
    return html`
      <my-router-menu></my-router-menu>
      <my-header title="Add Your Crypto"></my-header>
      <div class="container">
        <table>
          <tr>
            <td>Amount of crypto</td>
            <td>${this.renderAddInput()}</td>
          </tr>
          <tr>
            <td class="last-td-child">Choose your crypto</td>
            <td>${this.renderSelectOption()}</td>
          </tr>
          <tr>
            <td></td>
            <td>${this.renderButton()}</td>
          </tr>
        </table>
      </div>
    `;
  }
}
customElements.define("add-crypto", AddCrypto);

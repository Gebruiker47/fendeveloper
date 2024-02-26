import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";

export class UserRegistration extends LitElement {
  static get properties() {
    return {
      myStoredUsers: { type: Array },
      error_message: { type: String },
    };
  }
  constructor() {
    super();
    this.myStoredUsers = JSON.parse(localStorage.getItem("storedUsers"))
      ? JSON.parse(localStorage.getItem("storedUsers"))
      : [];
    this.error_message = "";
  }
  static styles = css`
    :host {
      display: block;
    }

    h1 {
      color: blue;
      font-size: 14pt;
    }

    a {
      text-decoration: none;
    }
  `;

  // name, email, password, userid, coins.

  get _nameInput() {
    return this.renderRoot?.querySelector("#name_input") ?? null;
  }
  get _mailInput() {
    return this.renderRoot?.querySelector("#mail_input") ?? null;
  }

  renderInputs() {
    return html`
      <custom-text-input
        id="name_input"
        input_type="text"
        placeholder="Name"
      ></custom-text-input>

      <custom-text-input
        id="mail_input"
        input_type="email"
        placeholder="Email"
      ></custom-text-input>
    `;
  }

  renderButtons() {
    return html`
      <custom-button
        label="Register"
        @custom-click="${this.registration}"
      ></custom-button>
    `;
  }

  testInput() {
    this.error_message = this._nameInput.value + " " + this._mailInput.value;
  }

  registration() {
    let promise = new Promise((resolve, reject) => {
      if (this._nameInput.value && this._mailInput.value) {
        setTimeout(() => {
          resolve(
            (this.myStoredUsers = [
              ...this.myStoredUsers,
              {
                userid: Math.floor(Math.random() * 10000),
                name: this._nameInput.value,
                mail: this._mailInput.value,
                password: Math.floor(Math.random() * 10000),
                coins: [],
              },
            ]),
            localStorage.setItem(
              "storedUsers",
              JSON.stringify(this.myStoredUsers)
            ),
            Router.go("/")
          );
        }, 1000);
      } else {
        reject("Failed");
      }
    });

    promise
      .then((message) => {
        (message = this.myStoredUsers), (this.error_message = "");
      })
      .catch((message) => {
        this.error_message = message;
      });
  }

  render() {
    return html`
      <my-header title="Registration"></my-header>

      <my-container>
        ${this.error_message}
        <h1>Register with your name and emailadres</h1>
        ${this.renderInputs()} ${this.renderButtons()}
        <a href="/">Terug</a>
      </my-container>
    `;
  }
}
customElements.define("user-registration", UserRegistration);

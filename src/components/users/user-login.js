import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import { styleMap } from "lit/directives/style-map.js";

export class UserLogin extends LitElement {
  static get properties() {
    return {
      label: { type: String, reflect: true },
      newUsers: { type: Array },
      myStoredUsers: { type: Array },
      hidden: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.label = "";
    this.myStoredUsers = JSON.parse(localStorage.getItem("storedUsers"));
    this.hidden = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.login();
  }

  get _input() {
    return this.renderRoot?.querySelector("#userInput") ?? null;
  }

  // functions
  login() {
    this.newUsers = JSON.parse(localStorage.getItem("storedUsers")) || [];
    if (this._input.value) {
      if (
        this.newUsers.some((user) => {
          return user.name.toLowerCase() == this._input.value.toLowerCase();
        })
      ) {
        let current_user = this.newUsers.filter((user) => {
          return user.name.toLowerCase() == this._input.value.toLowerCase();
        })[0];

        localStorage.setItem("userid", current_user.userid);
        localStorage.setItem("name", current_user.name);
        localStorage.setItem("mail", current_user.mail);
        localStorage.setItem("password", current_user.password);
        current_user.coins.map((coin) => {
          localStorage.setItem("crypto_name", coin.crypto_name),
            localStorage.setItem(
              "price",
              parseInt(coin.price),
              localStorage.setItem("id", parseInt(coin.id))
            );
        });
        Router.go("/dashboard");
      } else if (this._input.value == "") {
        this.label = "Leeg";
        this.hidden = true;
      } else {
        this.label = "Failed";
        // alert("failed");
        this.hidden = true;
      }
    }
  }

  static get styles() {
    return css`
      a {
        text-decoration: none;
      }
      span {
        color: #333;
        background: tomato;
        padding: 5px;
        border-radius: 8px;
        text-align: center;
        display: none;
      }
      h1 {
        color: blue;
        font-size: 14pt;
      }
      input {
        padding: 6px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        font-size: 16pt;
        width: 300px;
        vertical-align: middle;
      }

      button {
        font-family: Google Sans, Roboto, Helvetica, Arial, sans-serif;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.25px;
        padding: 11px 23px;
        vertical-align: baseline;
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        background: green;
        color: #fff;
        border: none;
        margin: 5px 0;
      }
    `;
  }

  render() {
    const display = {
      display: this.hidden ? "block" : "none",
    };
    return html`
      <my-header title="Login page"></my-header>
      <my-container>
        <h1>Login with your username</h1>

        <custom-text-input
          id="userInput"
          placeholder="Username"
        ></custom-text-input>
        <custom-button
          @custom-click=${this.login}
          label="Login"
        ></custom-button>
        OR <a href="/registration">register here</a>
        <span style=${styleMap(display)}>${this.label}</span>
      </my-container>
    `;
  }
}

window.customElements.define("user-login", UserLogin);

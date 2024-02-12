import { LitElement, html, css } from "lit";

export class UserProfile extends LitElement {
  static get properties() {
    return {
      username: { type: String },
      userDetail: { type: String },
      label: { type: String },
      myStoredUsers: { type: Array },
      myUsers: { type: Array },
    };
  }

  constructor() {
    super();
    // this.username = localStorage.getItem("name");
    this.userDetail = "";
    this.label = "";
    this.myUsers = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.getLoggedInUser();
    this.getUsers();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.getLoggedInUser();
    this.getUsers();
  }

  getLoggedInUser() {
    this.username = localStorage.getItem("name");
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.username);
      }, 1000);
      setTimeout(() => {
        reject(new Error("Er gaat iets mis met username"));
      }, 2000);
    });
    promise.then((user) => {
      this.username = user;
      this.label = this.username;
    });
  }

  getUsers() {
    this.myStoredUsers = JSON.parse(localStorage.getItem("storedUsers"));
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.myStoredUsers);
      }, 2000);
      setTimeout(() => {
        reject(new Error("Er gaat iets mis"));
      }, 4000);
    });

    promise.then((user) => {
      this.myStoredUsers = user;
      this.userDetail = this.myStoredUsers.map((user) => {
        if (user.name == this.username) {
          return html`
            <p>${user.name} heeft de volgende crypto coins :</p>
            ${user.coins.map(
              (item) =>
                html`<ul>
                  <li>${item.coin_name}</li>
                </ul>`
            )}</p>
            <p>
              Totale coin van :
              ${user.coins.reduce((total, item) => {
                return total + parseInt(item.price);
              }, 0)}
            </p>
          `;
        }
      });
    });
  }

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <my-header title="User profile : ${this.label}"></my-header>
      <my-router-menu></my-router-menu>
      ${this.getUsers()} ${this.userDetail}
    `;
  }
}
customElements.define("user-profile", UserProfile);

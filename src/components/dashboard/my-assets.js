import { LitElement, html, css } from "lit";

export class MyAssets extends LitElement {
  static get properties() {
    return {
      myStoredUsers: { type: Array, reflect: true },
      username: { type: String, reflect: true },
      title: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.myStoredUsers = JSON.parse(localStorage.getItem("storedUsers"));
    this.username = localStorage.getItem("name");
    this.title = "your title";
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static get styles() {
    return css`
      table,
      th,
      td {
        width: 50%;
        padding: 2px;
        border-spacing: 5px;
      }

      th {
        padding: 15px;
      }

      table tr td:nth-of-type(2),
      tr th:nth-of-type(2) {
        text-align: center;
      }

      table tr td:nth-of-type(1) {
        text-align: right;
        padding-right: 10px;
      }

      tr:nth-child(even) {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        background: #607d8b;
        border: 1px solid #333;
      }

      tr:nth-child(odd) {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
          rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
        border: 1px solid #333;
      }

      @media only screen and (min-width: 0px) and (max-width: 576px) {
        table {
          width: 95%;
        }
      }
    `;
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>

        ${this.myStoredUsers.map((user) => {
          if (user.name == this.username) {
            return user.coins.map(
              (coin) => html`
                <tr>
                  <td>${coin.coin_name}</td>
                  <td>${coin.price}</td>
                  <td>
                    <my-modal title="${coin.coin_name}" label="Details">
                      <custom-text-input
                        input_type="number"
                        value="${coin.price}"
                        id="coinInput"
                      >
                      </custom-text-input>

                      <custom-button
                        label="Change"
                        @custom-click="${this.updateItem}"
                        id="${coin.id}"
                        class="change-btn"
                      >
                      </custom-button>
                      <p>
                        totaal aantal ${coin.coin_name} crypto is ${coin.price}
                      </p>
                    </my-modal>
                  </td>
                </tr>
              `
            );
          }
        })}
      </table>
    `;
  }
}
customElements.define("my-assets", MyAssets);

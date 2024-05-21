import { LitElement, html, css } from "lit";

export class MyAssets extends LitElement {
  static get properties() {
    return {
      myStoredUsers: { type: Array, reflect: true },
      username: { type: String, reflect: true },
      title: { type: String, reflect: true },
      numberOfCrypto: { type: Number },
    };
  }

  constructor() {
    super();
    this.myStoredUsers = JSON.parse(localStorage.getItem("storedUsers"));
    this.username = localStorage.getItem("name");
    this.title = "your title";
    this.numberOfCrypto = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.getTotalCrypto();
  }

  getTotalCrypto() {
    this.myStoredUsers.map((user) => {
      if (user.name == this.username) {
        this.numberOfCrypto = user.coins.reduce((total, item) => {
          return total + parseInt(item.price);
        }, 0);
      }
    });
  }

  get _coinInput() {
    return this.renderRoot?.querySelector("#coinInput") ?? null;
  }

  updateItem(e) {
    const id = e.target.id;

    if (this._coinInput.value) {
      this.myStoredUsers.map((user) => {
        user.coins.map((item) => {
          if (item.id == id) {
            item.coinName = this._coinInput.value;
            console.log(this._coinInput.value, "Updated ");
          }
          localStorage.setItem(
            "storedUsers",
            JSON.stringify(this.myStoredUsers)
          );
        });
      });
      this._coinInput.value = "";
    }
  }

  // updateItem2(e) {
  //   const id = e.target.id;

  //   if (this._coinInput.value) {
  //     this.myStoredUsers.map((user) => {
  //       if (user.name == this.username) {
  //         user.coins.map((coin) => {
  //           if (coin.id == id) {
  //             coin.coinName = this._coinInput.value;
  //             console.log("UpdateItem function : ", this._coinInput.value);
  //           }
  //           localStorage.setItem(
  //             "storedUsers",
  //             JSON.stringify(this.myStoredUsers)
  //           );
  //         });
  //       }
  //       this._coinInput.value = "";
  //     });
  //   }
  // }

  static get styles() {
    return css`
      .assets-container {
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
          rgba(0, 0, 0, 0.24) 0px 1px 2px;
        width: 62%;
        float: right;
        padding: 20px;
        margin-top: 10px;
      }
      table,
      th,
      td {
        width: 100%;
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
        .assets-container {
          width: 90%;
          float: left;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="assets-container">
        <h1>${this.title}</h1>
        <p>Totale crypto coins : ${this.numberOfCrypto}</p>
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
                    <td>${coin.coinName}</td>
                    <td>${coin.price}</td>
                    <td>
                      <my-modal
                        title="${coin.coinName}"
                        label="Details"
                        id="${coin.id}"
                      >
                        <custom-text-input input_type="text" id="coinInput">
                        </custom-text-input>

                        <custom-button
                          id="${coin.id}"
                          label="Change"
                          @custom-click="${this.updateItem}"
                          class="change-btn"
                        >
                        </custom-button>

                        <p><b>Crypto name</b> : ${coin.coinName}</p>
                        <p><b>Price</b> : ${coin.price}</p>
                      </my-modal>
                    </td>
                  </tr>
                `
              );
            }
          })}
        </table>
      </div>
    `;
  }
}
customElements.define("my-assets", MyAssets);

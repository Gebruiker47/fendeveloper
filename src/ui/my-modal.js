import { LitElement, html, css, svg } from "lit";
import { styleMap } from "lit/directives/style-map.js";

export class MyModal extends LitElement {
  static get properties() {
    return {
      hidden: { type: Boolean },
      title: { type: String, reflect: true },
      content: { type: String, reflect: true },
      label: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.title = "Some title here";
    this.content = "Some content here";
    this.label = "";
  }

  // composition tamplate
  // De composition template kan gebruikt worden om de render functie overzichtelijk te houden,
  // zodat niet alle code in de render functie komt. Vervolgens kan de renderButton functie
  // binnen de render functie aangeroepen worden.
  renderButton() {
    return html`
      <custom-button
        label="${this.label}"
        @custom-click="${this.toggle}"
        id="btn"
      ></custom-button>
    `;
  }
  static styles = css`
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      padding-top: 100px;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgb(0, 0, 0);
      background-color: rgba(0, 0, 0, 0.4);
    }
    .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 50%;
      border-radius: 8px;
    }

    .close {
      color: #aaaaaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    span {
      float: right;
    }

    h1 {
      margin-top: -8px;
    }
  `;

  render() {
    const toggleModal = {
      display: this.hidden ? "block" : "none",
    };
    return html`
      ${this.renderButton()}

      <div style="${styleMap(toggleModal)}" id="myModal" class="modal">
        <div class="modal-content">
          <span>
            <custom-button label="X" @custom-click="${this.toggle}">
            </custom-button>
          </span>
          <h1>${this.title}</h1>
          <slot></slot>
        </div>
      </div>
    `;
  }

  toggle() {
    this.hidden = !this.hidden;
  }
}
customElements.define("my-modal", MyModal);

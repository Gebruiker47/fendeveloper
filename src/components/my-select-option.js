import { LitElement, html, css } from "lit";

export class MySelectOption extends LitElement {
  static get properties() {
    return {
      items: { type: Array, reflect: true },
      size: { type: String, reflect: true },
      label: { type: String, reflect: true },
      selectedItem: {},
    };
  }
  static styles = css`
    select {
      width: var(--select-option-width)
      border-radius: 5px;
      box-sahdow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    }
  `;

  constructor() {
    super();
    this.items = [];
    this.size = "10";
    this.label = "Kies een optie";
  }

  async load() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
    const responseBody = await response.json();
    this.items = responseBody;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.load();
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    this.load();
  }

  render() {
    return html`
      <select @change="${this._eventHandler}" size="${this.size}">
        <option value="">${this.label}</option>
        ${this.items.map(
          (item) => html` <option value="${item.name}">${item.name}</option> `
        )}
      </select>
    `;
  }

  _eventHandler(e) {
    this.selectedItem = e.target.value;
    this.dispatchEvent(
      new CustomEvent("change-value", {
        detail: this.selectedItem,
      })
    );
  }
}
customElements.define("my-select-option", MySelectOption);

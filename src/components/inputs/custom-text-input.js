import { LitElement, html, css } from "lit-element";

export class CustomTextInput extends LitElement {
  static get properties() {
    return {
      disabled: { type: Boolean, reflect: true },
      id: {},
      input_type: { type: String, reflect: true },
      placeholder: { type: String, reflect: true },
      value: { type: String, reflect: true },
    };
  }

  static styles = css`
    input {
      padding: 6px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      font-size: var(--inputFontSize);
      width: var(--inputWidth);
      vertical-align: middle;
    }

    input[type="checkbox"] {
      height: 30px;
      cursor: pointer;
      vertical-align: middle;
      border: 0.15em solid currentColor;
      background: red;
      display: inline-block;
      vertical-align: top;
    }
  `;

  render() {
    return html`
      <input
        ?disabled="${this.disabled}"
        .id="${this.id || ""}"
        .placeholder="${this.placeholder || "Type iets"}"
        .type="${this.input_type || "text"}"
        .value="${this.value || ""}"
        @input="${this._inputHandler}"
      />
    `;
  }

  _inputHandler(e) {
    this.value = e.target.value;
    this.dispatchEvent(
      new CustomEvent("custom-input", {
        detail: {
          id: this.id,
          placeholder: this.placeholder,
          type: this.input_type,
          value: this.value,
        },
      })
    );
  }
}
customElements.define("custom-text-input", CustomTextInput);

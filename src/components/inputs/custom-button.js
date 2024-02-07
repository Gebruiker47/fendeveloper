import { LitElement, html, css } from "lit-element";

export class CustomButton extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      disabled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.label = "custom button";
  }

  static styles = css`
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
      background: var(--btn-secundary);
      box-shadow: var(--btn-shadow);
      color: #fff;
      border: none;
      margin: 5px 0;
      width: var(--btn-width, 25%);
    }

    button:disabled {
      cursor: not-allowed;
      filter: grayscale(100%);
      opacity: 0.6;
    }

    @media only screen and (min-width: 0px) and (max-width: 376px) {
      button {
        --btn-width: 100%;
        padding: 8px;
        overflow: hidden;
        box-sizing: border-box;
        margin: 5px 0;
      }
    }

    @media only screen and (min-width: 377px) and (max-width: 576px) {
      button {
        --btn-width: 50%;
        margin: 0 auto;
        padding: 8px;
        overflow: hidden;
        box-sizing: border-box;
      }
    }
  `;

  render() {
    return html`
      <button @click="${this._handleClick}" ?disabled="${this.disabled}">
        ${this.label}
      </button>
    `;
  }

  _handleClick() {
    this.disabled = true;
    const event = new CustomEvent("custom-click", {
      detail: {
        label: this.label,
        disabled: (this.disabled = !this.disabled),
        bubbles: true,
        composed: true,
        cancelable: true,
      },
    });
    this.dispatchEvent(event);
  }
}
customElements.define("custom-button", CustomButton);

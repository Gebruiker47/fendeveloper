import { LitElement, html, css } from "lit-element";

export class TopNavbarMenu extends LitElement {
  static styles = css`
    #top-navbar {
      display: flex;
    }

    @media only screen and (min-width: 0px) and (max-width: 860px) {
      #top-navbar {
        margin: 10px;
        background: #002a62;
        color: #fff;
        display: var(--top-navbar-display, none);
      }
    }
  `;

  render() {
    return html`
      <div id="top-navbar">
        <slot></slot>
      </div>
    `;
  }
}
customElements.define("top-navbar-menu", TopNavbarMenu);

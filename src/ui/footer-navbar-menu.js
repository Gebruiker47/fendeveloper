import { LitElement, html, css } from "lit-element";

export class FooterNavbarMenu extends LitElement {
  static styles = css`
    #footer-navbar {
      display: none;
    }
    @media only screen and (min-width: 0px) and (max-width: 860px) {
      #footer-navbar {
        position: fixed;
        display: var(--footer-display);
        bottom: 0;
        right: 10px;
        left: 10px;
        overflow-x: scroll;
      }
    }
  `;

  render() {
    return html`
      <div id="footer-navbar">
        <slot></slot>
      </div>
    `;
  }
}
customElements.define("footer-navbar-menu", FooterNavbarMenu);

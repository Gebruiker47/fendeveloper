import { LitElement, html, css } from "lit-element";

export class FooterNavbarMenu extends LitElement {
  static styles = css`
    #footer-navbar {
      display: flex;
      justify-content: space-between;
      background: #333;
      overflow: hidden;
      white-space: nowrap;
      position: fixed;
      bottom: 0;
      overflow-x: scroll;
      width: 100%;
      display: none;
      z-index: 10;
    }
    @media only screen and (min-width: 0px) and (max-width: 860px) {
      #footer-navbar {
        position: fixed;
        display: var(--footer-display);
        bottom: 0;
        width: calc(100% - 40px);
        right: 10px;
        left: 10px;
        overflow-x: scroll;
        z-index: 10;
      }
    }
  `;

  render() {
    return html`
      <nav class="container">
        <div id="footer-navbar">
          <slot></slot>
        </div>
      </nav>
    `;
  }
}
customElements.define("footer-navbar-menu", FooterNavbarMenu);

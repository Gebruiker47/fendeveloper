import { LitElement, html, css } from "lit-element";

export class MyRouterMenu extends LitElement {
  constructor() {
    super();
    this.username = localStorage.getItem("name");
  }
  static get styles() {
    return css`
      :root {
      }
      #nav {
        list-style-type: none;
        padding: 20px;
        overflow: hidden;
        background-color: #333333;
        width: 100%;
        overflow-x: scroll;
      }

      #nav li {
        float: left;
      }

      a {
        font-family: Google Sans, Roboto, Helvetica, Arial, sans-serif;
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.25px;
        padding: 11px 23px;
        border-radius: 4px;
        box-sizing: border-box;
        cursor: pointer;
        background: var(--menu-background, #002e6a);
        color: var(--menu-color-a, #fff);
        border: none;
        margin: 10px;
        text-decoration: none;
        white-space: nowrap;
      }
      @media only screen and (min-width: 0px) and (max-width: 860px) {
        #nav {
          overflow: hidden;
        }
        .myTopNav {
          display: flex;
        }
        .menu-container {
          overflow: hidden;
        }
      }
    `;
  }
  render() {
    return html`
      <top-navbar-menu>
        <ul id="nav" class="myTopNav">
          <li><a href="/dashboard">My dashboard</a></li>
          <li><a href="/add">Add crypto</a></li>
          <li><a href="/userprofile/${this.username}">My Profile</a></li>
        </ul>
      </top-navbar-menu>

      <footer-navbar-menu>
        <ul id="nav" class="myTopNav">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/add">Add Crypto </a></li>
          <li><a href="/userprofile/${this.username}">Profile</a></li>
          <li><a href="/userprofile/2">Profile2</a></li>
          <li><a href="/userprofile/3">Profile3</a></li>
          <li><a href="/userprofile/3">Profile4</a></li>
          <li><a href="/userprofile/3">Profile5</a></li>
          <li><a href="/userprofile/3">Profile6</a></li>
          <li><a href="/userprofile/3">Profile7</a></li>
          <li><a href="/userprofile/3">Profile8</a></li>
        </ul>
      </footer-navbar-menu>
    `;
  }
}
customElements.define("my-router-menu", MyRouterMenu);

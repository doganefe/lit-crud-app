import { LitElement, html } from "lit";
import { initRouter } from "./router.js"; // Adjust the path as necessary
import "./components/CustomNavbar/CustomNavbar.js"; // Ensure this file exists
import "./constants/store.js";

export class MyElement extends LitElement {
  static get properties() {
    return {};
  }

  constructor() {
    super();
  }

  firstUpdated() {
    const outlet = this.shadowRoot.querySelector("#outlet");
    initRouter(outlet);
  }

  render() {
    return html`
      <custom-navbar></custom-navbar>
      <div id="outlet"></div>
      <employee-store></employee-store>
    `;
  }
}

window.customElements.define("my-element", MyElement);

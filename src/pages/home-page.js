import { LitElement, html, css } from "lit";
import { localization } from "../utils/localization";
import "../components/EmployeeList/EmployeeList";
import "../components/CustomNavbar/CustomNavbar";

export class HomePageElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        --ing-orange: #fe6c10;
      }

      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1rem;
      }

      .title {
        color: var(--ing-orange);
        margin: 0;
      }

      .display-toggle {
        display: flex;
        gap: 0.5rem;
      }

      .toggle-button {
        background: none;
        border: 1px solid var(--ing-orange);
        color: var(--ing-orange);
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .toggle-button.active {
        background-color: var(--ing-orange);
        color: white;
      }
    `;
  }

  static get properties() {
    return {
      displayMode: { type: String },
      lang: { type: String },
    };
  }

  constructor() {
    super();
    this.displayMode = "table";
    this.lang = localization.currentLang;
    this._handleLangChanged = this._handleLangChanged.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    localization.addListener(this._handleLangChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    localization.removeListener(this._handleLangChanged);
  }

  _handleLangChanged(lang) {
    this.lang = lang;
  }

  _handleDisplayModeChange(mode) {
    this.displayMode = mode;
  }

  render() {
    return html`
      <div class="header-container">
        <h2 class="title">${localization.t("employeeList.title")}</h2>
        <div class="display-toggle">
          <button
            id="table-btn"
            class="toggle-button ${this.displayMode === "table"
              ? "active"
              : ""}"
            @click=${() => this._handleDisplayModeChange("table")}
          >
            📊
          </button>
          <button
            id="list-btn"
            class="toggle-button ${this.displayMode === "list" ? "active" : ""}"
            @click=${() => this._handleDisplayModeChange("list")}
          >
            📋
          </button>
        </div>
      </div>
      <employee-list .displayMode=${this.displayMode}></employee-list>
    `;
  }
}

window.customElements.define("home-page", HomePageElement);

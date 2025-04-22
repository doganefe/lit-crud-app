import { LitElement, html, css } from "lit";
import { localization } from "../../utils/localization";

export class CustomNavbarElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        --ing-orange: #ff6200;
        --ing-dark-orange: #ff4b00;
      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .nav-content {
        display: flex;
        align-items: center;
        gap: 2rem;
        margin-left: auto;
      }

      .nav-links {
        display: flex;
        gap: 1rem;
      }

      .nav-link {
        color: var(--ing-orange);
        text-decoration: none;
        font-weight: 500;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .nav-link:hover {
        background-color: var(--ing-orange);
        color: white;
      }

      .nav-link.active {
        background-color: var(--ing-orange);
        color: white;
      }

      .language-switcher {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .language-button {
        padding: 0.25rem 0.5rem;
        border: 1px solid var(--ing-orange);
        border-radius: 4px;
        background: none;
        color: var(--ing-orange);
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .language-button:hover {
        background-color: var(--ing-orange);
        color: white;
      }

      .language-button.active {
        background-color: var(--ing-orange);
        color: white;
      }

      .logo {
        height: 32px;
        width: auto;
      }
    `;
  }

  static get properties() {
    return {
      lang: { type: String },
    };
  }

  constructor() {
    super();
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
    this.requestUpdate();
  }

  _handleLanguageChange(lang) {
    localization.currentLang = lang;
  }

  render() {
    return html`
      <nav>
        <a href="/">
          <img
            class="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/ING_Group_N.V._Logo.svg/1280px-ING_Group_N.V._Logo.svg.png"
            alt="ING Bank"
          />
        </a>
        <div class="nav-content">
          <div class="nav-links">
            <a href="/" id="home-btn" class="nav-link">
              ${localization.t("navbar.home")}
            </a>
            <a href="/add" id="add-btn" class="nav-link">
              ${localization.t("navbar.addEmployee")}
            </a>
          </div>
          <div class="language-switcher">
            <button
              id="lang-btn-en"
              class="language-button ${this.lang === "en" ? "active" : ""}"
              @click=${() => this._handleLanguageChange("en")}
            >
              EN
            </button>
            <button
              id="lang-btn-tr"
              class="language-button ${this.lang === "tr" ? "active" : ""}"
              @click=${() => this._handleLanguageChange("tr")}
            >
              TR
            </button>
          </div>
        </div>
      </nav>
    `;
  }
}

window.customElements.define("custom-navbar", CustomNavbarElement);

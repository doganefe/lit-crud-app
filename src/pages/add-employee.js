import { LitElement, html, css } from "lit";
import { localization } from "../constants/localization";
import { employeeStore } from "../constants/store";
import { Router } from "@vaadin/router";
import { validateField, validateForm } from "../utils/validation";
import { departments } from "../constants";

export class AddEmployeeElement extends LitElement {
  static get styles() {
    return css`
      :host {
        --ing-orange: #ff6200;
        --ing-dark-orange: #ff4b00;
        --error-red: #d91e18;
      }

      form {
        display: grid;
        gap: 12px;
        max-width: 320px;
        margin: auto;
        padding: 16px;
      }

      label {
        display: flex;
        flex-direction: column;
        font-family: "Arial", sans-serif;
        font-size: 13px;
        color: #333;
        margin-bottom: 2px;
      }

      input,
      select {
        height: 32px;
        padding: 0 8px;
        font-size: 13px;
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: all 0.2s ease;
        outline: none;
      }

      input:focus,
      select:focus {
        border-color: var(--ing-orange);
        box-shadow: 0 0 0 1px var(--ing-orange);
      }

      input:hover,
      select:hover {
        border-color: #999;
      }

      input.error,
      select.error {
        border-color: var(--error-red);
      }

      .error-message {
        color: var(--error-red);
        font-size: 12px;
        margin-top: 4px;
        min-height: 16px;
        display: none;
      }

      .error-message.show {
        display: block;
      }

      button {
        height: 32px;
        padding: 0 12px;
        font-size: 13px;
        font-weight: 600;
        color: white;
        background: var(--ing-orange);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s ease;
        margin-top: 8px;
      }

      button:hover {
        background: var(--ing-dark-orange);
      }

      button:active {
        transform: scale(0.98);
      }
    `;
  }

  static get properties() {
    return {
      errors: { type: Object },
      lang: { type: String },
    };
  }

  constructor() {
    super();
    this.errors = {};
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

  handleInput(e) {
    const { name, value } = e.target;
    const isValid = validateField(name, value);

    if (!isValid) {
      e.target.classList.add("error");
      this.errors = { ...this.errors, [name]: true };
    } else {
      e.target.classList.remove("error");
      this.errors = { ...this.errors, [name]: false };
    }
    this.requestUpdate();
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = this.shadowRoot.querySelector("form");
    const data = Object.fromEntries(new FormData(form).entries());

    const errors = validateForm(data, localization);
    this.errors = errors;
    this.requestUpdate();

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      employeeStore.addEmployee(data);
      form.reset();
      Router.go("/");
    }
  }

  render() {
    return html`
      <form @submit="${this.handleSubmit}">
        <label>
          ${localization.t("addEmployee.firstName")}
          <input
            name="firstName"
            id="firstName"
            required
            @input="${this.handleInput}"
            pattern="[A-Za-zğüşıöçĞÜŞİÖÇ]{2,50}"
            title="${localization.t("addEmployee.firstNameError")}"
          />
          <span class="error-message ${this.errors.firstName ? "show" : ""}">
            ${localization.t("addEmployee.firstNameError")}
          </span>
        </label>

        <label>
          ${localization.t("addEmployee.lastName")}
          <input
            name="lastName"
            id="lastName"
            required
            @input="${this.handleInput}"
            pattern="[A-Za-zğüşıöçĞÜŞİÖÇ]{2,50}"
            title="${localization.t("addEmployee.lastNameError")}"
          />
          <span class="error-message ${this.errors.lastName ? "show" : ""}">
            ${localization.t("addEmployee.lastNameError")}
          </span>
        </label>

        <label>
          ${localization.t("addEmployee.employmentDate")}
          <input
            type="date"
            name="employmentDate"
            id="employmentDate"
            @input="${this.handleInput}"
          />
          <span
            class="error-message ${this.errors.employmentDate ? "show" : ""}"
          >
            ${localization.t("addEmployee.employmentDateError")}
          </span>
        </label>

        <label>
          ${localization.t("addEmployee.birthDate")}
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            @input="${this.handleInput}"
          />
          <span class="error-message ${this.errors.birthDate ? "show" : ""}">
            ${localization.t("addEmployee.birthDateError")}
          </span>
        </label>

        <label>
          ${localization.t("addEmployee.phoneNumber")}
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            required
            @input="${this.handleInput}"
            title="${localization.t("addEmployee.phoneNumberError")}"
          />
          <span class="error-message ${this.errors.phoneNumber ? "show" : ""}">
            ${localization.t("addEmployee.phoneNumberError")}
          </span>
        </label>

        <label>
          ${localization.t("addEmployee.email")}
          <input
            type="email"
            name="email"
            id="email"
            required
            @input="${this.handleInput}"
            pattern="[^s@]+@[^s@]+.[^s@]+"
            title="${localization.t("addEmployee.emailError")}"
          />
          <span class="error-message ${this.errors.email ? "show" : ""}">
            ${localization.t("addEmployee.emailError")}
          </span>
        </label>

        <label>
          ${localization.t("addEmployee.department")}
          <select name="department" id="department" required>
            <option value="">
              ${localization.t("addEmployee.selectDepartment")}
            </option>
            ${departments.map(
              (dept) => html`<option value=${dept}>${dept}</option>`
            )}
          </select>
        </label>

        <button type="submit" id="submit-btn">
          ${localization.t("addEmployee.createEmployee")}
        </button>
      </form>
    `;
  }
}

window.customElements.define("add-employee", AddEmployeeElement);

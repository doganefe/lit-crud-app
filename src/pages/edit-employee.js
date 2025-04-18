import {LitElement, html, css} from 'lit';
import {employeeStore} from '../constants/store';
import {localization} from '../constants/localization';
import {validateForm} from '../utils/validation';
import {Router} from '@vaadin/router';

export class EditEmployeeElement extends LitElement {
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
        font-family: 'Arial', sans-serif;
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

      .button-group {
        display: flex;
        gap: 8px;
        margin-top: 8px;
      }

      button {
        height: 32px;
        padding: 0 12px;
        font-size: 13px;
        font-weight: 600;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .save-button {
        background: var(--ing-orange);
      }

      .save-button:hover {
        background: var(--ing-dark-orange);
      }

      .cancel-button {
        background: #6c757d;
      }

      .cancel-button:hover {
        background: #5a6268;
      }

      button:active {
        transform: scale(0.98);
      }
    `;
  }

  static get properties() {
    return {
      employee: {type: Object},
      errors: {type: Object},
      departments: {type: Array},
      lang: {type: String},
    };
  }

  constructor() {
    super();
    this.employee = {};
    this.errors = {};
    this.departments = ['Tech', 'HR', 'Finance', 'Marketing', 'Operations'];
    this.lang = localization.currentLang;
    this._handleLangChanged = this._handleLangChanged.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    const employeeId = new URLSearchParams(window.location.search).get('id');
    const employee = employeeStore.employees.find(
      (emp) => emp.id === employeeId
    );
    if (employee) {
      this.employee = {...employee};
    } else {
      Router.go('/');
    }
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

  handleInputChange(e) {
    const {name, value} = e.target;
    this.employee = {...this.employee, [name]: value};
    this.errors = {...this.errors, [name]: ''};
    this.requestUpdate();
  }

  handleSubmit(e) {
    e.preventDefault();
    const errors = validateForm(this.employee, localization);
    this.errors = errors;

    console.log('Errors:', errors); // Debugging line

    const isValid = Object.keys(errors).length === 0;

    if (isValid) {
      employeeStore.updateEmployee(this.employee);
      Router.go('/');
    }
  }

  handleCancel() {
    Router.go('/');
  }

  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <label>
          ${localization.t('editEmployee.firstName')}
          <input
            type="text"
            id="firstName"
            name="firstName"
            .value=${this.employee.firstName || ''}
            @input=${this.handleInputChange}
            required
          />
          <span class="error-message ${this.errors.firstName ? 'show' : ''}">
            ${this.errors.firstName}
          </span>
        </label>

        <label>
          ${localization.t('editEmployee.lastName')}
          <input
            type="text"
            id="lastName"
            name="lastName"
            .value=${this.employee.lastName || ''}
            @input=${this.handleInputChange}
            required
          />
          <span class="error-message ${this.errors.lastName ? 'show' : ''}">
            ${this.errors.lastName}
          </span>
        </label>

        <label>
          ${localization.t('editEmployee.email')}
          <input
            type="email"
            name="email"
            id="email"
            .value=${this.employee.email || ''}
            @input=${this.handleInputChange}
            required
          />
          <span class="error-message ${this.errors.email ? 'show' : ''}">
            ${this.errors.email}
          </span>
        </label>

        <label>
          ${localization.t('editEmployee.phoneNumber')}
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            .value=${this.employee.phoneNumber || ''}
            @input=${this.handleInputChange}
            required
          />
          <span class="error-message ${this.errors.phoneNumber ? 'show' : ''}">
            ${this.errors.phoneNumber}
          </span>
        </label>

        <label>
          ${localization.t('editEmployee.department')}
          <select
            id="department"
            name="department"
            .value=${this.employee.department || ''}
            @change=${this.handleInputChange}
            required
          >
            <option value="">
              ${localization.t('editEmployee.selectDepartment')}
            </option>
            ${this.departments.map(
              (dept) =>
                html`<option
                  value=${dept}
                  ?selected=${dept === this.employee.department}
                >
                  ${dept}
                </option>`
            )}
          </select>
          <span class="error-message ${this.errors.department ? 'show' : ''}">
            ${this.errors.department}
          </span>
        </label>

        <div class="button-group">
          <button type="submit" id="submit-btn" class="save-button">
            ${localization.t('editEmployee.save')}
          </button>
          <button
            type="button"
            class="cancel-button"
            @click=${this.handleCancel}
          >
            ${localization.t('editEmployee.cancel')}
          </button>
        </div>
      </form>
    `;
  }
}

window.customElements.define('edit-employee', EditEmployeeElement);

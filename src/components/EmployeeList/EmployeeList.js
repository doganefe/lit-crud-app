import {LitElement, html, css} from 'lit';
import {employeeStore} from '../../constants/store';
import {localization} from '../../constants/localization';
import {paginate, getTotalPages, getPageNumbers} from '../../utils/pagination';
import {Router} from '@vaadin/router';

export class EmployeeListElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        --ing-orange: #fe6c10;
        background-color: #ffffff;
        font-family: 'Roboto', sans-serif;
      }

      .list-container {
        display: flex;
        flex-direction: column;
        padding: 1rem;
      }

      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 0.5rem;
      }

      th {
        color: var(--ing-orange);
        font-size: 0.9rem;
      }

      td {
        text-align: center;
      }

      .bold-column {
        font-weight: bold;
      }

      .pagination {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
      }

      .page-button {
        border: none;
        cursor: pointer;
        margin: 0 0.5rem;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        text-align: center;
        background-color: white;
      }

      .page-button--selected {
        background-color: var(--ing-orange);
        color: white;
      }

      .action-buttons {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
      }

      .icon-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 4px;
        transition: all 0.2s ease;
        font-size: 1.2rem;
      }

      .edit-button {
        color: var(--ing-orange);
      }

      .edit-button:hover {
        background-color: rgba(254, 108, 16, 0.1);
      }

      .delete-button {
        color: #dc3545;
      }

      .delete-button:hover {
        background-color: rgba(220, 53, 69, 0.1);
      }

      /* List View Styles */
      .list-view {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 1.5rem;
      }

      .list-item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        border: none;
        border-radius: 8px;
        background: #fff9f0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
      }

      .list-item:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
        background: #ffffff;
      }

      .list-item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #eee;
      }

      .list-item-name {
        font-weight: 600;
        color: var(--ing-orange);
        font-size: 1.2rem;
        letter-spacing: 0.5px;
      }

      .list-item-details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 0.5rem;
      }

      .list-item-label {
        font-size: 0.85rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.25rem;
      }

      .list-item-value {
        font-weight: 500;
        color: #333;
        font-size: 1rem;
      }

      .action-buttons {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
      }

      .icon-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.2s ease;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .edit-button {
        color: var(--ing-orange);
      }

      .edit-button:hover {
        background-color: rgba(254, 108, 16, 0.1);
        transform: scale(1.1);
      }

      .delete-button {
        color: #dc3545;
      }

      .delete-button:hover {
        background-color: rgba(220, 53, 69, 0.1);
        transform: scale(1.1);
      }
    `;
  }

  static get properties() {
    return {
      currentPage: {type: Number},
      employees: {type: Array},
      lang: {type: String},
      displayMode: {type: String, reflect: true},
    };
  }

  constructor() {
    super();
    this.currentPage = 1;
    this.employees = employeeStore.employees;
    this.lang = localization.currentLang;
    this._handleEmployeesChanged = this._handleEmployeesChanged.bind(this);
    this._handleLangChanged = this._handleLangChanged.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    employeeStore.addListener(this._handleEmployeesChanged);
    localization.addListener(this._handleLangChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    employeeStore.removeListener(this._handleEmployeesChanged);
    localization.removeListener(this._handleLangChanged);
  }

  _handleEmployeesChanged(employees) {
    this.employees = employees;
    this.requestUpdate();
  }

  _handleLangChanged(lang) {
    this.lang = lang;
    this.requestUpdate();
  }

  _tableBody(row) {
    return html` <tr class="table-row">
      <td class="bold-column">${row.firstName}</td>
      <td class="bold-column">${row.lastName}</td>
      <td>${row.employmentDate}</td>
      <td>${row.birthDate}</td>
      <td>${row.phoneNumber}</td>
      <td>${row.email}</td>
      <td>${row.department}</td>
      <td>
        <div class="action-buttons">
          <button
            name="edit-btn"
            class="icon-button edit-button"
            @click=${() => this._handleEdit(row)}
            title="${localization.t('employeeList.edit')}"
          >
            ✏️
          </button>
          <button
            class="icon-button delete-button"
            @click=${() => this._handleDelete(row)}
            title="${localization.t('employeeList.delete')}"
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>`;
  }

  _listItem(employee) {
    return html`
      <div class="list-item">
        <div class="list-item-header">
          <div class="list-item-name">
            ${employee.firstName} ${employee.lastName}
          </div>
          <div class="action-buttons">
            <button
              class="icon-button edit-button"
              @click=${() => this._handleEdit(employee)}
              title="${localization.t('employeeList.edit')}"
            >
              ✏️
            </button>
            <button
              class="icon-button delete-button"
              @click=${() => this._handleDelete(employee)}
              title="${localization.t('employeeList.delete')}"
            >
              🗑️
            </button>
          </div>
        </div>
        <div class="list-item-details">
          <div>
            <div class="list-item-label">
              ${localization.t('employeeList.employmentDate')}
            </div>
            <div class="list-item-value">${employee.employmentDate}</div>
          </div>
          <div>
            <div class="list-item-label">
              ${localization.t('employeeList.birthDate')}
            </div>
            <div class="list-item-value">${employee.birthDate}</div>
          </div>
          <div>
            <div class="list-item-label">
              ${localization.t('employeeList.phone')}
            </div>
            <div class="list-item-value">${employee.phoneNumber}</div>
          </div>
          <div>
            <div class="list-item-label">
              ${localization.t('employeeList.email')}
            </div>
            <div class="list-item-value">${employee.email}</div>
          </div>
          <div>
            <div class="list-item-label">
              ${localization.t('employeeList.department')}
            </div>
            <div class="list-item-value">${employee.department}</div>
          </div>
        </div>
      </div>
    `;
  }

  _handleEdit(employee) {
    Router.go({
      pathname: '/edit-employee',
      search: '?id=' + employee.id,
    });
  }

  _handleDelete(employee) {
    if (confirm(localization.t('employeeList.deleteConfirm'))) {
      employeeStore.deleteEmployee(employee.id);
    }
  }

  _renderTableView(paginatedData) {
    return html`
      <table>
        <thead>
          <tr>
            <th>${localization.t('employeeList.firstName')}</th>
            <th>${localization.t('employeeList.lastName')}</th>
            <th>${localization.t('employeeList.employmentDate')}</th>
            <th>${localization.t('employeeList.birthDate')}</th>
            <th>${localization.t('employeeList.phone')}</th>
            <th>${localization.t('employeeList.email')}</th>
            <th>${localization.t('employeeList.department')}</th>
            <th>${localization.t('employeeList.actions')}</th>
          </tr>
        </thead>
        <tbody>
          ${paginatedData.map((row) => this._tableBody(row))}
        </tbody>
      </table>
    `;
  }

  _renderListView(paginatedData) {
    return html`
      <div class="list-view">
        ${paginatedData.map((employee) => this._listItem(employee))}
      </div>
    `;
  }

  _renderPagination(pageNumbers) {
    return html`
      <div class="pagination">
        ${pageNumbers.map(
          (page) => html`
            <button
              class="page-button ${page === this.currentPage
                ? 'page-button--selected'
                : ''}"
              @click=${() => {
                this.currentPage = page;
                this.requestUpdate();
              }}
              ?disabled=${page === this.currentPage}
            >
              ${page}
            </button>
          `
        )}
      </div>
    `;
  }

  render() {
    const rowsPerPage = 10;
    const totalPages = getTotalPages(this.employees, rowsPerPage);
    const paginatedData = paginate(
      this.employees,
      this.currentPage,
      rowsPerPage
    );
    const pageNumbers = getPageNumbers(totalPages);

    return html`
      <div class="list-container">
        ${this.displayMode === 'table'
          ? this._renderTableView(paginatedData)
          : this._renderListView(paginatedData)}
        ${this._renderPagination(pageNumbers)}
        <slot></slot>
      </div>
    `;
  }
}

window.customElements.define('employee-list', EmployeeListElement);

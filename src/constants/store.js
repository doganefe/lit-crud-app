import {createContext} from '@lit/context';

export const storeContext = createContext('store');

class EmployeeStore {
  constructor() {
    this._employees = this.loadEmployees();
    this._listeners = new Set();
  }

  loadEmployees() {
    const stored = localStorage.getItem('employees');
    return stored ? JSON.parse(stored) : [];
  }

  saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(this._employees));
  }

  get employees() {
    return this._employees;
  }

  addEmployee(employee) {
    const newEmployee = {
      ...employee,
      id: Date.now().toString(),
    };
    this._employees = [...this._employees, newEmployee];
    this.saveEmployees();
    this.notifyListeners();
  }

  updateEmployee(updatedEmployee) {
    const index = this._employees.findIndex(
      (emp) => emp.id === updatedEmployee.id
    );
    if (index !== -1) {
      this._employees = [
        ...this._employees.slice(0, index),
        updatedEmployee,
        ...this._employees.slice(index + 1),
      ];
      this.saveEmployees();
      this.notifyListeners();
    }
  }

  deleteEmployee(employeeId) {
    const index = this._employees.findIndex((emp) => emp.id === employeeId);
    if (index !== -1) {
      this._employees = [
        ...this._employees.slice(0, index),
        ...this._employees.slice(index + 1),
      ];
      this.saveEmployees();
      this.notifyListeners();
    }
  }

  addListener(listener) {
    this._listeners.add(listener);
  }

  removeListener(listener) {
    this._listeners.delete(listener);
  }

  notifyListeners() {
    this._listeners.forEach((listener) => listener(this._employees));
  }
}
// Create a singleton instance
export const employeeStore = new EmployeeStore();

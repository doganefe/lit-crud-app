const translations = {
  en: {
    navbar: {
      home: 'Home',
      addEmployee: 'Add Employee',
      about: 'About',
    },
    employeeList: {
      title: 'Employee List',
      firstName: 'First Name',
      lastName: 'Last Name',
      employmentDate: 'Employment Date',
      birthDate: 'Birth Date',
      phone: 'Phone',
      email: 'Email',
      department: 'Department',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      deleteConfirm: 'Are you sure you want to delete this employee?',
    },
    addEmployee: {
      title: 'Add New Employee',
      firstName: 'First Name',
      lastName: 'Last Name',
      employmentDate: 'Employment Date',
      birthDate: 'Birth Date',
      phoneNumber: 'Phone Number',
      email: 'Email',
      department: 'Department',
      selectDepartment: 'Select Department',
      createEmployee: 'Create Employee',
      firstNameError:
        'First name must be between 2-50 characters and contain only letters',
      lastNameError:
        'Last name must be between 2-50 characters and contain only letters',
      employmentDateError: 'Employment date cannot be in the future',
      birthDateError: 'Employee must be between 18-100 years old',
      phoneNumberError: 'Phone number must be 10-15 digits',
      emailError: 'Please enter a valid email address',
      errors: {
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email address',
        invalidPhone: 'Please enter a valid phone number',
      },
    },
    editEmployee: {
      title: 'Edit Employee',
      firstName: 'First Name',
      lastName: 'Last Name',
      employmentDate: 'Employment Date',
      birthDate: 'Birth Date',
      phoneNumber: 'Phone Number',
      email: 'Email',
      department: 'Department',
      selectDepartment: 'Select Department',
      save: 'Save Changes',
      cancel: 'Cancel',
      errors: {
        required: 'This field is required',
        invalidEmail: 'Please enter a valid email address',
        invalidPhone: 'Please enter a valid phone number',
      },
    },
  },
  tr: {
    navbar: {
      home: 'Ana Sayfa',
      addEmployee: 'Çalışan Ekle',
      about: 'Hakkında',
    },
    employeeList: {
      title: 'Çalışan Listesi',
      firstName: 'Ad',
      lastName: 'Soyad',
      employmentDate: 'İşe Başlama Tarihi',
      birthDate: 'Doğum Tarihi',
      phone: 'Telefon',
      email: 'E-posta',
      department: 'Departman',
      actions: 'İşlemler',
      edit: 'Düzenle',
      delete: 'Sil',
      deleteConfirm: 'Bu çalışanı silmek istediğinizden emin misiniz?',
    },
    addEmployee: {
      title: 'Yeni Çalışan Ekle',
      firstName: 'Ad',
      lastName: 'Soyad',
      employmentDate: 'İşe Başlama Tarihi',
      birthDate: 'Doğum Tarihi',
      phoneNumber: 'Telefon Numarası',
      email: 'E-posta',
      department: 'Departman',
      selectDepartment: 'Departman Seçin',
      createEmployee: 'Çalışan Oluştur',
      firstNameError:
        'Ad 2-50 karakter arası olmalı ve sadece harf içermelidir',
      lastNameError:
        'Soyad 2-50 karakter arası olmalı ve sadece harf içermelidir',
      employmentDateError: 'İşe başlama tarihi gelecekte olamaz',
      birthDateError: 'Çalışan 18-100 yaş arasında olmalıdır',
      phoneNumberError: 'Telefon numarası 10-15 rakam olmalıdır',
      emailError: 'Lütfen geçerli bir e-posta adresi girin',
      errors: {
        required: 'Bu alan zorunludur',
        invalidEmail: 'Lütfen geçerli bir e-posta adresi girin',
        invalidPhone: 'Lütfen geçerli bir telefon numarası girin',
      },
    },
    editEmployee: {
      title: 'Çalışanı Düzenle',
      firstName: 'Ad',
      lastName: 'Soyad',
      employmentDate: 'İşe Başlama Tarihi',
      birthDate: 'Doğum Tarihi',
      phoneNumber: 'Telefon Numarası',
      email: 'E-posta',
      department: 'Departman',
      selectDepartment: 'Departman Seçin',
      save: 'Değişiklikleri Kaydet',
      cancel: 'İptal',
      errors: {
        required: 'Bu alan zorunludur',
        invalidEmail: 'Lütfen geçerli bir e-posta adresi girin',
        invalidPhone: 'Lütfen geçerli bir telefon numarası girin',
      },
    },
  },
};

class Localization {
  constructor() {
    this.lang = document.documentElement.lang || 'en';
    this._listeners = new Set();
  }

  get currentLang() {
    return this.lang;
  }

  set currentLang(lang) {
    if (translations[lang]) {
      this.lang = lang;
      document.documentElement.lang = lang;
      this.notifyListeners();
    }
  }

  t(key) {
    const keys = key.split('.');
    let value = translations[this.lang];

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return key;
    }

    return value;
  }

  addListener(listener) {
    this._listeners.add(listener);
  }

  removeListener(listener) {
    this._listeners.delete(listener);
  }

  notifyListeners() {
    this._listeners.forEach((listener) => listener(this.lang));
  }
}

export const localization = new Localization();

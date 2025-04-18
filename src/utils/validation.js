export const validations = {
  firstName: {
    pattern: /^[A-Za-zğüşıöçĞÜŞİÖÇ]{2,50}$/,
    message: 'firstNameError',
  },
  lastName: {
    pattern: /^[A-Za-zğüşıöçĞÜŞİÖÇ]{2,50}$/,
    message: 'lastNameError',
  },
  employmentDate: {
    validate: (value) => {
      const date = new Date(value);
      const today = new Date();
      return date <= today;
    },
    message: 'employmentDateError',
  },
  birthDate: {
    validate: (value) => {
      const date = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 18 && age <= 100;
    },
    message: 'birthDateError',
  },
  phoneNumber: {
    validate: (value) => {
      const phoneRegex = /^\+?[0-9]{10,15}$/; // Adjust regex as needed
      return phoneRegex.test(value);
    },
    message: 'phoneNumberError',
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'emailError',
  },
};

export const validateField = (name, value) => {
  const validation = validations[name];
  if (!validation) return true;

  if (validation.pattern) {
    return validation.pattern.test(value);
  } else if (validation.validate) {
    return validation.validate(value);
  }

  return true;
};

export const validateForm = (formData, localization) => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'department',
  ];

  requiredFields.forEach((field) => {
    if (!formData[field]) {
      errors[field] = localization.t('addEmployee.errors.required');
    }
  });

  if (formData.email && !validateField('email', formData.email)) {
    errors.email = localization.t('addEmployee.errors.invalidEmail');
  }

  if (
    formData.phoneNumber &&
    !validateField('phoneNumber', formData.phoneNumber)
  ) {
    errors.phoneNumber = localization.t('addEmployee.errors.invalidPhone');
  }

  return errors;
};

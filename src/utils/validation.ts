// utils/validation.ts

// Валидация email
export const validateEmail = (
  email: string,
): { isValid: boolean; errorKey?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { isValid: false, errorKey: "validation.emailRequired" };
  }

  if (!emailRegex.test(email)) {
    return { isValid: false, errorKey: "validation.emailInvalid" };
  }

  return { isValid: true };
};

// Валидация пароля
export const validatePassword = (
  password: string,
): { isValid: boolean; errorKey?: string } => {
  if (!password) {
    return { isValid: false, errorKey: "validation.passwordRequired" };
  }

  if (password.length < 6) {
    return { isValid: false, errorKey: "validation.passwordTooShort" };
  }

  if (password.length > 128) {
    return { isValid: false, errorKey: "validation.passwordTooLong" };
  }

  // Проверяем, содержит ли пароль хотя бы одну цифру и одну букву
  const hasNumber = /[0-9]/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  if (!hasNumber || !hasLetter) {
    return { isValid: false, errorKey: "validation.passwordRequirements" };
  }

  return { isValid: true };
};

// Валидация подтверждения пароля
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): { isValid: boolean; errorKey?: string } => {
  if (!confirmPassword) {
    return { isValid: false, errorKey: "validation.confirmPasswordRequired" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, errorKey: "validation.passwordsNotMatch" };
  }

  return { isValid: true };
};

// Комбинированная валидация для регистрации
export const validateRegistration = (
  email: string,
  password: string,
  confirmPassword: string,
): {
  email: { isValid: boolean; errorKey?: string };
  password: { isValid: boolean; errorKey?: string };
  confirmPassword: { isValid: boolean; errorKey?: string };
  isFormValid: boolean;
} => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation = validateConfirmPassword(
    password,
    confirmPassword,
  );

  const isFormValid =
    emailValidation.isValid &&
    passwordValidation.isValid &&
    confirmPasswordValidation.isValid;

  return {
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
    isFormValid,
  };
};

// Комбинированная валидация для входа
export const validateLogin = (
  email: string,
  password: string,
): {
  email: { isValid: boolean; errorKey?: string };
  password: { isValid: boolean; errorKey?: string };
  isFormValid: boolean;
} => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  const isFormValid = emailValidation.isValid && passwordValidation.isValid;

  return {
    email: emailValidation,
    password: passwordValidation,
    isFormValid,
  };
};

// Комбинированная валидация для смены пароля
export const validatePasswordChange = (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
): {
  currentPassword: { isValid: boolean; errorKey?: string };
  newPassword: { isValid: boolean; errorKey?: string };
  confirmNewPassword: { isValid: boolean; errorKey?: string };
  isFormValid: boolean;
} => {
  const currentPasswordValidation = {
    isValid: !!currentPassword,
    errorKey: currentPassword
      ? undefined
      : "validation.currentPasswordRequired",
  };
  const newPasswordValidation = validatePassword(newPassword);
  const confirmNewPasswordValidation = validateConfirmPassword(
    newPassword,
    confirmNewPassword,
  );

  const isFormValid =
    currentPasswordValidation.isValid &&
    newPasswordValidation.isValid &&
    confirmNewPasswordValidation.isValid;

  return {
    currentPassword: currentPasswordValidation,
    newPassword: newPasswordValidation,
    confirmNewPassword: confirmNewPasswordValidation,
    isFormValid,
  };
};

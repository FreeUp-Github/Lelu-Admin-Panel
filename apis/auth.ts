import { authGet, post } from "../core/request";

export function singUp(email: string, name: string, password: string) {
  return post("accounts/register", {
    email,
    password,
    name,
  });
}

export function singIn(email: string, password: string) {
  const formData = new FormData();
  formData.set("email", email);
  formData.set("password", password);
  return post("accounts/login", formData);
}

export function resetPasswordSendEmail(email: string) {
  const formData = new FormData();
  formData.set("email", email);
  return post("accounts/password_reset/", formData);
}

export function resetPassword(token: string, password: string) {
  const formData = new FormData();
  formData.set("token", token);
  formData.set("password", password);
  return post("accounts/password_reset/confirm/", formData);
}

export function getUser() {
  return authGet("accounts/users/");
}

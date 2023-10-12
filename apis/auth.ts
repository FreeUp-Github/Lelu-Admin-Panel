import {authGet, post} from '../core/request'

export function singUp(email: string, password: string) {
  return post('accounts/register', {
    email, password
  })
}

export function singIn(email: string, password: string) {
  const formData = new FormData();
  formData.set('email', email)
  formData.set('password', password)
  return post('accounts/login', formData)
}

export function getUser() {
  return authGet('accounts/users/')
}
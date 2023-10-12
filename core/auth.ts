import { LOCAL_STORAGE } from "../utils/constants";
import { authRequest } from "./request";

export function setToken(token: string, refresh: string, rememberMe: boolean = false) {
  let storage = sessionStorage;
  if (rememberMe) {
    storage = localStorage;
  }
  storage.setItem(LOCAL_STORAGE.token, token)
  storage.setItem(LOCAL_STORAGE.refresh, refresh)
  storage.setItem(LOCAL_STORAGE.lastUpdate, Date.now().toString())
}

export function getToken() {
  const storage = (sessionStorage.getItem(LOCAL_STORAGE.lastUpdate) || 0) < (localStorage.getItem(LOCAL_STORAGE.lastUpdate) || 1) ? localStorage : sessionStorage;
  return storage.getItem(LOCAL_STORAGE.token)
}
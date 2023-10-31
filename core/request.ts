import { KEY_NAMES } from "./../constants/user";
import axios from "axios";
import { signal } from "@preact/signals-react";
import { getToken } from "./auth";

const request = axios.create({
  baseURL: "https://94.101.190.125:8443/",
  timeout: 60 * 1000,
});

const authRequest = axios.create({
  baseURL: "https://94.101.190.125:8443/",
  timeout: 60 * 1000,
});

const userRequest = axios.create({
  baseURL: "https://94.101.190.125:8443/",
  timeout: 60 * 1000,
});

const authUserRequest = axios.create({
  baseURL: "https://94.101.190.125:8443/",
  timeout: 60 * 1000,
});

authRequest.interceptors.request.use((value) => {
  value.headers.Authorization = `Bearer ${getToken()}`;
  return value;
});

userRequest.interceptors.request.use((value) => {
  value.headers.Authorization = `Token ${localStorage.getItem(
    KEY_NAMES.authToken
  )}`;
  return value;
});

authUserRequest.interceptors.request.use((value) => {
  value.headers.Authorization = `Token ${localStorage.getItem(
    KEY_NAMES.authToken
  )}`;
  return value;
});

const snackBarError = signal({ message: null });

const get = function (...args: Parameters<typeof request.get>) {
  return request.get
    .apply(this, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      snackBarError.value = {
        message: err?.message,
      };
    });
};
const authGet = function (...args: Parameters<typeof request.get>) {
  return authRequest.get
    .apply(this, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      snackBarError.value = {
        message: err?.message,
      };
    });
};

const userGet = function (...args: Parameters<typeof request.get>) {
  return userRequest.get
    .apply(this, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      snackBarError.value = {
        message: err?.message,
      };
    });
};

const authUserGet = function (...args: Parameters<typeof request.get>) {
  return userRequest.get
    .apply(this, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      snackBarError.value = {
        message: err?.message,
      };
    });
};

const post = function (...args: Parameters<typeof request.post>) {
  return request.post
    .apply(this, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      snackBarError.value = {
        message: err?.message,
      };
    });
};

const authPost = function (...args: Parameters<typeof request.post>) {
  return authRequest.post
    .apply(this, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      snackBarError.value = {
        message: err?.message,
      };
    });
};

const authPatch = function (...args: Parameters<typeof request.patch>) {
  return authRequest.patch
    .apply(this, args)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      snackBarError.value = {
        message: err?.message,
      };
    });
};

export {
  post,
  snackBarError,
  authRequest,
  authGet,
  authPost,
  authPatch,
  get,
  userGet,
  authUserGet,
};

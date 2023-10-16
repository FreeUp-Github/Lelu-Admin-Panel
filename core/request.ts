import axios from "axios";
import { signal } from "@preact/signals-react";
import { getToken } from "./auth";

const request = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar'}
});

const authRequest = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  timeout: 5000,
  // headers: {'X-Custom-Header': 'foobar', },
});

authRequest.interceptors.request.use((value) => {
  value.headers.Authorization =  `Bearer ${getToken()}`
  return value
})


const snackBarError = signal({message: null});

const authGet = function(...args: Parameters<typeof request.get>) {
  return authRequest.get.apply(this, args).then((res) => {
    return res.data;
  }).catch((err) => {
    snackBarError.value = {
      message: err?.message,
    }
  })
}

const post = function(...args: Parameters<typeof request.post>) {
  return request.post.apply(this, args).then((res) => {
    return res.data;
  }).catch((err) => {
    snackBarError.value = {
      message: err?.message,
    }
  })
};

const authPost = function(...args: Parameters<typeof request.post>) {
  return authRequest.post.apply(this, args).then((res) => {
    return res.data;
  }).catch((err) => {
    snackBarError.value = {
      message: err?.message,
    }
  })
}


const authPatch = function(...args: Parameters<typeof request.patch>) {
  return authRequest.patch.apply(this, args).then((res) => {
    return res.data;
  }).catch((err) => {
    snackBarError.value = {
      message: err?.message,
    }
  })
}

export {
  post,
  snackBarError,
  authRequest,
  authGet,
  authPost,
  authPatch,
}


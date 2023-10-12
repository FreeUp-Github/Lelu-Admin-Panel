import { authGet, authPost } from "../core/request";

export function createRoom(name: string, url: string) {
  const formData = new FormData();
  formData.set('name', name)
  formData.set('url', url)
  return authPost('engine/rooms/', formData)
}

export function getRooms() {
  return authGet('engine/rooms/')
}

export function getRoom(id: string, ) {
  return authGet(`/engine/rooms/${id}/`)
}

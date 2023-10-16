import { authGet, authPatch, authPost } from "../core/request";

export function createRoom(name: string, url: string) {
  const formData = new FormData();
  formData.set('name', name)
  formData.set('url', url)
  return authPost('engine/rooms/', formData)
}

export function getRooms() {
  return authGet('engine/rooms/')
}

export function getRoom(id ) {
  return authGet(`/engine/rooms/${id}/`)
}

export function modifyMember(roomId: string, email: string, is_admin: boolean) {
  return authPatch(`/engine/rooms/${roomId}/members`, {
    members: [
      {
        email, is_admin
      }
    ]
  })
}


export function deleteMember(roomId: string, email: string) {
  return authPost(`/engine/rooms/${roomId}/members`, {
    members: [
      {
        email
      }
    ]
  })
}

export function getRoomChats(roomId: string) {
  return authGet(`/engine/rooms/${roomId}/chats/`)
}
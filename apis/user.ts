import { get, post, userGet } from "../core/request";


export function startNewChat(roomId: string) {
  return post(`engine/rooms/${roomId}/chats/`)
}

export function getPreviousChats (chatId: string) {
  return userGet(`engine/chats/${chatId}/messages/`)
}
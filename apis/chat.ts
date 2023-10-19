import { authGet } from "../core/request";

export function getChatMessages(roomId: string, chatId: string) {
  // return authGet(`/engine/rooms/${roomId}/chats/${chatId}/messages/`)
  return authGet(`/engine/chats/${chatId}/messages/`)
}
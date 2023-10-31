import { KEY_NAMES } from "./../constants/user";
import { getToken } from "../core/auth";

function initWebSocket(
  roomId: string
): Promise<InstanceType<typeof WebSocket>> {
  const socket = new WebSocket(
    `wss://94.101.190.125:8443/ws/rooms/${roomId}/chats/`
  );
  return new Promise((resolve, reject) => {
    socket.addEventListener("open", (event) => {
      resolve(socket);
    });
    socket.addEventListener("error", (event) => {
      reject(event);
    });
  });
  // Create WebSocket connection.

  // Connection opened
  // Listen for messages
}

function chatAuthenticate(roomId: string, bearer: boolean) {
  return initWebSocket(roomId).then((ws) => {
    if (bearer) {
      ws.send(
        JSON.stringify({
          type: "authorization",
          token: `Bearer ${getToken()}`,
        })
      );
    } else {
      ws.send(
        JSON.stringify({
          type: "authorization",
          token: `Token ${localStorage.getItem(KEY_NAMES.authToken)}`,
        })
      );
    }
    return ws;
  });
}

export function chatStart(
  roomId: string,
  uuid: string,
  onMessage: (messageData: any) => void,
  bearer = true
) {
  return chatAuthenticate(roomId, bearer).then((ws) => {
    ws.send(
      JSON.stringify({
        type: "chat_join",
        uuid,
      })
    );

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.timestamp) onMessage(data);
    });

    return {
      sendText(text: string) {
        return ws.send(
          JSON.stringify({
            type: "chat_message",
            message: text,
          })
        );
      },
      stop() {
        return ws.close();
      },
    };
  });
}

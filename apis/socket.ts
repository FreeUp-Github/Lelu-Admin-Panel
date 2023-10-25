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

function chatAuthenticate(roomId: string) {
  return initWebSocket(roomId).then((ws) => {
    ws.send(
      JSON.stringify({
        type: "authorization",
        token: `Bearer ${getToken()}`,
      })
    );

    return ws;
  });
}

export function chatStart(
  roomId: string,
  uuid: string,
  onMessage: (messageData: any) => void
) {
  return chatAuthenticate(roomId).then((ws) => {
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

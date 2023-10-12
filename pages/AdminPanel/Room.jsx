import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoom } from "../../apis/room";

export function Room() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    getRoom(roomId).then((res) => {
      setRoom(res);
    });
  }, []);
  return <div>room id: {room?.uuid}</div>;
}

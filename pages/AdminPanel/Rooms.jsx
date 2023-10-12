import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRooms } from "../../apis/room";
import { CreateRoomModal } from "../../components/AdminPanel/Rooms/Create";

export default function Rooms() {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [rooms, setRooms] = useState([]);

  function refreshRooms() {
    getRooms().then((res) => {
      setRooms(res);
    });
  }

  useEffect(() => {
    refreshRooms();
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <Button variant="outlined" onClick={() => setShowCreateRoom(true)}>
        Create Room
      </Button>

      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            {rooms.map((room) => (
              <ListItem disablePadding key={room.uuid}>
                <ListItemButton onClick={() => navigate(room.uuid)}>
                  <ListItemText primary={room.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>

      <CreateRoomModal
        open={showCreateRoom}
        handleClose={() => {
          setShowCreateRoom(false);
          refreshRooms();
        }}
      ></CreateRoomModal>
    </div>
  );
}

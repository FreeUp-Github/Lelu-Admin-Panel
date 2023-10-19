import {
  Badge,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRoom, getRoomChats } from "../../apis/room";
import { CreateMember } from "../../components/AdminPanel/Rooms/CreateMember";
import { DeleteOutline } from "@mui/icons-material";
import { DeleteMember } from "../../components/AdminPanel/Rooms/DeleteMember";

export function Room() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);

  const [openMemberModal, setOpenMemberModal] = useState(false);
  function handleCloseMemberModal() {
    refetch();
    setOpenMemberModal(false);
  }
  function onClickNewMember() {
    setOpenMemberModal(true);
  }

  const [deleteModalState, setDeleteModalState] = useState({
    show: false,
    email: "",
  });
  function onDeleteMember(email: string) {
    setDeleteModalState({
      show: true,
      email,
    });
  }
  function handleCloseDeleteMemberModal() {
    refetch();
    setDeleteModalState({
      show: false,
      email: "",
    });
  }

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getRoom", roomId],
    () => getRoom(roomId)
  );

  const queryChats = useQuery(["getRoomChats", roomId], () =>
    getRoomChats(roomId!)
  );

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <Typography component="h1" variant="h5" fontWeight={700}>
        {data.name} Room
      </Typography>
      <Typography component="h1" variant="h6">
        Members:
        <Button variant="text" size="small" onClick={onClickNewMember}>
          Add new Member
        </Button>
      </Typography>
      <div className="w-max space-y-2">
        {data.members.map((member) => {
          return (
            <div key={member.email} className="flex items-center">
              {member.is_admin ? (
                <div className="flex items-center space-x-2">
                  <Typography component="p" variant="body1">
                    {member.email}
                  </Typography>
                  <Chip
                    label="admin"
                    color="primary"
                    size="small"
                    className="ml-2"
                  />
                </div>
              ) : (
                <Typography component="p" variant="body1">
                  {member.email}
                </Typography>
              )}
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => onDeleteMember(member.email)}
              >
                <DeleteOutline />
              </IconButton>
            </div>
          );
        })}
      </div>
      <Typography component="h1" variant="h5" fontWeight={700}>
        Chats:
      </Typography>
      <div className="flex flex-col space-y-2 cursor-pointer select-none">
        {queryChats.isLoading ? (
          <div>
            Chats Loading
            <LinearProgress />
          </div>
        ) : (
          queryChats.data.map((chat) => {
            return (
              <div key={chat.chat_uuid}>
                <Link to={`detail/${chat.chat_uuid}`}>
                  <Typography component="p" variant="body1">
                    {chat.chat_owner.name}
                    {"  "}
                    {new Date(Date.parse(chat.start_time)).toLocaleString()}
                  </Typography>
                </Link>
              </div>
            );
          })
        )}
      </div>
      <CreateMember
        roomId={roomId}
        open={openMemberModal}
        handleClose={handleCloseMemberModal}
      ></CreateMember>
      <DeleteMember
        email={deleteModalState.email}
        open={deleteModalState.show}
        roomId={roomId}
        handleClose={() => handleCloseDeleteMemberModal()}
      />
    </div>
  );
}

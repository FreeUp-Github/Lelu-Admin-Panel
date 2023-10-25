import {
  Button,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getChatMessages } from "../../apis/chat";
import { Message } from "../../components/AdminPanel/Rooms/Message";
import { chatStart } from "../../apis/socket";
import React from "react";
import { Send } from "@mui/icons-material";
import { useEffect } from "react";

export function RoomDetail() {
  const { roomId, chatId } = useParams();

  const { isLoading, isError, data, error, refetch } = useQuery(
    ["getChatMessages", roomId, chatId],
    () => getChatMessages(roomId!, chatId!)
  );

  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([] as any[]);

  function onMessage(data) {
    setNewMessage(data);
  }

  useEffect(() => {
    if (newMessage) setMessages([...messages, newMessage]);
  }, [newMessage]);

  const { data: chatContext } = useQuery(["chatStart", roomId, chatId], () =>
    chatStart(roomId!, chatId!, onMessage)
  );

  useEffect(() => {
    return onUnmount;
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  function onUnmount() {
    chatContext?.stop();
  }

  return (
    <div>
      <Typography component="h1" variant="h5" fontWeight={700}>
        Start Date: {new Date(Date.parse(data.start_time)).toLocaleString()}
      </Typography>
      <Typography component="h1" variant="h5" fontWeight={700}>
        Messages:
      </Typography>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col">
        <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4">
            <div className="relative">
              {/* <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span> */}
              {/* <img
                src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 p-3 ">
          {data?.messages?.map((msg) => {
            return <Message key={msg.timestamp} msg={msg} />;
          })}
          {messages?.map((msg) => {
            return <Message key={msg.timestamp} msg={msg} />;
          })}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex"></div>
        </div>
        <div className="sticky bottom-0 p-3 bg-white">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              event.currentTarget.reset();

              chatContext?.sendText(form.get("message") as string);
              window.scrollTo({
                behavior: "smooth",
                top: document.documentElement.offsetHeight,
              });
            }}
          >
            <OutlinedInput
              required
              name="message"
              fullWidth
              placeholder="write your message"
              autoComplete="email"
              autoFocus
              aria-autocomplete="none"
              endAdornment={
                <Button type="submit">
                  <Send />
                </Button>
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
}

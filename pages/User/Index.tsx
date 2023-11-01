import {
  Button,
  IconButton,
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
import { getPreviousChats, startNewChat } from "../../apis/user";
import { KEY_NAMES } from "../../constants/user";
import MessageIcon from "@mui/icons-material/Message";

export function UserIndex() {
  const { roomId } = useParams();
  const { localStorage } = window;
  const [chatId, setChatId] = useState(localStorage.getItem(KEY_NAMES.chatId));
  const [authToken, setAuthToken] = useState(
    localStorage.getItem(KEY_NAMES.authToken)
  );

  const {
    isLoading: previousChatsLoading,
    data: previousChats,
    refetch: refetchChat,
  } = useQuery({
    queryKey: ["getPreviousChats", chatId, authToken],
    queryFn: () => getPreviousChats(chatId!),
    enabled: false,
    initialData: [],
  });

  useEffect(() => {
    if (!authToken || !chatId) {
      startNewChat(roomId!).then((res) => {
        setChatId(res.chat_uuid);
        setAuthToken(res.chat_owner.auth_token);
        localStorage.setItem(KEY_NAMES.chatId, res.chat_uuid);
        localStorage.setItem(KEY_NAMES.authToken, res.chat_owner.auth_token);
        refetchChat();
      });
    } else {
      refetchChat();
    }
  }, []);

  const [newMessage, setNewMessage] = useState(null);
  const [messages, setMessages] = useState([] as any[]);

  // useEffect(() => {
  //   setMessages([...(previousChats?.messages || []), ...messages]);
  // }, previousChats);

  function onMessage(data) {
    setNewMessage(data);
  }

  function scrollToBottom(shouldScroll = false) {
    const { documentElement: html } = document;
    const maximumScroll = html.offsetHeight - html.clientHeight;
    const currentScroll = html.scrollTop;
    const offset = maximumScroll - currentScroll;
    if (offset < 50 || shouldScroll) {
      window.scrollTo({
        behavior: "smooth",
        top: document.documentElement.offsetHeight,
      });
    }
  }

  useEffect(() => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
      scrollToBottom((newMessage as any).sender.type === "website_client");
    }
  }, [newMessage]);

  const { data: chatContext } = useQuery(["chatStart", roomId, chatId], () =>
    chatStart(roomId!, chatId!, onMessage, false)
  );

  function onUnmount() {
    chatContext?.stop();
  }

  useEffect(() => {
    return onUnmount;
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <div className="absolute bottom-0 right-0">
        <IconButton
          aria-label="delete"
          size="large"
          color="primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageIcon fontSize="inherit" />
        </IconButton>
      </div>
    );
  }

  if (previousChatsLoading) {
    return <LinearProgress />;
  }

  return (
    <div className="w-full min-h-[600px] flex flex-col">
      {/* <Typography component="h1" variant="h5" fontWeight={700}>
        Start Date: {new Date(Date.parse(data.start_time)).toLocaleString()}
      </Typography> */}
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
          {previousChats?.messages?.map((msg) => {
            return <Message key={msg.timestamp} msg={msg} reverse={true} />;
          })}
          {messages?.map((msg) => {
            return <Message key={msg.timestamp} msg={msg} reverse={true} />;
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

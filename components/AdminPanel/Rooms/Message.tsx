import React, { useEffect, useState } from "react";

export function Message({ msg, reverse }) {
  const [isLeluUser, setIsLeluUser] = useState(false);
  useEffect(() => {
    setIsLeluUser(
      reverse
        ? msg.sender.type !== "leluchat_user"
        : msg.sender.type === "leluchat_user"
    );
  }, [msg]);
  return (
    <div className="chat-message">
      <div
        className={
          "flex items-end " +
          (isLeluUser ? "justify-start flex-row-reverse" : "justify-start")
        }
      >
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start ">
          <div>
            <span
              className={
                "px-4 py-2 rounded-lg inline-block  text-gray-600 " +
                (isLeluUser
                  ? "rounded-br-none bg-blue-200"
                  : "rounded-bl-none bg-gray-300")
              }
            >
              {msg.text}
            </span>
          </div>
        </div>
        {/* <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt="My profile"
          className="w-6 h-6 rounded-full order-1"
        /> */}
      </div>
    </div>
  );
}

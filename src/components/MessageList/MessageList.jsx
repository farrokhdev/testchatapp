import { useState } from "react";
import { useChatContext } from "context";
import { ChatAvatar } from "components";
import { groupMessages } from "helpers";
import { useScrollToBottom } from "hooks";

export const MessageList = () => {
  const { selectedChat, chatConfig } = useChatContext();
  useScrollToBottom(selectedChat, "chat-messages");

  return (
    <div className="chat-messages">
      {!!selectedChat.messages.length ? (
        <div className="no-messages-yet">
          {groupMessages(selectedChat.messages).map((m, index) => {
            return (
              <div key={index} className="chat-message">
                <div className="chat-message-header">
                  <ChatAvatar
                    className="message-avatar"
                    username={m[0].sender.username}
                    chat={selectedChat}
                  />
                  <div className="message-autor">{m[0].sender.username}</div>
                </div>
                <div className="message-content">
                  {m.map((inMessage, index) => (
                    <div key={index}>
                      <div className="message-text">{inMessage.text}</div>
                      {!!inMessage.attachments.length && (
                        <img
                          className="message-image"
                          src={inMessage.attachments[0].file}
                          alt={inMessage.id + "_attachment"}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-messages-yet">No messages yet</div>
      )}
    </div>
  );
};

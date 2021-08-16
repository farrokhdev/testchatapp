import { useChatContext } from "context";
import { useEffect, useState } from "react";
import { getChats, ChatEngine } from "react-chat-engine";
import { LeftSide, ChatToolbar, ChatInput, MessageList } from "components";

export const Chat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setSelectedChat,
    selectChatClick,
  } = useChatContext();

  useEffect(() => {
    console.log(myChats);
    // console.log(selectedChat.messages);
  }, [myChats]);

  return (
    <>
      <LeftSide />
      {!!chatConfig && (
        <ChatEngine
          hideUI={true}
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={(chat) => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={(chat) => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              myChats
                .filter((ch) => ch.id !== chat.id)
                .sort((a, b) => a.id - b.id)
            );
          }}
          onNewMessage={(chatId, message) => {
            if (selectedChat && chatId === selectedChat.id) {
              setSelectedChat({
                ...selectedChat,
                messages: [...selectedChat.messages, message],
              });
            }
            const chatBelongsTo = myChats.find((c) => c.id === chatId);
            const filteredChats = myChats.filter((c) => c.id !== chatId);
            const updatedChat = {
              ...chatBelongsTo,
              last_message: message,
            };
            setMyChats(
              [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id)
            );
          }}
        />
      )}
      <div className="chat-container">
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
              <ChatToolbar />
              <MessageList />
              <ChatInput />
            </div>
          ) : (
            <div className="no-chat-selected">
              <img
                className="point-left"
                src="img/pointleft.png"
                alt="point-left"
              />
              select a chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};

import { fb } from "service";
import React, { useContext, useState, useEffect } from "react";
import { newChat, deleteChat, leaveChat, getMessages } from "react-chat-engine";

export const AppContext = React.createContext();

export const AppProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [selectedChat, setSelectedChat] = useState();

  const createChatClick = () => {
    newChat(chatConfig, { title: "" });
  };
  const deleteChatClick = (chat) => {
    const isAdmin = chat.admin.username === chatConfig.userName;
    if (
      isAdmin &&
      window.confirm("Are you shure that you want to delete this chat?")
    ) {
      deleteChat(chatConfig, chat.id);
    } else if (
      window.confirm("Are you sure that you want to leave this chat?")
    ) {
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };

  const selectChatClick = (chat) => {
    getMessages(chatConfig, chat.id, (chatId, messages) => {
      setSelectedChat({ ...chat, messages });
    });
  };

  useEffect(() => {
    if (authUser) {
      fb.fireStore
        .collection("testUser")
        .doc(authUser.uid)
        .onSnapshot((snap) => {
          setChatConfig({
            userSecret: authUser.uid,
            avatar: snap.data().avatar,
            userName: snap.data().userName,
            projectID: "1c83f209-9d87-4b1f-a8ce-9725d9ceff4d",
          });
        });
    }
  }, [authUser]);

  return (
    <AppContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfig,
        setChatConfig,
        selectedChat,
        setSelectedChat,
        createChatClick,
        deleteChatClick,
        selectChatClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(AppContext);
};

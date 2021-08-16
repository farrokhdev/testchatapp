import { useChatContext } from "context";
import { Icon } from "semantic-ui-react";
import { userNotMe, joinUserNames } from "helpers";
import { ChatAvatar } from "components";

export const ChatList = () => {
  const {
    myChats,
    chatConfig,
    deleteChatClick,
    selectChatClick,
    selectedChat,
  } = useChatContext();

  return (
    <div className="chat-list">
      {myChats.map((myChat, index) => {
        return (
          <div
            className={`chat-list-item ${
              !!selectedChat?.id === myChat?.id ? "selected-chat-item" : ""
            }`}
            key={index}
          >
            <div
              className="chat-list-item-content"
              onClick={() => selectChatClick(myChat)}
            >
              {myChat.people.length === 1 ? (
                <>
                  <Icon circular inverted color="violet" name="user cancel" />
                  <div className="chat-list-preview">
                    <div className="preview-username">no one added yet</div>
                  </div>
                </>
              ) : myChat.people.length === 2 ? (
                <>
                  <ChatAvatar
                    username={userNotMe(chatConfig, myChat)}
                    chat={myChat}
                  />
                  <div className="chat-list-preview">
                    <div className="preview-username">
                      {userNotMe(chatConfig, myChat)}
                    </div>
                    <div className="preview-message">
                      {myChat.last_message.attachments.length
                        ? `${myChat.last_message.sender.username} has send an attachment`
                        : myChat.last_message.text.slice(0, 50) + "..."}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Icon circular inverted color="brown" name="users" />

                  <div className="preview-username">
                    {joinUserNames(myChat.people, chatConfig.userName).slice(
                      0,
                      50
                    ) + "..."}
                  </div>
                  <div className="preview-message">
                    {myChat.last_message.attachments.length
                      ? `${myChat.last_message.sender_username} has send an attachment`
                      : myChat.last_message.text.slice(0, 50) + "..."}
                  </div>
                </>
              )}
            </div>
            <div
              onClick={() => deleteChatClick(myChat)}
              className="chat-item-delete"
            >
              <Icon name="delete" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

import { useChatContext } from "context";
import { useResolved } from "hooks";
import { ChatList, RailHeader } from "components";
import { Loader } from "semantic-ui-react";

export const LeftSide = () => {
  const { myChats, createChatClick } = useChatContext();
  const chatResolved = useResolved(myChats);
  return (
    <div className="left-rail">
      {!!chatResolved ? (
        <>
          <RailHeader />
          {myChats.length ? (
            <div className="chat-list-container">
              <ChatList />
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet">
              <h3>No chats yet</h3>
            </div>
          )}
          <button className="create-chat-button" onClick={createChatClick}>
            Create chat
          </button>
        </>
      ) : (
        <div className="chats-loading">
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};

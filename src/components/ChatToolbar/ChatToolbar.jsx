import { useChatContext } from "context";
import { joinUserNames } from "helpers";
import { useState } from "react";
import { Icon } from "semantic-ui-react";
import { SearchUsers } from "components";

export const ChatToolbar = () => {
  const { selectedChat, chatConfig } = useChatContext();
  const [searching, setSearching] = useState(false);
  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
          {joinUserNames(selectedChat.people, chatConfig.joinUserNames).slice(
            0,
            100
          )}
        </div>
        <div className="add-user-icon">
          <Icon
            color="grey"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>
      <SearchUsers visible={searching} closeFn={() => setSearching(false)} />
    </>
  );
};

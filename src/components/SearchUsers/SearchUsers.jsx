import { useChatContext } from "context";
import { useDebaounce } from "hooks";
import { useState, useEffect, useRef } from "react";
import { Search } from "semantic-ui-react";
import { addPerson, getOtherPeople } from "react-chat-engine";

export const SearchUsers = ({ visible, closeFn }) => {
  const {
    myChats,
    chatConfig,
    setMyChats,
    selectedChat,
    setSelectedChat,
  } = useChatContext();

  let searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebaounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (visible && searchRef) {
      searchRef.focus();
    }
  }, [visible]);

  const selectUser = (username) => {
    addPerson(chatConfig, selectedChat.id, username, () => {
      const filteredChats = myChats.filter((p) => p.id !== selectedChat.id);
      const updatedChat = {
        ...selectedChat,
        people: [...selectedChat.people, { person: { username } }],
      };

      setSelectedChat(updatedChat);
      setMyChats([...filteredChats, updatedChat]);
      closeFn();
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      getOtherPeople(chatConfig, selectedChat.id, (chatId, data) => {
        // getting array of just keys from this object and map in them and create array of just usernames from those keys
        const userNames = Object.keys(data)
          .map((key) => data[key].username)
          .filter((user) =>
            user.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        setSearchResults(userNames.map((u) => ({ title: u })));
      });
      setLoading(false);
    } else {
      setSearchResults(null);
    }
  }, [chatConfig, selectedChat, debouncedSearchTerm]);

  return (
    <div
      className="user-search"
      style={{ display: visible ? "block" : "none" }}
    >
      <Search
        fluid
        onBlur={closeFn}
        loading={loading}
        value={searchTerm}
        placeholder="search for available users"
        input={{ ref: (r) => (searchRef = r) }}
        open={!!searchResults && !loading}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        results={searchResults}
        onResultSelect={(e, data) => {
          if (data.result.title) {
            selectUser(data.result.title);
          }
        }}
      />
    </div>
  );
};

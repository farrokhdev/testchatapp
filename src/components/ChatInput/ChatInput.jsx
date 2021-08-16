import { useChatContext } from "context";
import { useState, useRef } from "react";
import { Icon } from "semantic-ui-react";
import { sendMessage } from "react-chat-engine";
import { ImageUpload } from "components";

export const ChatInput = () => {
  const { chatConfig, selectedChat } = useChatContext();
  const [myInput, setMyInput] = useState("");
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const inputRef = useRef(null);
  const [image, setImage] = useState();

  const onFileAttach = (file) => {
    setImage(file);
    setImageModalOpen(true);
  };

  const sendMyMessage = () => {
    if (selectedChat && myInput) {
      setMyInput("");
      sendMessage(chatConfig, selectedChat.id, {
        text: myInput,
        files: [],
      });
    }
  };

  return (
    <>
      <div
        className="chat-controls"
        style={{ display: selectedChat.people.length === 1 && "none" }}
      >
        <div
          onClick={() => {
            const input = inputRef.current;
            if (input) {
              input.value = "";
              input.click();
            }
          }}
          className="attachment-icon"
        >
          <Icon name="attach" color="grey" />
        </div>
        <input
          value={myInput}
          className="chat-input"
          placeholder="send message"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMyMessage();
            }
          }}
          onChange={(e) => setMyInput(e.target.value)}
        />
        <div onClick={sendMyMessage} className="send-message-icon">
          <Icon name="send" color="grey" />
        </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        className="file-input"
        accept="image/jpeg, image/png"
        onChange={(e) => {
          const file = e.target?.files?.[0];
          if (file) {
            onFileAttach(file);
          }
        }}
      />
      {imageModalOpen && !!image && (
        <ImageUpload
          file={image}
          onSubmit={() => {
            sendMessage(
              chatConfig,
              selectedChat.id,
              {
                text: myInput,
                files: [image],
              },
              () => {
                setImage(null);
                setMyInput("");
              }
            );
          }}
          close={() => setImageModalOpen(false)}
        />
      )}
    </>
  );
};

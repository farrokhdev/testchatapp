import { fb } from "service";
import { useState, useEffect } from "react";
import { useChatContext } from "context";
import { Image } from "semantic-ui-react";
import { userNotMe } from "helpers";

export const ChatAvatar = ({ chat, username, className }) => {
  const { chatConfig } = useChatContext();
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fb.fireStore
      .collection("testUser")
      .where("userName", "==", username)
      .get()
      .then((snap) => {
        const data = snap.docs[0]?.data();

        if (data?.avatar) {
          setAvatar(data.avatar);
        }
      });
  }, [chat, chatConfig, username]);

  return avatar ? (
    <Image className={className || "chat-list-avatar"} src={avatar} />
  ) : (
    <div className={className || "empty-avatar"}>
      {username[0].toUpperCase()}
    </div>
  );
};

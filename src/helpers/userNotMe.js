export const userNotMe = (chatConfig, selectedChat) => {
  const selectTargetUser = selectedChat.people.find(
    (p) => p.person.username !== chatConfig.userName
  );
  return selectTargetUser?.person?.username;
};

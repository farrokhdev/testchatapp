export const joinUserNames = (people, currentUsername) => {
  return (
    "@" +
    people
      .map((p) => p.person.username)
      .filter((user) => user !== currentUsername)
      .join(", @")
  );
};

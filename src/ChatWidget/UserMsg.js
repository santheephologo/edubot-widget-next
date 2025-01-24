const UserMsg = ({ msg }) => {
  return (
    <>
      <span
        className={`chat_bot_main__mx_msg_item ${"chat_bot_main__mx_msg_item_user"}`}
      >
        {msg}
      </span>
    </>
  );
};
export default UserMsg;

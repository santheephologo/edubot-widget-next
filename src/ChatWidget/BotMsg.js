const BotMsg = ({ msg }) => {
  const parseMessage = (message) => {
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(message)) !== null) {
      // Push the text before the link
      if (match.index > lastIndex) {
        parts.push(message.slice(lastIndex, match.index));
      }

      // Push the link as a clickable anchor
      parts.push(
        <a
          key={match.index}
          href={match[2]} // URL
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {match[1]} {/* Link text */}
        </a>
      );

      lastIndex = linkRegex.lastIndex;
    }

    // Push the remaining text after the last link
    if (lastIndex < message.length) {
      parts.push(message.slice(lastIndex));
    }

    return parts;
  };
  return (
    <>
      <span
        className={`chat_bot_main__mx_msg_item chat_bot_main__mx_msg_item_admin `}
      >
        <div className="chat_bot_main__mx_avatar">
          <img
            src="https://www.shutterstock.com/image-vector/avatar-girl-operator-woman-icon-260nw-433466404.jpg"
            // src="https://w7.pngwing.com/pngs/198/625/png-transparent-call-centre-customer-service-computer-icons-call-centre-miscellaneous-face-telephone-call-thumbnail.png"
            alt="Agent"
          />
        </div>

        {parseMessage(msg).map((part, index) =>
        typeof part === "string" ? (
          <span key={index}>
            {part}
            <br />
          </span>
        ) : (
          part
        )
      )}
      </span>
    </>
  );
};

export default BotMsg;

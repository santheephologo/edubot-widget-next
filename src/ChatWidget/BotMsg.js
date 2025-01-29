const BotMsg = ({ msg }) => {

  const boldRegex = /\*\*(.*?)\*\*/g;
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;

  const parseMessage = (message) => {
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(message)) !== null) {
      if (match.index > lastIndex) {
        parts.push(applyBold(message.slice(lastIndex, match.index)));
      }
      
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {match[1]}
        </a>
      );
      
      lastIndex = linkRegex.lastIndex;
    }
    
    if (lastIndex < message.length) {
      parts.push(applyBold(message.slice(lastIndex)));
    }
    
    return parts.flat();
  };

  const applyBold = (text) => {
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      
      parts.push(<strong key={match.index}>{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    
    return parts;
  };

  return (
    <>
      <span className="chat_bot_main__mx_msg_item chat_bot_main__mx_msg_item_admin">
        <div className="chat_bot_main__mx_avatar">
          <img
            src="https://www.shutterstock.com/image-vector/avatar-girl-operator-woman-icon-260nw-433466404.jpg"
            alt="Agent"
          />
        </div>
        {parseMessage(msg).map((part, index) =>
          typeof part === "string" ? (
            <span key={index}>{part}<br /></span>
          ) : (
            part
          )
        )}
      </span>
    </>
  );
};

export default BotMsg;
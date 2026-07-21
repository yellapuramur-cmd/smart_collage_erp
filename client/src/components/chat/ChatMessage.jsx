import React from 'react';

const ChatMessage = ({ message }) => {
  const { text, isBot, timestamp } = message;

  const timeString = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Extremely basic markdown mock - in a real app use react-markdown
  const formatText = (content) => {
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <div className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {isBot && (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
            <span className="text-sm">🤖</span>
          </div>
        )}

        <div className="flex flex-col">
          <div 
            className={`p-3 rounded-2xl ${
              isBot 
                ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none' 
                : 'bg-blue-600 text-white rounded-tr-none'
            }`}
          >
            <p className="text-sm break-words whitespace-pre-wrap font-sans">
              {formatText(text)}
            </p>
          </div>
          <span className={`text-[10px] text-gray-400 mt-1 ${isBot ? 'text-left' : 'text-right'}`}>
            {timeString}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

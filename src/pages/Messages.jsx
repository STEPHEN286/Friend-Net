import React, { useState } from 'react';
import { DEFAULT_PROFILE_IMAGE } from '../config/images';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Sample data - replace with actual data from your state management
  const chats = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        image: DEFAULT_PROFILE_IMAGE,
        online: true,
      },
      lastMessage: {
        text: 'That sounds great! Looking forward to it.',
        timestamp: '2 min ago',
        unread: true,
      },
    },
    {
      id: 2,
      user: {
        name: 'Tech Innovators Group',
        image: DEFAULT_PROFILE_IMAGE,
        online: false,
        members: 5,
      },
      lastMessage: {
        text: 'David: We should schedule a meeting to discuss...',
        timestamp: '1 hour ago',
        unread: false,
      },
    },
    // Add more chats...
  ];

  const messages = [
    {
      id: 1,
      sender: {
        name: 'Sarah Johnson',
        image: DEFAULT_PROFILE_IMAGE,
      },
      text: 'Hey! How are you?',
      timestamp: '10:30 AM',
      isSender: false,
    },
    {
      id: 2,
      sender: {
        name: 'You',
        image: DEFAULT_PROFILE_IMAGE,
      },
      text: "I'm doing great! Just finished working on the new feature.",
      timestamp: '10:31 AM',
      isSender: true,
    },
    {
      id: 3,
      sender: {
        name: 'Sarah Johnson',
        image: DEFAULT_PROFILE_IMAGE,
      },
      text: "That's awesome! Can you share some screenshots?",
      timestamp: '10:32 AM',
      isSender: false,
    },
    // Add more messages...
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // TODO: Implement message sending logic
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Implement file upload logic
      console.log('Uploading file:', file);
    }
  };

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-4rem)] flex">
      {/* Chat List */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <i className="fas fa-search absolute right-4 top-3 text-gray-400"></i>
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.user.image}
                  alt={chat.user.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.user.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium truncate">{chat.user.name}</h3>
                  <span className="text-xs text-gray-500">{chat.lastMessage.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage.text}</p>
              </div>
              {chat.lastMessage.unread && (
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedChat ? (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center space-x-4">
              <img
                src={selectedChat.user.image}
                alt={selectedChat.user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-lg font-medium">{selectedChat.user.name}</h2>
                <p className="text-sm text-gray-500">
                  {selectedChat.user.online ? 'Online' : 'Offline'}
                  {selectedChat.user.members && ` • ${selectedChat.user.members} members`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-phone"></i>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-video"></i>
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-info-circle"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex items-start space-x-2 ${
                  message.isSender ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <img
                  src={message.sender.image}
                  alt={message.sender.name}
                  className="w-8 h-8 rounded-full"
                />
                <div
                  className={`max-w-lg px-4 py-2 rounded-lg ${
                    message.isSender
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  <p>{message.text}</p>
                  <span
                    className={`text-xs ${
                      message.isSender ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form onSubmit={handleSendMessage} className="flex items-end space-x-4">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="far fa-smile text-xl"></i>
              </button>
              <div className="relative flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full p-3 max-h-32 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={1}
                />
                <label
                  htmlFor="file-upload"
                  className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className="fas fa-paperclip"></i>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
                />
              </div>
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <i className="far fa-comments text-6xl text-gray-400"></i>
            <p className="mt-4 text-lg text-gray-600">Select a chat to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages; 
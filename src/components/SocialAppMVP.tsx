'use client';
import React, { useState, useEffect } from 'react';
import { FaThumbsUp, FaPaperPlane, FaTimesCircle, FaComment } from 'react-icons/fa';

// Notification Toast Component
const NotificationToast = ({ message, onClose }: { message: string, onClose: () => void }) => {
  return(
  <div className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 transform transition-all duration-300 ease-in-out hover:scale-105">
    <span className="font-medium">{message}</span>
    <button onClick={onClose} className="text-white hover:text-gray-300 transition-all duration-200">
      <FaTimesCircle size={18} />
    </button>
  </div>
);
};




interface Message {
  sender: 'me' | 'other'; // Adjust sender type based on your app
  content: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: { name: string }; // Adjust the type as per your actual structure
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  onClose,
  selectedUser,
  messages,
  onSendMessage,
}) => {
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      onSendMessage(messageContent);
      setMessageContent(''); // Clear the input field after sending the message
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out ${!isOpen && 'hidden'}`}>
      <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">{selectedUser?.name}</h3>
        <button onClick={onClose} className="text-white hover:text-gray-200 transition-all duration-200">
          <FaTimesCircle />
        </button>
      </div>
      <div className="h-60 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-4 ${message.sender === 'me' ? 'text-right' : ''}`}>
            <div className={`inline-block px-4 py-2 rounded-lg shadow-md ${message.sender === 'me' ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t bg-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg shadow-sm focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Allow sending on "Enter" key press
          />
          <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
            onClick={handleSendMessage} // Handle button click
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};



// Main Social App MVP Component
const SocialAppMVP = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile] = useState({
    name: 'Vivek Kumar',
    interests: ['Technology', 'Music', 'Travel'],
    location: 'Gurugram, India',
    availability: ['Monday evenings', 'Weekends'],
    bio: 'Tech enthusiast and music lover',
    email: 'vivek@example.com'
  });

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      title: 'Coffee Meetup',
      date: '2025-01-15',
      time: '10:00 AM',
      location: 'Local Cafe',
      participants: ['Vivek', 'Riya'],
      isAttending: false
    },
    {
      title: 'Tech Discussion',
      date: '2025-01-18',
      time: '2:00 PM',
      location: 'Virtual',
      participants: ['Vivek', 'Persist Ventures'],
      isAttending: true
    }
  ]);

  const [nearbyUsers, setNearbyUsers] = useState([
    {
      name: 'Rohan',
      distance: '0.5 miles',
      sharedInterests: ['Technology', 'Music'],
      connected: false
    },
    {
      name: 'Ankush',
      distance: '1.2 miles',
      sharedInterests: ['Travel'],
      connected: false
    }
  ]);

  //const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventFilter,] = useState('all');
  const [userMood, setUserMood] = useState('😊');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, author: 'Vivek Kumar', content: 'Looking forward to the tech meetup!', likes: 5, comments: [] },
    { id: 2, author: 'Vivek Kumar', content: 'Great coffee chat today!', likes: 3, comments: [] }
  ]);

  const moods = ['😊', '😎', '🤔', '😴', '🏃', '💻', '🎮', '🎵'];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        "Riya liked your post",
        "New tech meetup in your area",
        "Ankush wants to connect",
        "Upcoming event reminder: Coffee Meetup"
      ];
      const randomMessage = randomNotifications[Math.floor(Math.random() * randomNotifications.length)];
      showToast(randomMessage);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: userProfile.name,
        content: postContent,
        likes: 0,
        comments: []
      };
      setPosts([newPost, ...posts]);
      setPostContent('');
      showToast('Post created successfully!');
    }
  };


interface Post {
  id: number;
  likes: number;
  // Other properties of a post can go here (e.g., content, author, etc.)
}

const MyComponent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const handleLikePost = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{`Post ${post.id}: Likes ${post.likes}`}</p>
          <button onClick={() => handleLikePost(post.id)}>Like</button>
        </div>
      ))}
    </div>
  );
};


  

  const toggleEventAttendance = (index: number) => {
    const updatedEvents = [...upcomingEvents];
    updatedEvents[index].isAttending = !updatedEvents[index].isAttending;
    setUpcomingEvents(updatedEvents);
  };

  const toggleConnection = (index: number) => {
    const updatedUsers = [...nearbyUsers];
    updatedUsers[index].connected = !updatedUsers[index].connected;
    setNearbyUsers(updatedUsers);
  };

  const openChatWindow = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
    setMessages([]); // Optionally reset messages when opening a new chat
  };

  const closeChatWindow = () => {
    setIsChatOpen(false);
    setSelectedUser(null);
  };

  const sendMessage = (messageContent) => {
    if (messageContent.trim()) {
      const newMessage = {
        sender: 'me',
        content: messageContent
      };
      setMessages([...messages, newMessage]);
    }
  };

  const filteredEvents = upcomingEvents.filter(event => {
    if (eventFilter === 'attending') return event.isAttending;
    if (eventFilter === 'notAttending') return !event.isAttending;
    return true;
  });

  const filteredNearbyUsers = nearbyUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.sharedInterests.some(interest =>
      interest.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-6 py-2 rounded-full text-xl transition-all duration-300 ${activeTab === 'profile' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`px-6 py-2 rounded-full text-xl transition-all duration-300 ${activeTab === 'events' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button
          className={`px-6 py-2 rounded-full text-xl transition-all duration-300 ${activeTab === 'nearby' ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('nearby')}
        >
          Nearby Users
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-600">{userProfile.name}</h2>
          <p className="text-gray-600 text-lg">{userProfile.bio}</p>
          <div className="flex flex-col text-gray-600 text-lg">
            <p>Location: {userProfile.location}</p>
            <p>Availability: {userProfile.availability.join(', ')}</p>
            <p>Interests: {userProfile.interests.join(', ')}</p>
          </div>

          {/* Create Post Section (Visible Only on Profile Page) */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-blue-600">Create a Post</h2>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-6 border rounded-lg shadow-lg mb-6 text-lg focus:outline-none"
            />
            <div className="flex gap-4">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setUserMood(mood)}
                  className={`px-6 py-3 rounded-lg text-lg transition-all duration-300 hover:bg-gray-200 ${userMood === mood && 'bg-blue-100'}`}
                >
                  {mood}
                </button>
              ))}
            </div>
            <button
              onClick={handleCreatePost}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              Post
            </button>
          </div>

          {/* Post Feed */}
          <div className="mt-6">
            {posts.map(post => (
              <div key={post.id} className="border p-6 rounded-lg mb-6 shadow-lg bg-gray-50">
                <h3 className="font-semibold text-xl text-blue-600">{post.author}</h3>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg flex gap-2 items-center"
                  >
                    <FaThumbsUp />
                    {post.likes} Likes
                  </button>
                  <button className="px-6 py-2 bg-gray-300 text-black rounded-lg shadow-lg flex gap-2 items-center">
                    <FaComment />
                    Comments
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Tab */}
      {activeTab === 'events' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-600">Upcoming Events</h2>
          <div className="mt-6 space-y-6">
            {filteredEvents.map((event, index) => (
              <div key={index} className="border p-6 rounded-lg mb-6 shadow-lg bg-gray-50">
                <h3 className="font-semibold text-xl text-blue-600">{event.title}</h3>
                <p className="text-gray-600 text-lg">Date: {event.date} | Time: {event.time}</p>
                <p className="text-gray-600 text-lg">Location: {event.location}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => toggleEventAttendance(index)}
                    className={`px-6 py-2 rounded-lg text-white ${event.isAttending ? 'bg-green-600' : 'bg-gray-600'} `}
                  >
                    {event.isAttending ? 'Cancel Attendance' : 'Attend'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nearby Users Tab */}
      {activeTab === 'nearby' && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-600">Nearby Users</h2>
          <input
            type="text"
            placeholder="Search by name or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-4 p-3 w-full border rounded-lg shadow-sm focus:outline-none"
          />
          <div className="mt-6 space-y-6">
            {filteredNearbyUsers.map((user, index) => (
              <div key={index} className="border p-6 rounded-lg mb-6 shadow-lg bg-gray-50">
                <h3 className="font-semibold text-xl text-blue-600">{user.name}</h3>
                <p className="text-gray-600">Shared Interests: {user.sharedInterests.join(', ')}</p>
                <p className="text-gray-600">Distance: {user.distance}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => toggleConnection(index)}
                    className={`px-6 py-2 rounded-lg ${user.connected ? 'bg-blue-600' : 'bg-gray-600'} text-white`}
                  >
                    {user.connected ? 'Disconnect' : 'Connect'}
                  </button>
                  <button
                    onClick={() => openChatWindow(user)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg"
                  >
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {showNotification && <NotificationToast message={notificationMessage} onClose={() => setShowNotification(false)} />}
      {/* Chat Window */}
      {isChatOpen && (
        <ChatWindow
          isOpen={isChatOpen}
          onClose={closeChatWindow}
          selectedUser={selectedUser}
          messages={messages}
          onSendMessage={sendMessage}
        />
      )}
    </div>
  );
};

export default SocialAppMVP;

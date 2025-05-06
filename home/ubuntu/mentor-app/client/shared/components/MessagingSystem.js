import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// This component implements the messaging system functionality
const MessagingSystem = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showNewChatForm, setShowNewChatForm] = useState(false);
  const [newChatData, setNewChatData] = useState({
    type: 'direct',
    recipient: '',
    name: '',
    participants: [],
    topic: ''
  });
  
  // Fetch chat rooms on component mount
  useEffect(() => {
    const fetchChatRooms = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would call the backend API
        // For now, we'll simulate an API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock chat rooms
        const mockChatRooms = [
          {
            id: '1',
            name: 'John Doe & Sarah Smith',
            type: 'direct',
            participants: [
              {
                user: {
                  id: 'current-user-id',
                  name: 'John Doe',
                  username: 'johndoe',
                  profilePicture: 'https://via.placeholder.com/40'
                },
                role: 'member',
                joinedAt: '2025-03-01T10:00:00Z',
                lastSeen: '2025-03-23T15:30:00Z'
              },
              {
                user: {
                  id: '2',
                  name: 'Sarah Smith',
                  username: 'sarahsmith',
                  profilePicture: 'https://via.placeholder.com/40'
                },
                role: 'member',
                joinedAt: '2025-03-01T10:00:00Z',
                lastSeen: '2025-03-23T14:45:00Z'
              }
            ],
            lastActivity: '2025-03-23T15:30:00Z',
            lastMessage: {
              id: 'm1',
              content: 'How is your project coming along?',
              sender: {
                id: '2',
                name: 'Sarah Smith'
              },
              createdAt: '2025-03-23T15:30:00Z'
            }
          },
          {
            id: '2',
            name: 'Web Development Group',
            type: 'group',
            participants: [
              {
                user: {
                  id: 'current-user-id',
                  name: 'John Doe',
                  username: 'johndoe',
                  profilePicture: 'https://via.placeholder.com/40'
                },
                role: 'admin',
                joinedAt: '2025-03-05T09:00:00Z',
                lastSeen: '2025-03-23T16:00:00Z'
              },
              {
                user: {
                  id: '2',
                  name: 'Sarah Smith',
                  username: 'sarahsmith',
                  profilePicture: 'https://via.placeholder.com/40'
                },
                role: 'member',
                joinedAt: '2025-03-05T09:00:00Z',
                lastSeen: '2025-03-23T15:00:00Z'
              },
              {
                user: {
                  id: '3',
                  name: 'Mike Johnson',
                  username: 'mikej',
                  profilePicture: 'https://via.placeholder.com/40'
                },
                role: 'member',
                joinedAt: '2025-03-05T09:00:00Z',
                lastSeen: '2025-03-22T18:30:00Z'
              }
            ],
            lastActivity: '2025-03-23T16:00:00Z',
            lastMessage: {
              id: 'm2',
              content: 'I just pushed the latest changes to GitHub',
              sender: {
                id: 'current-user-id',
                name: 'John Doe'
              },
              createdAt: '2025-03-23T16:00:00Z'
            }
          },
          {
            id: '3',
            name: 'React Native Discussion',
            type: 'voice',
            participants: [
              {
                user: {
                  id: 'current-user-id',
                  name: 'John Doe',
                  username: 'johndoe',
                  profilePicture: 'https://via.placeholder.com/40'
                },
                role: 'member',
                joinedAt: '2025-03-10T14:00:00Z',
                lastSeen: '2025-03-23T14:00:00Z'
              },
              {
                user: {
                  id: '4',
                  name: 'Emily Chen',
                  username: 'emilyc',
                  profilePicture: 'https://via.placeholder.com/40'
                },
                role: 'admin',
                joinedAt: '2025-03-10T14:00:00Z',
                lastSeen: '2025-03-23T14:00:00Z'
              },
              {
                user: {
                  id: '5',
                  name: 'David Wilson',
                  username: 'davidw',
                  profilePicture: 'https://via.placeholder.com/40'
                },
                role: 'member',
                joinedAt: '2025-03-10T14:00:00Z',
                lastSeen: '2025-03-23T14:00:00Z'
              }
            ],
            isVoiceActive: true,
            activeParticipants: ['4', '5'],
            topic: 'Performance optimization in React Native',
            lastActivity: '2025-03-23T14:00:00Z'
          }
        ];
        
        setChatRooms(mockChatRooms);
        
        // Set first chat room as active if available
        if (mockChatRooms.length > 0) {
          setActiveRoom(mockChatRooms[0]);
          
          // Fetch messages for the active room
          fetchMessages(mockChatRooms[0].id);
        }
      } catch (err) {
        setError('Failed to load chat rooms. Please try again.');
        console.error('Fetch chat rooms error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChatRooms();
  }, []);
  
  // Fetch messages for a chat room
  const fetchMessages = async (roomId) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate an API call with mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock messages based on room ID
      let mockMessages = [];
      
      if (roomId === '1') {
        // Direct messages with Sarah
        mockMessages = [
          {
            id: 'dm1',
            sender: {
              id: 'current-user-id',
              name: 'John Doe',
              username: 'johndoe',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'Hi Sarah, how are you doing?',
            createdAt: '2025-03-23T15:00:00Z',
            read: true
          },
          {
            id: 'dm2',
            sender: {
              id: '2',
              name: 'Sarah Smith',
              username: 'sarahsmith',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'Hey John! I\'m doing well, thanks for asking. How about you?',
            createdAt: '2025-03-23T15:10:00Z',
            read: true
          },
          {
            id: 'dm3',
            sender: {
              id: 'current-user-id',
              name: 'John Doe',
              username: 'johndoe',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'I\'m good! Working on the Mentor app project.',
            createdAt: '2025-03-23T15:15:00Z',
            read: true
          },
          {
            id: 'dm4',
            sender: {
              id: '2',
              name: 'Sarah Smith',
              username: 'sarahsmith',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'That sounds interesting! How is it going?',
            createdAt: '2025-03-23T15:20:00Z',
            read: true
          },
          {
            id: 'dm5',
            sender: {
              id: 'current-user-id',
              name: 'John Doe',
              username: 'johndoe',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'It\'s going well! I\'ve implemented most of the features already.',
            createdAt: '2025-03-23T15:25:00Z',
            read: true
          },
          {
            id: 'dm6',
            sender: {
              id: '2',
              name: 'Sarah Smith',
              username: 'sarahsmith',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'How is your project coming along?',
            createdAt: '2025-03-23T15:30:00Z',
            read: false
          }
        ];
      } else if (roomId === '2') {
        // Group chat messages
        mockMessages = [
          {
            id: 'gm1',
            sender: {
              id: '3',
              name: 'Mike Johnson',
              username: 'mikej',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'Hey everyone, has anyone used the new React 18 features yet?',
            createdAt: '2025-03-23T15:40:00Z',
            read: true
          },
          {
            id: 'gm2',
            sender: {
              id: '2',
              name: 'Sarah Smith',
              username: 'sarahsmith',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'Yes, I\'ve been using concurrent mode and it\'s amazing!',
            createdAt: '2025-03-23T15:45:00Z',
            read: true
          },
          {
            id: 'gm3',
            sender: {
              id: 'current-user-id',
              name: 'John Doe',
              username: 'johndoe',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'I\'m still learning about it. Any good resources you can recommend?',
            createdAt: '2025-03-23T15:50:00Z',
            read: true
          },
          {
            id: 'gm4',
            sender: {
              id: '2',
              name: 'Sarah Smith',
              username: 'sarahsmith',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'The official React docs are great, and there\'s a good course on Udemy by Maximilian Schwarzmüller.',
            createdAt: '2025-03-23T15:55:00Z',
            read: true
          },
          {
            id: 'gm5',
            sender: {
              id: '3',
              name: 'Mike Johnson',
              username: 'mikej',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'Thanks for the recommendation! I\'ll check it out.',
            createdAt: '2025-03-23T15:58:00Z',
            read: true
          },
          {
            id: 'gm6',
            sender: {
              id: 'current-user-id',
              name: 'John Doe',
              username: 'johndoe',
              profilePicture: 'https://via.placeholder.com/40'
            },
            content: 'I just pushed the latest changes to GitHub',
            createdAt: '2025-03-23T16:00:00Z',
            read: true
          }
        ];
      }
      
      setMessages(mockMessages);
    } catch (err) {
      setError('Failed to load messages. Please try again.');
      console.error('Fetch messages error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle chat room selection
  const selectChatRoom = (room) => {
    setActiveRoom(room);
    fetchMessages(room.id);
  };
  
  // Handle message input change
  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };
  
  // Handle message submission
  const sendMessage = (e) => {
    e.preventDefault();
    
    if (!messageInput.trim()) {
      return;
    }
    
    // In a real implementation, this would call the backend API
    // For now, we'll simulate sending a message and update local state
    
    const newMessage = {
      id: `new-${Date.now()}`,
      sender: {
        id: 'current-user-id',
        name: 'John Doe',
        username: 'johndoe',
        profilePicture: 'https://via.placeholder.com/40'
      },
      content: messageInput,
      createdAt: new Date().toISOString(),
      read: true
    };
    
    // Add message to messages list
    setMessages([...messages, newMessage]);
    
    // Update last message in active room
    const updatedRoom = {
      ...activeRoom,
      lastMessage: {
        id: newMessage.id,
        content: newMessage.content,
        sender: {
          id: newMessage.sender.id,
          name: newMessage.sender.name
        },
        createdAt: newMessage.createdAt
      },
      lastActivity: newMessage.createdAt
    };
    
    // Update active room
    setActiveRoom(updatedRoom);
    
    // Update chat rooms list
    const updatedChatRooms = chatRooms.map(room => 
      room.id === activeRoom.id ? updatedRoom : room
    );
    
    setChatRooms(updatedChatRooms);
    
    // Clear input
    setMessageInput('');
  };
  
  // Handle new chat form input change
  const handleNewChatInputChange = (e) => {
    const { name, value } = e.target;
    setNewChatData({
      ...newChatData,
      [name]: value
    });
  };
  
  // Handle new chat form submission
  const createNewChat = (e) => {
    e.preventDefault();
    
    // Validate form
    if (newChatData.type === 'direct' && !newChatData.recipient) {
      alert('Please select a recipient');
      return;
    }
    
    if (newChatData.type === 'group' && !newChatData.name) {
      alert('Please enter a group name');
      return;
    }
    
    if (newChatData.type === 'voice' && !newChatData.name) {
      alert('Please enter a voice room name');
      return;
    }
    
    // In a real implementation, this would call the backend API
    // For now, we'll simulate creating a new chat and update local state
    
    let newChatRoom;
    
    if (newChatData.type === 'direct') {
      // Mock recipient data
      const recipient = {
        id: 'new-user-id',
        name: newChatData.recipient,
        username: newChatData.recipient.toLowerCase().replace(/\s+/g, ''),
        profilePicture: 'https://via.placeholder.com/40'
      };
      
      newChatRoom = {
        id: `new-${Date.now()}`,
        name: `John Doe & ${recipient.name}`,
        type: 'direct',
        participants: [
          {
            user: {
              id: 'current-user-id',
              name: 'John Doe',
              username: 'johndoe',
              profilePicture: 'https://via.placeholder.com/40'
            },
            role: 'member',
            joinedAt: new Date().toISOString(),
            lastSeen: new Date().toISOString()
          },
          {
            user: recipient,
            role: 'member',
            joinedAt: new Date().toISOString(),
            lastSeen: new Date().toISOString()
          }
        ],
        lastActivity: new Date().toISOString()
      };
    } else if (newChatData.type === 'group') {
      // Parse participants
      const participantNames = newChatData.participants
        .split(',')
        .map(name => name.trim())
        .filter(name => name);
      
      // Mock participants data
      const participants = participantNames.map((name, index) => ({
        user: {
          id: `participant-${index}`,
          name,
          username: name.toLowerCase().replace(/\s+/g, ''),
          profilePicture: 'https://via.placeholder.com/40'
        },
        role: 'member',
        joinedAt: new Date().toISOString(),
        lastSeen: new Date().toISOString()
      }));
      
      // Add current user as admin
      participants.unshift({
       <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>
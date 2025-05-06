import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// This component implements the voice room functionality
const VoiceRoom = ({ roomId }) => {
  const [voiceRoom, setVoiceRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [activeSpeaker, setActiveSpeaker] = useState(null);
  const [isRaiseHand, setIsRaiseHand] = useState(false);
  const [raisedHands, setRaisedHands] = useState([]);
  
  // Fetch voice room data on component mount
  useEffect(() => {
    const fetchVoiceRoom = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would call the backend API
        // For now, we'll simulate an API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock voice room data
        const mockVoiceRoom = {
          id: roomId || '1',
          name: 'React Native Discussion',
          type: 'voice',
          topic: 'Performance optimization in React Native',
          isVoiceActive: true,
          scheduledFor: '2025-03-23T14:00:00Z',
          duration: 60, // minutes
          createdAt: '2025-03-10T14:00:00Z',
          createdBy: {
            id: '4',
            name: 'Emily Chen',
            username: 'emilyc',
            profilePicture: 'https://via.placeholder.com/40'
          }
        };
        
        // Mock participants
        const mockParticipants = [
          {
            id: 'current-user-id',
            name: 'John Doe',
            username: 'johndoe',
            profilePicture: 'https://via.placeholder.com/40',
            role: 'member',
            isMuted: false,
            isActive: true,
            joinedAt: '2025-03-23T14:05:00Z'
          },
          {
            id: '4',
            name: 'Emily Chen',
            username: 'emilyc',
            profilePicture: 'https://via.placeholder.com/40',
            role: 'admin',
            isMuted: false,
            isActive: true,
            joinedAt: '2025-03-23T14:00:00Z'
          },
          {
            id: '5',
            name: 'David Wilson',
            username: 'davidw',
            profilePicture: 'https://via.placeholder.com/40',
            role: 'member',
            isMuted: true,
            isActive: true,
            joinedAt: '2025-03-23T14:02:00Z'
          },
          {
            id: '6',
            name: 'Lisa Johnson',
            username: 'lisaj',
            profilePicture: 'https://via.placeholder.com/40',
            role: 'member',
            isMuted: false,
            isActive: false,
            joinedAt: '2025-03-23T14:10:00Z'
          }
        ];
        
        setVoiceRoom(mockVoiceRoom);
        setParticipants(mockParticipants);
        setActiveSpeaker(mockParticipants[1].id); // Set Emily as active speaker
      } catch (err) {
        setError('Failed to load voice room. Please try again.');
        console.error('Fetch voice room error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVoiceRoom();
    
    // Simulate periodic updates for active speaker
    const speakerInterval = setInterval(() => {
      // Randomly change active speaker among unmuted participants
      const unmutedParticipants = participants.filter(p => !p.isMuted && p.isActive);
      if (unmutedParticipants.length > 0) {
        const randomIndex = Math.floor(Math.random() * unmutedParticipants.length);
        setActiveSpeaker(unmutedParticipants[randomIndex].id);
      }
    }, 5000);
    
    return () => {
      clearInterval(speakerInterval);
    };
  }, [roomId]);
  
  // Join voice room
  const joinVoiceRoom = async () => {
    setIsConnecting(true);
    
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate joining a voice room
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update current user's status
      const updatedParticipants = participants.map(participant => {
        if (participant.id === 'current-user-id') {
          return {
            ...participant,
            isActive: true
          };
        }
        return participant;
      });
      
      setParticipants(updatedParticipants);
    } catch (err) {
      setError('Failed to join voice room. Please try again.');
      console.error('Join voice room error:', err);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Leave voice room
  const leaveVoiceRoom = async () => {
    try {
      // In a real implementation, this would call the backend API
      // For now, we'll simulate leaving a voice room
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update current user's status
      const updatedParticipants = participants.map(participant => {
        if (participant.id === 'current-user-id') {
          return {
            ...participant,
            isActive: false
          };
        }
        return participant;
      });
      
      setParticipants(updatedParticipants);
      
      // Reset mute state
      setIsMuted(false);
    } catch (err) {
      setError('Failed to leave voice room. Please try again.');
      console.error('Leave voice room error:', err);
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    // In a real implementation, this would call the backend API
    // For now, we'll just update local state
    
    setIsMuted(!isMuted);
    
    // Update participant list
    const updatedParticipants = participants.map(participant => {
      if (participant.id === 'current-user-id') {
        return {
          ...participant,
          isMuted: !isMuted
        };
      }
      return participant;
    });
    
    setParticipants(updatedParticipants);
  };
  
  // Raise/lower hand
  const toggleRaiseHand = () => {
    // In a real implementation, this would call the backend API
    // For now, we'll just update local state
    
    setIsRaiseHand(!isRaiseHand);
    
    if (!isRaiseHand) {
      // Add current user to raised hands
      setRaisedHands([...raisedHands, 'current-user-id']);
    } else {
      // Remove current user from raised hands
      setRaisedHands(raisedHands.filter(id => id !== 'current-user-id'));
    }
  };
  
  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Calculate room duration
  const calculateDuration = () => {
    if (!voiceRoom) return '';
    
    const startTime = new Date(voiceRoom.scheduledFor);
    const now = new Date();
    const diffInMinutes = Math.floor((now - startTime) / (1000 * 60));
    
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    
    return `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };
  
  // Check if current user is active in the room
  const isUserActive = () => {
    const currentUser = participants.find(p => p.id === 'current-user-id');
    return currentUser && currentUser.isActive;
  };
  
  // Render loading state
  if (loading) {
    return <div className="voice-room-loading">Loading voice room...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="voice-room-error">Error: {error}</div>;
  }
  
  // Render voice room not found
  if (!voiceRoom) {
    return <div className="voice-room-not-found">Voice room not found</div>;
  }
  
  return (
    <div className="voice-room-container">
      <div className="voice-room-header">
        <h2>{voiceRoom.name}</h2>
        <div className="voice-room-info">
          <div className="voice-room-topic">
            <span className="label">Topic:</span>
            <span className="value">{voiceRoom.topic}</span>
          </div>
          <div className="voice-room-duration">
            <span className="label">Duration:</span>
            <span className="value">{calculateDuration()}</span>
          </div>
          <div className="voice-room-status">
            <span className={`status-indicator ${voiceRoom.isVoiceActive ? 'active' : 'inactive'}`}></span>
            <span className="status-text">{voiceRoom.isVoiceActive ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </div>
      
      <div className="voice-room-content">
        <div className="participants-section">
          <h3>Participants ({participants.filter(p => p.isActive).length} active)</h3>
          <div className="participants-list">
            {participants.map(participant => (
              <div 
                key={participant.id} 
                className={`participant-item ${participant.isActive ? 'active' : 'inactive'} ${activeSpeaker === participant.id ? 'speaking' : ''}`}
              >
                <div className="participant-avatar">
                  <img src={participant.profilePicture} alt={participant.name} />
                  {participant.isActive && (
                    <span className={`status-dot ${participant.isMuted ? 'muted' : 'unmuted'}`}></span>
                  )}
                </div>
                <div className="participant-info">
                  <div className="participant-name">
                    {participant.name}
                    {participant.id === 'current-user-id' && <span className="you-badge">You</span>}
                    {participant.role === 'admin' && <span className="admin-badge">Admin</span>}
                  </div>
                  <div className="participant-status">
                    {participant.isActive ? (
                      participant.isMuted ? 'Muted' : 'Unmuted'
                    ) : (
                      'Inactive'
                    )}
                  </div>
                </div>
                {raisedHands.includes(participant.id) && (
                  <div className="raised-hand-indicator">
                    ✋
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="voice-controls-section">
          {isUserActive() ? (
            <>
              <button 
                className={`mute-button ${isMuted ? 'muted' : 'unmuted'}`}
                onClick={toggleMute}
              >
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              
              <button 
                className={`raise-hand-button ${isRaiseHand ? 'active' : ''}`}
                onClick={toggleRaiseHand}
              >
                {isRaiseHand ? 'Lower Hand' : 'Raise Hand'}
              </button>
              
              <button 
                className="leave-button"
                onClick={leaveVoiceRoom}
              >
                Leave Room
              </button>
            </>
          ) : (
            <button 
              className="join-button"
              onClick={joinVoiceRoom}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Join Room'}
            </button>
          )}
        </div>
      </div>
      
      <div className="voice-room-footer">
        <div className="created-by">
          Created by {voiceRoom.createdBy.name}
        </div>
        <div className="scheduled-time">
          Started at {formatTime(voiceRoom.scheduledFor)}
        </div>
      </div>
    </div>
  );
};

export default VoiceRoom;

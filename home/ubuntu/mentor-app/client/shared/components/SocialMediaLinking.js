import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { linkSocialAccount, unlinkSocialAccount } from '../../shared/redux/slices/authSlice';

// This component allows users to link/unlink their social media accounts
const SocialMediaLinking = () => {
  const dispatch = useDispatch();
  const { linkedAccounts } = useSelector(state => state.auth);
  const [loading, setLoading] = useState({});
  
  // Handle linking a social media account
  const handleLinkAccount = async (platform) => {
    setLoading({ ...loading, [platform]: true });
    
    try {
      // In a real implementation, this would open OAuth flow
      // For now, we'll simulate a successful linking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(linkSocialAccount({ platform, linked: true }));
    } catch (error) {
      console.error(`Error linking ${platform} account:`, error);
    } finally {
      setLoading({ ...loading, [platform]: false });
    }
  };
  
  // Handle unlinking a social media account
  const handleUnlinkAccount = async (platform) => {
    setLoading({ ...loading, [platform]: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(linkSocialAccount({ platform, linked: false }));
    } catch (error) {
      console.error(`Error unlinking ${platform} account:`, error);
    } finally {
      setLoading({ ...loading, [platform]: false });
    }
  };
  
  // List of supported platforms
  const platforms = [
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'pinterest', name: 'Pinterest', icon: '📌' },
    { id: 'reddit', name: 'Reddit', icon: '🤖' },
    { id: 'quora', name: 'Quora', icon: '❓' }
  ];
  
  return (
    <div className="social-linking-container">
      <h2>Link Your Social Media Accounts</h2>
      <p>Connect your social media accounts to aggregate content in one place.</p>
      
      <div className="social-accounts-list">
        {platforms.map(platform => (
          <div key={platform.id} className="social-account-item">
            <div className="platform-info">
              <span className="platform-icon">{platform.icon}</span>
              <span className="platform-name">{platform.name}</span>
            </div>
            
            <div className="platform-status">
              {linkedAccounts[platform.id] ? (
                <span className="status-linked">Connected</span>
              ) : (
                <span className="status-unlinked">Not Connected</span>
              )}
            </div>
            
            <div className="platform-actions">
              {linkedAccounts[platform.id] ? (
                <button 
                  className="unlink-button"
                  onClick={() => handleUnlinkAccount(platform.id)}
                  disabled={loading[platform.id]}
                >
                  {loading[platform.id] ? 'Unlinking...' : 'Unlink'}
                </button>
              ) : (
                <button 
                  className="link-button"
                  onClick={() => handleLinkAccount(platform.id)}
                  disabled={loading[platform.id]}
                >
                  {loading[platform.id] ? 'Linking...' : 'Link Account'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="social-linking-info">
        <h3>Why link your accounts?</h3>
        <ul>
          <li>See all your social media content in one unified feed</li>
          <li>Interact with posts, reels, and threads without switching apps</li>
          <li>Get AI-powered insights and recommendations based on your interests</li>
          <li>Easily share your progress with your community</li>
        </ul>
        
        <div className="privacy-note">
          <strong>Privacy Note:</strong> We only access the content you choose to share. 
          You can unlink your accounts at any time.
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinking;

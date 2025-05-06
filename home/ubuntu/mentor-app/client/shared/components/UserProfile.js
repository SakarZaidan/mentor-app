import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// This component implements the user profile functionality
const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    role: 'student',
    bio: '',
    skills: [],
    majors: '',
    mentorshipAreas: '',
    coachingSpecialties: '',
    availability: 'limited',
    hourlyRate: 0,
    website: '',
    linkedin: '',
    github: '',
    twitter: '',
    instagram: ''
  });
  
  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would call the backend API
        // For now, we'll simulate an API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock profile data
        const mockProfile = {
          id: '1',
          user: {
            id: userId || '1',
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            profilePicture: 'https://via.placeholder.com/150'
          },
          role: 'mentor',
          bio: 'Experienced software developer with a passion for teaching and mentoring others in web development, mobile app development, and AI.',
          skills: [
            { name: 'JavaScript', level: 5, yearsOfExperience: 8 },
            { name: 'React', level: 4, yearsOfExperience: 5 },
            { name: 'Node.js', level: 4, yearsOfExperience: 6 },
            { name: 'Python', level: 3, yearsOfExperience: 4 }
          ],
          majors: ['Computer Science', 'Software Engineering'],
          education: [
            {
              institution: 'Stanford University',
              degree: 'Master of Science',
              field: 'Computer Science',
              from: '2015-09-01',
              to: '2017-06-01',
              current: false,
              description: 'Specialized in Artificial Intelligence and Machine Learning'
            },
            {
              institution: 'MIT',
              degree: 'Bachelor of Science',
              field: 'Computer Science',
              from: '2011-09-01',
              to: '2015-06-01',
              current: false,
              description: 'Graduated with honors'
            }
          ],
          experience: [
            {
              title: 'Senior Software Engineer',
              company: 'Tech Innovations Inc.',
              location: 'San Francisco, CA',
              from: '2020-01-01',
              to: null,
              current: true,
              description: 'Leading a team of developers building scalable web applications'
            },
            {
              title: 'Software Engineer',
              company: 'WebDev Solutions',
              location: 'Boston, MA',
              from: '2017-07-01',
              to: '2019-12-31',
              current: false,
              description: 'Developed and maintained client websites and applications'
            }
          ],
          achievements: [
            {
              title: 'Best Open Source Contribution',
              description: 'Recognized for significant contributions to React Native',
              date: '2022-05-15'
            },
            {
              title: 'Hackathon Winner',
              description: 'First place in AI for Education hackathon',
              date: '2021-10-20'
            }
          ],
          socialLinks: {
            website: 'https://johndoe.dev',
            linkedin: 'https://linkedin.com/in/johndoe',
            github: 'https://github.com/johndoe',
            twitter: 'https://twitter.com/johndoe',
            instagram: 'https://instagram.com/johndoe'
          },
          mentorshipAreas: ['Web Development', 'Career Guidance', 'Technical Interviews'],
          coachingSpecialties: [],
          availability: 'limited',
          hourlyRate: 75,
          followers: ['2', '3', '4'],
          following: ['2', '5'],
          badges: [
            {
              name: 'Top Mentor',
              icon: 'trophy',
              description: 'Recognized as a top mentor based on student feedback',
              dateEarned: '2023-01-15'
            },
            {
              name: 'JavaScript Expert',
              icon: 'code',
              description: 'Demonstrated expertise in JavaScript',
              dateEarned: '2022-08-10'
            }
          ]
        };
        
        setProfile(mockProfile);
        
        // Initialize edit form data
        setEditFormData({
          role: mockProfile.role,
          bio: mockProfile.bio,
          skills: mockProfile.skills,
          majors: mockProfile.majors.join(', '),
          mentorshipAreas: mockProfile.mentorshipAreas.join(', '),
          coachingSpecialties: mockProfile.coachingSpecialties.join(', '),
          availability: mockProfile.availability,
          hourlyRate: mockProfile.hourlyRate,
          website: mockProfile.socialLinks.website,
          linkedin: mockProfile.socialLinks.linkedin,
          github: mockProfile.socialLinks.github,
          twitter: mockProfile.socialLinks.twitter,
          instagram: mockProfile.socialLinks.instagram
        });
      } catch (err) {
        setError('Failed to load profile. Please try again.');
        console.error('Fetch profile error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [userId]);
  
  // Handle input change for edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  // Handle form submission for profile update
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real implementation, this would call the backend API
    // For now, we'll simulate an API call and update local state
    
    // Update profile with form data
    const updatedProfile = {
      ...profile,
      role: editFormData.role,
      bio: editFormData.bio,
      skills: editFormData.skills,
      majors: editFormData.majors.split(',').map(major => major.trim()),
      mentorshipAreas: editFormData.mentorshipAreas.split(',').map(area => area.trim()),
      coachingSpecialties: editFormData.coachingSpecialties.split(',').map(specialty => specialty.trim()),
      availability: editFormData.availability,
      hourlyRate: parseFloat(editFormData.hourlyRate),
      socialLinks: {
        website: editFormData.website,
        linkedin: editFormData.linkedin,
        github: editFormData.github,
        twitter: editFormData.twitter,
        instagram: editFormData.instagram
      }
    };
    
    setProfile(updatedProfile);
    setIsEditing(false);
  };
  
  // Add a new skill
  const addSkill = () => {
    const newSkill = {
      name: '',
      level: 1,
      yearsOfExperience: 0
    };
    
    setEditFormData({
      ...editFormData,
      skills: [...editFormData.skills, newSkill]
    });
  };
  
  // Update a skill
  const updateSkill = (index, field, value) => {
    const updatedSkills = [...editFormData.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: field === 'level' || field === 'yearsOfExperience' ? parseInt(value, 10) : value
    };
    
    setEditFormData({
      ...editFormData,
      skills: updatedSkills
    });
  };
  
  // Remove a skill
  const removeSkill = (index) => {
    const updatedSkills = [...editFormData.skills];
    updatedSkills.splice(index, 1);
    
    setEditFormData({
      ...editFormData,
      skills: updatedSkills
    });
  };
  
  // Follow user
  const followUser = () => {
    // In a real implementation, this would call the backend API
    // For now, we'll simulate an API call and update local state
    
    // Add current user to followers
    const updatedProfile = {
      ...profile,
      followers: [...profile.followers, 'current-user-id']
    };
    
    setProfile(updatedProfile);
  };
  
  // Unfollow user
  const unfollowUser = () => {
    // In a real implementation, this would call the backend API
    // For now, we'll simulate an API call and update local state
    
    // Remove current user from followers
    const updatedProfile = {
      ...profile,
      followers: profile.followers.filter(id => id !== 'current-user-id')
    };
    
    setProfile(updatedProfile);
  };
  
  // Render loading state
  if (loading) {
    return <div className="profile-loading">Loading profile...</div>;
  }
  
  // Render error state
  if (error) {
    return <div className="profile-error">Error: {error}</div>;
  }
  
  // Render profile not found
  if (!profile) {
    return <div className="profile-not-found">Profile not found</div>;
  }
  
  return (
    <div className="profile-container">
      {isEditing ? (
        <div className="profile-edit-form">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={editFormData.role}
                onChange={handleInputChange}
              >
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="coach">Coach</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={editFormData.bio}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about yourself"
              />
            </div>
            
            <div className="form-group">
              <label>Skills</label>
              {editFormData.skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <input
                    type="text"
                    placeholder="Skill name"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                  />
                  <select
                    value={skill.level}
                    onChange={(e) => updateSkill(index, 'level', e.target.value)}
                  >
                    <option value={1}>Beginner</option>
                    <option value={2}>Elementary</option>
                    <option value={3}>Intermediate</option>
                    <option value={4}>Advanced</option>
                    <option value={5}>Expert</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Years"
                    value={skill.yearsOfExperience}
                    onChange={(e) => updateSkill(index, 'yearsOfExperience', e.target.value)}
                    min="0"
                    max="50"
                  />
                  <button
                    type="button"
                    className="remove-skill-button"
                    onClick={() => removeSkill(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="add-skill-button"
                onClick={addSkill}
              >
                Add Skill
              </button>
            </div>
            
            <div className="form-group">
              <label htmlFor="majors">Majors (comma-separated)</label>
              <input
                type="text"
                id="majors"
                name="majors"
                value={editFormData.majors}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science, Mathematics"
              />
            </div>
            
            {editFormData.role === 'mentor' && (
              <div className="form-group">
                <label htmlFor="mentorshipAreas">Mentorship Areas (comma-separated)</label>
                <input
                  type="text"
                  id="mentorshipAreas"
                  name="mentorshipAreas"
                  value={editFormData.mentorshipAreas}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Development, Career Guidance"
                />
              </div>
            )}
            
            {editFormData.role === 'coach' && (
              <div className="form-group">
                <label htmlFor="coachingSpecialties">Coaching Specialties (comma-separated)</label>
                <input
                  type="text"
                  id="coachingSpecialties"
                  name="coachingSpecialties"
                  value={editFormData.coachingSpecialties}
                  onChange={handleInputChange}
                  placeholder="e.g., Leadership, Public Speaking"
                />
              </div>
            )}
            
            {(editFormData.role === 'mentor' || editFormData.role === 'coach') && (
              <>
                <div className="form-group">
                  <label htmlFor="availability">Availability</label>
                  <select
                    id="availability"
                    name="availability"
                    value={editFormData.availability}
                    onChange={handleInputChange}
                  >
                    <option value="available">Available</option>
                    <option value="limited">Limited Availability</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="hourlyRate">Hourly Rate ($)</label>
                  <input
                    type="number"
                    id="hourlyRate"
                    name="hourlyRate"
                    value={editFormData.hourlyRate}
                    onChange={handleInputChange}
                    min="0"
                    step="5"
                  />
                </div>
              </>
            )}
            
            <div className="form-section">
              <h3>Social Links</h3>
              
              <div className="form-group">
                <label htmlFor="website">Website</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={editFormData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="linkedin">LinkedIn</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={editFormData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="github">GitHub</label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={editFormData.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username"
                />
              </div>
    <response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>
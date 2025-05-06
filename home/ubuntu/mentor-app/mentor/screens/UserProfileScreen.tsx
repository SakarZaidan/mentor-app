import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

type UserProfile = {
  name: string;
  role: 'student' | 'coach' | 'mentor' | 'learner';
  major: string;
  bio: string;
};

export default function UserProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    role: 'student',
    major: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/profile');

        if (response.data.success) {
          setProfile(response.data.profile);
        } else {
          Alert.alert('Error', response.data.message || 'Failed to load profile');
        }
      } catch (error) {
        console.error('Profile load error:', error);
        Alert.alert('Error', 'Failed to load profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (key: keyof UserProfile, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const saveProfile = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/profile', profile);

      if (response.data.success) {
        Alert.alert('Profile', 'Profile saved successfully!');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Profile save error:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profile.name}
        onChangeText={text => handleChange('name', text)}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Role:</Text>
        <Picker
          selectedValue={profile.role}
          style={styles.picker}
          onValueChange={(value: string) => handleChange('role', value)}
        >
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Coach" value="coach" />
          <Picker.Item label="Mentor" value="mentor" />
          <Picker.Item label="Learner" value="learner" />
        </Picker>
      </View>
      {profile.role === 'student' && (
        <TextInput
          style={styles.input}
          placeholder="Major"
          value={profile.major}
          onChangeText={text => handleChange('major', text)}
        />
      )}
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Bio"
        value={profile.bio}
        onChangeText={text => handleChange('bio', text)}
        multiline
      />
      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2d3748',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 4,
  },
  picker: {
    height: 40,
    width: '100%',
  },
});

// AuthScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleForgotPassword = async () => {
    try {
      if (!email) {
        Alert.alert('Error', 'Please enter your email');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/auth/forgot-password', {
        email
      });

      if (response.data.success) {
        Alert.alert('Forgot Password', 'Please check your email to reset your password');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send reset password email');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      Alert.alert('Error', 'Failed to send reset password email. Please try again.');
    }
  };

  const handleRegister = async () => {
    try {
      if (!email || !password || !username) {
        Alert.alert('Error', 'Please enter email, username and password');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
        username
      });

      if (response.data.success) {
        Alert.alert('Register', 'Register successful!');
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', 'Failed to register. Please try again.');
    }
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert('Error', 'Please enter email and password');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        Alert.alert('Login', 'Login successful!');
        onLoginSuccess();
      } else {
        Alert.alert('Error', response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mentor App Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Forgot Password" onPress={handleForgotPassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Mentor</Text>
      <Text style={styles.sectionTitle}>Main Features</Text>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Hobbies & Skills</Text>
        <Text style={styles.cardDesc}>Track, improve, and showcase your hobbies and skills.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>To-Do List</Text>
        <Text style={styles.cardDesc}>Organize your tasks, let AI optimize your productivity.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Projects</Text>
        <Text style={styles.cardDesc}>Manage and share your projects with the community.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>AI Assistance</Text>
        <Text style={styles.cardDesc}>Get personalized guidance for your goals and interests.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Social Feed</Text>
        <Text style={styles.cardDesc}>See posts, reels, and threads tailored to your interests.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Mentorship & Networking</Text>
        <Text style={styles.cardDesc}>Connect with mentors, coaches, and peers.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Gamification</Text>
        <Text style={styles.cardDesc}>Earn badges, level up, and track your achievements.</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Pomodoro Timer</Text>
        <Text style={styles.cardDesc}>Boost focus and productivity with built-in Pomodoro.</Text>
      </TouchableOpacity>
      {/* Add more feature cards as needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#2d3748',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#4a5568',
  },
  card: {
    width: '100%',
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#4a5568',
  },
});

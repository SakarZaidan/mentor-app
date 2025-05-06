import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

type Mentor = {
  id: string;
  name: string;
  expertise: string;
  isFollowing: boolean;
};

const mockMentors: Mentor[] = [
  { id: '1', name: 'Dr. Smith', expertise: 'AI & Machine Learning', isFollowing: false },
  { id: '2', name: 'Jane Doe', expertise: 'Painting & Art', isFollowing: false },
  { id: '3', name: 'Coach Mike', expertise: 'Fitness & Health', isFollowing: false },
];

export default function MentorshipScreen() {
  const [mentors, setMentors] = useState<Mentor[]>(mockMentors);
  const [search, setSearch] = useState('');

  const toggleFollow = (id: string) => {
    setMentors(mentors =>
      mentors.map(m =>
        m.id === id ? { ...m, isFollowing: !m.isFollowing } : m
      )
    );
  };

  const filteredMentors = mentors.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.expertise.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mentorship & Networking</Text>
      <TextInput
        style={styles.input}
        placeholder="Search mentors by name or expertise"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredMentors}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.expertise}>{item.expertise}</Text>
            <TouchableOpacity
              style={[
                styles.followBtn,
                item.isFollowing ? styles.following : styles.notFollowing,
              ]}
              onPress={() => toggleFollow(item.id)}
            >
              <Text style={styles.followText}>
                {item.isFollowing ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No mentors found.</Text>}
      />
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
  card: {
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 4,
  },
  expertise: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 8,
  },
  followBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginTop: 4,
  },
  following: {
    backgroundColor: '#bee3f8',
  },
  notFollowing: {
    backgroundColor: '#3182ce',
  },
  followText: {
    color: '#2d3748',
    fontWeight: 'bold',
  },
  empty: {
    color: '#a0aec0',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});

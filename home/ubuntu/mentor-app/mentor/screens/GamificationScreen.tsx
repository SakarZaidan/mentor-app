import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type Badge = {
  id: string;
  name: string;
  description: string;
  achieved: boolean;
};

const mockBadges: Badge[] = [
  { id: '1', name: 'Beginner', description: 'Complete your first task', achieved: true },
  { id: '2', name: 'Streak', description: 'Complete tasks 7 days in a row', achieved: false },
  { id: '3', name: 'Mentor', description: 'Help another user', achieved: false },
  { id: '4', name: 'Level Up', description: 'Reach level 5 in any skill', achieved: false },
];

export default function GamificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements & Badges</Text>
      <FlatList
        data={mockBadges}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.badge, item.achieved ? styles.achieved : styles.locked]}>
            <Text style={styles.badgeName}>{item.name}</Text>
            <Text style={styles.badgeDesc}>{item.description}</Text>
            <Text style={styles.status}>{item.achieved ? 'Achieved' : 'Locked'}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No badges yet.</Text>}
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
  badge: {
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achieved: {
    borderColor: '#38a169',
    borderWidth: 2,
  },
  locked: {
    borderColor: '#a0aec0',
    borderWidth: 2,
  },
  badgeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 4,
  },
  badgeDesc: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 8,
  },
  status: {
    fontWeight: 'bold',
    color: '#38a169',
  },
  empty: {
    color: '#a0aec0',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});

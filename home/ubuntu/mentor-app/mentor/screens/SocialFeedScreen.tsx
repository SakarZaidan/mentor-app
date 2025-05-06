import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

type Post = {
  id: string;
  type: 'post' | 'reel' | 'thread';
  author: string;
  content: string;
};

const mockPosts: Post[] = [
  { id: '1', type: 'post', author: 'Alice', content: 'Check out my new painting!' },
  { id: '2', type: 'reel', author: 'Bob', content: 'Watch my latest guitar solo!' },
  { id: '3', type: 'thread', author: 'Carol', content: 'What are your favorite productivity hacks?' },
];

export default function SocialFeedScreen() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.card}>
      <Text style={styles.type}>{item.type.toUpperCase()}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <View style={styles.actions}>
        <TouchableOpacity>
          <Text style={styles.action}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.action}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.action}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        ListEmptyComponent={<Text style={styles.empty}>No posts yet.</Text>}
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
  type: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#805ad5',
    marginBottom: 4,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 4,
  },
  content: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  action: {
    color: '#3182ce',
    fontWeight: 'bold',
    marginRight: 16,
  },
  empty: {
    color: '#a0aec0',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});

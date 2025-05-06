import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Project = {
  id: string;
  title: string;
  description: string;
};

export default function ProjectScreen() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const addProject = () => {
    if (title.trim() === '') return;
    setProjects([
      ...projects,
      { id: Date.now().toString(), title, description }
    ]);
    setTitle('');
    setDescription('');
  };

  const removeProject = (id: string) => {
    setProjects(projects => projects.filter(project => project.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Project Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Add" onPress={addProject} />
      </View>
      <FlatList
        data={projects}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.projectRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.projectTitle}>{item.title}</Text>
              <Text style={styles.projectDesc}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => removeProject(item.id)}>
              <Text style={styles.remove}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No projects yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2d3748',
  },
  inputRow: {
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 8,
    fontSize: 16,
  },
  projectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b6cb0',
  },
  projectDesc: {
    fontSize: 14,
    color: '#4a5568',
  },
  remove: {
    color: '#e53e3e',
    fontSize: 18,
    marginLeft: 12,
  },
  empty: {
    color: '#a0aec0',
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
  },
});

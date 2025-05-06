import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TodoListScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([
      ...todos,
      { id: Date.now().toString(), text: input, completed: false }
    ]);
    setInput('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={input}
          onChangeText={setInput}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <TouchableOpacity onPress={() => toggleTodo(item.id)}>
              <Text style={[styles.todoText, item.completed && styles.completed]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeTodo(item.id)}>
              <Text style={styles.remove}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet.</Text>}
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
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 8,
    fontSize: 16,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  todoText: {
    fontSize: 16,
    color: '#2d3748',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#a0aec0',
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

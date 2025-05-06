import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

type Message = {
  id: string;
  sender: string;
  text: string;
};

const mockMessages: Message[] = [
  { id: '1', sender: 'Alice', text: 'Hey, how are you?' },
  { id: '2', sender: 'You', text: 'I am good! Working on my project.' },
  { id: '3', sender: 'Bob', text: 'Anyone up for a Pomodoro session?' },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (input.trim() === '') return;
    setMessages(msgs => [
      ...msgs,
      { id: Date.now().toString(), sender: 'You', text: input }
    ]);
    setInput('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Chat</Text>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.message,
            item.sender === 'You' ? styles.userMsg : styles.otherMsg
          ]}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
        )}
        style={styles.chat}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2d3748',
  },
  chat: {
    flex: 1,
    marginBottom: 12,
  },
  message: {
    marginBottom: 8,
    padding: 12,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#bee3f8',
  },
  otherMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#f7fafc',
  },
  sender: {
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 2,
  },
  msgText: {
    fontSize: 16,
    color: '#2d3748',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
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
});

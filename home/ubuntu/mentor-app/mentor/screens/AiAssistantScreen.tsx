import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export default function AiAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hi! I am your AI assistant. How can I help you with your hobbies, skills, or projects today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "I'm here to help! (AI response placeholder)"
        }
      ]);
    }, 1000);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant</Text>
      <ScrollView style={styles.chat} contentContainerStyle={{ paddingBottom: 16 }}>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.message,
              msg.sender === 'user' ? styles.userMsg : styles.aiMsg
            ]}
          >
            <Text style={styles.msgText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
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
  aiMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#f7fafc',
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

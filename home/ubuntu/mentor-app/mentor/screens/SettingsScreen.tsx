import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setDarkModeEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={notificationsEnabled}
        />
      </View>

      <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkModeEnabled}
        />
      </View>

      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingLabel}>Account Settings</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingLabel}>Privacy Policy</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingRow}>
        <Text style={styles.settingLabel}>Terms of Service</Text>
        <Text style={styles.arrow}>{'>'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.settingRow, styles.logout]}>
        <Text style={[styles.settingLabel, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
    color: '#2d3748',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#4a5568',
  },
  arrow: {
    fontSize: 18,
    color: '#a0aec0',
  },
  logout: {
    borderBottomWidth: 0,
    marginTop: 24,
  },
  logoutText: {
    color: '#e53e3e',
    fontWeight: 'bold',
  },
});

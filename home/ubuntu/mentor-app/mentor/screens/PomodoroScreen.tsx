import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const WORK_DURATION = 25 * 60; // 25 minutes
const BREAK_DURATION = 5 * 60; // 5 minutes

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function PomodoroScreen() {
  const [seconds, setSeconds] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (prev === 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setIsWork(!isWork);
            return isWork ? BREAK_DURATION : WORK_DURATION;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isWork]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(isWork ? WORK_DURATION : BREAK_DURATION);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro Timer</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <Text style={styles.mode}>{isWork ? 'Work' : 'Break'}</Text>
      <View style={styles.buttonRow}>
        <Button title={isRunning ? "Pause" : "Start"} onPress={isRunning ? pause : start} />
        <Button title="Reset" onPress={reset} />
      </View>
      <Text style={styles.tip}>25 min work / 5 min break</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#2d3748',
  },
  timer: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 8,
  },
  mode: {
    fontSize: 20,
    color: '#4a5568',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  tip: {
    color: '#a0aec0',
    fontSize: 16,
    marginTop: 16,
  },
});

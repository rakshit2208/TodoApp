// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      {/* You can replace this with your logo or any image */}
      <Image
        source={{ uri: 'https://img.freepik.com/premium-vector/list-planning-checklist-notepad-paper-daily-task-agreement-concept-illustration_270158-539.jpg' }} // Replace with your image
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to My Todo App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    fontStyle:'italic'
  },
});

export default SplashScreen;

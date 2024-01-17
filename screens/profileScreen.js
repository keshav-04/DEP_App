// Import necessary React Native components
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Functional component for the profile page
export default function Profile({ navigation}) {
  return (
    <View style={styles.container}>
      {/* Profile picture */}
      <Image
        source={{ uri: 'https://placekitten.com/200/200' }} // Replace with your image URL
        style={styles.profileImage}
      />

      {/* User information */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john.doe@example.com</Text>
      </View>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
  },
});
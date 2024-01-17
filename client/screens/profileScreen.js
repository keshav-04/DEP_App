// ProfileScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements';

const ProfileScreen = ({ navigation }) => {
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John',
    phoneNumber: '9876543021',
    email: 'john.doe@example.com',
    department: 'Computer Science',
    batch: '2021',
    address: '123 Main Street',
  });

  const handleEditPress = () => {
    setEditing(!editing);
  };

  const handleSavePress = () => {
    setEditing(false);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#bdf'}}>
      <ScrollView style={styles.container}>
        <View style={styles.profileHeader}>
          <Icon name="user-circle" type="font-awesome" size={80} color="#3498db" />
          <Text h3 style={styles.title}>
            Your Profile
          </Text>
        </View>
        <View style={styles.profileContainer}>
          <Input
            label="Name"
            value={profileData.name}
            leftIcon={<Icon name="user" type="font-awesome" />}
            disabled={!editing}
            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
            />
          <Input
            label="Phone Number"
            value={profileData.phoneNumber}
            leftIcon={<Icon name="phone" type="font-awesome" />}
            disabled={!editing}
            onChangeText={(text) => setProfileData({ ...profileData, phoneNumber: text })}
            />
          <Input
            label="Email"
            value={profileData.email}
            leftIcon={<Icon name="envelope" type="font-awesome" />}
            disabled={!editing}
            onChangeText={(text) => setProfileData({ ...profileData, email: text })}
            />
          <Input
            label="Department"
            value={profileData.department}
            leftIcon={<Icon name="building" type="font-awesome" />}
            disabled={!editing}
            onChangeText={(text) => setProfileData({ ...profileData, department: text })}
            />
          <Input
            label="Batch"
            value={profileData.batch}
            leftIcon={<Icon name="graduation-cap" type="font-awesome" />}
            disabled={!editing}
            onChangeText={(text) => setProfileData({ ...profileData, ba: text })}
            />
          {editing ? (
            <Button
            title="Save Changes"
            buttonStyle={styles.saveButton}
            onPress={handleSavePress}
            />
            ) : (
              <Button
              title="Edit Profile"
              buttonStyle={styles.editButton}
              onPress={handleEditPress}
              />
              )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    backgroundColor: '#bdf',
    padding: 20,
    marginBottom: 10,
  },
  profileHeader: {
    // justifyContent: 'center',
    
    alignItems: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#3498db',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#2ecc71',
    marginTop: 20,
  },
});

export default ProfileScreen;

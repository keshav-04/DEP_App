// ProfileScreen.js
import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Button, Input, Text, Icon } from 'react-native-elements';
import { update_profile_route, get_profile_route } from "../utilities/API_routes";
import { useFocusEffect } from '@react-navigation/native';


const ProfileScreen = ({ route, navigation }) => {
  const {email_} = route.params;
  console.log(email_);
  const [edit, setEdit] = useState(false);
  const [userProfile, setUserProfile] = useState({
    photo: '',
    name: 'John',
    phoneNumber: '9876543021',
    email: email_,
    department: 'Computer Science',
    batch: '2021',
    address: '123 Main Street',
  });

  const handleValidation = () => {
    const { name, email, phoneNumber } = userProfile;
    if (email === '') {
      Alert.alert('Error', 'Email is required!');
      return false;
    }
    else  if (!/^[a-zA-Z0-9._-]+@iitrpr\.ac\.in$/.test(email)) {
      Alert.alert('Error', 'Invalid email address or not from iitrpr.ac.in domain!');
      // setUserProfile({...userProfile, email:""})
      return false;
    }
    else if (name === '') {
      Alert.alert('Error', 'Name is required!');
      return false;
    } else if (phoneNumber === '') {
      Alert.alert('Error', 'Phone number is required!')
      return false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Error', 'Phone number should have exactly 10 digits!');
      // setUserProfile({...userProfile, phoneNumber:""})
      return false;
    }
    return true;
  };

  const handleEditPress = () => {
    setEdit(true);
  };

  // const handleSavePress = () => {
  //   if (!handleValidation()) {
  //     setEdit(false);
  //   }
  //   else
  //     return;
  // };

  // useEffect(() => {
    const fetchData = async() => {
      console.log("inside");
        try {
            const response = await  fetch(get_profile_route+`/${userProfile.email}`, {
              method: 'GET'
            });
            const data = await response.json();
            console.log("response", data)
            // console.log("DATA:  " , data);
            // console.log("OK : ", data.ok, " AUTH : ", data.auth);
            if (data.ok) {
                const res = data.resUser;
                
                setUserProfile(res);
                // localStorage.removeItem("user");
                // localStorage.setItem("user", JSON.stringify(res));
                // dispatch({ type: "LOGIN", payload: res });
                Alert.alert("Success", "Profile fetched successfully");
            
            } 
            // else if (data.auth === false) {
            //     Alert.alert("Error", "Token Expired/Tampered, Please Login again");
            //     logout(true);
            // } 
            else {
                Alert.alert("Error", "Error in fetching the profile, Please try again later.");
            };
        } catch (error) {         
            Alert.alert("Error", "ERROR in fetching the profile, Please try again later.")

        } 
    };
//     fetchData();
// }, [email_]); 
useFocusEffect(
  useCallback(() => {
    fetchData();
  }, [])
);

// const [loading, setLoading] = useState(false);

const handleSave = async() => {
  if(!handleValidation()) return;
  setEdit(false);
  // console.log("USERPROFILE: ", userProfile);
  try {
        const response = await  fetch(update_profile_route, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userProfile)
        });
        // console.log("respomse", response)
        const data = await response.json();
      // console.log("DATA:  " , data);
      // console.log("OK : ", data.ok, " AUTH : ", data.auth);
      if (data.ok) {
          const res = data.resUser;
          
          setUserProfile(res);
          // localStorage.removeItem("user");
          // localStorage.setItem("user", JSON.stringify(res));
          // dispatch({ type: "LOGIN", payload: res });
          Alert.alert("Success", "Profile updated successfully");
      
      } 
      // else if (data.auth === false) {
      //     notifyError("Token Expired/Tampered, Please Login again");
      //     logout(true);
      // } 
      else {
          Alert.alert('Error', "Error in updating the profile, Please try again later.")
      };
  } catch (error) {
      Alert.alert("Error", "ERROR in updating the profile, Please try again later.");          
  }    
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
            label="Name*"
            value={userProfile.name}
            leftIcon={<Icon name="user" type="font-awesome" />}
            disabled={!edit}
            onChangeText={(text) => setUserProfile({ ...userProfile, name: text })}
            />
          <Input
            keyboardType='numeric'
            label="Phone Number*"
            value={userProfile.phoneNumber}
            leftIcon={<Icon name="phone" type="font-awesome" />}
            disabled={!edit}
            onChangeText={(text) => setUserProfile({ ...userProfile, phoneNumber: text })}
            />
          <Input
            label="Email*"
            value={userProfile.email}
            leftIcon={<Icon name="envelope" type="font-awesome" />}
            disabled={true}
            onChangeText={(text) => setUserProfile({ ...userProfile, email: text })}
            />
          <Input
            label="Department"
            value={userProfile.department}
            leftIcon={<Icon name="building" type="font-awesome" />}
            disabled={!edit}
            onChangeText={(text) => setUserProfile({ ...userProfile, department: text })}
            />
          <Input
            label="Batch"
            value={userProfile.batch}
            leftIcon={<Icon name="graduation-cap" type="font-awesome" />}
            disabled={!edit}
            onChangeText={(text) => setUserProfile({ ...userProfile, batch: text })}
            />
          {edit ? (
            <Button
            title="Save Changes"
            buttonStyle={styles.saveButton}
            onPress={handleSave}
            />
            ) : (
              <Button
              title="Edit Profile"
              buttonStyle={styles.editButton}
              onPress={handleEditPress}
              />
              )}
        </View>
        <Text style={{color: '#075eec', alignItems: 'center'}} onPress={() => {navigation.navigate('homeScreen', {email:email_})}} >Home</Text>
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

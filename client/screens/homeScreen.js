import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

export default function HomeScreen({ route, navigation}) {
  const { email } = route.params;
  console.log('home' + email);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#bdf'}}>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => {navigation.navigate('profileScreen', {email_:email})}}>
        <Icon name="user" type="font-awesome" size={40} color="#000" />
      </TouchableOpacity>
    </View>
      <View style= {styles.container}>
        <View style={styles.header}>

          <Text style={styles.title}>
            Welcome to <Text style={{color:'#075eec'}}>MyApp</Text>
          </Text>
        </View>

        <View >
          <Text style={styles.footer}>
          {/* <Text style={{color: '#075eec'}} onPress={() => {navigation.navigate('profileScreen', {email_:email})}} >Profile </Text> */}
          {/* <Text style={{color: '#075eec'}} onPress={() => {navigation.navigate('Login')}} >Logout </Text> */}
           <Icon reverse name="sign-out-alt" type="font-awesome-5" onPress={() => {navigation.navigate('Login')}} size={25} 
            flexDirection="column" />
          {/* from profile */}
          </Text>
        </View>
        
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  header: {
    marginVertical: 360,
  },
  headerContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1e1e1e',
    textAlign: 'center',
    marginTop: -60
    // marginBottom: 6,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
    marginBottom: 12,
  },
  footer: {
    fontSize: 18,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
    letterSpacing: 0.15,
    marginTop: -10,
  },
});
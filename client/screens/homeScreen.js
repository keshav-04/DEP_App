import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

export default function HomeScreen({ route, navigation}) {
  const { email } = route.params;
  console.log('home' + email);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#bdf'}}>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => {navigation.navigate('profileScreen')}}>
        <Icon name="user" type="font-awesome" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
      <View style= {styles.container}>
        <View style={styles.header}>

          <Text style={styles.title}>
            Welcome to <Text style={{color:'#075eec'}}>MyApp</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
        </View>

        <View >
          <Text style={styles.footer}>
          <Text style={{color: '#075eec'}} onPress={() => {navigation.navigate('profileScreen', {email_:email})}} >Profile </Text>
              <Text style={{color: '#075eec'}} onPress={() => {navigation.navigate('Login')}} >Logout </Text>
							from profile
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1e1e1e',
    textAlign: 'center',
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
  },
});
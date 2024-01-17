import * as React from 'react';
import { useState } from 'react';
// import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/LoginScreen';
import SignUp from './screens/SignupScreen';
import OTPScreen from './screens/OTPscreen';
import HomeScreen from './screens/homeScreen';
import Profile from './screens/profileScreen';
 
const Stack = createNativeStackNavigator();

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    otp: '',
    isOtpSent: false,
    isLoading: false,
  });
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="homeScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          initialParams={{ form, setForm }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          initialParams={{ form, setForm }}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen name="" component={} /> */}
        <Stack.Screen name="homeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

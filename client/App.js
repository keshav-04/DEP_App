import * as React from 'react';
import { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/LoginScreen';
import SignUp from './screens/SignupScreen';
import OTPScreen from './screens/OTPscreen';  
import HomeScreen from './screens/homeScreen';
import Profile from './screens/profileScreen';
 
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

function App() {
  // const [form, setForm] = useState({
  //   name: '',
  //   email: '',
  //   phoneNumber: '',
  //   otp: '',
  //   isOtpSent: false,
  //   isLoading: false,
  // });

  const [otpEmail, setOtpEmail] = useState("");
  const inputObject = {
    otpEmail,
    setOtpEmail
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          // initialParams={inputObject}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          // initialParams={inputObject}
          // initialParams={{ form, setForm }}
          // options={{ headerShown: false }}
        />
        <Stack.Screen name='homeScreen' component={HomeScreen} />
        <Stack.Screen name='profileScreen' component={Profile} />
        {/* <Drawer.Navigator>
          <Drawer.Screen name="homeScreen" component={HomeScreen} />
          <Drawer.Screen name="profileScreen" component={Profile} />
        </Drawer.Navigator> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

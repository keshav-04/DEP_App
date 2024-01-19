import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { useRoute } from '@react-navigation/native';
import {
  login_route,
  register_route,
  sendotp_route,
  verifyotp_route,
} from "../utilities/API_routes";

export default function OTPScreen({route, navigation}) {
  // const { form, setForm } = x.params
  const {email, name, phoneNumber, source} = route.params;
  // console.log(name, phoneNumber);
  const [form, setForm] = useState({
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    otp: ''
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showResendNow, setShowResendNow] = useState(false);
  const resendTime = 60000; 
  useEffect(() => {
    // Set a timer to toggle the state after 1 minute (60000 milliseconds)
    const timerId = setTimeout(() => {
      setShowResendNow(true);
    }, resendTime);

    // Clear the timer if the component unmounts before it fires
    return () => clearTimeout(timerId);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleSubmit = async () => {
    
    // setForm({ ...form, isLoading: true });
    setShowResendNow(false);
    const timerId = setTimeout(() => {
      setShowResendNow(true);
    }, resendTime);
    setIsLoading(true);
    
    try {
      const { email } = form;
      const data = { email };
      
      const response = await fetch(sendotp_route, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const receivedData = await response.json();
      setIsLoading(false);
      if (receivedData.status === 'false') {
        Alert.alert('Error', 'Failed to send OTP');
      } else {
        Alert.alert('Success', 'OTP sent successfully to your email.\nPlease check Spam too.');
        setIsOtpSent(true);
      }
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Error', err.message);
    }
  };

  const login = async () => {
    const { email } = form;

    const user = {
      email
    };

    try {
      const response = await fetch(login_route, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      // console.log("respomse", response)
      const receivedData = await response.json();

      if (receivedData.status === 'false') {
        Alert.alert('Error', receivedData.error);
        navigation.navigate('Login');
        setForm({ ...form, name: '', email: '', phoneNumber: '', otp: '', isOtpSent: false});
        throw new Error();
      } else {
        Alert.alert('Success', 'Logged in successfully!');
        // navigation.navigate('homeScreen', {email}); // navigate to home
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to log in.');
      navigation.navigate('Login');
      setForm({ ...form, name: '', email: '', phoneNumber: '', otp: '', isOtpSent: false});
      throw new Error();
    }
    
  }

  const signUp = async () => {
    
    const { name, email, phoneNumber } = form;

    const user = {
      name,
      email,
      phoneNumber,
    };

    try {
      const response = await fetch(register_route, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      // console.log("respomse", response)
      const receivedData = await response.json();

      if (receivedData.status === 'false') {
        Alert.alert('Error', receivedData.error);
        navigation.navigate('Signup');
        setForm({ ...form, name: '', email: '', phoneNumber: '', otp: '', isOtpSent: false});
        throw new Error();
      } else {
        Alert.alert('Success', 'Account created successfully!');
        // navigation.navigate('homeScreen', {email}); // navigate to home
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to create an account. Please try again later.');
      navigation.navigate('Signup');
      setForm({ ...form, name: '', email: '', phoneNumber: '', otp: '', isOtpSent: false});
      throw new Error();
    }
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    try {
      const { email, otp } = form;
      const data = { email, otp };
      

       const response = await fetch(verifyotp_route, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      // console.log("respomse", response)
      const receivedData = await response.json();
      setIsLoading(false);
      if (receivedData.status === 'false') {
        Alert.alert('Error', receivedData.error);
        // navigation.navigate('Signup')
      } else {
        console.log("HEEEE")
        if(source === "login")
        {
          await login();
        }
        else if (source === "signup") {
          await signUp();
        }
        // if (source === 'SignUp') {
         navigation.navigate('homeScreen', {email}); // navigate to home
         setForm({ ...form, name: '', email: '', phoneNumber: '', otp: '', isOtpSent: false});
      }
    } catch {
      Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
      if (source === 'login') {
        navigation.navigate('Login');
        setForm({ ...form, name: '', email: '', phoneNumber: '', otp: '', isOtpSent: false});

      }
      else if (source === 'signup') {
        navigation.navigate('Signup');
        setForm({ ...form, name: '', email: '', phoneNumber: '', otp: '', isOtpSent: false});

      }
    }

  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#bdf'}}>
      <View style= {styles.container}>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>OTP</Text>

            <TextInput
							secureTextEntry={true}
							keyboardType='numeric'
              style={styles.inputFeild}
              placeholder="******"
              placeholderTextColor="#ccc"
              value={form.otp}
              onChangeText={(otp) => setForm({...form, otp })}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity  
              onPress={() => {
                // handle onPress
								handleOtpSubmit()
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Verify OTP</Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            showResendNow ? (
              <Text style={styles.formFooter}>
                Didn't receive OTP code?
                <Text style={{color:'#075eec'}} onPress={handleSubmit}> Resend OTP </Text>
              </Text>
            ) : (
              <Text style={styles.formFooter}> Resend OTP in a minute </Text>
            )
          }
          <Text style={styles.formFooter}>
            Don't have an account? 
              <Text style={{color: '#075eec'}} onPress={() => {navigation.navigate('Signup')}} > Sign up</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  inputFeild: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    // marginBottom: 12,
    
  },
  form: {
		marginVertical: 340,
    marginBottom: 24,
    flex: 1,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 18,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  btn: {
    backgroundColor: '#075eec',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#075eec',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    // paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

});
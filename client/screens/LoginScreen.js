import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import {
  sendotp_route, get_profile_route
} from "../utilities/API_routes";
import { useIsFocused } from '@react-navigation/native';
// import { useRoute } from "@react-navigation/native";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: '',
    otp: '',
    isOtpSent: false,
    isLoading: false,
  });

  // const _route = useRoute();

  const [isLoading, setisLoading] = useState(false);

  const handleValidation = () => {
    const { email } = form;
    if (email === '') {
      Alert.alert('Error', 'Email is required!');
      return false;
    }
    else if (!/^[a-zA-Z0-9._-]+@iitrpr\.ac\.in$/.test(email)) {
      Alert.alert('Error', 'Invalid email address or not from iitrpr.ac.in domain!');
      return false;
    }
    return true;
  }

  // const isFocused = useIsFocused();

  // useEffect(() => {
  //   // Clear the form fields when returning to this screen
  //   if (isFocused && form.isOtpSent) {
  //     setForm({ ...form, email: '', otp: '', isOtpSent: false });
  //   }
  // }, [isFocused, form.isOtpSent]);
  
  const handleSubmit = async () => {
    if (!handleValidation()) return;

    // setForm({ ...form, isLoading: true });
    setisLoading(true);

    try {
      const response = await fetch(get_profile_route  + `/${form.email}`, {
        method: 'GET'
      });
      // console.log("respomse", response)
      const receivedData = await response.json();
      if(receivedData.ok === false)
      {
        Alert.alert('Error', 'Email does not exist');
        return;
      }
      
    } catch (error) {
      Alert.alert('Error', error.message);
    }

    try {
      const { email } = form;
      const data = { email };

      console.log("here46")
      // const response = await axios.post(sendotp_route, data);
      const response = await fetch(sendotp_route, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      // console.log("respomse", response)
      const receivedData = await response.json();

      setisLoading(false);

      if (receivedData.status === 'false') {
        Alert.alert('Error', 'Failed to send OTP');
      } else {
        Alert.alert('Success', 'OTP sent successfully to your email.\nPlease check Spam too.');
        setForm({ ...form, isOtpSent: true });
        navigation.navigate('OTPScreen', {...form, source:"login"});
        setForm({ ...form, email: '', otp: '', isOtpSent: false});
        // setForm((form)=>form.email = "")
        console.log(email, "email");
      }

      // setForm({ ...form, isOtpSent: true });
    } catch (err) {
      Alert.alert('Error', err.message);
    }

    setForm({ ...form, isLoading: false });
  };


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#bdf'}}>
      <View style= {styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../assets/welcome.png')}
            style={styles.headerImg}
            alt = "Welcome"
          />

          <Text style={styles.title}>
            Sign in to <Text style={{color:'#075eec'}}>MyApp</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get access to your portfolio and more
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='email-address'
              style={styles.inputFeild}
              placeholder="john@example.com"
              placeholderTextColor="#ccc"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity  
              onPress={() => {
                // handle onPress
                handleSubmit()
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
          
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
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 25,
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


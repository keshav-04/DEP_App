import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
// import axios from 'axios';
import {
  sendotp_route, get_profile_route
} from "../utilities/API_routes";
// import { useRoute } from "@react-navigation/native";

export default function SignUp({ navigation }) {
  // const { form, setForm } = x.params
  // const { form, setForm } = route.params || {};
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    otp: '',
    isOtpSent: false,
    isLoading: false,
  });

  // const _route = useRoute();
   
  const [isLoading, setisLoading] = useState(false);

  const handleValidation = () => {
    const { name, email, phoneNumber } = form;
    if (email === '') {
      Alert.alert('Error', 'Email is required!');
      return false;
    }
    else if (!/^[a-zA-Z0-9._-]+@iitrpr\.ac\.in$/.test(email)) {
      Alert.alert('Error', 'Invalid email address or not from iitrpr.ac.in domain!');
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
      return false;
    }
    return true;
  };

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
      if(receivedData.ok === true)
      {
        Alert.alert('Error', 'Email already exists');
        return;
      }
      
    } catch (error) {
      Alert.alert('Error', error.message);
    }

    try {
      const { email } = form;
      const data = { email };
      
      console.log("here23")
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
      // console.log("receivedData", receivedData)
      setisLoading(false);
      if (receivedData.status === 'false') {
        Alert.alert('Error', 'Failed to send OTP');
      } else {
        Alert.alert('Success', 'OTP sent successfully to your email.\nPlease check Spam too.');
        setForm({ ...form, isOtpSent: true });
        navigation.navigate('OTPScreen', {...form, source:"signup"});
        setForm({ ...form, name: '', email: '', phoneNumber: '', otp: '', isOtpSent: false});
      }
    } catch (err) {
      // setisLoading(false);
      Alert.alert('Error', err.message);
    }
    // setForm({ ...form, isLoading: false });
  };

  return (

    <SafeAreaView style={{flex: 1, backgroundColor: '#bdf'}}>
      <ScrollView style={{marginBottom: 10}}>
        <View style= {styles.container}>
          <View style={styles.header}>
            <Image
              source={require('../assets/welcome.png')}
              style={styles.headerImg}
              alt = "Welcome"
            />

            <Text style={styles.title}>
              Sign Up
            </Text>
            <Text style={styles.subtitle}>
            Explore, Grow, Begin Now!
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Name</Text>

              <TextInput
                autoCapitalize='words'
                autoCorrect={false}
                style={styles.inputFeild}
                placeholder="John Doe"
                placeholderTextColor="#ccc"
                value={form.name}
                onChangeText={(name) => setForm({ ...form, name })}
              />
            </View>

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

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Phone number</Text>

              <TextInput
                keyboardType='phone-pad'
                style={styles.inputFeild}
                placeholder="9876543210"
                placeholderTextColor="#ccc"
                value={form.phoneNumber}
                onChangeText={(phoneNumber) => setForm({ ...form, phoneNumber })}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity  
                onPress={() => {
                  // handle onPress

                  handleSubmit()
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign up</Text>
                </View>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.formFooter}>
              Already have an account?
                <Text style={{color: '#075eec'}} onPress={() => {navigation.navigate('Login')}} > Sign in</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 30,
  },
  headerImg: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
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
    // marginBottom: 2,
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
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
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
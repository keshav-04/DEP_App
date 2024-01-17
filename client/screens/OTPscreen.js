import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {
  register_route,
  verifyotp_route,
} from "../utilities/API_routes";

export default function OTPScreen({ navigation, route: x }) {
  // const { form, setForm } = x.params
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    otp: '',
    isOtpSent: true,
    isLoading: false,
  });

  // const route = useRoute();
  // const source = route.params?.source || 'Unknown';
// karan
  const signUp = async () => {
    
    const { name, email, phoneNumber } = form;

    const user = {
      name,
      email,
      phoneNumber,
    };

    try {
      const response = await axios.post(register_route, user);

      if (response.data.status === 'false') {
        Alert.alert('Error', response.data.error);
      } else {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('HomeScreen'); // navigate to home
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to create an account. Please try again later.');
    }
  };

  const handleOtpSubmit = async () => {
    setForm({ ...form, isLoading: true });

    try {
      const { email, otp } = form;
      const data = { email, otp };

      const response = await axios.post(verifyotp_route, data);

      if (response.data.status === 'false') {
        Alert.alert('Error', response.data.error);
      } else {
        if (source === 'SignUp') {
          await signUp();
        } else {
          Alert.alert('Success', 'Logged in successfully!');
         navigation.navigate('HomeScreen'); // navigate to home
        }
        setForm({ ...form, isOtpSent: false });
      }
    } catch {
      Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
    }

    setForm({ ...form, isLoading: false });
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
              placeholder="********"
              placeholderTextColor="#ccc"
              value={form}
              onChangeText={(val) => setForm({form: val})}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity  
              onPress={() => {
                // handle onPress
								handleOtpSubmit()
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.formFooter}>
            Didn't receive OTP code?
          	<Text style={{color:'#075eec'}} onPress={() => {navigation.navigate('Signup')}}> Resend OTP </Text>
          </Text>
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
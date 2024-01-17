import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function Login({ navigation}) {
  const [form, setForm] = useState({
    email: '',
    otp: '',
    isOtpSent: false,
    isLoading: false,
  });

  const handleValidation = () => {
    const { email } = form;
    if (email === '') {
      Alert.alert('Error', 'Email is required!');
      return false;
    }
    return true;
  }
  
  const handleSubmit = async () => {
    if (!handleValidation()) return;

    setForm({ ...form, isLoading: true });

    try {
      const { email } = form;
      const data = { email };

      const response = await axios.post(sendotp_route, data);

      if (response.status !== 200) {
        Alert.alert('Error', 'Failed to send OTP');
      } else {
        Alert.alert('Success', 'OTP sent successfully to your email.\nPlease check Spam too.');
        navigation.navigate('OTPScreen');
      }

      setForm({ ...form, isOtpSent: true });
    } catch (err) {
      Alert.alert('Error', 'Failed to login. Please try again later.');
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


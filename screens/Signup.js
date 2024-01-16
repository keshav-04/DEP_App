import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function SignUp({ navigation}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

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
            Sign Up
             {/* to <Text style={{color:'#075eec'}}>MyApp</Text> */}
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
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email })}
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
              placeholder="+91 9876543210"
              placeholderTextColor="#ccc"
              value={form.password}
              onChangeText={(password) => setForm({ ...form, password })}
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity  
              onPress={() => {
                // handle onPress
                navigation.navigate('OTPScreen')
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign up</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.formFooter}>
            Already have an account?
              <Text onPress={() => {navigation.navigate('Login')}} > Sign in</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
{/* <Button
  title="Go to Signup"
  onPress={() => navigation.navigate('Signup')}
/> */}

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
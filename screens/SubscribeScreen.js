import * as React from 'react';
import { View, Image, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { validateEmail } from '../utils';
import Button from "../components/Button";

const SubscribeScreen = () => {
  const [email, setEmail] = React.useState('');
  const isEmailValid = validateEmail(email);

  return (
    <View style={styles.container}>
      <Image 
      source={require('../assets/images/little-lemon-logo-grey.png')}
      accessible={true}
      accessibilityLabel={'Little Lemon Logo'}
      style={styles.logo}
      />
      <Text style={styles.title}>
        Subscribe to our newsletter for our latest delicious recipes!
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder={'Type your email'}
        keyboardType={'email-address'}
        textContentType="emailAddress"
      />
      <Button
        onPress={() => {
          Alert.alert("Thanks for subscribing, stay tuned!");
        }}
        disabled={!isEmailValid}
      >
        Subscribe
      </Button>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
  },
  title: {
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
  },
  logo: {
    height: 100,
    width: 300,
    resizeMode: "contain",
    marginBottom: 32,
  },
  input: {
    height: 40,
    marginVertical: 24,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
  },
});


export default SubscribeScreen;

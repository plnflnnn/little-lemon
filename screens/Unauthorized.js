import * as React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Hero from '../components/Hero';

const Unauthorized = ({ navigation }) => {

  return (
    <View style={styles.container}>
        <Hero/>
        <View style={styles.containerYellow}>
            <Text style={styles.title}>
                Are you hungry?
            </Text>
            <View style={styles.buttons}>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>

        </View>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4CE14",
    flexWrap: 'wrap',
    flexDirection: '',
    alignItems: 'center',
    alignContent: 'center'
  },
  title: {
    textAlign: 'center',
    color: "#000",
    textAlign: "center",
    fontSize: 25,
    paddingTop: 100,
  },
  buttons: {
   paddingTop: 60,
   textAlign: 'center',
   flexWrap: 'wrap',
   flexDirection: 'row',
   justifyContent: 'space-around',
  },
  button: {
    width: 100,
    height: 50,
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#495E57',
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});


export default Unauthorized;

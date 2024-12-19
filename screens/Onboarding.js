import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable , Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail } from '../utils';
import Header from '../components/Header';
import { multiSetData } from '../utils/asyncstorage';

const Onboarding = ({handleSignIn}) => {
  
    const [name, setName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    
    const isValid = validateEmail(email) && name.trim().length > 0 || name.match(/\d+/);

    function setFistAndLastName() {
      const nameToArray = name.split(' ');
      const fname = nameToArray[0];
      const lname = nameToArray[1];

      if(nameToArray.length >= 2) {
        console.log('setting name and family name')
        setFirstName(fname);
        setLastName(lname);
      } else {
        setFirstName(name);
      }
    }

    useEffect(() => {
      setFistAndLastName();
    }, [name])

    const saveUser = () => {

      console.log('name: ' + name)
      console.log('firstName: ' + firstName)
      console.log('lastName: ' + lastName)

      multiSetData(['isSignedIn', 'true'],['firstName', firstName],['lastName', lastName],['email', email], ['phone', ''],['orderStates', 'true'],['passwordChanges', 'true'],['specialOrders', 'true'], ['newsletters', 'true'], ['image', '']);


      Alert.alert(`Nice to meet you, ${name}`);
    }

  return (
        <View style={styles.mainContainer}>
            <Header avatarImage={false} route={'Onboarding'} />
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>
                        Let get us to know you
                    </Text>
                    <Text style={styles.label}>
                        First Name
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder={'John Doe'}
                        keyboardType={'phone-pad'}
                        clearButtonMode={'true'}
                        
                    />
                    <Text style={styles.label}>
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder={'Type your email'}
                        keyboardType={'email-address'}
                        textContentType="emailAddress"
                        clearButtonMode={'true'}
                    />
                </View>
                
                <Pressable style={styles.button} disabled={!isValid} onPress={() => {
                  saveUser();
                  handleSignIn();
                }}>
                    <Text style={styles.buttonTxt}>Next</Text>
                </Pressable>
            </View>
        </View>
  );
};


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#EDEFEE",
  },
  container: {
    backgroundColor: "#EDEFEE",
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 auto',
    padding: 20,
    textAlign: 'center'
  },
  form: {
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    color: "#000",
    textAlign: "center",
    fontSize: 25,
    paddingTop: 30,
    paddingBottom: 50,
  },
  input: {
    height: 40,
    marginVertical: 10,
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: "EDEFEE",
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 15,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: "EDEFEE",
    width: '20%'
  },
  buttonTxt: {
    textAlign: 'center',
    fontSize: 16,
  }
});


export default Onboarding;

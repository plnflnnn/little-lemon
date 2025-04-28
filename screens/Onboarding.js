import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { validateEmail } from '../utils';
import Header from '../components/Header';
import { multiSetData } from '../utils/asyncstorage';

const Onboarding = ({ handleSignIn }) => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const isValid = validateEmail(email) && (name.trim().length > 0 || /\d+/.test(name));

  function setFirstAndLastName() {
    const nameArray = name.trim().split(' ');
    if (nameArray.length >= 2) {
      setFirstName(nameArray[0]);
      setLastName(nameArray[1]);
    } else {
      setFirstName(name);
      setLastName('');
    }
  }

  useEffect(() => {
    setFirstAndLastName();
  }, [name]);

  const saveUser = async () => {
    await multiSetData([
      ['isSignedIn', 'true'],
      ['firstName', firstName],
      ['lastName', lastName],
      ['email', email],
      ['phone', ''],
      ['orderStates', 'true'],
      ['passwordChanges', 'true'],
      ['specialOrders', 'true'],
      ['newsletters', 'true'],
      ['image', '']
    ]);
    Alert.alert(`Nice to meet you, ${firstName}`);
  };

  return (
    <View style={styles.mainContainer}>
      <Header avatarImage={false} screen={'Onboarding'} />
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Let us get to know you</Text>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder={'John Doe'}
            keyboardType={'default'}
            clearButtonMode={'while-editing'}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder={'Type your email'}
            keyboardType={'email-address'}
            textContentType="emailAddress"
            clearButtonMode={'while-editing'}
          />
        </View>

        <Pressable
          style={[styles.button, !isValid && { opacity: 0.5 }]}
          disabled={!isValid}
          onPress={() => {
            saveUser();
            handleSignIn();
          }}
        >
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  form: {
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    paddingVertical: 40,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    marginBottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    borderColor: "#ccc",
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: "#ccc",
    width: '30%',
  },
  buttonTxt: {
    textAlign: 'center',
    fontSize: 16,
  }
});

export default Onboarding;

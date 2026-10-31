import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { validateEmail, validateName } from '../utils';
import Header from '../components/Header';
import { useUser } from '../contexts/UserContext';
import { colors } from '../theme/colors';

const Onboarding = () => {
  const { signIn, user } = useUser();
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [email, setEmail] = useState(user.email || '');
  const [submitting, setSubmitting] = useState(false);

  const isValid = validateEmail(email) && validateName(firstName);

  const handleNext = async () => {
    if (!isValid || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      await signIn({ firstName: firstName.trim(), email: email.trim() });
    } catch (e) {
      Alert.alert('Could not save your profile', e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header />
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.form}>
          <Text style={styles.title}>Are you hungry?</Text>
          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Tilly"
            placeholderTextColor={colors.border}
            keyboardType="default"
            textContentType="givenName"
            autoComplete="given-name"
            clearButtonMode="while-editing"
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            placeholderTextColor={colors.border}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            autoCapitalize="none"
            clearButtonMode="while-editing"
          />
        </View>

        <Pressable
          style={[styles.button, !isValid && styles.buttonDisabled]}
          disabled={!isValid || submitting}
          onPress={handleNext}
        >
          <Text style={styles.buttonTxt}>{submitting ? 'Saving...' : 'Next'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  form: {
    justifyContent: 'center',
    width: '100%',
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
    borderColor: colors.border,
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    borderColor: colors.border,
    backgroundColor: colors.primary,
    width: '30%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonTxt: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.white,
  },
});

export default Onboarding;

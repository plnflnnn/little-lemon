import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Constants from 'expo-constants';
import Header from '../components/Header';
import { useUser } from '../contexts/UserContext';
import { validateEmail, validateName, validatePhone } from '../utils';
import { colors } from '../theme/colors';
import { DEFAULT_AVATAR, getAvatarSource } from '../utils/avatar';

const NOTIFICATIONS = [
  { label: 'Order statuses', key: 'orderStates' },
  { label: 'Password changes', key: 'passwordChanges' },
  { label: 'Special offers', key: 'specialOrders' },
  { label: 'Newsletter', key: 'newsletters' },
];

function Profile() {
  const { user, saveUser, logout } = useUser();
  const [editedUser, setEditedUser] = useState(user);
  const [saving, setSaving] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setEditedUser(user);
    setImageFailed(false);
  }, [user]);

  const updateField = (key, value) => {
    setEditedUser((prev) => ({ ...prev, [key]: value }));
  };

  const saveChanges = async () => {
    if (!validateName(editedUser.firstName)) {
      Alert.alert('Check your name', 'First name is required and cannot contain numbers.');
      return;
    }

    if (editedUser.lastName.trim() && !validateName(editedUser.lastName)) {
      Alert.alert('Check your name', 'Last name cannot contain numbers.');
      return;
    }

    if (!validateEmail(editedUser.email)) {
      Alert.alert('Check your email', 'Please enter a valid email address.');
      return;
    }

    if (!validatePhone(editedUser.phone)) {
      Alert.alert('Check your phone number', 'Enter a complete US phone number, or leave it blank.');
      return;
    }

    try {
      setSaving(true);
      await saveUser(editedUser);
      Alert.alert('Changes saved.');
    } catch (e) {
      Alert.alert('Could not save changes', e.message);
    } finally {
      setSaving(false);
    }
  };

  const discardChanges = () => {
    setEditedUser(user);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Permission needed',
        'Allow photo access to update your avatar.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageFailed(false);
      updateField('image', result.assets[0].uri);
    }
  };

  const removeImage = () => {
    updateField('image', '');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      Alert.alert('Could not log out', e.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Header previewImage={editedUser.image} onBack={discardChanges} />
        <View style={styles.container}>
          <Text style={styles.title}>Personal information</Text>
          <Text style={styles.label}>Avatar</Text>

          <View style={styles.avatarSection}>
            <Image
              style={styles.avatar}
              resizeMode="cover"
              source={
                editedUser.image && !imageFailed
                  ? getAvatarSource(editedUser.image)
                  : DEFAULT_AVATAR
              }
              onError={() => {
                if (editedUser.image) {
                  setImageFailed(true);
                }
              }}
            />

            <Pressable style={styles.avatarBtn} onPress={pickImage}>
              <Text style={styles.avatarBtnTxt}>Change</Text>
            </Pressable>

            <Pressable style={styles.avatarBtn} onPress={removeImage}>
              <Text style={styles.avatarBtnTxt}>Remove</Text>
            </Pressable>
          </View>

          <Text style={styles.label}>First name</Text>
          <TextInput
            value={editedUser.firstName}
            onChangeText={(text) => updateField('firstName', text)}
            placeholder="Tilly"
            placeholderTextColor={colors.border}
            style={styles.input}
            textContentType="givenName"
            autoComplete="given-name"
          />

          <Text style={styles.label}>Last name</Text>
          <TextInput
            value={editedUser.lastName}
            onChangeText={(text) => updateField('lastName', text)}
            placeholder="Doe"
            placeholderTextColor={colors.border}
            style={styles.input}
            textContentType="familyName"
            autoComplete="family-name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={editedUser.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="example@gmail.com"
            placeholderTextColor={colors.border}
            style={styles.input}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Phone number (optional)</Text>
          <MaskedTextInput
            type="custom"
            mask="+1 999 999 9999"
            value={editedUser.phone}
            onChangeText={(text) => updateField('phone', text)}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <Text style={styles.labelNotifications}>Email notifications</Text>

          {NOTIFICATIONS.map((item) => {
            const checked = Boolean(editedUser[item.key]);
            return (
              <Pressable
                key={item.key}
                style={styles.checkboxWrapper}
                onPress={() => updateField(item.key, !checked)}
              >
                <MaterialCommunityIcons
                  name={checked ? 'checkbox-marked' : 'checkbox-blank-outline'}
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.checkboxLabel}>{item.label}</Text>
              </Pressable>
            );
          })}

          <View style={styles.btnWrapper}>
            <Pressable style={styles.btn} onPress={discardChanges}>
              <Text style={styles.btnTxt}>Discard changes</Text>
            </Pressable>
            <Pressable
              style={styles.btn}
              onPress={saveChanges}
              disabled={saving}
            >
              <Text style={styles.btnTxt}>
                {saving ? 'Saving...' : 'Save changes'}
              </Text>
            </Pressable>
          </View>

          <Pressable style={styles.logOutBtn} onPress={handleLogout}>
            <Text style={styles.logOutBtnTxt}>Log out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    padding: 10,
    margin: 10,
    marginTop: 0,
  },
  title: {
    textAlign: 'left',
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
  label: {
    paddingTop: 15,
    fontSize: 14,
    fontWeight: '400',
  },
  labelNotifications: {
    paddingTop: 15,
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: 20,
    borderRadius: 40,
    backgroundColor: colors.grey,
    overflow: 'hidden',
  },
  avatarBtn: {
    width: 80,
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 10,
  },
  avatarBtnTxt: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  input: {
    marginTop: 5,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    fontSize: 15,
    textAlign: 'left',
    borderColor: colors.border,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  checkboxWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  btn: {
    width: '40%',
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnTxt: {
    color: colors.white,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },
  logOutBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    width: '90%',
    height: 40,
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 8,
  },
  logOutBtnTxt: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Profile;

import { View, Text, StyleSheet, Image, Pressable, Alert, ScrollView, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import { Checkbox } from 'react-native-paper';
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";
import Constants from "expo-constants";

function Profile({ handleLogOut }) {
  const { user, saveUser, loadUser, logout } = useContext(UserContext);

  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const saveChanges = async () => {
    if (!editedUser.firstName || !editedUser.lastName || !editedUser.email || !editedUser.phone) {
      Alert.alert("Please fill the form to save changes.");
      return;
    }

    await saveUser(editedUser);
    Alert.alert("Changes saved.");
  };

  const discardChanges = () => {
    setEditedUser(user);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEditedUser(prev => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const removeImage = () => {
    setEditedUser(prev => ({ ...prev, image: '' }));
  };

  const logOut = async () => {
    await logout();
    handleLogOut();
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <Header imageUpdate={editedUser.image} avatarImage={true} discardChanges={discardChanges} screen={'Profile'} />
      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.label}>Avatar</Text>

        <View style={styles.avatarSection}>
          {editedUser.image ? (
            <Image style={styles.avatar} source={{ uri: editedUser.image }} />
          ) : (
            <Image style={styles.avatar} source={require('../assets/images/avatar.png')} />
          )}

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
          onChangeText={text => setEditedUser(prev => ({ ...prev, firstName: text }))}
          placeholder="Tilly"
          placeholderTextColor="#ccc"
          style={styles.input}
          textContentType="givenName"
          autoComplete="name"
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput
          value={editedUser.lastName}
          onChangeText={text => setEditedUser(prev => ({ ...prev, lastName: text }))}
          placeholder="Doe"
          placeholderTextColor="#ccc"
          style={styles.input}
          textContentType="familyName"
          autoComplete="name-family"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={editedUser.email}
          onChangeText={text => setEditedUser(prev => ({ ...prev, email: text }))}
          placeholder="example@gmail.com"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
        />

        <Text style={styles.label}>Phone number</Text>
        <MaskedTextInput
          type="custom"
          mask="+1 999 999 9999"
          value={editedUser.phone}
          onChangeText={text => setEditedUser(prev => ({ ...prev, phone: text }))}
          style={styles.input}
          keyboardType="numeric"
        />

        <Text style={styles.labelNotifications}>Email notifications</Text>

        {[
          { label: "Order states", key: "orderStates" },
          { label: "Password changes", key: "passwordChanges" },
          { label: "Special orders", key: "specialOrders" },
          { label: "Newsletters", key: "newsletters" },
        ].map((item, index) => (
          <View key={index} style={styles.checkboxWrapper}>
            <Checkbox
              color="#495E57"
              uncheckedColor="#495E57"
              status={editedUser[item.key] === 'true' ? 'checked' : 'unchecked'}
              onPress={() =>
                setEditedUser(prev => ({
                  ...prev,
                  [item.key]: prev[item.key] === 'true' ? 'false' : 'true',
                }))
              }
            />
            <Text style={styles.checkboxLabel}>{item.label}</Text>
          </View>
        ))}

        <View style={styles.btnWrapper}>
          <Pressable style={styles.btn} onPress={discardChanges}>
            <Text style={styles.btnTxt}>Discard changes</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={saveChanges}>
            <Text style={styles.btnTxt}>Save changes</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logOutBtn} onPress={logOut}>
          <Text style={styles.logOutBtnTxt}>Log Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingTop: Constants.statusBarHeight,
    },
    container: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 12,
      backgroundColor: "#ffffff",
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: '0 auto',
      padding: 10,
      margin: 10,
      marginTop: 0,
    },
    title: {
      textAlign: 'left',
      color: "#000",
      fontSize: 18,
      fontWeight: 600,
    },
    label: {
      paddingTop: 15,
      fontSize: 14,
      fontWeight: 400,
    },
    labelNotifications: {
      paddingTop: 15,
      fontSize: 16,
      fontWeight: 600,  
      paddingBottom: 10
    },
    avatarSection: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
    },
    avatar: {
      width: 80,
      height: 80,
      marginRight: 20,
    },
    avatarBtn: {
      width: 80,
      height: 40,
      backgroundColor: '#495E57',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
      alignSelf: 'flex-end',
      borderRadius: 10,
    },
    avatarBtnTxt: {
      color: '#ffffff',
      fontSize: 14,
      textAlign: 'center,',
    },
    input: {
      marginTop: 5,
      height: 48,
      borderRadius: 8,
      borderWidth: 1,
      padding: 10,
      fontSize: 15,
      textAlign: 'left',
      alignItems: 'center',
      borderColor: "#ccc",
    },
    image: {
      width: 200,
      height: 200,
    },
    checkbox: {
      color: 'black'
    },
    checkboxLabel: {
      marginLeft: 10
    },
    checkboxWrapper: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row'
    },
    btnWrapper: {
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      marginTop: 10
    },
    btn: {
      width: '40%',
      height: 40,
      backgroundColor: '#495E57',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      borderRadius: 10,
    },
    btnTxt: {
      color: '#ffffff',
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 400
    },
    logOutBtn: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      backgroundColor: '#F4CE14',
      width: '90%',
      height:  40,
      marginTop: 15,
      marginBottom: 30,
      borderRadius: 8,
    },
    logOutBtnTxt: {
      color: '#000000',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 500
    },
  });


export default Profile;
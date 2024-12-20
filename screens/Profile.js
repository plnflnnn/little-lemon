import { View, Text, StyleSheet, Image,  Pressable , Alert, ScrollView } from "react-native";
import {useState, useEffect,useRef} from "react";
import { TextInput } from "react-native-gesture-handler";
import { MaskedTextInput } from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import { Checkbox } from 'react-native-paper';
import {deleteData, getData, multiGetData, multiSetData, setData} from '../utils/asyncstorage';
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Profile ({handleLogOut}) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderStates, setOrderStates] = useState('true');
  const [passwordChanges, setPasswordChanges] = useState('true');
  const [specialOrders, setSpecialOrders] = useState('true');
  const [newsletters, setNewsletters] = useState('true');
  const [image, setImage] = useState('');

  const phoneRef = useRef('');

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orderStates: '',
    passwordChanges: '',
    specialOrders: '',
    newsletters: '',
    image: '',
  });

  // function changedState(state, objectValue) {
  //   if(state != objectValue) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  function updateData() {

    //setPhone(phoneRef)

    if(phone == null || email  == null || firstName  == null || lastName == null) {
      Alert.alert(`Please fill the form to save changes.`);
      return
    }

    for (const [key, value] of Object.entries(state)) {

      switch(key) {
        case 'firstName':
          //if(changedState(firstName, value)) {
            setState((state) => {
              return {
                ...state,
                firstName: firstName,
              }
            });
          //}
          break;
          case 'lastName': 
            //if(changedState(lastName, value)) {
              setState((state) => {
                return {
                  ...state,
                  lastName: lastName,
                }
              });
            //}
            break;
            case 'email': 
            //if(changedState(email, value)) {
              setState((state) => {
                return {
                  ...state,
                  email: email,
                }
              });
            //}
            break;  
            case 'phone': 
            //if(changedState(phone, value)) {
              setState((state) => {
                return {
                  ...state,
                  phone: phone,
                }
              });
            //}
            break;  
            case 'image': 
            //if(changedState(image, value)) {
              setState((state) => {
                return {
                  ...state,
                  image: image,
                }
              });
            //}
            break;  
            case 'orderStates': 
            //if(changedState(orderStates, value)) {
              setState((state) => {
                return {
                  ...state,
                  orderStates: orderStates,
                }
              });
            //}
            break; 
            case 'passwordChanges': 
            //if(changedState(passwordChanges, value)) {
              setState((state) => {
                return {
                  ...state,
                  passwordChanges: passwordChanges,
                }
              });
            //}
            break; 
            case 'specialOrders': 
            //if(changedState(specialOrders, value)) {
              setState((state) => {
                return {
                  ...state,
                  specialOrders: specialOrders,
                }
              });
            //}
            break;   
            case 'newsletters': 
            //if(changedState(newsletters, value)) {
              setState((state) => {
                return {
                  ...state,
                  newsletters: newsletters,
                }
              });
            //}
            break;                      
      }
      
      console.log(`${key}: ${value}`);
      //Alert.alert(`Changes saved.`);
      saveChanges();
      //
    }
  };

  useEffect(() => {
    setLocalState();
  }, []);

  async function setLocalState() {

    // const values = await multiGetData('firstName', 'lastName', 'email', 'phone', 'orderStates', 'passwordChanges', 'specialOrders', 'newsletters', 'image');

    // const values = await AsyncStorage.multiGet(['firstName', 'lastName', 'email', 'phone', 'orderStates', 'passwordChanges', 'specialOrders', 'newsletters', 'image'])
    //         .then(data => console.log(data))
    //         .catch((e) => console.log(e.message));

    // const initialState = values.reduce((acc, curr) => {
    //   acc[curr[0]] = JSON.parse(curr[1]);
    //   return acc;
    // }, {});

    //console.log('initialState: ' + initialState.firstName)

    // console.log(values)
    // console.log('values: ' + values.firstName)

    const fnameV = await getData('firstName');
    const lnameV = await getData('lastName');
    const emailV = await getData('email');
    const phoneV = await getData('phone');
    const orderStatesV = await getData('orderStates');
    const passwordChangesV = await getData('passwordChanges');
    const specialOrdersV = await getData('specialOrders');
    const newslettersV = await getData('newsletters');
    const imageV = await getData('image');

    setFirstName(fnameV);
    setLastName(lnameV);
    setEmail(emailV);
    setPhone(phoneV);
    setOrderStates(orderStatesV);
    setPasswordChanges(passwordChangesV);
    setSpecialOrders(specialOrdersV);
    setNewsletters(newslettersV);
    setImage(imageV);

    setState((state) => {
      return {
        ...state,
        firstName: fnameV,
        lastName: lnameV,
        email: emailV,
        phone: phoneV,
        orderStates: orderStatesV,
        passwordChanges: passwordChangesV,
        specialOrders: specialOrdersV,
        newsletters: newslettersV,
      }
    });

    // setFirstName(values.firstName);
    // setLastName(values.lastName);
    // setEmail(values.email);
    // setPhone(values.phone);
    // setImage(values.image);
    // setOrderStates(values.orderStates);
    // setPasswordChanges(values.passwordChanges);
    // setSpecialOrders(values.specialOrders);
    // setNewsletters(values.newsletters);

    // setState((state) => {
    //   return {
    //     ...state,
    //     firstName: values.firstName,
    //     lastName: values.lastName,
    //     email: values.email,
    //     phone: values.phone,
    //     image: values.image,
    //     orderStates: values.orderStates,
    //     passwordChanges: values.passwordChanges,
    //     specialOrders: values.specialOrders,
    //     newsletters: values.newsletters,
    //   }
    // });
  }

  function discardChanges() {
    setFirstName(state.firstName);
    setLastName(state.lastName);
    setEmail(state.email);
    setPhone(state.phone);
    setImage(state.image);
    setOrderStates(state.orderStates);
    setPasswordChanges(state.passwordChanges);
    setSpecialOrders(state.specialOrders);
    setNewsletters(state.newsletters);
  }

  function logOut() {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setImage(null);
    setOrderStates('false');
    setPasswordChanges('false');
    setSpecialOrders('false');
    setNewsletters('false');
    deleteData();
    handleLogOut()
  }

  async function saveImg () {
    if(image !== '' && typeof(image) !== undefined && typeof(image) !== null) {
      await AsyncStorage.setItem('image', image).then(() => console.log('image saved'));
      setState((state) => {
        return {
          ...state,
          image: image,
        }
      });
    }
  }

  function saveChanges() {
    multiSetData(['firstName', firstName],['lastName', lastName],['email', email], ['orderStates', orderStates],['passwordChanges', passwordChanges],['specialOrders', specialOrders], ['newsletters', newsletters], ['phone', phone]);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // function customMask (text) {
  //   let newText = '';
  //   let mask = '+1 111 111 1111';
  
  //   for (let i = 0, j = 0; i < text.length; i++) {
  //     if (mask[j] === '9') {
  //       if (/\d/.test(text[i])) {
  //         newText += text[i];
  //         j++;
  //       }
  //     } else {
  //       newText += mask[j];
  //       j++;
  //     }
  //   }
  
  //   setPhone(newText);
  // };

    return (
        <ScrollView style={styles.mainContainer}>
            <Header imageUpdate={image} avatarImage={true} discardChanges={discardChanges} route={'Profile'} />
            <View style={styles.container}>
              <Text style={styles.title}>Personal Information</Text>
              <Text style={styles.label}>Avatar</Text>

              <View style={styles.avatarSection}>
                {image ?  (
                  <Image style={styles.avatar}
                  accessible={true}
                  accessibilityLabel={'avatar'}
                  source={{ uri: image }} /> 
                ) : (
                  <Image style={styles.avatar}
                  accessible={true}
                  accessibilityLabel={'avatar'}
                  source={require('../assets/images/avatar.png')} /> 
                )
                }

                <Pressable style={styles.avatarBtn} onPress={pickImage}>
                  <Text style={styles.avatarBtnTxt}>Change</Text>
                </Pressable> 
                
                <Pressable style={styles.avatarBtn} onPress={() => setImage('')}>
                  <Text style={styles.avatarBtnTxt}>Remove</Text> 
                </Pressable>
                
              </View>

              <Text style={styles.label}>First name</Text>
              <TextInput  
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder={'Tilly'}
                  placeholderTextColor='#ccc'
                  style={styles.input} 
                  keyboardType={'default'}
                  textContentType="givenName"
                  autoComplete='true' />

              <Text style={styles.label}>Last name</Text>
              <TextInput 
                  value={lastName}
                  onChangeText={setLastName}
                  placeholder={'Doe'}
                  placeholderTextColor='#ccc'
                  style={styles.input}
                  keyboardType={'default'}
                  textContentType="familyName"
                  autoComplete='true' />

              <Text style={styles.label}>Email</Text>
              <TextInput 
                  value={email}
                  onChangeText={setEmail}
                  placeholder={'example@gmail.com'}
                  placeholderTextColor='#ccc'
                  keyboardType={'email-address'}
                  textContentType="emailAddress"
                  style={styles.input}
                  autoComplete='true' />

              <Text style={styles.label}>Phone number</Text>
              <MaskedTextInput
                  type="string"
                  placeholder="+1 111 111 1111"
                  mask="+1 999 999 9999"
                  value={phone}
                  onChangeText={setPhone}
                  style={styles.input}
                  keyboardType="numeric"
              /> 

              <Text style={styles.labelNotifications}>Email notifications</Text>

              <View style={styles.checkboxWrapper}>
                <Checkbox
                  color={'#495E57'}
                  uncheckedColor={'#495E57'}
                  status={orderStates == 'true' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    if(orderStates == 'true') {
                      setOrderStates('false');
                    } else {
                      setOrderStates('true');
                    }
                  }}
                />
                <Text style={styles.checkboxLabel}>Order states</Text>
              </View>

              <View style={styles.checkboxWrapper}>
                <Checkbox
                  color={'#495E57'}
                  uncheckedColor={'#495E57'}
                  status={passwordChanges == 'true' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    if(passwordChanges == 'true') {
                      setPasswordChanges('false');
                    } else {
                      setPasswordChanges('true');
                    }
                  }}
                />
                <Text style={styles.checkboxLabel}>Password changes</Text>
              </View>

              <View style={styles.checkboxWrapper}>
                <Checkbox
                  color={'#495E57'}
                  uncheckedColor={'#495E57'}
                  status={specialOrders == 'true' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    if(specialOrders == 'true') {
                      setSpecialOrders('false');
                    } else {
                      setSpecialOrders('true');
                    }
                  }}
                />      
                <Text style={styles.checkboxLabel}>Special orders</Text> 
              </View>

              <View style={styles.checkboxWrapper}>
                <Checkbox
                  color={'#495E57'}
                  uncheckedColor={'#495E57'}
                  status={newsletters == 'true' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    if(newsletters == 'true') {
                      setNewsletters('false');
                    } else {
                      setNewsletters('true');
                    }
                  }}
                />
                <Text style={styles.checkboxLabel}>Newsletters</Text>
              </View>      

              <View style={styles.btnWrapper}>
                <Pressable style={styles.btn} onPress={() => discardChanges()} 
                >
                  <Text style={styles.btnTxt}>Discard changes</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => {
                  saveImg();
                  updateData();
                } } >
                  <Text style={styles.btnTxt}>Save changes</Text>
                </Pressable>
              </View>

              <Pressable style={styles.logOutBtn}  onPress={() => {
                logOut();
                //navigation.navigate('Onboarding');
              }}>
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
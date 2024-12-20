import {useState, useEffect} from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { getData } from "../utils/asyncstorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = ({imageUpdate, route, discardChanges}) => {

  const [image, setImage] = useState('');

  const navigation = useNavigation();

  const getImage = async () => {
    const asyncImage = await AsyncStorage.getItem('image');
    setImage(asyncImage);
  }

  useEffect(() => {
    getImage();
  }, []);

  useEffect(() => {
    setImage(imageUpdate);
  }, [imageUpdate]);

  //console.log(image)

    return (
      <View style={styles.header}>

        {route != 'Onboarding' ? (
          <Pressable  style={styles.backBtn} onPress={() => {
            if(route == 'Profile') {
              discardChanges();
            }
            navigation.goBack();
          }} >
          <Image source={require('../assets/images/back-arrow.png')}
                accessible={true}
                accessibilityLabel={'back button'}
            />
        </Pressable>
        ): ''}

        <Image 
            source={require('../assets/images/logo.png')}
            accessible={true}
            accessibilityLabel={'Little Lemon Logo'}
            style={styles.logo}
        />

        {route == 'Onboarding' ? '' : (
          <Pressable onPress={()=>{navigation.navigate("Profile")}} > 
            {  
            image ? (
              <Image style={styles.avatar} accessible={true} accessibilityLabel={'avatar'} source={{ uri: image }} />) : (
              <Image style={styles.avatar} accessible={true} accessibilityLabel={'avatar'} source={require('../assets/images/avatar.png')} /> 
            )}
          </Pressable> 
        )}




      </View>
    )
};


const styles = StyleSheet.create({
    header: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      width: '100%',
      backgroundColor: '#fff',
      height: 70,
      paddingHorizontal: 20,
    },
    logo: {
      height: '60%',
      width: '50%',
      resizeMode: "cover",
      alignSelf: 'center',
      margin: 'auto',
    },
    backBtn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: '100%',
      backgroundColor: '#495E57',
    },
    avatar: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      backgroundColor: '#ffffff',
    }
  });

export default Header;
import { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../contexts/UserContext";

const Header = ({ imageUpdate, screen, discardChanges }) => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(user.image);
  }, [user.image]);

  return (
    <View style={styles.header}>
      {screen !== 'Onboarding' && screen !== 'Home' && (
        <Pressable
          style={styles.backBtn}
          onPress={() => {
            if (screen === 'Profile') {
              discardChanges();
            }
            navigation.goBack();
          }}
        >
          <Image
            source={require('../assets/images/back-arrow.png')}
            accessible={true}
            accessibilityLabel={'back button'}
          />
        </Pressable>
      )}

      <Pressable 
        style={styles.logo} 
        onPress={() => {
          if (screen !== 'Onboarding') {
            navigation.navigate("Home");
          }
        }}
      > 
        <Image 
          source={require('../assets/images/logo.png')}
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
          style={styles.logoImg}
        />
      </Pressable> 

      {screen !== 'Onboarding' && (
        <Pressable onPress={() => navigation.navigate("Profile")}> 
          {image ? (
            <Image 
              style={styles.avatar} 
              accessible={true} 
              accessibilityLabel={'avatar'} 
              source={{ uri: image }}
            />
          ) : (
            <Image 
              style={styles.avatar} 
              accessible={true} 
              accessibilityLabel={'avatar'} 
              source={require('../assets/images/avatar.png')}
            />
          )}
        </Pressable> 
      )}
    </View>
  );
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
  logoImg: {
    width: '100%'
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
    borderRadius: 25,
  }
});

export default Header;

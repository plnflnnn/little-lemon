import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Splash = () => {
  return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/images/little-lemon-logo.png')}
                accessible={true}
                accessibilityLabel={'Little Lemon Logo'}
                style={styles.logo}
            />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: 'center',
    margin: '0 auto',
    textAlign: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '60%',
    height: '60%',
    resizeMode: "contain",
  },
});


export default Splash;

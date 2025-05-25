import * as React from 'react';
import { View, Image, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';

const Hero = () => {
  return (
    <>
        <View style={styles.hero}>

          <View style={styles.left}>
            <Text style={styles.title}>Little Lemon</Text>
            <Text style={styles.subtitle}>Chicago</Text>
            <Text style={styles.text} multiline>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          </View>

            <Image style={styles.image}
            source={require('../assets/images/hero.jpg')}
            accessible={true}
            accessibilityLabel={'Little Lemon Hero Image'}
            />
        </View>
    </>
  );
};


const styles = StyleSheet.create({
  hero: {
    width: '100%',
    backgroundColor: '#495E57',
    padding: 10,
    paddingHorizontal: 10,
    paddingBottom: 45,
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexWrap: 'wrap',
    position: 'relative',
  },
  left: {
    width: '50%',
  },
  title: {
    color: "#F4CE14",
    fontSize: 36,
    src: require('../assets/fonts/MarkaziText-Regular.ttf'),
    fontFamily: 'MarkaziText-Regular',
  },
  subtitle: {
    fontFamily: 'Markazi Text',
    fontSize: 24,
    color: '#FFFFFF',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    fontFamily: 'Karla',
    fontSize: 16,
    fontWeight: 400,
    color: '#FFFFFF',
    width: '100%',
    marginTop: 30,
  },
  image: {
    width: '40%',
    height: '70%',
    resizeMode: "cover",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    position: 'absolute',
    top: '30%',
    right: '2%'
  },
});


export default Hero;

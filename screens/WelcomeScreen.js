import * as React from 'react';
import { View, Image,  Text, StyleSheet } from 'react-native';
import Button from "../components/Button";

const WelcomeScreen = ({ navigation }) => {
  // Add welcome screen code here.
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={require("../assets/images/little-lemon-logo.png")} 
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
        style={styles.logo}
        />
        <Text style={styles.title}>
            Little Lemon, your local Mediterranean Bistro
        </Text>
      </View>
      <Button
        onPress={() => navigation.navigate('Subscribe')}>
          Newsletter
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 200,
    width: 300,
    resizeMode: "contain",
  },
  title: {
    marginTop: 48,
    paddingVertical: 10,
    color: "#333333",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
